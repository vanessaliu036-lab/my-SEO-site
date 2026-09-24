export interface ContactLeadInput {
  name: string
  jobTitle?: string
  phone: string
  company?: string
  email: string
  country?: string
  service:
    | "Wholesale / Sourcing"
    | "Roasting / Solutions"
    | "Partnership / Distribution"
    | "Other / General"
    | "Sample Request"
    | "Lot List"
    | "Distribution / Partnership"
    | "Editorial / Source Correction"
    | "Media / Interview"
    | "General Enquiry"
  message: string
}
export interface ContactLeadRuntime {
  env?: NodeJS.ProcessEnv
  fetchImpl?: typeof fetch
  now?: () => Date
}
export function persistContactLead(data: ContactLeadInput, runtime?: ContactLeadRuntime): Promise<boolean>
