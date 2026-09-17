import type { Metadata } from "next"
import Link from "next/link"
import { WholesaleEditorialTemplate } from "@/components/templates/wholesale-editorial-template"
import { siteUrl, ogImage } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

const pageTitle = "Wholesale Coffee Cambodia | B2B Coffee Supply | OCC"
const pageDescription = "Evaluate wholesale coffee supply in Cambodia with guidance on samples, quality, origin documentation, MOQ, volume and delivery requirements."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: "wholesale coffee Cambodia, Cambodian coffee supplier, coffee supplier Cambodia, Fine Robusta supplier, wholesale supplier Cambodia, B2B coffee supplier Cambodia, Fine Robusta wholesale, specialty coffee wholesale Cambodia, Cambodia green coffee, roasted coffee wholesale Cambodia, coffee sourcing Cambodia",
  alternates: pageAlternates("/solutions/wholesale"),
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteUrl}/solutions/wholesale`,
    siteName: "Origin Coffee Cambodia",
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Wholesale Coffee Cambodia — OCC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
  },
}

const faqs = [
  {
    q: "What can OCC supply to wholesale coffee buyers?",
    a: "OCC evaluates B2B supply requirements for Cambodia-origin coffee, including Fine Robusta, green coffee, roasted coffee and OCC-developed commercial coffee directions. Product and lot availability must be confirmed for each enquiry.",
  },
  {
    q: "Can wholesale buyers evaluate a sample before ordering?",
    a: "A sample or closest commercial reference should be evaluated before larger-volume or recurring-supply terms are agreed. Buyers should confirm the sample, product specification, intended use and acceptance criteria.",
  },
  {
    q: "How are MOQ, pricing and lead time handled?",
    a: "MOQ, price, lead time and delivery depend on the coffee, format, current availability, required volume, packaging, destination and agreed responsibilities. OCC confirms terms for the specific project instead of publishing an unsupported universal number.",
  },
  {
    q: "What should a wholesale coffee buyer clarify before committing?",
    a: "Specify coffee format, target cup profile, sample approval, lot or specification identity, origin and processing evidence, MOQ, volume, pricing basis, delivery responsibility, quality acceptance and substitution rules.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
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

const highlightCards = [
  { title: "Fine Robusta", meta: "Cambodia Origin", text: "A differentiated Cambodian Canephora direction for buyers evaluating quality, origin, cup character and commercial fit." },
  { title: "Roasted Coffee", meta: "Ready-to-Sell", text: "OCC-developed roasted coffee directions for professional buyers evaluating retail, hospitality and B2B applications." },
  { title: "Green Coffee", meta: "Professional Supply", text: "A sourcing and evaluation path for roasters and importers where the available coffee fits the requirement." },
  { title: "Buyer Verification", meta: "Evidence Before Commitment", text: "Define sample approval, lot or specification identity, quality evidence, MOQ and delivery terms before proceeding." },
]

const sections = [
  {
    label: "01 / Market Path",
    title: "From Origin to Market",
    content: (
      <div className="space-y-6">
        <h3 className="text-xl font-medium">Who This Is For</h3>
        <p>This page is for cafés, hotels, restaurants, offices, roasters, importers and multi-location operators evaluating wholesale coffee supply in Cambodia. Buyers can compare format, quality evidence, volume, documentation and delivery requirements before committing to a commercial arrangement.</p>
        <p>OCC connects Cambodia origin, coffee selection, quality evaluation, product direction and commercial supply into one clearer route to market. The purpose is not to present coffee as anonymous volume; it is to make the product, evidence and supply decision easier to evaluate before scale.</p>
        <p>For buyers focused on Cambodian Canephora, <Link href="/fine-robusta-cambodia" className="border-b border-[#182019]/45 font-medium">Fine Robusta Cambodia</Link> remains the central quality and origin reference.</p>
      </div>
    ),
  },
  {
    label: "02 / Ready-to-Sell",
    title: "The Product Direction Is Already Defined",
    content: (
      <div className="space-y-6">
        <h3 className="text-xl font-medium">Define the Coffee Requirement First</h3>
        <p>Before contacting suppliers, define whether you need green coffee, roasted coffee or a structured roast program. Specify the target cup profile, intended brewing or retail application, delivery location, expected volume and sample approval process before comparing offers.</p>
        <p>Wholesale is the Ready-to-Sell path. OCC has made core product-direction decisions for the commercial coffee being evaluated; actual product availability and specifications remain subject to confirmation.</p>
        <p>This reduces the product-development decisions a retailer, hotel, café group or B2B buyer needs to resolve. If the market needs its own roast profile, use the <Link href="/solutions/roasting-program" className="border-b border-[#182019]/45 font-medium">Custom Roasting Program</Link>.</p>
      </div>
    ),
  },
  {
    label: "03 / Verification",
    title: "Origin, Quality and Traceability Stay Connected",
    content: (
      <div className="space-y-6">
        <h3 className="text-xl font-medium">What to Evaluate Before Buying</h3>
        <div className="space-y-4">
          <h4 className="font-semibold">Coffee Format and Intended Use</h4>
          <p>Confirm green or roasted format, brew method, target sensory profile, packaging and end customer.</p>
          <h4 className="font-semibold">Sample Approval and Lot Identity</h4>
          <p>Agree on the reference sample, product specification, lot identity when available and the criteria for accepting a later order.</p>
          <h4 className="font-semibold">Origin and Processing Documentation</h4>
          <p>Match Cambodia-origin, processing and traceability claims to the actual coffee or lot being evaluated; ask which records are available rather than assuming every document exists.</p>
          <h4 className="font-semibold">MOQ, Volume and Delivery</h4>
          <p>Confirm minimum order quantity, quantity basis, current availability, destination, lead time, freight scope and delivery responsibility for the specific project.</p>
          <h4 className="font-semibold">Quality Acceptance and Substitution Rules</h4>
          <p>Set sensory and specification acceptance criteria, record approvals, and agree what happens if the original coffee is unavailable. No substitute should silently replace the approved reference.</p>
        </div>
        <p>A professional coffee supplier should connect commercial claims to the coffee being evaluated. <Link href="/blog/how-to-cup-fine-robusta" className="border-b border-[#182019]/45 font-medium">Cupping</Link> can help establish a sensory baseline before recurring supply is discussed.</p>
      </div>
    ),
  },
  {
    label: "04 / Commercial Control",
    title: "Commercial Terms Stay Explicit",
    content: (
      <div className="space-y-6">
        <h3 className="text-xl font-medium">What a Wholesale Agreement Should Clarify</h3>
        <p>Wholesale coffee buyers should define coffee format, target cup profile, sample approval, volume, MOQ, documentation and delivery requirements before committing to a supplier.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Approved sample, coffee specification and lot identity where applicable.</li>
          <li>MOQ, volume basis, price basis and current availability.</li>
          <li>Origin, processing and quality documentation that can be supplied.</li>
          <li>Lead time, delivery and storage responsibilities.</li>
          <li>Quality acceptance, substitution policy and change management.</li>
        </ul>
        <p>MOQ, pricing basis, lead time, packaging scope, delivery responsibility, current availability and substitution rules depend on the actual coffee and project. OCC keeps those variables explicit rather than turning one commercial assumption into a universal promise.</p>
        <p>Start a wholesale enquiry with your format, target application, estimated volume, destination, desired timing and documentation requirements.</p>
      </div>
    ),
  },
  {
    label: "05 / Product Choice",
    title: "Ready-to-Sell Remains Distinct From Custom Development",
    content: (
      <div className="space-y-6">
        <p>Wholesale is for buyers choosing an OCC-developed coffee direction. When the market requires its own roast profile, application-specific cup target or coffee built around a separate product brief, the <Link href="/solutions/roasting-program" className="border-b border-[#182019]/45 font-medium">Roasting Program</Link> becomes the Made-for-You path.</p>
        <p>Supplier and wholesale intent stays on this page; explicit roast development goes to the Roasting Program. Brand and gift concepts and international territory representation are separate partnership conversations.</p>
      </div>
    ),
  },
]

const relatedLinks = [
  { title: "Fine Robusta Cambodia", description: "Origin, quality and Cambodian Canephora reference.", href: "/fine-robusta-cambodia" },
  { title: "Custom Roasting Program", description: "Build a roast profile around your market, customer and commercial application.", href: "/solutions/roasting-program" },
  { title: "Start a Wholesale Discussion", description: "Share coffee format, approved-sample criteria, volume direction and destination with OCC.", href: "/contact" },
]

const processSteps = [
  { title: "Coffee Selection", text: "Identify the OCC-developed coffee or available supply direction that fits the application." },
  { title: "Sample Evaluation", text: "Evaluate the sample or closest reference before a larger commitment is discussed." },
  { title: "Buyer Verification", text: "Review available origin, processing, quality, specification, lot and traceability evidence." },
  { title: "Commercial Terms", text: "Confirm MOQ, pricing basis, lead time, volume, delivery responsibilities and substitution rules." },
  { title: "Supply", text: "Move from the approved reference into an agreed commercial format and delivery responsibility." },
  { title: "Repeat Orders", text: "Use the approved reference and defined terms as the basis for future supply discussions." },
]

const comparison = [
  { eyebrow: "Ready-to-Sell", title: "OCC Wholesale", description: "Choose an OCC-developed coffee profile and evaluate Cambodia-origin commercial supply with a defined product direction.", href: "/solutions/wholesale", cta: "Wholesale Coffee Supply", active: true },
  { eyebrow: "Made-for-You", title: "Custom Roasting", description: "Build a roast profile around the market, customer, brewing application and product target.", href: "/solutions/roasting-program", cta: "Develop Your Roast Profile" },
] as const

export default function WholesalePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WholesaleEditorialTemplate
        index="01"
        pathLabel="READY-TO-SELL"
        title="WHOLESALE COFFEE SUPPLY"
        subtitle="Cambodia-origin coffee supply for distributors, importers, retailers, hospitality, cafés, and B2B partners — with Fine Robusta and OCC-developed coffee directions. Evaluate samples, specifications and MOQ before committing."
        heroStatement="Cambodian coffee, developed for a clearer path to market."
        heroCtaLabel="Discuss Your Wholesale Requirements"
        highlightTitle="Built for Commercial Supply"
        highlightIntro="Wholesale buyers should define coffee format, sample approval, volume, MOQ, origin evidence and delivery requirements before committing to a supplier. OCC evaluates each project against the relevant coffee and available supply."
        highlightCards={highlightCards}
        sections={sections}
        relatedLinksTitle="Related References"
        relatedLinks={relatedLinks}
        processTitle="From Sample to Supply"
        processIntro="A defined sequence keeps product evaluation, evidence, commercial terms and repeat orders connected."
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
          description: "When an OCC-developed coffee is not the exact fit, the Roasting Program develops the profile around the market, customer, brewing application and commercial product target.",
          href: "/solutions/roasting-program",
          cta: "Develop Your Roast Profile",
        }}
        comparisonTitle="Choose Our Profile. Or Build Yours."
        comparison={comparison}
        faqs={faqs.map(({ q, a }) => ({ q, a: <>{a}</> }))}
        ctaLabel="Discuss Your Wholesale Requirements"
        ctaDescription="Start with your coffee format, target application, approved-sample criteria, estimated volume, delivery location, desired timing and documentation requirements. OCC will use these details to frame a commercial discussion."
      />
      <span className="sr-only">Discuss Wholesale Supply</span>
    </>
  )
}
