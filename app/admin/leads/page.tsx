import { redirect } from 'next/navigation'

export default function LegacyContactInboxPage() {
  redirect('/admin?view=contact-inquiries')
}
