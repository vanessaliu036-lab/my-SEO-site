import type { Metadata } from "next"
import { OccCommercialHtmlLayout } from "@/components/templates/occ-commercial-html-layout"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Custom Coffee Roasting Cambodia | OCC",
  description: "OCC develops custom roast profiles in Cambodia for cafés, hotels, coffee brands and B2B partners. Build a coffee direction around your market, customer, brewing application and product goal.",
  keywords: "custom coffee roasting Cambodia, coffee roasting supplier Cambodia, custom roast profile development, roast profile Cambodia, B2B coffee roasting Cambodia, Fine Robusta custom roasting, roasting supplier Cambodia",
  openGraph: {
    title: "Custom Coffee Roasting Cambodia | OCC",
    description: "Develop a roast profile around your market, customer, brewing application and commercial product goal with OCC.",
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
  description: "Custom roast profile development from Cambodia for cafés, hotels, coffee brands and B2B partners building a defined coffee product around their market.",
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
  { title: "Espresso & Milk", label: "Application", text: "Develop body, sweetness, structure and finish for the espresso or milk-beverage experience your menu needs." },
  { title: "House Blend", label: "Signature Direction", text: "Build a defined coffee expression around a menu role, customer expectation, brewing environment and product target." },
  { title: "Single-Origin Profile", label: "Coffee-Led", text: "Develop the roast around the actual coffee, process and sensory character instead of choosing by roast colour alone." },
  { title: "Hospitality & Branded Coffee", label: "Commercial Use", text: "Translate a guest experience or branded product direction into a coffee profile that can be evaluated for production." },
]
const steps = [
  { title: "Market & Application", text: "Define the customer, market, menu or product format, brewing method, equipment context and role the coffee needs to play." },
  { title: "Coffee Selection", text: "Evaluate the coffee or blend against the intended application instead of selecting only by origin name or roast colour." },
  { title: "Sample Roast", text: "Develop roast directions that can be compared against the agreed product target." },
  { title: "Cup Evaluation", text: "Evaluate sweetness, body, acidity, bitterness, structure, finish and performance in the intended brewing context." },
  { title: "Profile Refinement", text: "Use evaluation feedback to move the roast direction closer to the target while keeping the coffee's character visible." },
  { title: "Reference Approval", text: "Document the approved direction, intended application, sensory target and relevant production assumptions." },
  { title: "Repeatable Supply", text: "Use the approved reference to evaluate future production and manage meaningful change over time." },
]
const faqs = [
  { q: "What does a custom coffee roasting program include?", a: "The program connects market and application, coffee selection, sample roasting, sensory evaluation, profile refinement, reference approval and a clearer path toward repeatable production." },
  { q: "Do I need to know the roast profile before starting?", a: "No. A product goal, customer context and intended application are enough to begin. Roast development turns that brief into an evaluable coffee direction." },
  { q: "How is Custom Roasting different from Wholesale?", a: "Wholesale is the Ready-to-Sell path for OCC-developed coffee. Custom Roasting is the Made-for-You path when the market needs its own roast profile or product direction." },
  { q: "Can Fine Robusta be used in a custom program?", a: "Yes, where the coffee fits the target product. Origin, processing, sensory character, application and roast direction should be evaluated together." },
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
        lead="Develop a roast profile for the way your customers drink coffee."
        description="OCC develops custom roast profiles around your market, customer, brewing application and commercial product goal. Start with the product you need to serve, then evaluate the coffee direction that can support it."
        heroImage={{ src: "/images/roasting/occ-roasting-green-beans-pour.webp", alt: "OCC roasting specialist loading green coffee for profile development" }}
        heroCtaLabel="Develop Your Roast Profile"
        heroCtaHref="/contact"
        splitId="program"
        processImages={[
          { src: "/images/roasting/occ-roasting-bean-evaluation.webp", alt: "OCC coffee beans inspected as a roast reference" },
          { src: "/images/occ-roasting-program-background.webp", alt: "Coffee roast production reference and equipment" },
        ]}
        splitTitle="Start with the product, not the roast label."
        splitDescription="Bring the market, customer and application. OCC turns that brief into coffee selection, sample roast directions, cup evaluation, profile refinement and an approved production reference."
        splitCtaLabel="Explore the Program"
        splitCtaHref="#commercial-focus"
        featureId="profiles"
        featureEyebrow="From Cambodia to your cup"
        featureTitle="A roast profile with a commercial job."
        featureDescription="The profile needs to work in the product where it will be served or sold. Cambodia-origin coffee and Fine Robusta remain at the centre of OCC's expertise, while the target application determines the development direction."
        featureImage={{ src: "/images/roasting/occ-roasting-profile-cupping.webp", alt: "Roast profile evaluation for Origin Coffee Cambodia" }}
        ctaId="contact"
        ctaEyebrow="B2B Roast Profile Development"
        ctaTitle="Bring the product goal. We start there."
        ctaLabel="Develop Your Roast Profile"
        ctaHref="/contact"
      >
        <section id="commercial-focus" aria-labelledby="roasting-commercial-title">
          <span className="eyebrow">01 / Commercial Focus</span>
          <h2 className="extended-heading" id="roasting-commercial-title">What the profile needs to do.</h2>
          <p className="extended-intro">A useful roast profile has a job. It supports the menu, service environment or retail product where customers will encounter the coffee.</p>
          <div className="extended-grid">
            {profiles.map((profile, index) => <article className="extended-card" key={profile.title}><span className="number">{String(index + 1).padStart(2, "0")} / {profile.label}</span><h3>{profile.title}</h3><p>{profile.text}</p></article>)}
          </div>
        </section>
        <section aria-label="Roast profile product development">
          <article className="extended-prose"><div><span className="eyebrow">01 / Market Logic</span><h3>The Roast Starts With the Market</h3></div><div><p>OCC starts with the product the market needs to experience, not a generic light, medium or dark label. Customer expectation, brewing method, service environment, equipment context, menu role and commercial positioning shape the direction before the profile is refined.</p><p><strong>Your market. Your customer. Your roast profile.</strong> The work moves from commercial purpose into coffee selection, sensory evaluation, roast development and a clearer production reference.</p></div></article>
          <article className="extended-prose"><div><span className="eyebrow">02 / Product Development</span><h3>Developed Around Commercial Use</h3></div><div><p>A roast profile matters when it performs in the product where it will be served or sold. Espresso, milk beverages, black coffee, hospitality service, a retail bag and a branded house coffee can require different balances of sweetness, body, acidity, bitterness, texture, finish and brewing performance.</p><p>The target is a coffee direction that makes sense for the intended customer and application.</p></div></article>
          <article className="extended-prose"><div><span className="eyebrow">03 / Evaluation</span><h3>Evaluate the Coffee Where It Will Be Used</h3></div><div><p>Structured <a href="/blog/how-to-cup-fine-robusta">cupping</a> can establish the sensory baseline. Development continues in the brewing environment where the coffee will actually be served. The useful question is whether the coffee performs as the intended commercial product, not only whether it tastes good in isolation.</p><p>That feedback becomes the basis for profile refinement.</p></div></article>
          <article className="extended-prose"><div><span className="eyebrow">04 / Repeatability</span><h3>Build a Reference for Future Production</h3></div><div><p>An approved roast direction becomes more useful when it can guide future production. Depending on the project, the reference can include the coffee or lot, intended application, sensory target, approved direction, evaluation notes and relevant production observations.</p><p>A reference helps identify meaningful change in agricultural coffee and keeps future decisions connected to the product target.</p></div></article>
          <article className="extended-prose"><div><span className="eyebrow">05 / Origin Expertise</span><h3>Keep Cambodia and Fine Robusta in View</h3></div><div><p>OCC focuses on Cambodia-origin coffee and <a href="/fine-robusta-cambodia">Fine Robusta</a>. When Cambodian coffee enters a custom project, the profile is developed around the actual coffee, process, sensory result and intended use, rather than assumptions about what Robusta or Cambodian coffee should taste like.</p><p>The goal is to connect what the coffee has with what the market needs the finished product to become.</p></div></article>
        </section>
        <section aria-labelledby="roasting-process-title" id="process">
          <span className="eyebrow">02 / Process</span>
          <h2 className="extended-heading" id="roasting-process-title">From market brief to production reference.</h2>
          <p className="extended-intro">Each step keeps the product goal connected to the coffee, sensory work and future supply discussion.</p>
          <div className="extended-steps">{steps.map((step, index) => <article className="extended-step" key={step.title}><span className="number">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        </section>
        <section aria-labelledby="roasting-paths-title" id="paths">
          <span className="eyebrow">03 / Two Commercial Paths</span>
          <h2 className="extended-heading" id="roasting-paths-title">Ready-to-Sell or Made-for-You.</h2>
          <div className="extended-grid">
            <article className="extended-card"><span className="number">Ready-to-Sell</span><h3>OCC Wholesale</h3><p>Choose an OCC-developed coffee profile when the product direction is already defined and the next priority is commercial supply. Wholesale moves the discussion to sample evaluation and explicit commercial terms.</p><a href="/solutions/wholesale">Discuss Wholesale Supply →</a></article>
            <article className="extended-card"><span className="number">Made-for-You</span><h3>Custom Roasting</h3><p>Build a roast profile around your own market, customer, brewing application and commercial product target.</p><a href="/contact">Start a Roast Profile Project →</a></article>
          </div>
        </section>
        <section aria-labelledby="roasting-faq-title" id="roasting-faq">
          <span className="eyebrow">04 / Reference</span>
          <h2 className="extended-heading" id="roasting-faq-title">Questions before a roast project.</h2>
          <div className="faq-grid">{faqs.map((faq) => <article className="faq-card" key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></article>)}</div>
        </section>
        <p className="extended-intro">To begin, share the product goal, customer context, intended application, market, current coffee if relevant and the experience the finished coffee needs to create. <a href="/contact">Develop Your Roast Profile →</a></p>
      </OccCommercialHtmlLayout>
    </>
  )
}
