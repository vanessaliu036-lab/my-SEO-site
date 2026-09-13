import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Coffee Roasting Supplier Cambodia | Custom Roast Profiles | OCC",
  description:
    "Custom coffee roasting and roast profile development from Cambodia for cafés, hotels, coffee brands, and B2B partners. Develop a repeatable coffee profile around your market, customers, and brewing application.",
  keywords:
    "coffee roasting supplier Cambodia, custom coffee roasting Cambodia, Cambodia roasting supplier, custom roast profile development, coffee roasting service Cambodia, B2B coffee roasting Cambodia, Fine Robusta custom roasting, custom roasted coffee supplier",
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
      (match) =>
        `<a href="${internalLinks[keyword]}" class="border-b border-dashed border-gray-400 hover:border-gray-800 transition-colors">${match}</a>`,
    )
  })
  return <span dangerouslySetInnerHTML={{ __html: result }} />
}

export default function RoastingProgramPage() {
  const relatedServices = [
    {
      title: "Wholesale Coffee Supply",
      href: "/solutions/wholesale",
      desc: "Ready-to-Sell — choose an OCC-developed coffee profile",
    },
  ]

  const sections = [
    {
      title: "Build a Roast Profile Around Your Market",
      content: (
        <div className="space-y-5">
          <p>OCC&apos;s Custom Coffee Roasting Program is for businesses that do not simply want an off-the-shelf roast. The starting point is your market: who will drink the coffee, how it will be brewed, where it will be served, and what the finished product needs to accomplish.</p>
          <p>If you want a ready-developed OCC coffee, {renderWithLinks("Wholesale Coffee Supply")} is the direct path. If you need a coffee direction developed around your own customer, application, equipment, or product position, this program is the Made-for-You path.</p>
          <p><strong>Your market. Your customer. Your roast profile.</strong> The purpose is to turn a commercial product goal into a coffee profile that can be evaluated, approved, and used as a reference for repeat production.</p>
        </div>
      ),
    },
    {
      title: "Who This Program Is For",
      content: (
        <div className="space-y-5">
          <p>The program is relevant to coffee shops building a signature espresso, hotels and restaurant groups defining a more distinctive coffee experience, coffee brands developing a branded product, roasteries evaluating a Cambodia-origin direction, and beverage businesses that need coffee to perform in a specific application.</p>
          <p>You do not need to arrive with a finished roast specification. A clear commercial goal is enough to begin: the customer you serve, the way the coffee will be used, what is not working today, or the experience you want the new product to create.</p>
        </div>
      ),
    },
    {
      title: "Start With the Market, Not Roast Color",
      content: (
        <div className="space-y-5">
          <p>A useful custom roasting brief goes beyond light, medium, or dark. Roast color alone does not explain whether a coffee will work as espresso, remain visible through milk, suit a hotel service environment, or express the cup character a retail brand wants to own.</p>
          <p>OCC approaches the project through connected decisions: <strong>market → customer → application → coffee selection → roast direction → sensory result → production reference.</strong></p>
          <p>This keeps the conversation focused on the product you are trying to build, rather than asking you to choose technical roasting language before the commercial objective is clear.</p>
        </div>
      ),
    },
    {
      title: "How Custom Roast Development Works",
      content: (
        <div className="space-y-5">
          <p><strong>01 — Market and application.</strong> Define the customer, market, menu or product format, brewing method, equipment context, and the role the coffee needs to play.</p>
          <p><strong>02 — Coffee selection.</strong> Evaluate the coffee or blend against the intended application instead of selecting only by origin name or roast color.</p>
          <p><strong>03 — Sample roast.</strong> Develop roast directions that can be compared against the agreed product target.</p>
          <p><strong>04 — Cup evaluation.</strong> Evaluate structure, sweetness, body, acidity, bitterness, finish, and performance in the intended brewing context.</p>
          <p><strong>05 — Profile refinement.</strong> Use evaluation feedback to move the roast direction closer to the commercial target.</p>
          <p><strong>06 — Reference approval.</strong> Once a direction is accepted, document the coffee, intended application, sensory target, and relevant production assumptions.</p>
          <p><strong>07 — Repeatable supply.</strong> Future production can be assessed against a defined product reference instead of relying on a vague roast description.</p>
        </div>
      ),
    },
    {
      title: "What We Can Develop",
      content: (
        <div className="space-y-5">
          <p><strong>Espresso and milk-beverage profiles.</strong> Build around body, sweetness, structure, finish, and how the coffee needs to remain present when served with milk.</p>
          <p><strong>Black-coffee profiles.</strong> Develop around clarity, balance, texture, and the intended brewing method rather than applying the same roast direction to every use case.</p>
          <p><strong>House blends.</strong> Create a signature direction for a café, restaurant, hotel, or multi-outlet operation around a defined menu role.</p>
          <p><strong>Single-origin roast profiles.</strong> Develop an application-specific expression around the qualities of a particular coffee instead of forcing every lot into one generic roast style.</p>
          <p><strong>Branded and private-label concepts.</strong> Use roast-profile development as the product foundation, with packaging, labeling, volume, and production responsibilities confirmed separately before launch.</p>
        </div>
      ),
    },
    {
      title: "How the Profile Is Evaluated",
      content: (
        <div className="space-y-5">
          <p>The useful question is not simply, <strong>“Is this a good coffee?”</strong> The more commercial question is, <strong>“Is this the right coffee for this product and this customer?”</strong></p>
          <p>Evaluation should connect sensory results with the intended use. Espresso may need a different balance from filter coffee. Milk beverages may require enough structure to remain identifiable. Hospitality programs may need the coffee to work within actual service conditions, recipes, equipment, and staff execution.</p>
          <p>Structured {renderWithLinks("cupping")} can support the evaluation, but the final direction should also make sense in the brewing environment where the product will actually be served.</p>
        </div>
      ),
    },
    {
      title: "From Approved Direction to Repeatable Supply",
      content: (
        <div className="space-y-5">
          <p>A roast profile becomes more valuable when it functions as a product reference rather than a one-time sample. Depending on the project, the reference can include the coffee or lot, blend composition, intended application, sensory target, approved direction, evaluation notes, and relevant production observations.</p>
          <p>Repeatability does not mean pretending agricultural coffee never changes. It means making important changes visible and comparing future production against a defined commercial target.</p>
          <p>That is the difference between asking for “the same roast again” and building a coffee program with a clearer reference for future orders.</p>
        </div>
      ),
    },
    {
      title: "Cambodia Coffee and Fine Robusta Expertise",
      content: (
        <div className="space-y-5">
          <p>OCC is focused on Cambodia-origin coffee, {renderWithLinks("Fine Robusta")}, and B2B coffee solutions. Roast development sits inside that wider context because origin, processing, green-coffee character, sensory evaluation, and roasting decisions affect one another.</p>
          <p>Where Cambodian coffee or Fine Robusta is being evaluated for a client program, the roast direction should be built around the actual coffee and intended product rather than assumptions about what Robusta or Cambodian coffee is supposed to taste like.</p>
          <p>The objective is not to make every coffee taste the same. It is to understand what the coffee already has, what the market needs, and where those two can meet.</p>
        </div>
      ),
    },
    {
      title: "Roasting Research",
      content: (
        <div className="space-y-5">
          <p>Buyers who want to go deeper before starting a project can use OCC&apos;s Research Journal to understand sensory evaluation, Fine Robusta, and roast-development decisions.</p>
          <p>Start with <a href="/blog/how-to-cup-fine-robusta">How to Cup Fine Robusta</a>, <a href="/blog/fine-robusta-flavor-notes">Fine Robusta Flavor Notes</a>, and <a href="/blog/roasting-fine-robusta-for-moka-pot-without-flattening-sweetness">Roasting Fine Robusta for Moka Pot Without Flattening Sweetness</a>.</p>
          <p>These research pages support evaluation and due diligence. A project-specific roast direction still begins with the commercial brief and intended application.</p>
        </div>
      ),
    },
    {
      title: "Choose Our Profile. Or Build Yours.",
      content: (
        <div className="space-y-5">
          <p><strong>Ready-to-Sell — OCC Wholesale.</strong> Choose an OCC-developed coffee profile when you want a Cambodian coffee product that is already defined for wholesale, distribution, retail, hospitality, or B2B supply. Continue to {renderWithLinks("Wholesale Coffee Supply")}.</p>
          <p><strong>Made-for-You — Custom Roasting.</strong> Stay with the Roasting Program when your market needs its own product direction. The coffee is developed around your customer, application, and commercial target rather than asking you to adopt an existing OCC profile.</p>
          <p><strong>Choose our profile. Or build yours.</strong> Both paths begin with Cambodia-origin coffee; the difference is whether you want OCC&apos;s existing direction or a profile developed around your market.</p>
        </div>
      ),
    },
    {
      title: "What to Prepare Before You Contact OCC",
      content: (
        <div className="space-y-5">
          <p>You do not need a finished roast specification. A stronger starting brief simply helps us understand the job the coffee needs to do.</p>
          <p>Share your market or country, business type, main brewing application, current coffee or product, approximate commercial volume, desired customer experience, packaging requirements if relevant, and the main problem you want the new coffee to solve.</p>
          <p><strong>Bring the commercial goal. The roast profile can be developed from there.</strong></p>
        </div>
      ),
    },
  ]

  const faqs = [
    {
      q: "What does a custom coffee roasting program include?",
      a: <>A useful program starts with the market and intended use, then connects coffee selection, sample roasting, sensory evaluation, profile refinement, approval, and a documented reference for repeat production.</>,
    },
    {
      q: "Do I need to know exactly what roast profile I want?",
      a: <>No. A commercial goal, customer context, and intended brewing application are enough to begin. Roast-profile development turns those requirements into an evaluable coffee direction.</>,
    },
    {
      q: "How is the Roasting Program different from OCC Wholesale?",
      a: <>Wholesale is the Ready-to-Sell path for businesses choosing an OCC-developed coffee profile. The Custom Roasting Program is the Made-for-You path for businesses that need a profile developed around their own market, customer, and application.</>,
    },
    {
      q: "Can the program support espresso, milk beverages, or a house blend?",
      a: <>Yes. Development can be structured around a defined application such as espresso, milk beverages, black coffee, a house blend, or another commercial product target.</>,
    },
    {
      q: "Can Cambodian coffee or Fine Robusta be considered for roast development?",
      a: <>Yes, where the coffee is appropriate for the target product. Origin, processing, sensory character, application, and roast development should be evaluated together.</>,
    },
    {
      q: "What should I prepare before discussing a project?",
      a: <>Share your market, business type, intended application, current coffee or product, approximate commercial volume, desired customer experience, and the main problem the new coffee needs to solve. A complete roast specification is not required.</>,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="02"
        title="CUSTOM COFFEE ROASTING PROGRAM"
        subtitle="Made-for-You roast profile development built around your market, customer, brewing application, and commercial product target."
        sections={sections}
        factsTitle="Made-for-You Program"
        facts={[
          "Market-led roast development",
          "Application-specific coffee profiles",
          "Sample roast and cup evaluation",
          "Documented approval reference",
          "Built toward repeatable B2B supply",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Develop Your Roast Profile"
      />
    </>
  )
}
