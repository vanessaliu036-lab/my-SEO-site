"use server"

import { z } from "zod"

const EXPLORATION_TYPES = [
  "Wholesale & Sourcing",
  "Roasted Coffee Supply",
  "Roasting Program",
  "Distribution Partnership",
  "Other",
] as const

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be 100 characters or fewer"),
  company: z.string().trim().min(1, "Company is required").max(160, "Company must be 160 characters or fewer"),
  email: z.string().trim().min(1, "Work email is required").email("Please enter a valid work email"),
  countryMarket: z.string().trim().min(1, "Country / market is required").max(120, "Country / market must be 120 characters or fewer"),
  service: z.enum(EXPLORATION_TYPES, { errorMap: () => ({ message: "Please select what you are exploring" }) }),
  projectRequirement: z.string().trim().min(10, "Please tell us briefly what you are building or sourcing").max(3000, "Project requirement must be 3000 characters or fewer"),
  projectStage: z.string().trim().max(1000, "Project stage must be 1000 characters or fewer").optional(),
  sourcePage: z.string().trim().max(500, "Source page must be 500 characters or fewer").optional().default("/contact"),
})

export type ContactFormData = z.infer<typeof contactSchema>

export type ContactActionResult =
  | { success: true }
  | { success: false; error: string }

export async function submitContactForm(data: ContactFormData): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Validation failed",
    }
  }

  const token = process.env.AIRTABLE_TOKEN ?? process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!token || !baseId) {
    console.error("[ContactForm] Airtable lead capture is not configured")
    return { success: false, error: "We could not save your enquiry. Please try again shortly." }
  }

  const {
    name,
    company,
    email,
    countryMarket,
    service,
    projectRequirement,
    projectStage,
    sourcePage,
  } = parsed.data

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent("OCC_B2B_Leads")}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Lead: `${company} — ${name}`,
                Name: name,
                Company: company,
                "Work Email": email,
                "Country / Market": countryMarket,
                "What are you exploring?": service,
                "Project / Requirement": projectRequirement,
                "Estimated Requirement / Project Stage": projectStage || "",
                "Source Page": sourcePage || "/contact",
                Status: "New",
                "Submitted At": new Date().toISOString(),
              },
            },
          ],
          typecast: true,
        }),
        cache: "no-store",
      },
    )

    if (!response.ok) {
      const detail = await response.text()
      console.error("[ContactForm] Airtable rejected lead capture", response.status, detail.slice(0, 500))
      return { success: false, error: "We could not save your enquiry. Please try again shortly." }
    }

    return { success: true }
  } catch (error) {
    console.error("[ContactForm] Lead capture failed", error)
    return { success: false, error: "We could not save your enquiry. Please try again shortly." }
  }
}
