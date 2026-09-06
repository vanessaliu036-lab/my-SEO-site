import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Custom Coffee Roasting Cambodia | OCC Roasting Program",
  description:
    "Custom coffee roasting in Cambodia for cafés, hotels, and coffee brands developing house blends, roast profiles, and structured, repeatable B2B coffee programs.",
  keywords:
    "custom coffee roasting Cambodia, coffee roasting service Cambodia, contract coffee roasting Cambodia, private label coffee Cambodia, custom roast profile development, house blend development, B2B coffee roasting Cambodia",
  openGraph: {
    title: "Custom Coffee Roasting Program in Cambodia | OCC",
    description:
      "Build a defined coffee profile for your café, hotel, or coffee brand with a structured B2B roast-development program focused on sensory targets and repeatability.",
    url: `${siteUrl}/solutions/roasting-program`,
    type: "website",
  },
  alternates: pageAlternates("/solutions/roasting-program"),
}

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/solutions/roasting-program#webpage`,
  name: "Custom Coffee Roasting Program in Cambodia",
  description:
    "Custom coffee roasting in Cambodia for cafés, hotels, and coffee brands developing house blends, roast profiles, and structured, repeatable B2B coffee programs.",
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
  cupping: "/coffee/single-origin",
  staffing: "/solutions/barista-staffing",
  equipment: "/solutions/equipment-service",
}

const renderWithLinks = (text: string) => {
  const patterns = Object.keys(internalLinks).sort((a, b) => b.length - a.length)
  let result = text
  patterns.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi")
    result = result.replace(
      regex,
      (match) =>
        `<a href="${internalLinks[keyword]}" class="border-b border-dashed border-gray-400 hover:border-gray-800 transition-colors">${match}</a>`,
    )
  })
  return <span dangerouslySetInnerHTML={{ __html: result }} />
}

