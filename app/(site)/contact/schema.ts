import { z } from "zod"

// Shared by the client resolver and the server action. Never export this from a "use server" module.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be 100 characters or fewer"),
  jobTitle: z.string().trim().max(100, "Job title must be 100 characters or fewer").optional(),
  phone: z.string().trim().min(6, "Phone number is required").max(40, "Phone number must be 40 characters or fewer"),
  company: z.string().trim().max(150, "Company must be 150 characters or fewer").optional(),
  email: z.string().trim().min(1, "Work email is required").email("Please enter a valid work email address"),
  country: z.string().trim().max(100, "Country / market must be 100 characters or fewer").optional(),
  service: z.enum(
    [
      "Wholesale / Sourcing",
      "Roasting / Solutions",
      "Partnership / Distribution",
      "Other / General",
    ],
    { errorMap: () => ({ message: "Please select an enquiry intent" }) }
  ),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be 2000 characters or fewer"),
  // Invisible honeypot. Human visitors leave this field empty.
  website: z.string().max(200, "Invalid submission").optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
