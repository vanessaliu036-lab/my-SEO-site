"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

type OrderInboxItem = {
  id: string
  title: string
  externalId: string
  source: string
  customer: string
  company: string
  email: string
  country: string
  type: string
  items: string
  amount: number
  currency: string
  payment: string
  priority: string
  readStatus: string
  inboxStatus: string
  formalOrderId: string
  receivedAt: string
  sourceUrl: string
  notes: string
}

type ContactLead = {
  id: string
  title: string
  name: string
  company: string
  email: string
  phone: string
  jobTitle: string
  country: string
  interest: string
  message: string
  stage: string
  source: string
  status: string
  createdAt: string
  priority: string
  readStatus: string
  conversionStatus: string
  landingPage: string
  lastTouchPage: string
  sourceMedium: string
  utmCampaign: string
  kpiExclude: boolean
  accountLinks: string[]
  contactLinks: string[]
  quoteLinks: string[]
}

type ActionFn = (formData: FormData) => Promise<void>

const sections = [
  "Dashboard",
  "Order Inbox",
  "Contact Inquiries",
  "Orders",
  "Inventory",
  "Materials / Procurement",
  "B2B Overview",
  "B2B Accounts",
  "B2B Contacts",
  "B2B Quotes",
  "Invoices",
  "Recurring Orders",
  "Shipments",
  "Reports",
  "Settings",
]

const orders = [
  ["#OCC-240818-01", "Sokha Lim", "Website", "SOVANN ×2 / PREK ×1", "Paid", "$68"],
  ["#B2B-240818-02", "Brew Lab Phnom Penh", "Wholesale", "SOVANN / ANGKAR · 10kg", "Processing", "$412"],
  ["#OCC-240817-09", "Dara Chea", "Website", "PREK ×2", "Shipped", "$47"],
]

const materials = [
  ["200g Coffee Pouch", "Packaging", "Phnom Pack Co.", "Cambodia", "500 pcs", "$0.38", "$0.42", "168 pcs"],
  ["Gold Foil Label", "Labels", "Print House KH", "Cambodia", "1,000 pcs", "$0.07", "$0.075", "640 pcs"],
  ["Rigid Gift Box", "Gift Box", "Shenzhen Premium Box", "China", "300 pcs", "$1.82", "$2.17", "54 pcs"],
]

const accounts = [
  ["River Hotel Group", "Hotel Group", "4", "3", "Hospitality", "Net 30", "30 kg", "Active"],
  ["Brew Lab Phnom Penh", "Café", "3", "2", "Wholesale A", "Prepaid", "18 kg", "Active"],
  ["Mekong Roasters", "Roaster", "2", "1", "Green Bean", "50% deposit", "40 kg", "Review"],
]

function Status({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#f7f4f0] px-2.5 py-1.5 text-[11px] text-[#48515f]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#984650]" />
      {children}
    </span>
  )
}

function timeLabel(value: string) {
  if (!value) return "Time unavailable"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Phnom_Penh" }).format(date)
}

function ActionButton({ action, id, type, value, children }: { action: ActionFn; id: string; type: string; value?: string; children: React.ReactNode }) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="action" value={type} />
      {value && <input type="hidden" name="value" value={value} />}
      <button className="rounded-full border border-[#dfe3e8] bg-white px-3 py-2 text-[10px] font-semibold text-[#4f5967] transition hover:border-[#292424] hover:text-[#292424]">
        {children}
      </button>
    </form>
  )
}

