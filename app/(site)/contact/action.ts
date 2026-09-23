"use server"

import { createHash } from "node:crypto"
import { headers } from "next/headers"
import { checkBotId } from "botid/server"
import { contactSchema } from "./schema"
import type { ContactFormData } from "./schema"
import { persistContactLead } from "@/lib/contact-lead-delivery.mjs"
import { sendContactNotification } from "@/lib/contact-notification.mjs"

type ContactActionResult =
  | { success: true }
  | { success: false; error: string }

type RateBucket = {
  count: number
  resetAt: number
}

type ContactRateStore = Map<string, RateBucket>

const RATE_LIMITS = {
  ip: { max: 8, windowMs: 15 * 60 * 1000 },
  email: { max: 3, windowMs: 30 * 60 * 1000 },
} as const

const contactRateGlobal = globalThis as typeof globalThis & {
  __occContactRateStore?: ContactRateStore
}

function rateStore() {
  contactRateGlobal.__occContactRateStore ??= new Map<string, RateBucket>()
  return contactRateGlobal.__occContactRateStore
}

function consumeRateLimit(key: string, max: number, windowMs: number) {
  const store = rateStore()
  const now = Date.now()
  const current = store.get(key)

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }

  if (current.count >= max) {
    return true
  }

  current.count += 1
  store.set(key, current)

  if (store.size > 1000) {
    for (const [candidate, bucket] of store) {
      if (bucket.resetAt <= now) store.delete(candidate)
    }
  }

  return false
}

function hashRateKey(value: string) {
  return createHash("sha256").update(value).digest("hex")
}

async function getClientAddress() {
  const requestHeaders = await headers()
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip")?.trim() ||
    requestHeaders.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  )
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactActionResult> {
  const verification = await checkBotId({
    advancedOptions: {
      checkLevel: "basic",
    },
  })

  if (verification.isBot) {
    console.warn("[contact-security] BotID blocked an automated enquiry")
    return {
      success: false,
      error:
        "We could not verify this submission. Please try again or email service@origincafekh.com.",
    }
  }

  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Validation failed",
    }
  }

  if (parsed.data.website?.trim()) {
    console.warn("[contact-security] Honeypot blocked an automated enquiry")
    return {
      success: false,
      error:
        "We could not verify this submission. Please try again or email service@origincafekh.com.",
    }
  }

  const clientAddress = await getClientAddress()
  const normalizedEmail = parsed.data.email.trim().toLowerCase()

  const ipLimited = consumeRateLimit(
    `ip:${hashRateKey(clientAddress)}`,
    RATE_LIMITS.ip.max,
    RATE_LIMITS.ip.windowMs
  )
  const emailLimited = consumeRateLimit(
    `email:${hashRateKey(normalizedEmail)}`,
    RATE_LIMITS.email.max,
    RATE_LIMITS.email.windowMs
  )

  if (ipLimited || emailLimited) {
    console.warn("[contact-security] Submission rate limit reached")
    return {
      success: false,
      error:
        "Too many enquiries were submitted in a short period. Please wait and try again, or email service@origincafekh.com.",
    }
  }

  const persisted = await persistContactLead(parsed.data)
  if (!persisted) {
    return {
      success: false,
      error: "Your enquiry could not be saved. Please try again.",
    }
  }

  // Airtable remains the system of record. Notification failure must not ask the
  // visitor to submit the same enquiry twice.
  await sendContactNotification(parsed.data)

  return { success: true }
}
