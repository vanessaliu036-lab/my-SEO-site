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

  // Simulate submission — remove once Airtable credentials are configured
  console.log("[ContactForm] New enquiry received:", {
    name,
    email,
    service,
    message: message ?? "(no message)",
    timestamp: new Date().toISOString(),
  })

  // ── Airtable integration stub ──────────────────────────────────────────────
  // 1. Install the Airtable SDK:  npm install airtable
  // 2. Add to .env.local:
  //      AIRTABLE_API_KEY=your_personal_access_token
  //      AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
  // 3. Create a table "OCC_Contact_Enquiries" with these fields:
  //      Name (Single line text)
  //      Email (Email)
  //      Service (Single select: Wholesale / Roasting Program / Barista Staffing / Equipment Service)
  //      Message (Long text)
  //      Status (Single select: New / In Progress / Resolved)
  //      SubmittedAt (Date)
  // 4. Uncomment the block below and delete the console.log above.
  //
  // import Airtable from "airtable"
  // const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  //   process.env.AIRTABLE_BASE_ID!
  // )
  // await base("OCC_Contact_Enquiries").create([
  //   {
  //     fields: {
  //       Name: name,
  //       Email: email,
  //       Service: service,
  //       Message: message ?? "",
  //       Status: "New",
  //       SubmittedAt: new Date().toISOString(),
  //     },
  //   },
  // ])
  // ──────────────────────────────────────────────────────────────────────────

  return { success: true }
}
