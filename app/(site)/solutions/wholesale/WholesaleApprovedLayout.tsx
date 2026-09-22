import { OccCommercialHtmlLayout } from "@/components/templates/occ-commercial-html-layout"

const options = [
  { title: "Cambodian Fine Robusta", text: "For roasters and cafés evaluating Cambodian Canephora for a defined coffee direction. Ask about the specific origin, process, sample and cup profile available.", href: "/fine-robusta-cambodia", cta: "Explore Fine Robusta" },
  { title: "Roasted Coffee", text: "For hotels, cafés and retailers looking for an OCC-developed coffee to serve or sell. Discuss roast direction, format, packaging and replenishment requirements.", href: "/contact", cta: "Discuss Roasted Coffee" },
]
const steps = [
  { title: "Coffee Selection", text: "Tell OCC which Cambodian coffee or OCC-developed product you want to evaluate and where it will be used." },
  { title: "Sample Evaluation", text: "Review a sample or closest commercial reference. The available coffee must be confirmed before approval." },
  { title: "Origin & Process", text: "Review origin and processing information available for the specific coffee or lot." },
  { title: "Quality Approval", text: "Agree on the cup profile, sample acceptance and relevant product or lot specifications." },
  { title: "Commercial Terms", text: "Confirm availability, MOQ, price basis, volume, lead time, packaging and delivery responsibility." },
  { title: "Repeat Supply", text: "Use the approved reference and agreed terms to discuss future orders and any substitution rules." },
]
const buyerTerms = [
  { title: "Product & format", text: "Name the Cambodian coffee, Fine Robusta or OCC-developed roasted product you want to evaluate." },
  { title: "Buyer & market", text: "Tell OCC whether you are a roaster, retailer, hotel or café, and where the coffee will be served or sold." },
  { title: "Volume & timing", text: "Share an estimated first order, expected repeat volume and target purchasing date." },
  { title: "Samples & evidence", text: "Request the sample, cup profile, origin, processing, lot and quality information relevant to the product." },
  { title: "Packaging & delivery", text: "Describe your preferred pack format, destination and logistics requirements so the scope can be confirmed." },
  { title: "MOQ & quotation", text: "MOQ, price, lead time and shipping capability are confirmed against the actual product and destination." },
]
const faqs = [
  { q: "Where can I buy Cambodian coffee beans wholesale?", a: "Send OCC your preferred format, destination and estimated volume. We can then discuss the relevant Cambodia-origin coffee option and confirm what is available for your enquiry." },
  { q: "Can I request a Cambodian Fine Robusta sample?", a: "Yes, start with the coffee you want to evaluate. OCC will confirm the available sample or closest commercial reference before any order is discussed." },
  { q: "Does OCC offer wholesale roasted coffee for cafés and hotels?", a: "OCC discusses developed roasted-coffee directions for professional use. Roast direction, format, packaging and availability are confirmed against the requirement." },
  { q: "What are your MOQ, wholesale prices and lead times?", a: "MOQ, price basis, volume, packaging, destination and lead time depend on the actual product and order conditions. OCC confirms the commercial terms for each enquiry." },
  { q: "Can OCC create a custom roast or private-label product?", a: "Wholesale covers OCC-developed coffee. A made-to-order roast profile belongs to the Roasting Program. Private-label packaging requires a separate feasibility discussion." },
  { q: "Which countries can you ship to?", a: "Share your destination and delivery requirements. Export documentation, logistics responsibility and shipping feasibility are confirmed for the actual order." },
]

