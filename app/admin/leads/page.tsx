import { fetchContactLeads } from '@/lib/admin-contact-inbox.mjs'

export const dynamic = 'force-dynamic'

type ContactLead = {
  id: string
  title: string
  name: string
  email: string
  interest: string
  message: string
  source: string
  status: string
  createdAt: string
}

function formatDate(value: string) {
  if (!value) return 'Time unavailable'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Phnom_Penh',
  }).format(date)
}

export default async function AdminContactInboxPage() {
  let leads: ContactLead[] = []
  let error = ''
  try {
    leads = await fetchContactLeads({ limit: 100 }) as ContactLead[]
  } catch {
    error = 'The contact inbox could not be loaded. Check the server-side Airtable configuration.'
  }

  return (
    <main className="mx-auto max-w-[1380px] px-5 py-9 text-slate-900 sm:px-8 lg:px-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">OCC / Contact inbox</p>
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Website enquiries</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Live enquiries submitted through the OCC Contact form. Replying opens your staff email client.
          </p>
        </div>
        <div className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
          {leads.length} latest enquiries
        </div>
      </div>

      {error ? (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-900">{error}</div>
      ) : leads.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-sm text-slate-600">No Contact enquiries have been received yet.</div>
      ) : (
        <section aria-label="Contact enquiries" className="grid gap-4">
          {leads.map((lead) => (
            <article key={lead.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{lead.status} · {lead.interest}</div>
                  <h2 className="mt-2 font-serif text-2xl">{lead.name}</h2>
                  <a className="mt-1 inline-block text-sm text-slate-700 underline underline-offset-4" href={`mailto:${lead.email}`}>{lead.email}</a>
                </div>
                <div className="text-right text-xs leading-5 text-slate-500">
                  <div>{formatDate(lead.createdAt)}</div>
                  <div>{lead.source}</div>
                </div>
              </div>
              <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-700">{lead.message || 'No message provided.'}</p>
              <a
                href={`mailto:${lead.email}?subject=${encodeURIComponent(`Re: ${lead.title}`)}`}
                className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white"
              >
                Reply by email
              </a>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}