export default function AdminDashboard({
  initialOrders,
  initialContacts,
  orderInboxError,
  contactInboxError,
  orderInboxAction,
  contactInboxAction,
}: {
  initialOrders: OrderInboxItem[]
  initialContacts: ContactLead[]
  orderInboxError: boolean
  contactInboxError: boolean
  orderInboxAction: ActionFn
  contactInboxAction: ActionFn
}) {
  const [active, setActive] = useState("Dashboard")
  const [query, setQuery] = useState("")

  useEffect(() => {
    const view = new URLSearchParams(window.location.search).get("view")
    if (view === "order-inbox") setActive("Order Inbox")
    if (view === "contact-inquiries") setActive("Contact Inquiries")
  }, [])

  const filteredOrders = useMemo(
    () => orders.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const unreadOrders = initialOrders.filter((item) => item.readStatus === "Unread").length
  const unreadContacts = initialContacts.filter((item) => item.readStatus === "Unread").length
  const kpiEligibleContacts = initialContacts.filter((item) => !item.kpiExclude).length
  const urgent = [
    ...initialOrders.filter((item) => item.priority === "Urgent"),
    ...initialContacts.filter((item) => item.priority === "Urgent"),
  ].length

  const menuCount: Record<string, number | undefined> = {
    "Order Inbox": unreadOrders,
    "Contact Inquiries": unreadContacts,
  }

  return (
    <div className="min-h-screen bg-[#f2ede7] text-[#292424]">
      <Link href="/" className="fixed right-5 top-[60px] z-50 rounded-full border border-[#d8cec5] bg-[#f7f4f0] px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] shadow-sm transition hover:bg-[#292424] hover:text-white">
        FRONTEND ↗
      </Link>

      <div className="grid min-h-screen lg:grid-cols-[278px_1fr]">
        <aside className="border-r border-[#d8cec5] bg-[#f2ede7] px-6 py-8">
          <div className="mb-10">
            <div className="font-serif text-[30px] tracking-[-0.04em]">OCC<span className="text-[#7d2f3a]">.</span></div>
            <div className="mt-2 text-[10px] tracking-[0.2em] text-[#8d95a1]">ORIGIN COFFEE CAMBODIA</div>
          </div>
          <div className="mb-6 text-[10px] tracking-[0.2em] text-[#a7adb7]">ADMIN SYSTEM</div>
          <nav className="space-y-1">
            {sections.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={"flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13px] transition " +
                  (active === item ? "bg-[#292424] font-semibold text-white" : "text-[#657080] hover:bg-[#e9e1da] hover:text-[#292424]")}
              >
                <span>{item}</span>
                {menuCount[item] !== undefined && menuCount[item]! > 0 ? (
                  <span className={"min-w-6 rounded-full px-2 py-1 text-center text-[10px] " + (active === item ? "bg-white/15 text-white" : "bg-[#e9e1da] text-[#67707d]")}>
                    {menuCount[item]}
                  </span>
                ) : active === item ? <span className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 px-5 py-8 md:px-8 lg:px-10">
          <div className="mb-8 pr-28">
            <div className="mb-2 text-[10px] tracking-[0.2em] text-[#9ca3af]">ADMIN / OCC OPERATIONS</div>
            <h1 className="font-serif text-4xl font-normal tracking-[-0.03em]">{active}</h1>
            <p className="mt-2 text-sm text-[#7d8592]">
              {active === "Dashboard" && "New order enquiries, contact leads and notifications requiring action."}
              {active === "Order Inbox" && "Unified intake for order and order-enquiry records from connected sales channels."}
              {active === "Contact Inquiries" && "Live OCC Contact submissions with qualification and B2B conversion actions."}
              {!["Dashboard", "Order Inbox", "Contact Inquiries"].includes(active) && "Orders, inventory, procurement and multi-contact wholesale B2B management."}
            </p>
          </div>

          {active === "Dashboard" && (
            <>
              <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["NEW ORDER INBOX", String(unreadOrders), "Unread order / order enquiries"],
                  ["NEW CONTACT INQUIRIES", String(unreadContacts), "Unread OCC Contact submissions"],
                  ["URGENT", String(urgent), "Items flagged urgent"],
                  ["OPEN ACTIONS", String(unreadOrders + unreadContacts), "Requires staff review"],
                ].map(([label, value, meta]) => (
                  <button key={label} onClick={() => setActive(label.includes("ORDER") ? "Order Inbox" : label.includes("CONTACT") ? "Contact Inquiries" : "Dashboard")} className="rounded-2xl border border-[#d8cec5] bg-[#f7f4f0] p-5 text-left">
                    <div className="text-[10px] tracking-[0.12em] text-[#9299a5]">{label}</div>
                    <div className="mt-3 font-serif text-3xl">{value}</div>
                    <div className="mt-2 text-[11px] text-[#a0a7b1]">{meta}</div>
                  </button>
                ))}
              </section>
              <section className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
                <div className="rounded-2xl border border-[#d8cec5] bg-[#f7f4f0] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-serif text-2xl">Newest business intake</h2>
                    <button onClick={() => setActive("Order Inbox")} className="text-xs underline underline-offset-4">Open inbox</button>
                  </div>
                  <div className="mt-4 divide-y divide-[#e9e4db]">
                    {initialOrders.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-4 py-4">
                        <div><div className="text-sm font-semibold">{item.company || item.customer}</div><div className="mt-1 text-xs text-[#979eaa]">{item.source} · {item.items}</div></div>
                        <Status>{item.priority}</Status>
                      </div>
                    ))}
                    {!initialOrders.length && <div className="py-5 text-sm text-[#8d95a1]">No order inbox records.</div>}
                  </div>
                </div>
                <div className="rounded-2xl border border-[#d8cec5] bg-[#f7f4f0] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-serif text-2xl">New contact leads</h2>
                    <button onClick={() => setActive("Contact Inquiries")} className="text-xs underline underline-offset-4">Open contacts</button>
                  </div>
                  <div className="mt-4 divide-y divide-[#e9e4db]">
                    {initialContacts.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between gap-4 py-4">
                        <div><div className="text-sm font-semibold">{lead.company || lead.name}</div><div className="mt-1 text-xs text-[#979eaa]">{lead.interest} · {lead.stage || "Stage unavailable"}</div></div>
                        <Status>{lead.priority}</Status>
                      </div>
                    ))}
                    {!initialContacts.length && <div className="py-5 text-sm text-[#8d95a1]">No contact enquiries.</div>}
                  </div>
                </div>
              </section>
            </>
          )}

          {active === "Order Inbox" && (
            <section>
              {orderInboxError && <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-900">Order Inbox could not load from Airtable.</div>}
              <div className="mb-4 flex flex-wrap gap-2 text-xs">
                <Status>{unreadOrders + " unread"}</Status>
                <Status>{initialOrders.length + " total"}</Status>
              </div>
              <div className="grid gap-4">
                {initialOrders.map((item) => (
                  <article key={item.id} className={"rounded-2xl border bg-[#f7f4f0] p-5 " + (item.readStatus === "Unread" ? "border-[#7d2f3a]/35" : "border-[#d8cec5]")}>
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e9e4db] pb-4">
                      <div>
                        <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[.12em] text-[#8d95a1]">
                          <span>{item.source}</span><span>·</span><span>{item.type}</span><span>·</span><span>{item.readStatus}</span>
                        </div>
                        <h2 className="mt-2 font-serif text-2xl">{item.company || item.customer}</h2>
                        <div className="mt-1 text-xs text-[#737c89]">{item.externalId || item.title} · {item.email || "No email"}</div>
                      </div>
                      <div className="text-right text-xs text-[#7d8592]"><strong>{item.priority}</strong><br />{timeLabel(item.receivedAt)}</div>
                    </div>
                    <div className="grid gap-4 py-4 text-sm md:grid-cols-3">
                      <div><div className="text-[10px] uppercase tracking-wider text-[#9ba1aa]">Request</div><div className="mt-1">{item.items || "No item detail"}</div></div>
                      <div><div className="text-[10px] uppercase tracking-wider text-[#9ba1aa]">Payment</div><div className="mt-1">{item.payment}{item.amount ? " · " + item.currency + " " + item.amount.toFixed(2) : ""}</div></div>
                      <div><div className="text-[10px] uppercase tracking-wider text-[#9ba1aa]">Workflow</div><div className="mt-1">{item.inboxStatus}{item.formalOrderId ? " · " + item.formalOrderId : ""}</div></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <ActionButton action={orderInboxAction} id={item.id} type={item.readStatus === "Unread" ? "read" : "unread"}>{item.readStatus === "Unread" ? "Mark read" : "Mark unread"}</ActionButton>
                      <ActionButton action={orderInboxAction} id={item.id} type="priority" value="Urgent">Urgent</ActionButton>
                      <ActionButton action={orderInboxAction} id={item.id} type="priority" value="High">High</ActionButton>
                      <ActionButton action={orderInboxAction} id={item.id} type="reviewing">Reviewing</ActionButton>
                      <ActionButton action={orderInboxAction} id={item.id} type="converted">Mark converted</ActionButton>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {active === "Contact Inquiries" && (
            <section>
              {contactInboxError && <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-900">Contact Inquiries could not load from Airtable.</div>}
              <div className="mb-4 flex flex-wrap gap-2 text-xs">
                <Status>{unreadContacts + " unread"}</Status>
                <Status>{initialContacts.length + " total"}</Status>
                <Status>{kpiEligibleContacts + " KPI eligible"}</Status>
              </div>
              <div className="grid gap-4">
                {initialContacts.map((lead) => (
                  <article key={lead.id} className={"rounded-2xl border bg-[#f7f4f0] p-5 " + (lead.readStatus === "Unread" ? "border-[#7d2f3a]/35" : "border-[#d8cec5]")}>
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e9e4db] pb-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-[.12em] text-[#8d95a1]">
                          {lead.status} · {lead.readStatus} · {lead.priority}
                          {lead.kpiExclude ? " · KPI EXCLUDED" : ""}
                        </div>
                        <h2 className="mt-2 font-serif text-2xl">{lead.company || lead.name}</h2>
                        <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-sm">
                          <span>{lead.name}</span>
                          {lead.jobTitle ? <><span>·</span><span>{lead.jobTitle}</span></> : null}
                          <span>·</span>
                          <a className="underline underline-offset-4" href={"tel:" + lead.phone}>{lead.phone || "No phone"}</a>
                          <span>·</span>
                          <a className="underline underline-offset-4" href={"mailto:" + lead.email}>{lead.email}</a>
                        </div>
                      </div>
                      <div className="text-right text-xs leading-5 text-[#7d8592]">{timeLabel(lead.createdAt)}<br />{lead.source}</div>
                    </div>
                    <div className="grid gap-4 py-4 text-sm md:grid-cols-3">
                      <div><div className="text-[10px] uppercase tracking-wider text-[#9ba1aa]">Country / Market</div><div className="mt-1">{lead.country || "Not provided"}</div></div>
                      <div><div className="text-[10px] uppercase tracking-wider text-[#9ba1aa]">Intent</div><div className="mt-1">{lead.interest}</div></div>
                      <div><div className="text-[10px] uppercase tracking-wider text-[#9ba1aa]">Project Stage</div><div className="mt-1">{lead.stage || "Not provided"}</div></div>
                    </div>
                    <div className="mb-4 grid gap-3 rounded-xl border border-[#e5ded6] bg-white/55 p-4 text-xs md:grid-cols-2 xl:grid-cols-4">
                      <div><div className="text-[10px] uppercase tracking-wider text-[#9ba1aa]">Acquisition</div><div className="mt-1 break-all">{lead.sourceMedium || "(unknown)"}</div></div>
                      <div><div className="text-[10px] uppercase tracking-wider text-[#9ba1aa]">Landing Page</div><div className="mt-1 break-all">{lead.landingPage || "/contact"}</div></div>
                      <div><div className="text-[10px] uppercase tracking-wider text-[#9ba1aa]">Last Touch</div><div className="mt-1 break-all">{lead.lastTouchPage || "Direct to contact"}</div></div>
                      <div><div className="text-[10px] uppercase tracking-wider text-[#9ba1aa]">Campaign</div><div className="mt-1 break-all">{lead.utmCampaign || "None"}</div></div>
                    </div>
                    <div className="mb-4 rounded-xl bg-white/70 p-4 text-sm leading-6 text-[#5f6875]">{lead.message || "No project details provided."}</div>
                    <div className="mb-3 text-[10px] uppercase tracking-[.12em] text-[#8d95a1]">Conversion · {lead.conversionStatus}</div>
                    <div className="flex flex-wrap gap-2">
                      <ActionButton action={contactInboxAction} id={lead.id} type={lead.readStatus === "Unread" ? "read" : "unread"}>{lead.readStatus === "Unread" ? "Mark read" : "Mark unread"}</ActionButton>
                      <ActionButton action={contactInboxAction} id={lead.id} type="priority" value="Urgent">Urgent</ActionButton>
                      <ActionButton action={contactInboxAction} id={lead.id} type="priority" value="High">High</ActionButton>
                      <ActionButton action={contactInboxAction} id={lead.id} type="discussion">In discussion</ActionButton>
                      <ActionButton action={contactInboxAction} id={lead.id} type="account">{lead.accountLinks.length ? "Account created" : "Create B2B Account"}</ActionButton>
                      <ActionButton action={contactInboxAction} id={lead.id} type="contact">{lead.contactLinks.length ? "Contact created" : "Create B2B Contact"}</ActionButton>
                      <ActionButton action={contactInboxAction} id={lead.id} type="quote">{lead.quoteLinks.length ? "Quote created" : "Create Quote"}</ActionButton>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {active === "Orders" && (
            <section>
              <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
                <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search formal order…" className="min-w-[280px] rounded-full border border-[#d8cec5] bg-[#f7f4f0] px-4 py-2.5 text-sm outline-none" />
              </div>
              <Table headers={["Order","Customer","Channel","Items","Status","Total"]} rows={filteredOrders} statusCol={4} />
            </section>
          )}

          {active === "Inventory" && <SimplePanel title="Stock ledger" headers={["SKU","Item","On Hand","Reserved B2B","Available","Status"]} rows={[["SOV-200","SOVANN 200g","42","14","28","Low"],["PRE-200","PREK 200g","76","12","64","Healthy"],["GR-20K","Green Robusta 20kg","6","4","2","Reorder"]]} statusCol={5} />}
          {active === "Materials / Procurement" && <SimplePanel title="Materials & purchase cost" headers={["Material","Category","Supplier / Source","Origin","MOQ","Unit Cost","Landed Cost","Stock"]} rows={materials} />}
          {active === "B2B Accounts" && <SimplePanel title="Company accounts" headers={["Company","Type","Contacts","Locations","Pricing Tier","Terms","Monthly Volume","Status"]} rows={accounts} statusCol={7} />}
          {active === "B2B Overview" && <SimplePanel title="Accounts needing attention" headers={["Account","Reason","Primary Contact","Open Value","Next Action"]} rows={[["River Hotel Group","Invoice due","Sophea Chan","$1,020","Follow up"],["Mekong Roasters","Production order","Vichea R.","$760","Confirm roast date"]]} />}
          {active === "B2B Contacts" && <SimplePanel title="Multi-contact customer management" headers={["Contact","Company","Role","Email","Phone","Primary","Last Contact"]} rows={[["Sophea Chan","River Hotel Group","Purchasing Manager","sophea@riverhotel.com","+855 12 555 210","Yes","18 Aug"]]} />}
          {active === "B2B Quotes" && <SimplePanel title="Quotes" headers={["Quote","Account","Contact","Products","Value","Valid Until","Status"]} rows={[["Q-260818-09","River Hotel Group","Sophea Chan","House Blend 30kg/mo","$1,020/mo","25 Aug","Sent"]]} statusCol={6} />}
          {active === "Invoices" && <SimplePanel title="Invoices & payments" headers={["Invoice","Account","Billing Contact","Order","Terms","Due Date","Amount","Status"]} rows={[["INV-260818-12","River Hotel Group","Dara Sok","#B2B-240816-03","Net 30","20 Aug","$1,020","Due"]]} statusCol={7} />}
          {active === "Recurring Orders" && <SimplePanel title="Recurring supply" headers={["Account","Location","Products","Frequency","Qty","Custom Price","Next Order","Status"]} rows={[["River Hotel Group","3 locations","House Blend","Monthly","30kg","$34/kg","1 Sep","Active"]]} statusCol={7} />}
          {active === "Shipments" && <SimplePanel title="Fulfillment" headers={["Shipment","Order","Account / Customer","Location","Courier","Status"]} rows={[["SHP-1178","#B2B-240815-08","Lotus Café","Central Warehouse","OCC Van","Ready"]]} statusCol={5} />}
          {active === "Reports" && <InfoCard title="Revenue mix" rows={[["Wholesale B2B","61%"],["Retail Website","31%"],["Social / Direct","8%"]]} />}
          {active === "Settings" && <InfoCard title="Wholesale defaults" rows={[["Default MOQ","5 kg"],["Default terms","Prepaid / Net 30"],["Credit approval","Required"]]} />}
        </main>
      </div>
    </div>
  )
}

function Table({ headers, rows, statusCol = -1 }: { headers: string[]; rows: string[][]; statusCol?: number }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#d8cec5] bg-[#f7f4f0]">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm">
        <thead><tr>{headers.map((h)=><th key={h} className="border-b border-[#e4dfd6] px-4 py-4 text-[10px] font-semibold uppercase tracking-[.12em] text-[#a2a8b2]">{h}</th>)}</tr></thead>
        <tbody>{rows.map((row,i)=><tr key={i} className="hover:bg-white/50">{row.map((cell,j)=><td key={j} className={"border-b border-[#e9e1da] px-4 py-4 " + (j===0?"font-semibold":"")}>{j===statusCol?<Status>{cell}</Status>:cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function SimplePanel({ title, headers, rows, statusCol = -1 }: { title: string; headers: string[]; rows: string[][]; statusCol?: number }) {
  return <section><h2 className="mb-4 font-serif text-2xl">{title}</h2><Table headers={headers} rows={rows} statusCol={statusCol} /></section>
}

function InfoCard({ title, rows }: { title: string; rows: string[][] }) {
  return <div className="max-w-xl rounded-2xl border border-[#d8cec5] bg-[#f7f4f0] p-5"><h2 className="font-serif text-2xl">{title}</h2><div className="mt-4 divide-y divide-[#e9e1da]">{rows.map(([k,v])=><div key={k} className="flex justify-between py-3 text-sm"><span className="text-[#8f97a3]">{k}</span><strong>{v}</strong></div>)}</div></div>
}
