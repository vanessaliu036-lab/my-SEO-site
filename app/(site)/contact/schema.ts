import { z } from "zod"

// Shared by the client resolver and the server action. Never export this from a "use server" module.
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or fewer"),
  company: z.string().min(1, "Company is required").max(150, "Company must be 150 characters or fewer"),
  email: z.string().min(1, "Work email is required").email("Please enter a valid work email address"),
  country: z.string().min(1, "Country / market is required").max(100, "Country / market must be 100 characters or fewer"),
  service: z.enum(
    [
      "Wholesale / Sourcing",
      "Roasting / Solutions",
      "Partnership / Distribution",
      "Other / General",
    ],
    { errorMap: () => ({ message: "Please select an enquiry intent" }) }
  ),
  projectStage: z.enum(
    ["Exploring", "Comparing suppliers", "Sampling / Trial", "Ready to order"],
    { errorMap: () => ({ message: "Please select a project stage" }) }
  ),
  message: z.string().max(2000, "Message must be 2000 characters or fewer").optional(),
  // Invisible honeypot. Human visitors leave this field empty.
  website: z.string().max(200, "Invalid submission").optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
