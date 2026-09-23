'use client'

import { useState, type FormEvent } from 'react'

// Synthetic examples are deliberately never persisted or fetched from OCC's CRM.
type Lead = {
  id: string
  name: string
  company: string
  email: string
  market: string
  interest: string
  requirement: string
  stage: string
  status: string
  source: string
}

const SYNTHETIC_LEADS: Lead[] = [
  {
    id: 'DEMO-001', name: 'Demo Buyer A', company: 'Example Hotel Group',
    email: 'hotel@example.test', market: 'Cambodia', interest: 'Wholesale & Sourcing',
    requirement: 'Breakfast service · sample request · 12 kg per month',
    stage: 'Sampling', status: 'New', source: '/contact',
  },
  {
    id: 'DEMO-002', name: 'Demo Buyer B', company: 'Example Overseas Distributor',
    email: 'buyer@example.test', market: 'United States', interest: 'Distribution',
    requirement: 'Fine Robusta wholesale · request specifications and price tiers',
    stage: 'Initial enquiry', status: 'Contacted', source: '/distribution',
  },
  {
    id: 'DEMO-003', name: 'Demo Buyer C', company: 'Example Café',
    email: 'cafe@example.test', market: 'Cambodia', interest: 'Roasting Program',
    requirement: 'Custom roasting enquiry · 6 kg initial trial',
    stage: 'Quotation', status: 'Follow-up', source: '/solutions/roasting-program',
  },
]

const interestOptions = ['Wholesale & Sourcing', 'Roasting Program', 'Distribution', 'Partnership', 'Other']
const statusOptions = ['New', 'Contacted', 'Follow-up', 'Qualified', 'Closed']
const control = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-slate-700 focus:outline-none'

export default function LeadFormLab() {
  const [rows, setRows] = useState<Lead[]>(SYNTHETIC_LEADS)
  const [selectedId, setSelectedId] = useState(SYNTHETIC_LEADS[0].id)
  const [draft, setDraft] = useState<Lead>({ ...SYNTHETIC_LEADS[0] })
  const [notice, setNotice] = useState('')

  const choose = (lead: Lead) => {
    setSelectedId(lead.id)
    setDraft({ ...lead })
    setNotice('')
  }
  const edit = (field: keyof Lead, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }))
    setNotice('')
  }
  const reset = () => {
    setRows(SYNTHETIC_LEADS)
    const original = SYNTHETIC_LEADS.find((row) => row.id === selectedId) ?? SYNTHETIC_LEADS[0]
    setDraft({ ...original })
    setNotice('All sample records reset. No live customer data was changed.')
  }
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setRows((current) => current.map((row) => row.id === selectedId ? { ...draft } : row))
    setNotice('Demo saved in this browser tab only. No Airtable record was created or modified.')
  }

  return (
    <main className="mx-auto max-w-[1380px] px-5 py-9 text-slate-900 sm:px-8 lg:px-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">OCC / B2B Form Lab</p>
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Review the enquiry workflow.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Choose a synthetic lead, test the field order and edit a record. Changes stay in browser memory; refresh or reset restores the samples.</p>
        </div>
        <button type="button" onClick={reset} className="rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-slate-50">Reset demo data</button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <section aria-label="Synthetic enquiries" className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500"><span>Sample leads</span><span>{rows.length} DEMO</span></div>
          <div className="grid gap-2">
            {rows.map((lead) => <button type="button" key={lead.id} onClick={() => choose(lead)} aria-pressed={selectedId === lead.id} className={`rounded-xl border p-4 text-left transition ${selectedId === lead.id ? 'border-slate-700 bg-white shadow-sm' : 'border-slate-200 bg-transparent hover:bg-white'}`}>
              <span className="text-[10px] font-semibold tracking-widest text-slate-500">{lead.id} · {lead.status}</span>
              <span className="mt-2 block text-sm font-semibold">{lead.company}</span>
              <span className="mt-1 block text-xs text-slate-500">{lead.interest}</span>
            </button>)}
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
          <div className="mb-7 border-b border-slate-200 pb-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">Enquiry details / {draft.id}</p>
            <h2 className="font-serif text-3xl">Buyer information</h2>
          </div>
          <form onSubmit={save} className="grid gap-5 sm:grid-cols-2">
            {([
              ['name', 'Contact name', 'text'], ['company', 'Company', 'text'],
              ['email', 'Work email', 'email'], ['market', 'Country / market', 'text'],
            ] as const).map(([field, label, type]) => <label key={field} className="grid gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">{label}<input required type={type} value={draft[field]} onChange={(e) => edit(field, e.target.value)} className={control}/></label>)}
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">Interest<select value={draft.interest} onChange={(e) => edit('interest', e.target.value)} className={control}>{interestOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">Status<select value={draft.status} onChange={(e) => edit('status', e.target.value)} className={control}>{statusOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">Project stage<input value={draft.stage} onChange={(e) => edit('stage', e.target.value)} className={control}/></label>
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">Source page<input value={draft.source} onChange={(e) => edit('source', e.target.value)} className={control}/></label>
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 sm:col-span-2">Project / requirement<textarea rows={5} value={draft.requirement} onChange={(e) => edit('requirement', e.target.value)} className={control}/></label>
            <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 pt-5 sm:col-span-2">
              <button type="submit" className="rounded-lg bg-slate-900 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-slate-700">Save sample edits</button>
              <p role="status" aria-live="polite" className="text-xs leading-5 text-slate-600">{notice || 'Demo-only form: no data leaves this browser tab.'}</p>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}
