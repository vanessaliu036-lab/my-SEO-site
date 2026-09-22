import { z } from "zod"

// Shared by the client resolver and the server action. Never export this from a "use server" module.
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
    [
      "Wholesale / Sourcing",
      "Sample Request",
      "Lot List",
      "Roasting / Solutions",
      "Editorial / Source Correction",
      "Media / Interview",
      "General Enquiry",
    ],
    { errorMap: () => ({ message: "Please select an enquiry type" }) }
  ),
  message: z
    .string()
    .max(2000, "Message must be 2000 characters or fewer")
    .optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