export function WholesaleApprovedLayout() {
  return (
    <OccCommercialHtmlLayout
      className="occ-wholesale"
      eyebrow="Cambodia-origin coffee for business"
      title="WHOLESALE COFFEE SUPPLY"
      lead="Source Cambodian coffee for your menu, roast or retail product."
      description="OCC works with roasters, cafés, hotels and retailers sourcing 100% Cambodia-origin coffee. Choose the coffee direction, request the relevant evidence and discuss supply terms for your market."
      heroImage={{ src: "/images/wholesale/occ-wholesale-origin-harvest.png", alt: "Cambodian coffee harvest for OCC origin-led wholesale supply" }}
      heroCtaLabel="Discuss Wholesale Supply"
      heroCtaHref="/contact"
      splitId="why-occ"
      processImages={[
        { src: "/images/wholesale/occ-wholesale-sample-selection.webp", alt: "Roasted Cambodian coffee samples compared for wholesale selection" },
        { src: "/images/wholesale/occ-wholesale-brew-evaluation.webp", alt: "Espresso preparation used to evaluate wholesale roast performance" },
      ]}
      splitTitle="Start with the coffee your business needs."
      splitDescription={<>OCC focuses on coffee grown in Cambodia, with Fine Robusta as a specialist starting point. Buyers can connect coffee selection with origin, cup evidence and commercial terms. If you need a made-to-order roast direction, continue to our <a href="/solutions/roasting-program">Roasting Program</a>.</>}
      splitCtaLabel="Review Our Evidence"
      splitCtaHref="#evidence"
      featureId="wholesale-feature"
      featureEyebrow="One origin. Cambodia."
      featureTitle="A clearer buying conversation."
      featureDescription="Tell OCC what the coffee needs to do, where it will be used and what information you need to evaluate it. We then discuss the relevant sample, product reference and commercial conditions."
      featureImage={{ src: "/images/wholesale/occ-wholesale-packed-order.webp", alt: "Sealed roasted coffee bags prepared for a wholesale buyer order" }}
      ctaId="contact"
      ctaEyebrow="B2B Wholesale Enquiry"
      ctaTitle="Tell us what your business needs."
      ctaLabel="Discuss Wholesale Supply"
      ctaHref="/contact"
    >
      <section id="needs" aria-labelledby="wholesale-options-title">
        <span className="eyebrow">What You Can Source</span>
        <h2 className="extended-heading" id="wholesale-options-title">Choose the path that fits your business.</h2>
        <p className="extended-intro">Start with the job the coffee needs to do. OCC will discuss the available product or lot, relevant samples and the commercial requirements for your intended use.</p>
        <div className="extended-grid">
          {options.map((option, index) => <article className="extended-card" key={option.title}><span className="number">{String(index + 1).padStart(2, "0")}</span><h3>{option.title}</h3><p>{option.text}</p><a href={option.href}>{option.cta} →</a></article>)}
        </div>
      </section>
      <section aria-labelledby="wholesale-evidence-title" id="evidence">
        <span className="eyebrow">Evidence Standard</span>
        <h2 className="extended-heading" id="wholesale-evidence-title">Move from sample to supply with the right questions.</h2>
        <p className="extended-intro">Evaluate the coffee first. OCC connects the available origin and quality information with the buying requirements that determine whether a product fits your business. For sensory review, see our <a href="/blog/how-to-cup-fine-robusta">Fine Robusta cupping guide</a>.</p>
        <p className="extended-intro">Preparing a sourcing enquiry? <a href="/resources/coffee-buyer-specification-template">Use the Coffee Buyer Specification Template →</a></p>
        <div className="extended-steps" aria-label="Coffee evidence sequence">{steps.map((step, index) => <article className="extended-step" key={step.title}><span className="number">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        <p className="extended-intro">Origin records, lot details, samples and shipping arrangements depend on the actual offer. OCC confirms what can be provided for the coffee and destination you are asking about. <a href="/origins">Explore Cambodian Origins →</a></p>
      </section>
      <section aria-labelledby="wholesale-supply-title" id="supply">
        <span className="eyebrow">Your Wholesale Enquiry</span>
        <h2 className="extended-heading" id="wholesale-supply-title">Give us the brief. We will identify the next step.</h2>
        <p className="extended-intro">The faster OCC understands your product, market and timing, the faster the right supply path can be evaluated.</p>
        <div className="extended-grid">{buyerTerms.map((term, index) => <article className="extended-card" key={term.title}><span className="number">{String(index + 1).padStart(2, "0")}</span><h3>{term.title}</h3><p>{term.text}</p></article>)}</div>
      </section>
      <section aria-labelledby="wholesale-faq-title" id="wholesale-faq">
        <span className="eyebrow">Buyer Questions</span>
        <h2 className="extended-heading" id="wholesale-faq-title">Wholesale FAQs.</h2>
        <p className="extended-intro">The practical questions to settle before sample approval, quotation and a purchase commitment.</p>
        <div className="faq-grid">{faqs.map((faq) => <article className="faq-card" key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></article>)}</div>
      </section>
    </OccCommercialHtmlLayout>
  )
}
