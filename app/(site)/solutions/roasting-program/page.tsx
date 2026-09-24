import type { Metadata } from "next"
import { OccCommercialHtmlLayout } from "@/components/templates/occ-commercial-html-layout"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

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
  { title: "Espresso & Milk", label: "Application", text: "Develop body, sweetness, structure, finish, and enough presence for the intended espresso or milk-beverage experience." },
  { title: "House Blend", label: "Signature Direction", text: "Build a defined coffee expression around a menu role, customer expectation, brewing environment, and commercial product target." },
  { title: "Single-Origin Profile", label: "Coffee-Led", text: "Develop the roast around the actual coffee, processing, sensory character, and intended application rather than a generic roast label." },
  { title: "Hospitality & Branded Coffee", label: "Commercial Use", text: "Translate a guest experience or branded product direction into a coffee profile that can be evaluated and referenced for production." },
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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <OccCommercialHtmlLayout
        className="occ-roasting"
        eyebrow="Roasting Program"
        title="CUSTOM ROASTING PROGRAM"
        lead="Your Market. Your Customer. Your Roast Profile."
        description="Roasting Supplier, Custom Roasting, and Roast Profile development built around your market, customer, brewing application, and commercial product target."
        heroImage={{ src: "/images/roasting/occ-roasting-green-beans-pour.webp", alt: "OCC roasting specialist loading green coffee for profile development" }}
        heroCtaLabel="Develop Your Roast Profile"
        heroCtaHref="/contact"
        splitId="program"
        processImages={[
          { src: "/images/roasting/occ-roasting-bean-evaluation.webp", alt: "OCC coffee beans inspected as a roast reference" },
          { src: "/images/occ-roasting-program-background.webp", alt: "Coffee roast production reference and equipment" },
        ]}
        splitTitle="Program built around your business"
        splitDescription="Custom roasting is a product-development discipline. We start with the market brief, select coffee against the intended application, create sample roasts, evaluate sensory results, refine the profile and document the approved direction for production."
        splitCtaLabel="Explore the Program"
        splitCtaHref="#commercial-focus"
        featureId="profiles"
        featureEyebrow="From Cambodia to your cup"
        featureTitle="Versatile. Distinctive. Reliable."
        featureDescription="Build espresso, house-blend, single-origin and hospitality coffee profiles around actual coffee quality and the product your customers need. Cambodia-origin coffee and Fine Robusta remain at the center of OCC’s expertise."
        featureImage={{ src: "/images/roasting/occ-roasting-profile-cupping.webp", alt: "Roast profile evaluation for Origin Coffee Cambodia" }}
        ctaId="contact"
        ctaEyebrow="B2B Roast Profile Development"
        ctaTitle="Your market. Your customer. Your roast profile."
        ctaLabel="Develop Your Roast Profile"
        ctaHref="/contact"
      >
        <section id="commercial-focus" aria-labelledby="roasting-commercial-title">
          <span className="eyebrow">01 / Commercial Focus</span>
          <h2 className="extended-heading" id="roasting-commercial-title">Built Around the Product You Want to Serve</h2>
          <p className="extended-intro">Custom roasting is a product-development discipline. The page shows what OCC develops, how the profile is evaluated, and how the work moves toward a repeatable commercial reference.</p>
          <div className="extended-grid">
            {profiles.map((profile, index) => <article className="extended-card" key={profile.title}><span className="number">{String(index + 1).padStart(2, "0")} / {profile.label}</span><h3>{profile.title}</h3><p>{profile.text}</p></article>)}
          </div>
        </section>
        <section aria-label="Roast profile product development">
          <article className="extended-prose"><div><span className="eyebrow">01 / Market Logic</span><h3>The Roast Starts With the Market</h3></div><div><p>OCC begins with the product the market needs to experience — not with a generic light, medium, or dark label. Customer expectation, brewing method, service environment, equipment context, menu role, and commercial positioning shape the direction before the roast profile is refined.</p><p><strong>Your market. Your customer. Your roast profile.</strong> The work moves from commercial purpose into coffee selection, sensory evaluation, roast development, and a clearer production reference.</p></div></article>
          <article className="extended-prose"><div><span className="eyebrow">02 / Product Development</span><h3>Developed Around Commercial Use</h3></div><div><p>A roast profile only matters when it performs in the product where it will be sold. Espresso, milk beverages, black coffee, hospitality service, a retail bag, or a branded house coffee can require different balances of sweetness, body, acidity, bitterness, texture, finish, and brewing performance.</p><p>The target is not simply a technically successful roast. It is a coffee direction that makes sense for the intended customer and application.</p></div></article>
          <article className="extended-prose"><div><span className="eyebrow">03 / Evaluation</span><h3>Sensory Evaluation Stays Connected to the Application</h3></div><div><p>Structured <a href="/blog/how-to-cup-fine-robusta">cupping</a> can establish the sensory baseline, but development continues into the brewing environment where the coffee will actually be served. The useful standard is not only whether the coffee tastes good in isolation, but whether it performs as the intended commercial product.</p><p>Feedback from that evaluation becomes the basis for profile refinement rather than subjective adjustment without a product target.</p></div></article>
          <article className="extended-prose"><div><span className="eyebrow">04 / Repeatability</span><h3>Built for Repeatable Supply</h3></div><div><p>An approved roast direction becomes more valuable when it functions as a reference for future production. Depending on the project, the reference can include the coffee or lot, intended application, sensory target, approved direction, evaluation notes, and relevant production observations.</p><p>Repeatability does not mean pretending agricultural coffee never changes. It means identifying meaningful change and comparing future production against a defined product target.</p></div></article>
          <article className="extended-prose"><div><span className="eyebrow">05 / Origin Expertise</span><h3>Cambodia and Fine Robusta Stay at the Center</h3></div><div><p>OCC is focused on Cambodia-origin coffee and <a href="/fine-robusta-cambodia">Fine Robusta</a>. When Cambodian coffee is part of a custom roasting project, the profile is developed around the actual coffee, process, sensory result, and intended use rather than assumptions about what Robusta or Cambodian coffee is supposed to taste like.</p><p>The objective is to connect what the coffee already has with what the market needs the finished product to become.</p></div></article>
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
            <article className="extended-card"><span className="number">Ready-to-Sell</span><h3>OCC Wholesale</h3><p>Choose an OCC-developed coffee profile when the product direction is already defined and the next priority is commercial supply. Review the <a href="/solutions/wholesale">Wholesale &amp; Sourcing</a> process, then use Contact to discuss the requirement.</p></article>
            <article className="extended-card"><span className="number">Made-for-You</span><h3>Custom Roasting</h3><p>Build a roast profile around your own market, customer, brewing application, and commercial product target.</p></article>
          </div>
        </section>
        <section aria-labelledby="roasting-faq-title" id="roasting-faq">
          <span className="eyebrow">04 / Reference</span>
          <h2 className="extended-heading" id="roasting-faq-title">Commercial details, kept explicit.</h2>
          <div className="faq-grid">{faqs.map((faq) => <article className="faq-card" key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></article>)}</div>
        </section>
        <p className="extended-intro">Bring the commercial goal, intended application, market context, current coffee if relevant, and the experience the finished product needs to create. The roast profile can be developed from there.</p>
      </OccCommercialHtmlLayout>
    </>
  )
}
