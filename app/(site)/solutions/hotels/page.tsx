import type { Metadata } from "next"
import Link from "next/link"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

const title = "Hotel Coffee Partnership Cambodia | Pour-Over Trial & Staff Training | OCC"
const description =
  "OCC hotel partnerships combine an on-site Cambodian coffee pour-over pilot, a choice of ready-roasted or custom-profile coffee, staff training, quality follow-up and guest-experience support."

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "hotel coffee partnership Cambodia, hotel coffee program Cambodia, hotel coffee supplier Cambodia, Cambodian coffee for hotels, hotel coffee tasting Cambodia, hotel coffee staff training, hotel breakfast coffee program",
  alternates: pageAlternates("/solutions/hotels"),
  openGraph: {
    title,
    description,
    url: `${siteUrl}/solutions/hotels`,
    type: "website",
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "OCC Hotel Coffee Partnership",
  url: `${siteUrl}/solutions/hotels`,
  description,
  provider: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
    url: siteUrl,
  },
  areaServed: {
    "@type": "Country",
    name: "Cambodia",
  },
  serviceType: "Hotel coffee partnership, pour-over pilot, staff training and hospitality coffee program",
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteUrl}/solutions` },
    { "@type": "ListItem", position: 3, name: "Hotel Coffee Partnership", item: `${siteUrl}/solutions/hotels` },
  ],
}

export default function HotelCoffeeProgramPage() {
  const sections = [
    {
      title: "Hotel Partnership Is a Service Program",
      content: (
        <>
          <p>
            OCC Hotel Partnership is a hospitality collaboration program, not a third coffee product. The hotel can choose an
            OCC-developed roasted coffee through <Link href="/solutions/wholesale">Wholesale</Link>, or work with OCC on a
            made-for-you flavor and roast direction through the <Link href="/solutions/roasting-program">Roasting Program</Link>.
          </p>
          <p className="mt-5">
            OCC then adds the service layer around that coffee: pilot tasting, on-site pour-over activation, staff training,
            quality follow-up, origin storytelling and a guest-facing path that can convert the experience into ongoing coffee demand.
          </p>
        </>
      ),
    },
    {
      title: "Start With a Real Hotel Pilot",
      content: (
        <>
          <p>
            A hotel can begin with a limited breakfast or hospitality pilot before committing to a wider rollout. OCC can support
            an on-site pour-over session so the property can observe guest response, service flow and cup quality in the actual hotel environment.
          </p>
          <p className="mt-5">
            The current pilot model can begin with a limited 1 kg evaluation allocation; additional coffee moves into paid trial
            or regular B2B purchasing based on the agreed requirement.
          </p>
        </>
      ),
    },
    {
      title: "Coffee Choice: Ready-to-Sell or Custom",
      content: (
        <>
          <p>
            Hotels that want a faster implementation can select OCC&apos;s existing roasted coffee supply. Properties that want
            a more distinctive result can develop a custom profile around breakfast service, espresso, milk drinks, brewing equipment,
            guest mix or the property&apos;s own brand direction.
          </p>
          <p className="mt-5">
            Both paths remain Cambodia-origin coffee. The difference is whether the hotel adopts an existing OCC product or develops
            a dedicated coffee direction with OCC.
          </p>
        </>
      ),
    },
    {
      title: "Staff Training & Quality Follow-Up",
      content: (
        <>
          <p>
            Hotel cooperation includes an initial training and support phase so the coffee can be reproduced consistently by the
            property team. Training can cover recipe standards, equipment use, hygiene, pour-over execution, peak breakfast workflow,
            guest introduction and quality checks.
          </p>
          <p className="mt-5">
            The current program can support a staged training period of up to three months after formal adoption, with scope and
            frequency confirmed in the cooperation terms. The objective is to transfer the program to hotel staff, not create permanent OCC staffing.
          </p>
        </>
      ),
    },
    {
      title: "Turn Coffee Into a Guest Experience",
      content: (
        <>
          <p>
            The strongest hotel use case is not only replacing coffee beans. OCC can connect the coffee to Cambodia through origin
            information, Fine Robusta education, tasting moments, selected display materials and QR journeys that lead guests to
            learn more, reserve a coffee experience or continue to a relevant retail path.
          </p>
          <p className="mt-5">
            The commercial goal is simple: the guest experiences Cambodian coffee inside the hotel, while the hotel gains a more
            distinctive local F&amp;B story and OCC gains a measurable path from tasting to repeat B2B supply.
          </p>
        </>
      ),
    },
    {
      title: "Send a Hotel Partnership Enquiry",
      content: (
        <>
          <p>
            If you manage a hotel, resort, restaurant or hospitality property in Cambodia, send OCC your property name, current
            coffee setup, brewing equipment, approximate monthly volume, intended service area and whether you prefer an existing
            roasted coffee or a custom profile.
          </p>
          <p className="mt-5">
            <Link href="/contact#enquiry">Start the formal hotel partnership enquiry →</Link>
          </p>
        </>
      ),
    },
  ]

  const faqs = [
    {
      q: "Is Hotel Partnership different from Wholesale and Custom Roasting?",
      a: <>Yes. Wholesale and Custom Roasting are coffee supply paths. Hotel Partnership is the service and collaboration layer built around the coffee selected by the property.</>,
    },
    {
      q: "Can our hotel use OCC's existing roasted coffee?",
      a: <>Yes. Hotels can use an existing OCC roasted coffee through the Wholesale path and then add the Hotel Partnership program around service, training and guest experience.</>,
    },
    {
      q: "Can OCC create a custom coffee for our hotel?",
      a: <>Yes. OCC can develop a custom flavor and roast direction around the hotel&apos;s menu, equipment, guest profile and target cup experience, then support implementation through the Hotel Partnership program.</>,
    },
    {
      q: "Can OCC run a pour-over trial at the hotel before we commit?",
      a: <>Yes. A limited pilot can be used to test guest response, workflow and cup quality in the actual hotel environment before a broader paid rollout.</>,
    },
    {
      q: "Does OCC provide hotel staff training?",
      a: <>Yes. Initial adoption can include staged staff training and quality follow-up covering recipes, brewing execution, workflow and guest-facing coffee presentation, with the exact scope confirmed in the cooperation terms.</>,
    },
  ]

  const relatedServices = [
    {
      title: "Wholesale",
      href: "/solutions/wholesale",
      desc: "Ready-to-sell Cambodia-origin coffee for commercial supply.",
    },
    {
      title: "Custom Roasting",
      href: "/solutions/roasting-program",
      desc: "Made-for-you roast profile development around a defined application.",
    },
    {
      title: "Brand & Gifting",
      href: "/brand-gifting",
      desc: "Cambodian coffee gifting and selected hotel retail concepts with ARUNERA.",
    },
    {
      title: "Distribution",
      href: "/distribution",
      desc: "International market partnerships for established distribution channels.",
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="03"
        title="HOTEL COFFEE PARTNERSHIPS"
        subtitle="A hotel collaboration program built around a live pour-over pilot, your choice of OCC coffee supply, complimentary staff training, and guest-experience support."
        sections={sections}
        factsTitle="Hotel Partnership"
        facts={[
          "On-site pour-over pilot",
          "Ready-roasted or custom coffee choice",
          "Complimentary staff training",
          "Up to three months of quality support",
          "Guest-experience and QR activation",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Request a hotel coffee pilot"
      />
    </>
  )
}
