"use server"

import { z } from "zod"

// ── Zod schema ────────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  service: z.enum(
    ["Wholesale", "Roasting Program", "Barista Staffing", "Equipment Service"],
    { errorMap: () => ({ message: "Please select a service type" }) }
  ),
  message: z
    .string()
    .max(2000, "Message must be 2000 characters or fewer")
    .optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export type ContactActionResult =
  | { success: true }
  | { success: false; error: string }

// ── Airtable helpers ──────────────────────────────────────────────────────────

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const CONTACT_TABLE = "OCC_Contact_Enquiries"

async function createAirtableRecord(fields: Record<string, string>): Promise<void> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn("[ContactForm] Airtable env vars not set — skipping Airtable write")
    return
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(CONTACT_TABLE)}`,
    {
      method: "POST",
      // Headers must be a plain object { name: value } — NOT an array of { key, value } objects
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    }
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Airtable write failed (${res.status}): ${text}`)
  }
}

// ── Server Action ─────────────────────────────────────────────────────────────

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactActionResult> {
  // Re-validate on the server — never trust client-side-only validation
  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Validation failed",
    }
  }

  const { name, email, service, message } = parsed.data

  try {
    await createAirtableRecord({
      Name: name,
      Email: email,
      Service: service,
      Message: message ?? "",
      Status: "New",
      SubmittedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error("[ContactForm] Airtable error:", err)
    return { success: false, error: "Failed to submit enquiry. Please try again." }
  }

  return { success: true }
}
