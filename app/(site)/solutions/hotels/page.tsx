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
      title: "A Hotel Partnership, Not Just a Bean Order",
      content: (
        <>
          <p>
            The OCC Hotel Coffee Partnership is a hospitality collaboration program. The coffee itself can come from either of
            OCC&apos;s two supply paths — a <Link href="/solutions/wholesale">ready-to-supply roasted coffee</Link> or a{" "}
            <Link href="/solutions/roasting-program">custom-developed roast profile</Link> — but the hotel partnership adds the
            service layer around that coffee.
          </p>
          <p className="mt-5">
            That service layer is designed to help a hotel test the guest response first, train the team, introduce Cambodian
            coffee with confidence and then decide whether to move into an ongoing paid coffee program.
          </p>
        </>
      ),
    },
    {
      title: "Start With a Live Pour-Over Pilot",
      content: (
        <>
          <p>
            OCC can begin the conversation with an on-site pour-over trial at the hotel, typically around breakfast, restaurant
            or another guest-facing food-and-beverage setting. The purpose is practical: let the hotel team and guests experience
            the coffee in the real service environment before committing to a longer-term program.
          </p>
          <p className="mt-5">
            A limited first-kilogram evaluation can be used for the pilot. If the hotel chooses to continue, the second kilogram
            and subsequent supply move into a paid trial or regular commercial purchase.
          </p>
        </>
      ),
    },
    {
      title: "Choose the Coffee After the Experience",
      content: (
        <>
          <p>
            After the pilot, the hotel can choose the coffee model that fits the property. One option is an OCC-developed roasted
            coffee that can move directly into wholesale supply. The other is a custom flavor and roast direction built around the
            property&apos;s guests, menu, brewing equipment and brand positioning.
          </p>
          <p className="mt-5">
            This keeps the decision simple: the <strong>Hotel Partnership</strong> is the collaboration and service program;
            <strong> Wholesale</strong> and <strong>Custom Roasting</strong> are the two coffee supply models underneath it.
          </p>
        </>
      ),
    },
    {
      title: "Complimentary Staff Training",
      content: (
        <>
          <p>
            Formal hotel partners can receive complimentary staff training and quality follow-up as part of the rollout. The
            training covers the agreed brewing recipe, equipment use, service consistency, basic coffee presentation and how to
            explain the Cambodian origin to guests without turning breakfast service into a lecture.
          </p>
          <p className="mt-5">
            The current hotel framework allows staged training and quality support for up to three months, with the exact schedule
            agreed around the property&apos;s service needs and the coffee program being implemented.
          </p>
        </>
      ),
    },
    {
      title: "Build a Cambodian Coffee Guest Experience",
      content: (
        <>
          <p>
            The partnership can extend beyond the cup through origin storytelling, a premium display, a QR path to the coffee
            story or reservation flow, and selected take-home or retail opportunities. The objective is to make Cambodian coffee
            part of the stay rather than another anonymous breakfast beverage.
          </p>
          <p className="mt-5">
            Hotels that want retail gifting or a broader cultural presentation can connect the program with{" "}
            <Link href="/brand-gifting">Brand &amp; Gifting</Link> after the core hotel coffee partnership is defined.
          </p>
        </>
      ),
    },
    {
      title: "Move From Pilot to Paid Partnership",
      content: (
        <>
          <p>
            The commercial goal is a formal hotel enquiry and a measurable pilot. OCC reviews the property, intended service
            point, current coffee setup, approximate consumption, equipment and target timing, then proposes the most suitable
            pilot and coffee supply path.
          </p>
          <p className="mt-5">
            <Link href="/contact#enquiry">Start a Hotel Coffee Partnership enquiry</Link> and include the hotel name, current coffee
            setup, service area and preferred timing. OCC will route the enquiry into the appropriate pilot and supply discussion.
          </p>
        </>
      ),
    },
  ]

  const faqs = [
    {
      q: "How is the Hotel Coffee Partnership different from Wholesale?",
      a: <>Wholesale is the coffee supply path. The Hotel Coffee Partnership adds the on-site pilot, hospitality implementation, staff training, quality follow-up and guest-experience layer around the coffee.</>,
    },
    {
      q: "Does the hotel have to use an existing OCC coffee?",
      a: <>No. A hotel can choose an existing OCC roasted coffee or move into a custom flavor and roast profile after the pilot. The Hotel Partnership works with either supply model.</>,
    },
    {
      q: "Can OCC come to the hotel for a live coffee trial?",
      a: <>Yes. The program can begin with an on-site pour-over pilot so the hotel can evaluate the coffee, service flow and guest response in a real hospitality setting before deciding on ongoing supply.</>,
    },
    {
      q: "Is staff training included?",
      a: <>Yes. Formal hotel partners can receive complimentary staff training and staged quality follow-up as part of the rollout, with the current framework allowing support for up to three months.</>,
    },
    {
      q: "What happens after the pilot?",
      a: <>If the hotel decides to continue, OCC confirms whether the best route is ready-to-supply roasted coffee or a custom profile, then moves the account into paid supply, training and ongoing quality follow-up.</>,
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