export default function RoastingProgramPage() {
  const relatedServices = [
    { title: "Wholesale", href: "/solutions/wholesale", desc: "Coffee sourcing and supply for B2B programs" },
    { title: "Barista Staffing", href: "/solutions/barista-staffing", desc: "Training and staffing considerations for service execution" },
    { title: "Equipment Service", href: "/solutions/equipment-service", desc: "Equipment readiness and service planning" },
  ]

  const sections = [
    {
      title: "Build a Coffee Profile Around Your Business",
      content: (
        <div className="space-y-5">
          <p>Your coffee should taste like your business, not like everyone else&apos;s. OCC&apos;s Custom Coffee Roasting Program is designed for cafés, hotels, restaurants, hospitality groups, and coffee brands in Cambodia that want a defined coffee profile rather than an off-the-shelf roast direction.</p>
          <p>Roast development begins with the intended product: the coffee or blend, target sensory direction, brewing application, and the role of sweetness, body, acidity, bitterness, and finish. The objective is to create a profile that can be evaluated, approved, and used as a repeatable reference.</p>
        </div>
      ),
    },
    {
      title: "How the Roasting Program Works",
      content: (
        <div className="space-y-5">
          <p><strong>Brief.</strong> Define the business, current coffee, brewing equipment, customer context, desired flavor direction, and the problem the new coffee program needs to solve.</p>
          <p><strong>Coffee selection.</strong> Where sourcing is part of the project, evaluate the coffee or blend against the intended application rather than choosing only by origin name or roast color.</p>
          <p><strong>Sample roasting and evaluation.</strong> Test roast directions, compare them through structured sensory evaluation and the intended brewing method, then refine the profile against the agreed product target.</p>
          <p><strong>Reference approval.</strong> Once a direction is accepted, document the coffee, intended application, sensory target, and production assumptions so future batches can be evaluated against a defined reference.</p>
        </div>
      ),
    },
    {
      title: "What We Can Develop",
      content: (
        <div className="space-y-5">
          <p><strong>House blends.</strong> Build a signature direction for espresso, milk beverages, black coffee, or another defined menu application.</p>
          <p><strong>Single-origin roast profiles.</strong> Develop an application-specific roast around the qualities of a particular coffee instead of forcing every lot into the same roast style.</p>
          <p><strong>Private-label concepts.</strong> Use roast-profile development as the technical foundation for a branded coffee program, with packaging, labeling, volume, and production responsibilities confirmed separately before launch.</p>
          <p><strong>Hospitality coffee programs.</strong> Evaluate the coffee together with brewing equipment, recipes, service conditions, staff capability, and repeat-order needs so the product works in the operating environment where it will actually be served.</p>
        </div>
      ),
    },
    {
      title: "Designed for Cafés, Hotels and Coffee Brands",
      content: (
        <div className="space-y-5">
          <p>The program is relevant to cafés developing a house blend, hotels building a more defined F&amp;B coffee identity, restaurants improving coffee quality, hospitality groups coordinating multiple outlets, retailers preparing branded coffee, and coffee brands evaluating outsourced roast development.</p>
          <p>Some businesses arrive with a precise target. Others only know that their current coffee is not performing well enough. Both are valid starting points when the brief, evaluation method, and approval criteria are made explicit.</p>
        </div>
      ),
    },
    {
      title: "Why Roast Development Matters",
      content: (
        <div className="space-y-5">
          <p>Coffee consistency does not come from repeating one roast time or choosing a generic light, medium, or dark label. Green coffee changes between lots and harvests, while moisture, density, processing, storage, and physical characteristics can influence how the coffee behaves during roasting.</p>
          <p>The useful chain is origin → green coffee → processing → roasting → sensory result → commercial application. Treating those decisions as connected makes roast development part of a quality system rather than an isolated production step.</p>
        </div>
      ),
    },
    {
      title: "From Roast Profile to Repeatable Coffee Program",
      content: (
        <div className="space-y-5">
          <p>A useful roast profile becomes a reference asset for the business. Depending on the project, the record can include the coffee or lot reference, blend composition, intended brewing application, roast target, sensory target, evaluation notes, approved reference, and relevant production observations.</p>
          <p>Repeatability does not mean pretending agricultural coffee never changes. It means identifying change, recording what matters, and comparing future production against a defined product target rather than relying on vague descriptions.</p>
        </div>
      ),
    },
    {
      title: "Cambodia Coffee and Fine Robusta Expertise",
      content: (
        <div className="space-y-5">
          <p>OCC is positioned around Cambodia specialty coffee supply, {renderWithLinks("Fine Robusta")}, and B2B coffee solutions. Roast development sits inside that wider context because origin, processing, sensory evaluation, and roasting decisions affect one another.</p>
          <p>Where Cambodian coffee or Fine Robusta is being evaluated for a client program, the roast should be developed around the actual coffee and intended product rather than assumptions about what Robusta or Cambodian coffee is supposed to taste like.</p>
          <p>Businesses that also need sourcing and supply can continue to {renderWithLinks("Wholesale Coffee Supply")} for the commercial coffee-supply pathway.</p>
        </div>
      ),
    },
    {
      title: "Packaging, Volume and Production",
      content: (
        <div className="space-y-5">
          <p>Private-label packaging, production volume, recurring orders, and launch timing should be confirmed according to the actual project rather than published as universal promises.</p>
          <p>Key variables include coffee selection, profile-development requirements, packaging format, number of SKUs, project stage, production capacity, quality-release responsibilities, and change-control rules. These details belong in the commercial brief before production is treated as approved.</p>
        </div>
      ),
    },
    {
      title: "What to Prepare Before You Contact OCC",
      content: (
        <div className="space-y-5">
          <p>A stronger brief makes the roasting discussion faster and more useful. Share your business type, current coffee or supplier, approximate volume, main brewing methods, milk-drink requirements, desired flavor direction, whether you are considering a house blend or single origin, packaging needs, target timing, and the main problem you want the coffee program to solve.</p>
          <p>You do not need to arrive with a complete roast specification. The purpose of profile development is to turn a commercial product goal into an evaluable coffee direction and a clearer production reference.</p>
        </div>
      ),
    },
    {
      title: "Roasting Research",
      content: (
        <div className="space-y-5">
          <p>Use OCC&apos;s Research Journal to go deeper into sensory evaluation, Cambodian coffee, and roast-development decisions. Start with <a href="/blog/how-to-cup-fine-robusta">How to Cup Fine Robusta</a>, <a href="/blog/fine-robusta-flavor-notes">Fine Robusta Flavor Notes</a>, and <a href="/blog/roasting-fine-robusta-for-moka-pot-without-flattening-sweetness">Roasting Fine Robusta for Moka Pot Without Flattening Sweetness</a>.</p>
          <p>These research pages support this Roasting Program; they do not replace the commercial pathway. For project-specific requirements, the next step remains a direct B2B discussion.</p>
        </div>
      ),
    },
  ]

  const faqs = [
    { q: "What does a custom coffee roasting program include?", a: <>A useful program starts with the coffee, intended use, sensory target, brewing context, sample roasts, evaluation criteria, profile refinement, and a documented reference for repeat production.</> },
    { q: "Can a roasting program support a house blend?", a: <>Yes. House-blend development can be structured around espresso, milk beverages, black coffee, or another defined menu application, with the final direction evaluated against the intended use.</> },
    { q: "Can Cambodian coffee or Fine Robusta be considered for roast development?", a: <>Yes, where the coffee is appropriate for the target product. Origin, processing, sensory character, and roast development should be evaluated together.</> },
    { q: "What should be verified before private-label production?", a: <>Confirm the production partner, coffee specification, approved profile, packaging and labeling responsibility, quality checks, volume, lead-time assumptions, and change-control process.</> },
    { q: "What is the minimum order quantity?", a: <>Production minimums depend on the coffee, profile, packaging, number of SKUs, project stage, and production partner. The appropriate scope should be confirmed after the brief is reviewed.</> },
    { q: "How long does roast-profile development take?", a: <>Timing depends on coffee selection, the number of profiles, evaluation rounds, packaging requirements, and approval steps. A project schedule should be confirmed after the initial brief.</> },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="02"
        title="CUSTOM COFFEE ROASTING PROGRAM"
        subtitle="Roast profile development for cafés, hotels, and coffee brands in Cambodia, built around product targets, sensory evaluation, repeatability, and production readiness."
        sections={sections}
        factsTitle="Program Focus"
        facts={[
          "House blend and single-origin development",
          "Sensory targets and brewing context",
          "Profile documentation and repeatability",
          "Private-label and hospitality planning",
          "Cambodia coffee and Fine Robusta relevance",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Discuss your requirements"
      />
    </>
  )
}
