export interface ContactLeadInput {
  name: string
  company: string
  email: string
  country: string
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
  projectStage?: "Exploring" | "Comparing suppliers" | "Sampling / Trial" | "Ready to order"
  message?: string
}
export interface ContactLeadRuntime {
  env?: NodeJS.ProcessEnv
  fetchImpl?: typeof fetch
  now?: () => Date
}
export function persistContactLead(data: ContactLeadInput, runtime?: ContactLeadRuntime): Promise<boolean>
