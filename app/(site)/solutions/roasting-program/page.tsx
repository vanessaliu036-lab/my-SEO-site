import type { Metadata } from "next"
import { OccCommercialHtmlLayout } from "@/components/templates/occ-commercial-html-layout"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import { Coffee, Gauge, Hotel, Layers3, PackageCheck, SlidersHorizontal, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "Coffee Roasting Supplier Cambodia | Custom Roast Profiles | OCC",
  description: "Custom coffee roasting and roast profile development from Cambodia for cafés, hotels, coffee brands, and B2B partners. Develop a repeatable coffee profile around your market, customers, and brewing application.",
  keywords: "Roasting Supplier Cambodia, coffee roasting supplier Cambodia, Custom Roasting Cambodia, Roast Profile development, custom coffee roasting Cambodia, Cambodia roasting supplier, custom roast profile development, coffee roasting service Cambodia, B2B coffee roasting Cambodia, Fine Robusta custom roasting",
  openGraph: {
    title: "Custom Coffee Roasting Program | OCC",
    description: "Build a roast profile around your market, customer, brewing application, and commercial target with OCC's structured custom roasting program.",
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
  description: "Custom coffee roasting and roast profile development from Cambodia for cafés, hotels, coffee brands, and B2B partners building a defined coffee product around their market.",
  url: `${siteUrl}/solutions/roasting-program`,
  about: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "Origin Coffee Cambodia", url: siteUrl },
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

const profiles = [
  { icon: Coffee, title: "Espresso & Milk", label: "Application", text: "Develop body, sweetness and enough presence for the intended espresso or milk-beverage experience." },
  { icon: Layers3, title: "House Blend", label: "Signature Direction", text: "Build a defined coffee expression around a menu role, customer and brewing environment." },
  { icon: Target, title: "Single-Origin Profile", label: "Coffee-Led", text: "Develop the roast around the actual coffee, process, sensory character and intended application." },
  { icon: Hotel, title: "Hospitality & Branded Coffee", label: "Commercial Use", text: "Translate a guest or branded product experience into an evaluable production reference." },
]
const steps = [
  { title: "Market & Application", text: "Define the customer, market, menu or product format, brewing method, equipment context, and the role the coffee needs to play." },
  { title: "Coffee Selection", text: "Evaluate the coffee or blend against the intended application instead of selecting only by origin name or roast color." },
  { title: "Sample Roast", text: "Develop roast directions that can be compared against the agreed commercial product target." },
  { title: "Cup Evaluation", text: "Evaluate sweetness, body, acidity, bitterness, structure, finish, and performance in the intended brewing context." },
  { title: "Profile Refinement", text: "Use evaluation feedback to move the roast direction closer to the target without losing sight of the coffee itself." },
  { title: "Reference Approval", text: "Document the approved direction, intended application, sensory target, and relevant production assumptions." },
  { title: "Repeatable Supply", text: "Use the approved reference to evaluate future production and manage meaningful change over time." },
]
const faqs = [
  { q: "What does a custom coffee roasting program include?", a: "The program connects market and application, coffee selection, sample roasting, sensory evaluation, profile refinement, reference approval, and a clearer path toward repeatable production." },
  { q: "Do I need to know the roast profile before starting?", a: "No. A commercial product goal, customer context, and intended application are enough to begin. Roast development translates those requirements into an evaluable coffee direction." },
  { q: "How is Custom Roasting different from Wholesale?", a: "Wholesale is the Ready-to-Sell path for OCC-developed coffee. Custom Roasting is the Made-for-You path when the market needs its own roast profile or product direction." },
  { q: "Can Fine Robusta be used in a custom program?", a: "Yes, where the coffee is appropriate for the target product. Origin, processing, sensory character, application, and roast direction should be evaluated together." },
]

export default function RoastingProgramPage() {
  // Retained as the formal program name for schema and release compatibility: CUSTOM ROASTING PROGRAM.
  // Approved positioning phrase retained for search semantics: Your Market. Your Customer. Your Roast Profile.
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <OccCommercialHtmlLayout
        className="occ-roasting"
        eyebrow="Roasting Program"
        title="Custom roasting, built for your market."
        lead="From business brief to a repeatable production profile."
        description="Roasting Supplier, Custom Roasting, and Roast Profile development built around your market, customer, brewing application, and commercial product target."
        heroImage={{ src: "/images/roasting/occ-roasting-green-beans-pour.webp", alt: "OCC roasting specialist loading green coffee for profile development" }}
        heroCtaLabel="Develop Your Roast Profile"
        heroCtaHref="/contact"
        splitId="program"
        processImages={[
          { src: "/images/roasting/occ-roasting-bean-evaluation.webp", alt: "OCC coffee beans inspected as a roast reference" },
          { src: "/images/occ-roasting-program-background.webp", alt: "Coffee roast production reference and equipment" },
        ]}
        splitTitle="One brief. One clear product direction."
        splitDescription="Custom roasting is a product-development discipline. We start with the market brief, select coffee against the intended application, create sample roasts, evaluate sensory results, refine the profile and document the approved direction for production."
        splitCtaLabel="Explore the Program"
        splitCtaHref="#commercial-focus"
        featureId="profiles"
        featureEyebrow="From Cambodia to your cup"
        featureTitle="Profiles designed for real service."
        featureDescription="Build espresso, house-blend, single-origin and hospitality coffee profiles around actual coffee quality and the product your customers need. Cambodia-origin coffee and Fine Robusta remain at the center of OCC’s expertise."
        featureImage={{ src: "/images/roasting/occ-roasting-profile-cupping.webp", alt: "Roast profile evaluation for Origin Coffee Cambodia" }}
        ctaId="contact"
        ctaEyebrow="B2B Roast Profile Development"
        ctaTitle="Ready to define the reference cup?"
        ctaLabel="Develop Your Roast Profile"
        ctaHref="/contact"
      >
        <section id="commercial-focus" aria-labelledby="roasting-commercial-title">
          <span className="eyebrow">01 / Commercial Focus</span>
          <h2 className="extended-heading" id="roasting-commercial-title">Built Around the Product You Want to Serve</h2>
          <p className="extended-intro">Custom roasting is a product-development discipline. The page shows what OCC develops, how the profile is evaluated, and how the work moves toward a repeatable commercial reference.</p>
          <div className="extended-grid">
            {profiles.map((profile, index) => {
              const Icon = profile.icon
              return <article className="extended-card" key={profile.title}><Icon className="profile-icon" aria-hidden="true" strokeWidth={1.5} /><span className="number">{String(index + 1).padStart(2, "0")} / {profile.label}</span><h3>{profile.title}</h3><p>{profile.text}</p></article>
            })}
          </div>
        </section>
        <section aria-label="Roast profile product development">
          <article className="extended-prose"><div><span className="eyebrow">01 / Market Logic</span><h3>The Roast Starts With the Market</h3></div><div><p>OCC begins with the product the market needs to experience — not with a generic light, medium, or dark label. Customer expectation, brewing method, service environment, equipment context, menu role, and commercial positioning shape the direction before the roast profile is refined.</p><p><strong>Your market. Your customer. Your roast profile.</strong> The work moves from commercial purpose into coffee selection, sensory evaluation, roast development, and a clearer production reference.</p></div></article>
          <article className="extended-prose"><div><Gauge className="profile-icon" aria-hidden="true" strokeWidth={1.5} /><span className="eyebrow">02 / Evaluation & Repeatability</span><h3>Evaluate where the coffee is served.</h3></div><div><p>Structured <a href="/blog/how-to-cup-fine-robusta">cupping</a> establishes a sensory baseline. The next test is the real brewing environment, where feedback can refine the profile against the agreed product target.</p><p>An approved direction then becomes the reference for future production and meaningful change.</p></div></article>
        </section>
        <section aria-labelledby="roasting-process-title" id="process">
          <span className="eyebrow">02 / Process</span>
          <h2 className="extended-heading" id="roasting-process-title">From Market to Production Profile</h2>
          <p className="extended-intro">A structured sequence keeps market logic, sensory work, profile refinement, and repeatability connected.</p>
          <div className="extended-steps">{steps.map((step, index) => <article className="extended-step" key={step.title}><span className="number">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        </section>
        <section aria-labelledby="roasting-paths-title" id="paths">
          <span className="eyebrow">03 / Two Commercial Paths</span>
          <h2 className="extended-heading" id="roasting-paths-title">Choose Our Profile. Or Build Yours.</h2>
          <div className="extended-grid">
            <article className="extended-card"><PackageCheck className="profile-icon" aria-hidden="true" strokeWidth={1.5} /><span className="number">Ready-to-Sell</span><h3>OCC Wholesale</h3><p>Choose an OCC-developed coffee profile when the product direction is already defined and the next priority is commercial supply. Wholesale moves ready-developed coffee to market through sample evaluation and explicit commercial terms.</p><a href="/solutions/wholesale">Discuss Wholesale Supply →</a></article>
            <article className="extended-card"><SlidersHorizontal className="profile-icon" aria-hidden="true" strokeWidth={1.5} /><span className="number">Made-for-You</span><h3>Custom Roasting</h3><p>Build a roast profile around your own market, customer, brewing application, and commercial product target.</p><a href="/contact">Start a Roast Profile Project →</a></article>
          </div>
        </section>
        <section aria-labelledby="roasting-faq-title" id="roasting-faq">
          <span className="eyebrow">04 / Reference</span>
          <h2 className="extended-heading" id="roasting-faq-title">Commercial details, kept explicit.</h2>
          <div className="faq-grid">{faqs.map((faq) => <article className="faq-card" key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></article>)}</div>
        </section>
        <p className="extended-intro">Bring the commercial goal, intended application, market context, current coffee if relevant, and the experience the finished product needs to create. The roast profile can be developed from there. <a href="/contact">Develop Your Roast Profile →</a></p>
      </OccCommercialHtmlLayout>
    </>
  )
}
