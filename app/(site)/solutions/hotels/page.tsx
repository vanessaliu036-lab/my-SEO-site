import type { Metadata } from "next"
import Link from "next/link"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

const title = "Hotel Coffee Program Cambodia | Hospitality Coffee Solutions | OCC"
const description =
  "Build a Cambodian coffee program for hotels across breakfast, restaurants, lounges, guest experiences and selected retail, with OCC origin, supply and roast expertise."

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "hotel coffee program Cambodia, Cambodian coffee for hotels, hospitality coffee Cambodia, hotel coffee solution Cambodia, Cambodian coffee guest experience, hotel breakfast coffee Cambodia",
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
  name: "OCC Hotel Coffee Program",
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
  serviceType: "Hotel and hospitality coffee program",
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteUrl}/solutions` },
    { "@type": "ListItem", position: 3, name: "Hotel Coffee Program", item: `${siteUrl}/solutions/hotels` },
  ],
}

export default function HotelCoffeeProgramPage() {
  const sections = [
    {
      title: "Coffee for the Guest Experience",
      content: (
        <>
          <p>
            A hotel coffee program can begin at breakfast, but it does not have to end there. Cambodian coffee can support
            breakfast service, restaurants, lounges, meetings, guest-facing tasting moments, selected room experiences and
            hotel retail when each application has a clear operational purpose.
          </p>
          <p className="mt-5">
            OCC helps define where coffee matters in the guest journey before recommending a supply or roast direction.
          </p>
        </>
      ),
    },
    {
      title: "Built Around Hotel Operations",
      content: (
        <>
          <p>
            The coffee has to work in the service environment where it will be used. Brewing equipment, daily volume, service
            speed, staff capability, milk-based drinks, holding time, consistency and target cost all shape the right program.
          </p>
          <p className="mt-5">
            The objective is a coffee program staff can execute consistently, not a concept that only works in a tasting room.
          </p>
        </>
      ),
    },
    {
      title: "Cambodia at the Center",
      content: (
        <>
          <p>
            For international guests, coffee can become one of the first everyday products through which Cambodia is experienced.
            OCC keeps the origin visible through credible information about Cambodian coffee, Fine Robusta, regions, processing
            and the evidence available for the coffee being served.
          </p>
          <p className="mt-5">
            Deeper origin education remains in the <Link href="/fine-robusta-cambodia">Fine Robusta Cambodia</Link> and{" "}
            <Link href="/origins">Origins</Link> sections so this page can stay focused on hospitality decisions.
          </p>
        </>
      ),
    },
    {
      title: "Supply, Roast and Format",
      content: (
        <>
          <p>
            Hotels that need an OCC-developed coffee for commercial supply should use the{" "}
            <Link href="/solutions/wholesale">Wholesale</Link> path. Hotels that need a profile developed around a specific
            breakfast, espresso, milk-drink or branded product target should use the{" "}
            <Link href="/solutions/roasting-program">Roasting Program</Link>.
          </p>
          <p className="mt-5">
            The Hotel Coffee Program connects those capabilities to the operational and guest-experience requirements of the property.
          </p>
        </>
      ),
    },
    {
      title: "Retail and Guest Take-Home",
      content: (
        <>
          <p>
            Selected hotels may also explore Cambodian coffee for guest gifting or retail. This can include a coffee product
            connected to the property, local-origin storytelling and a take-home format that extends the guest experience beyond
            the stay.
          </p>
          <p className="mt-5">
            Dedicated gifting and presentation work belongs to <Link href="/brand-gifting">Brand &amp; Gifting</Link>, while
            coffee quality, roast direction and supply remain within OCC.
          </p>
        </>
      ),
    },
  ]

  const faqs = [
    {
      q: "Can OCC supply coffee for hotel breakfast service?",
      a: <>Yes. The commercial supply path is handled through Wholesale, with the hotel program used to define the service context, coffee application and guest-experience requirements.</>,
    },
    {
      q: "Can a hotel develop its own roast profile?",
      a: <>Yes. When the property needs a specific cup, menu role or branded coffee direction, the Custom Roasting path is used to develop an evaluable roast profile around that requirement.</>,
    },
    {
      q: "Can Cambodian coffee be used as part of the guest experience?",
      a: <>Yes. Hotels can explore origin storytelling, selected tastings, guest-facing coffee moments and retail or gifting applications when they fit the property and can be operated consistently.</>,
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
        title="HOTEL COFFEE PROGRAM"
        subtitle="Cambodian coffee for hospitality, built around service reality, guest experience, and the right commercial supply path."
        sections={sections}
        factsTitle="Hospitality Program"
        facts={[
          "Breakfast and restaurant applications",
          "Guest-experience coffee moments",
          "Operational and brewing context",
          "Wholesale or custom-roast routing",
          "Selected retail and gifting pathways",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Discuss your hotel coffee program"
      />
    </>
  )
}
