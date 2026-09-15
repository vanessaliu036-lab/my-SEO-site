import { Metadata } from "next"
import { CommercialSolutionTemplate } from "@/components/templates/commercial-solution-template"
import { siteUrl, ogImage } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Wholesale Coffee Cambodia | B2B Sourcing | OCC",
  description:
    "Wholesale coffee supply in Cambodia for cafés, hotels, roasters, importers, and distributors, with Cambodian Fine Robusta, green and roasted coffee, samples, traceability, and B2B sourcing support.",
  keywords:
    "wholesale coffee Cambodia, Cambodian coffee supplier, coffee supplier Cambodia, Fine Robusta supplier, wholesale supplier Cambodia, B2B coffee supplier Cambodia, Fine Robusta wholesale, specialty coffee wholesale Cambodia, Cambodia green coffee, roasted coffee wholesale Cambodia, coffee sourcing Cambodia, Cambodian coffee distributor",
  openGraph: {
    title: "Wholesale Coffee Cambodia | OCC",
    description: "Cambodian-origin wholesale coffee for professional buyers, with Fine Robusta, green and roasted formats, sample evaluation, traceability, and clear commercial terms.",
    url: `${siteUrl}/solutions/wholesale`,
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Wholesale Coffee Cambodia — OCC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale Coffee Cambodia | OCC",
    description: "Cambodian-origin wholesale coffee for professional buyers, with Fine Robusta, green and roasted formats, sample evaluation, traceability, and clear commercial terms.",
  },
  alternates: pageAlternates("/solutions/wholesale"),
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What can OCC supply to wholesale coffee buyers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OCC develops wholesale coffee programs around Cambodian-origin coffee, including Fine Robusta, green coffee for professional roasters, and roasted coffee for hospitality, retail, distribution, and B2B use.",
      },
    },
    {
      "@type": "Question",
      name: "Can wholesale buyers request a coffee sample before ordering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sample evaluation should come before a larger commitment so the coffee, lot or specification, cup profile, and approval criteria can be understood before recurring supply is discussed.",
      },
    },
    {
      "@type": "Question",
      name: "How are MOQ, wholesale pricing, and lead time handled?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MOQ, pricing, and lead time depend on coffee format, current availability, volume, roast requirements, packaging or delivery scope, and destination. Commercial terms are confirmed against the actual requirement.",
      },
    },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteUrl}/solutions` },
    { "@type": "ListItem", position: 3, name: "Wholesale", item: `${siteUrl}/solutions/wholesale` },
  ],
}

const internalLinks: Record<string, string> = {
  "Fine Robusta Cambodia": "/fine-robusta-cambodia",
  "Custom Roasting": "/solutions/roasting-program",
  "Roasting Program": "/solutions/roasting-program",
  "single-origin coffee": "/origins",
  cupping: "/blog/how-to-cup-fine-robusta",
}

const renderWithLinks = (text: string) => {
  const patterns = Object.keys(internalLinks).sort((a, b) => b.length - a.length)
  let result = text
  patterns.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi")
    result = result.replace(
      regex,
      (match) => `<a href="${internalLinks[keyword]}" class="border-b border-[#182019]/45 font-medium text-[#182019] hover:border-[#a8542a] transition-colors">${match}</a>`,
    )
  })
  return <span dangerouslySetInnerHTML={{ __html: result }} />
}

export default function WholesalePage() {
  const highlightCards = [
    {
      title: "Fine Robusta",
      meta: "Cambodia Origin",
      text: "A differentiated Cambodian Canephora direction for buyers evaluating quality, origin, cup character, and commercial fit.",
    },
    {
      title: "Roasted Coffee",
      meta: "Ready-to-Sell",
      text: "OCC-developed roasted coffee directions for wholesale, distribution, retail, hospitality, and professional B2B use.",
    },
    {
      title: "Green Coffee",
      meta: "Professional Supply",
      text: "A sourcing and evaluation path for roasters, importers, and professional buyers where the available coffee fits the requirement.",
    },
    {
      title: "Distribution Supply",
      meta: "Market Entry",
      text: "A commercial path for partners introducing Cambodian coffee into a market through a defined product, sample, and supply discussion.",
    },
  ]

  const sections = [
    {
      label: "01 / Market Path",
      title: "From Origin to Market",
      content: (
        <div className="space-y-6">
          <p>OCC connects Cambodia origin, coffee selection, quality evaluation, product direction, and commercial supply into one clearer route to market. The purpose is not to present coffee as anonymous volume. It is to make the product, evidence, and supply decision easier to evaluate before scale.</p>
          <p>For buyers focused on Cambodian Canephora, {renderWithLinks("Fine Robusta Cambodia")} remains the central quality and origin reference.</p>
        </div>
      ),
    },
    {
      label: "02 / Ready-to-Sell",
      title: "The Product Direction Is Already Defined",
      content: (
        <div className="space-y-6">
          <p>Wholesale is the Ready-to-Sell path. OCC has already made the core product decisions required to move from origin toward a commercial coffee offer: the coffee direction, intended cup character, roast direction where applicable, and the supply format being evaluated.</p>
          <p>This reduces the number of product-development decisions a distributor, retailer, hotel, café group, or B2B partner needs to solve before bringing Cambodian coffee into market.</p>
        </div>
      ),
    },
    {
      label: "03 / Verification",
      title: "Origin, Quality and Traceability Stay Connected",
      content: (
        <div className="space-y-6">
          <p>A professional coffee supplier should connect commercial claims to the coffee being evaluated. Origin, processing, quality, sample approval, lot or specification information, and traceability evidence should stay attached to the relevant product rather than becoming separate marketing claims.</p>
          <p>Where sensory evaluation is required, {renderWithLinks("cupping")} establishes a clearer baseline before recurring supply or substitution rules are discussed.</p>
        </div>
      ),
    },
    {
      label: "04 / Commercial Control",
      title: "Commercial Terms Stay Explicit",
      content: (
        <div className="space-y-6">
          <p>MOQ, pricing basis, lead time, packaging scope, delivery responsibility, current availability, and substitution rules depend on the actual coffee and project. OCC keeps those variables explicit rather than turning one commercial assumption into a universal promise.</p>
          <p>The result is a cleaner path from approved reference to repeat orders, with fewer gaps between what was sampled, what was agreed, and what is supplied.</p>
        </div>
      ),
    },
    {
      label: "05 / Product Choice",
      title: "Ready-to-Sell Remains Distinct From Custom Development",
      content: (
        <div className="space-y-6">
          <p>Wholesale is for buyers choosing an OCC-developed coffee direction. When the market requires its own roast profile, application-specific cup target, or a coffee built around a separate product brief, {renderWithLinks("Custom Roasting")} becomes the Made-for-You path.</p>
          <p>The two services work together without competing for the same search intent: supplier and wholesale intent stays here; explicit roast-development intent moves to the {renderWithLinks("Roasting Program")}.</p>
        </div>
      ),
    },
  ]

  const relatedLinks = [
    {
      title: "Fine Robusta Cambodia",
      description: "Origin, quality, and Cambodian Canephora reference.",
      href: "/fine-robusta-cambodia",
    },
    {
      title: "Custom Roasting Program",
      description: "Build a roast profile around your market, customer, and commercial application.",
      href: "/solutions/roasting-program",
    },
    {
      title: "Start a Wholesale Discussion",
      description: "Share the market, coffee format, volume direction, and destination with OCC.",
      href: "/contact",
    },
  ]

  const processSteps = [
    { title: "Coffee Selection", text: "Identify the OCC-developed coffee or available supply direction that fits the intended market and application." },
    { title: "Sample Evaluation", text: "Evaluate the coffee or closest commercial reference before a larger commitment is discussed." },
    { title: "Buyer Verification", text: "Review the relevant origin, processing, quality, specification, and traceability information available for the coffee." },
    { title: "Commercial Terms", text: "Confirm MOQ, pricing basis, lead time, packaging or delivery scope, volume assumptions, and substitution rules." },
    { title: "Supply", text: "Move from an approved reference into the agreed commercial supply format and delivery responsibility." },
    { title: "Repeat Orders", text: "Use the approved reference and defined commercial terms as the basis for ongoing supply discussions." },
  ]

  const comparison = [
    {
      eyebrow: "Ready-to-Sell",
      title: "OCC Wholesale",
      description: "Choose an OCC-developed coffee profile and move from Cambodia origin toward commercial supply with the product direction already defined.",
      href: "/solutions/wholesale",
      cta: "Wholesale Coffee Supply",
      active: true,
    },
    {
      eyebrow: "Made-for-You",
      title: "Custom Roasting",
      description: "Build a roast profile around your market, customer, brewing application, and commercial product target.",
      href: "/solutions/roasting-program",
      cta: "Develop Your Roast Profile",
    },
  ] as const

  const faqs = [
    { q: "What can OCC supply to wholesale coffee buyers?", a: <>OCC develops B2B supply pathways around Cambodian Fine Robusta, green coffee, roasted coffee, and OCC-developed commercial coffee directions for professional buyers.</> },
    { q: "Can wholesale buyers evaluate a sample before ordering?", a: <>Yes. The coffee or closest commercial reference should be evaluated before larger-volume or recurring-supply terms are treated as final.</> },
    { q: "How are MOQ, pricing, and lead time handled?", a: <>They are confirmed against the actual coffee, format, current availability, volume, packaging or delivery scope, and destination rather than published as one universal number.</> },
    { q: "When should a buyer use the Roasting Program instead?", a: <>Use the Roasting Program when the market needs a custom roast profile or product direction developed around a specific customer, application, or commercial target.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CommercialSolutionTemplate
        index="01"
        pathLabel="READY-TO-SELL"
        title="WHOLESALE COFFEE SUPPLY"
        subtitle="Cambodia-origin coffee supply for distributors, importers, retailers, hospitality, cafés, and B2B partners — with Fine Robusta and OCC-developed coffee directions."
        heroStatement="Cambodian coffee, developed for a clearer path to market."
        heroCtaLabel="Discuss Wholesale Supply"
        highlightTitle="Built for Commercial Supply"
        highlightIntro="Supplier and wholesale intent stay in one commercial family: Coffee Supplier, Fine Robusta Supplier, and Wholesale Supplier all route to this page."
        highlightCards={highlightCards}
        sections={sections}
        relatedLinksTitle="Related References"
        relatedLinks={relatedLinks}
        processTitle="From Sample to Supply"
        processIntro="A defined sequence keeps product evaluation, evidence, commercial terms, and repeat orders connected."
        processSteps={processSteps}
        sidebarLabel="Ready-to-Sell Reference"
        sidebarFacts={[
          "Cambodia-origin supply",
          "Fine Robusta expertise",
          "OCC-developed coffee direction",
          "Sample-led buyer evaluation",
          "Origin and quality evidence",
          "Commercial terms kept explicit",
        ]}
        nextPath={{
          eyebrow: "Made-for-You Path",
          title: "Custom Roasting Builds the Market-Specific Profile",
          description: "When an OCC-developed coffee is not the exact fit, the Roasting Program develops the profile around the market, customer, brewing application, and commercial product target.",
          href: "/solutions/roasting-program",
          cta: "Develop Your Roast Profile",
        }}
        comparisonTitle="Choose Our Profile. Or Build Yours."
        comparison={comparison}
        faqs={faqs}
        ctaLabel="Discuss Wholesale Supply"
        ctaDescription="Start with the coffee, market, expected format, volume direction, and destination. OCC will use that context to frame the next commercial step."
      />
    </>
  )
}
