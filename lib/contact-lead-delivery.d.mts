export interface ContactLeadInput {
  name: string
  email: string
  service: "Wholesale / Sourcing" | "Sample Request" | "Lot List" | "Roasting / Solutions" | "Editorial / Source Correction" | "Media / Interview" | "General Enquiry"
  message?: string
}
export interface ContactLeadRuntime {
  env?: NodeJS.ProcessEnv
  fetchImpl?: typeof fetch
  now?: () => Date
}
export function persistContactLead(data: ContactLeadInput, runtime?: ContactLeadRuntime): Promise<boolean>
