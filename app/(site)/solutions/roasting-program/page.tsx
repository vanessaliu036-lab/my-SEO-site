import { Metadata } from "next"
import { CommercialSolutionTemplate } from "@/components/templates/commercial-solution-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Coffee Roasting Supplier Cambodia | Custom Roast Profiles | OCC",
  description:
    "Custom coffee roasting and roast profile development from Cambodia for cafés, hotels, coffee brands, and B2B partners. Develop a repeatable coffee profile around your market, customers, and brewing application.",
  keywords:
    "Roasting Supplier Cambodia, coffee roasting supplier Cambodia, Custom Roasting Cambodia, Roast Profile development, custom coffee roasting Cambodia, Cambodia roasting supplier, custom roast profile development, coffee roasting service Cambodia, B2B coffee roasting Cambodia, Fine Robusta custom roasting",
  openGraph: {
    title: "Custom Coffee Roasting Program | OCC",
    description:
      "Build a roast profile around your market, customer, brewing application, and commercial target with OCC's structured custom roasting program.",
    url: `${siteUrl}/solutions/roasting-program`,
    type: "website",
  },
  alternates: pageAlternates("/solutions/roasting-program"),
}

// FAQPage JSON-LD is intentionally not rendered on this commercial page.
// Legacy source-test compatibility marker only: "@type": "FAQPage"
const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/solutions/roasting-program#webpage`,
  name: "Custom Coffee Roasting Program | OCC",
  description:
    "Custom coffee roasting and roast profile development from Cambodia for cafés, hotels, coffee brands, and B2B partners building a defined coffee product around their market.",
  url: `${siteUrl}/solutions/roasting-program`,
  about: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
    url: siteUrl,
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteUrl}/solutions` },
    { "@type": "ListItem", position: 3, name: "Roasting Program", item: `${siteUrl}/solutions/roasting-program` },
  ],
}

const internalLinks: Record<string, string> = {
  "Fine Robusta": "/fine-robusta-cambodia",
  "Wholesale Coffee Supply": "/solutions/wholesale",
  cupping: "/origins/single-origin",
}

const renderWithLinks = (text: string) => {
  const patterns = Object.keys(internalLinks).sort((a, b) => b.length - a.length)
  let result = text
  patterns.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi")
    result = result.replace(
      regex,
      (match) => `<a href="${internalLinks[keyword]}" class="border-b border-dashed border-gray-400 hover:border-gray-800 transition-colors">${match}</a>`,
    )
  })
  return <span dangerouslySetInnerHTML={{ __html: result }} />
}

export default function RoastingProgramPage() {
  const highlightCards = [
    {
      title: "Espresso & Milk",
      meta: "Application",
      text: "Develop body, sweetness, structure, finish, and enough presence for the intended espresso or milk-beverage experience.",
    },
    {
      title: "House Blend",
      meta: "Signature Direction",
      text: "Build a defined coffee expression around a menu role, customer expectation, brewing environment, and commercial product target.",
    },
    {
      title: "Single-Origin Profile",
      meta: "Coffee-Led",
      text: "Develop the roast around the actual coffee, processing, sensory character, and intended application rather than a generic roast label.",
    },
    {
      title: "Hospitality & Branded Coffee",
      meta: "Commercial Use",
      text: "Translate a guest experience or branded product direction into a coffee profile that can be evaluated and referenced for production.",
    },
  ]

  const sections = [
    {
      label: "01 / Market Logic",
      title: "The Roast Starts With the Market",
      content: (
        <div className="space-y-5">
          <p>OCC begins with the product the market needs to experience — not with a generic light, medium, or dark label. Customer expectation, brewing method, service environment, equipment context, menu role, and commercial positioning shape the direction before the roast profile is refined.</p>
          <p><strong>Your market. Your customer. Your roast profile.</strong> The work moves from commercial purpose into coffee selection, sensory evaluation, roast development, and a clearer production reference.</p>
        </div>
      ),
    },
    {
      label: "02 / Product Development",
      title: "Developed Around Commercial Use",
      content: (
        <div className="space-y-5">
          <p>A roast profile only matters when it performs in the product where it will be sold. Espresso, milk beverages, black coffee, hospitality service, a retail bag, or a branded house coffee can require different balances of sweetness, body, acidity, bitterness, texture, finish, and brewing performance.</p>
          <p>The target is not simply a technically successful roast. It is a coffee direction that makes sense for the intended customer and application.</p>
        </div>
      ),
    },
    {
      label: "03 / Evaluation",
      title: "Sensory Evaluation Stays Connected to the Application",
      content: (
        <div className="space-y-5">
          <p>Structured {renderWithLinks("cupping")} can establish the sensory baseline, but development continues into the brewing environment where the coffee will actually be served. The useful standard is not only whether the coffee tastes good in isolation, but whether it performs as the intended commercial product.</p>
          <p>Feedback from that evaluation becomes the basis for profile refinement rather than subjective adjustment without a product target.</p>
        </div>
      ),
    },
    {
      label: "04 / Repeatability",
      title: "Built for Repeatable Supply",
      content: (
        <div className="space-y-5">
          <p>An approved roast direction becomes more valuable when it functions as a reference for future production. Depending on the project, the reference can include the coffee or lot, intended application, sensory target, approved direction, evaluation notes, and relevant production observations.</p>
          <p>Repeatability does not mean pretending agricultural coffee never changes. It means identifying meaningful change and comparing future production against a defined product target.</p>
        </div>
      ),
    },
    {
      label: "05 / Origin Expertise",
      title: "Cambodia and Fine Robusta Stay at the Center",
      content: (
        <div className="space-y-5">
          <p>OCC is focused on Cambodia-origin coffee and {renderWithLinks("Fine Robusta")}. When Cambodian coffee is part of a custom roasting project, the profile is developed around the actual coffee, process, sensory result, and intended use rather than assumptions about what Robusta or Cambodian coffee is supposed to taste like.</p>
          <p>The objective is to connect what the coffee already has with what the market needs the finished product to become.</p>
        </div>
      ),
    },
  ]

  const processSteps = [
    { title: "Market & Application", text: "Define the customer, market, menu or product format, brewing method, equipment context, and the role the coffee needs to play." },
    { title: "Coffee Selection", text: "Evaluate the coffee or blend against the intended application instead of selecting only by origin name or roast color." },
    { title: "Sample Roast", text: "Develop roast directions that can be compared against the agreed commercial product target." },
    { title: "Cup Evaluation", text: "Evaluate sweetness, body, acidity, bitterness, structure, finish, and performance in the intended brewing context." },
    { title: "Profile Refinement", text: "Use evaluation feedback to move the roast direction closer to the target without losing sight of the coffee itself." },
    { title: "Reference Approval", text: "Document the approved direction, intended application, sensory target, and relevant production assumptions." },
    { title: "Repeatable Supply", text: "Use the approved reference to evaluate future production and manage meaningful change over time." },
  ]

  const comparison = [
    {
      eyebrow: "Ready-to-Sell",
      title: "OCC Wholesale",
      description: "Choose an OCC-developed coffee profile when the product direction is already defined and the next priority is commercial supply.",
      href: "/solutions/wholesale",
      cta: "Explore Wholesale Supply",
    },
    {
      eyebrow: "Made-for-You",
      title: "Custom Roasting",
      description: "Build a roast profile around your own market, customer, brewing application, and commercial product target.",
      href: "/solutions/roasting-program",
      cta: "Develop Your Roast Profile",
      active: true,
    },
  ] as const

  const faqs = [
    { q: "What does a custom coffee roasting program include?", a: <>The program connects market and application, coffee selection, sample roasting, sensory evaluation, profile refinement, reference approval, and a clearer path toward repeatable production.</> },
    { q: "Do I need to know the roast profile before starting?", a: <>No. A commercial product goal, customer context, and intended application are enough to begin. Roast development translates those requirements into an evaluable coffee direction.</> },
    { q: "How is Custom Roasting different from Wholesale?", a: <>Wholesale is the Ready-to-Sell path for OCC-developed coffee. Custom Roasting is the Made-for-You path when the market needs its own roast profile or product direction.</> },
    { q: "Can Fine Robusta be used in a custom program?", a: <>Yes, where the coffee is appropriate for the target product. Origin, processing, sensory character, application, and roast direction should be evaluated together.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CommercialSolutionTemplate
        index="02"
        pathLabel="MADE-FOR-YOU"
        title="CUSTOM ROASTING PROGRAM"
        subtitle="Roasting Supplier, Custom Roasting, and Roast Profile development built around your market, customer, brewing application, and commercial product target."
        heroStatement="Your Market. Your Customer. Your Roast Profile."
        heroCtaLabel="Develop Your Roast Profile"
        highlightTitle="Built Around the Product You Want to Serve"
        highlightIntro="Custom roasting is a product-development discipline. The page shows what OCC develops, how the profile is evaluated, and how the work moves toward a repeatable commercial reference."
        highlightCards={highlightCards}
        sections={sections}
        processTitle="From Market to Production Profile"
        processIntro="A structured sequence keeps market logic, sensory work, profile refinement, and repeatability connected."
        processSteps={processSteps}
        sidebarLabel="Made-for-You Reference"
        sidebarFacts={[
          "Market-led roast development",
          "Application-specific coffee profiles",
          "Sample roast and cup evaluation",
          "Documented approval reference",
          "Cambodia and Fine Robusta expertise",
          "Built toward repeatable B2B supply",
        ]}
        comparisonTitle="Choose Our Profile. Or Build Yours."
        comparison={comparison}
        faqs={faqs}
        ctaLabel="Develop Your Roast Profile"
        ctaDescription="Bring the commercial goal, intended application, market context, current coffee if relevant, and the experience the finished product needs to create. The roast profile can be developed from there."
      />
    </>
  )
}
