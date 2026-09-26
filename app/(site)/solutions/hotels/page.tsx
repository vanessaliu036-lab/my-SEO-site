import type { Metadata } from "next"
import Link from "next/link"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

const title = "Hotel Coffee Supplier Cambodia | Custom Hotel Coffee Program | OCC"
const description =
  "OCC supplies roasted Cambodian coffee beans to hotels and develops custom coffee profiles for breakfast, restaurants, lounges and branded hospitality programs in Cambodia."

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "hotel coffee supplier Cambodia, hotel coffee beans Cambodia, wholesale roasted coffee for hotels, custom hotel coffee Cambodia, hotel coffee program Cambodia, hospitality coffee supplier Cambodia, custom roast profile hotel",
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
  serviceType: "Hotel coffee supply and custom hospitality coffee program",
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
      title: "Two Ways to Work With OCC Now",
      content: (
        <>
          <p>
            OCC is ready to work with hotels now through two commercial paths: <strong>roasted coffee bean supply</strong> for
            properties that need a dependable Cambodia-origin coffee product, and <strong>custom coffee profile development</strong>
            for hotels that want a flavor direction built around their own guests, menu, equipment and service style.
          </p>
          <p className="mt-5">
            If you are reviewing suppliers, replacing an existing coffee, developing a hotel signature coffee or planning a new
            hospitality program, send the requirement through <Link href="/contact#enquiry">the OCC commercial enquiry form</Link>.
          </p>
        </>
      ),
    },
    {
      title: "Roasted Coffee Supply for Hotels",
      content: (
        <>
          <p>
            Hotels can source OCC-developed roasted Cambodian coffee for breakfast, restaurants, lounges, meetings and other
            food-and-beverage operations. We discuss the intended use, brewing equipment, expected volume, format and current
            coffee requirement before confirming the commercial supply direction.
          </p>
          <p className="mt-5">
            This is the hotel-facing application of OCC&apos;s <Link href="/solutions/wholesale">Wholesale Coffee Supply</Link>:
            a direct B2B path for properties that need roasted coffee ready for professional service.
          </p>
        </>
      ),
    },
    {
      title: "Custom Flavor & Roast Profile",
      content: (
        <>
          <p>
            A hotel does not have to use a generic roast profile. OCC can develop a coffee direction around the property&apos;s
            target taste, breakfast style, espresso program, milk-based drinks, guest mix, brewing method and brand positioning.
          </p>
          <p className="mt-5">
            The work connects directly to the <Link href="/solutions/roasting-program">Custom Roasting Program</Link>, with the
            hotel brief translated into a coffee profile that can be evaluated, refined and used as the commercial reference.
          </p>
        </>
      ),
    },
    {
      title: "Built for Real Hotel Operations",
      content: (
        <>
          <p>
            A hotel coffee program has to perform during service. Brewing equipment, daily volume, workflow, staff capability,
            milk-based beverage demand, holding time, consistency and target cost all matter when selecting the coffee or defining
            a custom profile.
          </p>
          <p className="mt-5">
            OCC uses those operating requirements to determine whether the best fit is an existing roasted coffee supply or a
            custom-developed hotel profile.
          </p>
        </>
      ),
    },
    {
      title: "Cambodian Coffee as Part of the Stay",
      content: (
        <>
          <p>
            Serving Cambodian coffee gives a hotel a practical way to connect an everyday guest experience with the country the
            guest is visiting. OCC keeps the coffee proposition grounded in Cambodia origin, Fine Robusta expertise and the
            evidence available for the coffee being supplied.
          </p>
          <p className="mt-5">
            Hotels that also want a take-home product, gifting format or branded retail concept can connect the coffee program
            with <Link href="/brand-gifting">Brand &amp; Gifting</Link> after the core coffee supply or custom profile is defined.
          </p>
        </>
      ),
    },
  ]

  const faqs = [
    {
      q: "Can OCC supply roasted coffee beans directly to hotels?",
      a: <>Yes. OCC can supply roasted Cambodia-origin coffee for hotel breakfast, restaurants, lounges and other hospitality applications. Commercial terms are confirmed from the actual requirement, volume and format.</>,
    },
    {
      q: "Can OCC develop a custom coffee flavor for our hotel?",
      a: <>Yes. OCC can develop a custom roast and flavor direction around the property&apos;s guest profile, brewing equipment, menu role and target cup experience.</>,
    },
    {
      q: "Can we replace our current hotel coffee with OCC coffee?",
      a: <>Yes. Share the coffee you currently use, service application, equipment, approximate volume and the result you want to improve. OCC can then discuss either a ready-to-supply roasted coffee or a custom profile.</>,
    },
    {
      q: "How do we start a hotel coffee enquiry?",
      a: <>Use the <Link href="/contact#enquiry">OCC commercial enquiry form</Link> and include the property name, intended application, estimated volume, current coffee if relevant, brewing equipment and target timing.</>,
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
        subtitle="Roasted Cambodian coffee supply and custom hotel coffee profiles — available now for hospitality partners in Cambodia."
        sections={sections}
        factsTitle="Hospitality Program"
        facts={[
          "Roasted coffee bean supply",
          "Custom flavor and roast development",
          "Breakfast, restaurant and lounge use",
          "Hotel operating and equipment fit",
          "Formal B2B enquiry and supply discussion",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Start a hotel coffee enquiry"
      />
    </>
  )
}
