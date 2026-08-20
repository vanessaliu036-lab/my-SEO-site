"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

const sections = [
  "Dashboard",
  "Orders",
  "Inventory",
  "Materials / Procurement",
  "B2B Overview",
  "B2B Accounts",
  "B2B Contacts",
  "B2B Quotes",
  "B2B Orders",
  "Invoices",
  "Recurring Orders",
  "Shipments",
  "Reports",
  "Settings",
]

const metrics = [
  ["TODAY ORDERS", "12", "Retail + B2B"],
  ["B2B REVENUE", "$8.4k", "This month"],
  ["LOW STOCK", "4", "Need procurement"],
  ["ACTIVE B2B", "18", "Company accounts"],
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
    <span className="inline-flex items-center gap-2 rounded-full bg-[#f4f5f6] px-2.5 py-1.5 text-[11px] text-[#48515f]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#355f49]" />
      {children}
    </span>
  )
}

export default function AdminDashboard() {
  const [active, setActive] = useState("Dashboard")
  const [query, setQuery] = useState("")

  const filteredOrders = useMemo(
    () => orders.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const title = active

  return (
    <div className="min-h-screen bg-white text-[#121826]">
      <Link
        href="/"
        className="fixed right-5 top-5 z-50 rounded-full border border-[#dfe3e8] bg-white px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] shadow-sm transition hover:bg-[#121826] hover:text-white"
      >
        FRONTEND ↗
      </Link>

      <div className="grid min-h-screen lg:grid-cols-[278px_1fr]">
        <aside className="border-r border-[#e8eaee] bg-white px-6 py-8">
          <div className="mb-10">
            <div className="text-[28px] font-extrabold tracking-[-0.04em]">OCC</div>
            <div className="mt-2 text-[10px] tracking-[0.2em] text-[#8d95a1]">ORIGIN COFFEE CAMBODIA</div>
          </div>

          <div className="mb-6 text-[10px] tracking-[0.2em] text-[#a7adb7]">ADMIN SYSTEM</div>
          <nav className="space-y-1">
            {sections.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`flex w-full items-center justify-between py-2 text-left text-[13px] transition ${
                  active === item ? "font-semibold text-[#121826]" : "text-[#657080] hover:text-[#121826]"
                }`}
              >
                <span>{item}</span>
                {active === item && <span className="h-1.5 w-1.5 rounded-full bg-[#121826]" />}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 px-5 py-8 md:px-8 lg:px-10">
          <div className="mb-8 flex items-start justify-between gap-5 pr-28">
            <div>
              <div className="mb-2 text-[10px] tracking-[0.2em] text-[#9ca3af]">ADMIN / OCC OPERATIONS</div>
              <h1 className="font-serif text-4xl font-normal tracking-[-0.03em]">{title}</h1>
              <p className="mt-2 text-sm text-[#7d8592]">
                Orders, inventory, procurement and multi-contact wholesale B2B management.
              </p>
            </div>
            <button className="hidden rounded-xl bg-[#121826] px-4 py-2.5 text-xs font-semibold text-white md:block">+ New</button>
          </div>

          {active === "Dashboard" && (
            <>
              <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map(([label, value, meta]) => (
                  <div key={label} className="rounded-2xl border border-[#e8eaee] p-5">
                    <div className="text-[10px] tracking-[0.12em] text-[#9299a5]">{label}</div>
                    <div className="mt-3 font-serif text-3xl">{value}</div>
                    <div className="mt-2 text-[11px] text-[#a0a7b1]">{meta}</div>
                  </div>
                ))}
              </section>

              <section className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
                <div className="rounded-2xl border border-[#e8eaee] p-5">
                  <h2 className="font-serif text-2xl">Today’s priorities</h2>
                  <div className="mt-4 divide-y divide-[#eef0f2]">
                    {[
                      ["River Hotel Group", "Invoice due in 2 days", "Follow-up"],
                      ["Mekong Roasters", "20kg production order", "Production"],
                      ["SOVANN 200g", "Below reorder level", "Low stock"],
                    ].map(([a, b, c]) => (
                      <div key={a} className="flex items-center justify-between gap-4 py-4">
                        <div><div className="text-sm font-semibold">{a}</div><div className="mt-1 text-xs text-[#979eaa]">{b}</div></div>
                        <Status>{c}</Status>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-[#e8eaee] p-5">
                  <h2 className="font-serif text-2xl">B2B pipeline</h2>
                  <div className="mt-4 divide-y divide-[#eef0f2] text-sm">
                    {[['New leads','6'],['Quotes open','9'],['Confirmed orders','7'],['Recurring contracts','7']].map(([k,v]) => (
                      <div key={k} className="flex justify-between py-3"><span className="text-[#8f97a3]">{k}</span><strong>{v}</strong></div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {active === "Orders" && (
            <section>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2 text-xs">
                  {['All','Paid','Processing','Shipped','Cancelled'].map((x,i)=><span key={x} className={`rounded-full border px-3 py-2 ${i===0?'border-[#121826] bg-[#121826] text-white':'border-[#e4e7eb]'}`}>{x}</span>)}
                </div>
                <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search order, customer, product…" className="min-w-[280px] rounded-full border border-[#e4e7eb] px-4 py-2.5 text-sm outline-none" />
              </div>
              <Table headers={['Order','Customer','Channel','Items','Status','Total']} rows={filteredOrders} statusCol={4} />
            </section>
          )}

          {active === "Inventory" && <SimplePanel title="Stock ledger" headers={['SKU','Item','On Hand','Reserved B2B','Available','Status']} rows={[["SOV-200","SOVANN 200g","42","14","28","Low"],["PRE-200","PREK 200g","76","12","64","Healthy"],["GR-20K","Green Robusta 20kg","6","4","2","Reorder"]]} statusCol={5} />}

          {active === "Materials / Procurement" && (
            <>
              <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[["MATERIAL TYPES","14"],["ACTIVE SUPPLIERS","9"],["OPEN PO VALUE","$3.8k"],["LOW STOCK","4"]].map(([k,v])=><div key={k} className="rounded-2xl border border-[#e8eaee] p-5"><div className="text-[10px] tracking-[.12em] text-[#9299a5]">{k}</div><div className="mt-3 font-serif text-3xl">{v}</div></div>)}
              </div>
              <SimplePanel title="Materials & purchase cost" headers={['Material','Category','Supplier / Source','Origin','MOQ','Unit Cost','Landed Cost','Stock']} rows={materials} />
            </>
          )}

          {active === "B2B Accounts" && <SimplePanel title="Company accounts" headers={['Company','Type','Contacts','Locations','Pricing Tier','Terms','Monthly Volume','Status']} rows={accounts} statusCol={7} />}
          {active === "B2B Overview" && <SimplePanel title="Accounts needing attention" headers={['Account','Reason','Primary Contact','Open Value','Next Action']} rows={[["River Hotel Group","Invoice due","Sophea Chan","$1,020","Follow up 20 Aug"],["Mekong Roasters","Production order","Vichea R.","$760","Confirm roast date"],["Lotus Café","Recurring renewal","Dalin S.","$328/mo","Renew terms"]]} />}
          {active === "B2B Contacts" && <SimplePanel title="Multi-contact customer management" headers={['Contact','Company','Role','Email','Phone','Primary','Last Contact']} rows={[["Sophea Chan","River Hotel Group","Purchasing Manager","sophea@riverhotel.com","+855 12 555 210","Yes","18 Aug"],["Dara Sok","River Hotel Group","Finance","finance@riverhotel.com","+855 12 555 222","No","15 Aug"],["Vichea R.","Mekong Roasters","Owner","vichea@mekongroasters.com","+855 77 881 120","Yes","17 Aug"]]} />}
          {active === "B2B Quotes" && <SimplePanel title="Quotes" headers={['Quote','Account','Contact','Products','Value','Valid Until','Status']} rows={[["Q-260818-09","River Hotel Group","Sophea Chan","House Blend 30kg/mo","$1,020/mo","25 Aug","Sent"],["Q-260817-06","Maison Café","Owner","PREK 12kg","$492","24 Aug","Accepted"]]} statusCol={6} />}
          {active === "B2B Orders" && <SimplePanel title="Wholesale orders" headers={['B2B Order','Account','Contact','Delivery Location','Product','Stage','Invoice','Value']} rows={[["#B2B-240818-02","Brew Lab Phnom Penh","Primary Buyer","BKK1 Branch","SOVANN / ANGKAR · 10kg","Confirmed","Paid","$412"],["#B2B-240817-05","Mekong Roasters","Vichea R.","Main Roastery","Fine Robusta · 20kg","Production","50% deposit","$760"]]} statusCol={5} />}
          {active === "Invoices" && <SimplePanel title="Invoices & payments" headers={['Invoice','Account','Billing Contact','Order','Terms','Due Date','Amount','Status']} rows={[["INV-260818-12","River Hotel Group","Dara Sok","#B2B-240816-03","Net 30","20 Aug","$1,020","Due"],["INV-260817-08","Mekong Roasters","Vichea R.","#B2B-240817-05","50% deposit","17 Aug","$380","Deposit Paid"]]} statusCol={7} />}
          {active === "Recurring Orders" && <SimplePanel title="Recurring supply" headers={['Account','Location','Products','Frequency','Qty','Custom Price','Next Order','Status']} rows={[["River Hotel Group","3 locations","House Blend","Monthly","30kg","$34/kg","1 Sep","Active"],["Lotus Café","4 locations","PREK","Every 2 weeks","8kg","$41/kg","22 Aug","Active"]]} statusCol={7} />}
          {active === "Shipments" && <SimplePanel title="Fulfillment" headers={['Shipment','Order','Account / Customer','Location','Courier','Status']} rows={[["SHP-1178","#B2B-240815-08","Lotus Café","Central Warehouse","OCC Van","Ready"],["SHP-1182","#OCC-240817-09","Dara Chea","Phnom Penh","Grab Express","In transit"]]} statusCol={5} />}
          {active === "Reports" && <div className="grid gap-4 md:grid-cols-2"><InfoCard title="Revenue mix" rows={[["Wholesale B2B","61%"],["Retail Website","31%"],["Social / Direct","8%"]]} /><InfoCard title="Top accounts" rows={[["River Hotel Group","$3,840"],["Mekong Roasters","$2,420"],["Brew Lab Phnom Penh","$2,060"]]} /></div>}
          {active === "Settings" && <div className="grid gap-4 md:grid-cols-2"><InfoCard title="Wholesale defaults" rows={[["Default MOQ","5 kg"],["Default terms","Prepaid / Net 30"],["Credit approval","Required"],["Recurring order creation","Automatic draft"]]} /><InfoCard title="Pricing tiers" rows={[["Wholesale A","10kg+"],["Wholesale B","5kg+"],["Hospitality","Contract"],["Green Bean","20kg+"]]} /></div>}
        </main>
      </div>
    </div>
  )
}

function Table({ headers, rows, statusCol = -1 }: { headers: string[]; rows: string[][]; statusCol?: number }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#e8eaee]">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm">
        <thead><tr>{headers.map((h)=><th key={h} className="border-b border-[#e8eaee] px-4 py-4 text-[10px] font-semibold uppercase tracking-[.12em] text-[#a2a8b2]">{h}</th>)}</tr></thead>
        <tbody>{rows.map((row,i)=><tr key={i} className="hover:bg-[#fafafa]">{row.map((cell,j)=><td key={j} className={`border-b border-[#f0f1f3] px-4 py-4 ${j===0?'font-semibold':''}`}>{j===statusCol?<Status>{cell}</Status>:cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function SimplePanel({ title, headers, rows, statusCol = -1 }: { title: string; headers: string[]; rows: string[][]; statusCol?: number }) {
  return <section><h2 className="mb-4 font-serif text-2xl">{title}</h2><Table headers={headers} rows={rows} statusCol={statusCol} /></section>
}

function InfoCard({ title, rows }: { title: string; rows: string[][] }) {
  return <div className="rounded-2xl border border-[#e8eaee] p-5"><h2 className="font-serif text-2xl">{title}</h2><div className="mt-4 divide-y divide-[#eef0f2]">{rows.map(([k,v])=><div key={k} className="flex justify-between py-3 text-sm"><span className="text-[#8f97a3]">{k}</span><strong>{v}</strong></div>)}</div></div>
}
