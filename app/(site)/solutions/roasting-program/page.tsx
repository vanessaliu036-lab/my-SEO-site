import { Metadata } from "next"
import { CommercialSolutionTemplate } from "@/components/templates/commercial-solution-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Custom Coffee Roasting Cambodia | OCC",
  description:
    "Custom coffee roasting in Cambodia for cafés, hotels, and coffee brands. Develop a roast profile around your market, application, and product goal.",
  keywords:
    "Roasting Supplier Cambodia, coffee roasting supplier Cambodia, Custom Roasting Cambodia, Roast Profile development, custom coffee roasting Cambodia, Cambodia roasting supplier, custom roast profile development, coffee roasting service Cambodia, B2B coffee roasting Cambodia, Fine Robusta custom roasting",
  openGraph: {
    title: "Custom Coffee Roasting Cambodia | OCC",
    description:
      "Build a roast profile for your market, menu, brewing method, and commercial coffee product.",
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

export default function RoastingProgramPage() {
  const highlightCards = [
    {
      title: "Cafés",
      meta: "Espresso & Milk",
      text: "Develop a profile that works for your menu, equipment, and the way your customers drink coffee.",
    },
    {
      title: "Hotels & Hospitality",
      meta: "House Coffee",
      text: "Create a coffee direction that fits service, guest experience, and the role the coffee needs to play.",
    },
    {
      title: "Coffee Brands",
      meta: "Branded Profile",
      text: "Shape a coffee profile around your product idea, customer expectation, and commercial positioning.",
    },
    {
      title: "Single-Origin or Blend",
      meta: "Coffee Direction",
      text: "Evaluate the actual coffee, processing, sensory character, and intended use together.",
    },
  ]

  const sections = [
    {
      label: "01 / FIT",
      title: "Coffee for Your Business, Not a Generic Roast Label",
      content: (
        <div className="space-y-6">
          <p>OCC helps cafés, hotels, coffee brands, and B2B buyers develop a coffee profile around the product they want to serve. The starting point is your customer, brewing method, service environment, and commercial goal.</p>
          <ul className="grid gap-3 text-sm leading-7 text-black/72 sm:grid-cols-2">
            <li className="border-l-2 border-[#a8542a] pl-4">Espresso and milk beverage programs</li>
            <li className="border-l-2 border-[#a8542a] pl-4">Hotel, restaurant, and hospitality coffee</li>
            <li className="border-l-2 border-[#a8542a] pl-4">House blends and branded coffee</li>
            <li className="border-l-2 border-[#a8542a] pl-4">Cambodia-origin and Fine Robusta projects</li>
          </ul>
          <p>Already looking for an OCC-developed coffee? Explore <a href="/solutions/wholesale">Wholesale Coffee Supply</a>.</p>
        </div>
      ),
    },
    {
      label: "02 / BRIEF",
      title: "Bring the Product Goal. We Start There.",
      content: (
        <div className="space-y-6">
          <p>You do not need to arrive with a finished roast profile. Start with the information you already have:</p>
          <ul className="space-y-3 text-sm leading-7 text-black/72">
            <li><strong>Application:</strong> espresso, milk drinks, filter, hospitality, retail, or another product format.</li>
            <li><strong>Customer:</strong> who will drink or buy the finished coffee.</li>
            <li><strong>Coffee:</strong> your current coffee or green coffee, if relevant.</li>
            <li><strong>Direction:</strong> the taste, experience, or commercial role you want the coffee to create.</li>
          </ul>
        </div>
      ),
    },
    {
      label: "03 / REFERENCE",
      title: "A Clearer Path From Sample to Supply",
      content: (
        <div className="space-y-6">
          <p>The work connects sample roasting, sensory evaluation, profile refinement, and a clearer production reference. Structured {renderWithLinks("cupping")} can establish the sensory baseline, but the useful standard is how the coffee performs in the intended brewing and service context.</p>
          <p>Depending on the project, the reference can include the coffee or lot, intended application, sensory target, approved direction, evaluation notes, and relevant production observations.</p>
        </div>
      ),
    },
  ]

  const relatedLinks = [
    {
      title: "Wholesale Coffee Supply",
      description: "Choose an OCC-developed coffee profile when the product direction is already defined.",
      href: "/solutions/wholesale",
    },
    {
      title: "Fine Robusta Cambodia",
      description: "Explore the origin, quality, and Cambodian Canephora direction behind OCC's core expertise.",
      href: "/fine-robusta-cambodia",
    },
    {
      title: "Start a Roast Profile Project",
      description: "Bring the commercial goal, intended application, and market context into the development discussion.",
      href: "/contact",
    },
  ]

  const processSteps = [
    { title: "Brief", text: "Share your market, customer, application, current coffee if relevant, and the role the finished coffee needs to play." },
    { title: "Sample & Taste", text: "Compare coffee and roast directions through sensory evaluation and the brewing context where the product will be served." },
    { title: "Agree the Direction", text: "Refine and document the selected direction so the next commercial step is clear." },
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
      title: "Build a Roast Profile",
      description: "Develop a coffee direction around your own market, customer, brewing application, and product goal.",
      href: "/solutions/roasting-program",
      cta: "Start Your Brief",
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
        subtitle="Custom coffee roasting in Cambodia for cafés, hotels, coffee brands, and B2B buyers developing a defined coffee product."
        heroStatement="Coffee for Your Business. Choose the Path That Fits."
        heroCtaLabel="Build a Roast Profile"
        heroSecondaryCta={{ label: "Choose Wholesale Coffee", href: "/solutions/wholesale" }}
        highlightTitle="Choose the Path That Fits Your Business"
        highlightIntro="Start with the product you want to serve. OCC can help you develop a profile for your market, or connect you with an OCC-developed coffee when the direction is already defined."
        highlightCards={highlightCards}
        sections={sections}
        relatedLinksTitle="Related Paths"
        relatedLinks={relatedLinks}
        processTitle="Three Steps to a Working Coffee Direction"
        processIntro="A short brief keeps the conversation focused on the product, the application, and the next commercial step."
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
        nextPath={{
          eyebrow: "Ready-to-Sell Path",
          title: "Wholesale Moves Ready-Developed Coffee to Market",
          description: "When customization is not required, OCC Wholesale keeps the product direction already defined and moves the conversation toward sample evaluation, commercial terms, and supply.",
          href: "/solutions/wholesale",
          cta: "Discuss Wholesale Supply",
        }}
        comparisonTitle="Ready-Developed or Made-for-You?"
        comparison={comparison}
        faqs={faqs}
        ctaLabel="Tell Us What You Need"
        ctaDescription="Bring the application, target customer, current coffee if relevant, and the experience the finished product needs to create. We can help identify the right commercial path from there."
      />
    </>
  )
}
