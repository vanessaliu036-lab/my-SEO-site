import { OccCommercialHtmlLayout } from "@/components/templates/occ-commercial-html-layout"
import "./wholesale-approved.css"

const options = [
  { title: "Cambodian Fine Robusta", text: "For roasters and cafés exploring Cambodian Canephora. Ask about the specific origin, process, sample and cup profile available for evaluation.", href: "/fine-robusta-cambodia", cta: "Explore Fine Robusta" },
  { title: "Roasted Coffee", text: "For hotels, cafés and retailers seeking an OCC-developed coffee. Discuss roast direction, suitable format, packaging and replenishment requirements.", href: "/contact", cta: "Discuss Roasted Coffee" },
]
const steps = [
  { title: "Coffee Selection", text: "Tell us which OCC-developed coffee you want to evaluate and how you intend to use it." },
  { title: "Sample Evaluation", text: "Discuss a sample or closest commercial reference; approval depends on the coffee actually available." },
  { title: "Origin & Process", text: "Review origin and processing records where they are available for the specific product or lot." },
  { title: "Quality Approval", text: "Agree on cup profile, sample acceptance and relevant lot or product specifications." },
  { title: "Commercial Terms", text: "Confirm availability, MOQ, price basis, volume, lead time, packaging and delivery responsibility." },
  { title: "Repeat Supply", text: "Use the approved product and agreed terms to discuss future orders and any substitution rules." },
]
const buyerTerms = [
  { title: "Product & format", text: "Specify the Cambodian coffee or OCC-developed roasted product you need; product availability must be confirmed." },
  { title: "Buyer & market", text: "Tell us whether you are a roaster, retailer, hotel or café, and where the coffee will be used or delivered." },
  { title: "Volume & timing", text: "Provide an estimated initial order, anticipated repeat volume and target purchasing date." },
  { title: "Samples & evidence", text: "Request the relevant sample, cup profile, origin, processing, lot and quality information; available records vary by coffee." },
  { title: "Packaging & delivery", text: "Describe your preferred pack format, destination and logistics requirements so the scope can be confirmed." },
  { title: "MOQ & quotation", text: "MOQ, price, lead time and shipping capability are confirmed against the actual product and destination, not promised universally." },
]
const faqs = [
  { q: "Where can I buy Cambodian coffee beans wholesale?", a: "Contact OCC with your preferred format, destination and estimated volume. We can discuss Cambodia-origin coffee options and confirm availability for your enquiry." },
  { q: "Can I request a Cambodian Fine Robusta sample?", a: "Discuss the coffee and the sample or closest commercial reference available. Any sampling arrangement is confirmed before an order." },
  { q: "Does OCC offer wholesale roasted coffee for cafés and hotels?", a: "OCC discusses its developed roasted-coffee directions for professional use. Roast, format, packaging and availability depend on the specific requirement." },
  { q: "What are your MOQ, wholesale prices and lead times?", a: "These depend on product, lot or format, volume, packaging, destination and current availability. We confirm commercial terms for each enquiry." },
  { q: "Can OCC create a custom roast or private-label product?", a: "Wholesale covers OCC-developed coffee. A made-to-order roast profile belongs to the Roasting Program. Private-label packaging is subject to an explicit feasibility discussion, not a standing offer." },
  { q: "Which countries can you ship to?", a: "Share your destination and delivery requirements. Export documentation, logistics responsibility and shipping feasibility must be confirmed for the actual order." },
]

export function WholesaleApprovedLayout() {
  return (
    <OccCommercialHtmlLayout
      className="occ-wholesale"
      eyebrow="Cambodia-origin wholesale coffee"
      title="WHOLESALE COFFEE SUPPLY"
      lead="Cambodian coffee for the way your business buys, roasts and serves."
      description="OCC works with roasters, cafés, hotels and retailers sourcing 100% Cambodia-origin coffee. Explore Cambodian Fine Robusta and OCC-developed roasted coffee, then discuss samples, current availability and supply terms for your market."
      heroImage={{ src: "/images/wholesale/occ-wholesale-origin-harvest.png", alt: "Cambodian coffee harvest for OCC origin-led wholesale supply" }}
      heroCtaLabel="Explore Wholesale Options"
      heroCtaHref="#needs"
      splitId="why-occ"
      processImages={[
        { src: "/images/wholesale/occ-wholesale-sample-selection.webp", alt: "Roasted Cambodian coffee samples compared for wholesale selection" },
        { src: "/images/wholesale/occ-wholesale-brew-evaluation.webp", alt: "Espresso preparation used to evaluate wholesale roast performance" },
      ]}
      splitTitle="From Cambodian origin to your market."
      splitDescription={<>OCC focuses entirely on coffee grown in Cambodia, with Fine Robusta as a specialist starting point. Buyers can connect coffee selection with origin, cup evidence and commercial terms. Wholesale covers OCC-developed coffee; for made-to-order roast development, explore our <a href="/solutions/roasting-program">Roasting Program</a>.</>}
      splitCtaLabel="Review Our Evidence"
      splitCtaHref="#evidence"
      featureId="wholesale-feature"
      featureEyebrow="One origin. Cambodia."
      featureTitle="Origin. Quality. Commercial Clarity."
      featureDescription="Ask about the specific coffee, process, cup profile and available records. Discuss samples and commercial terms for your market, without promises of unconfirmed inventory, export documents or delivery capabilities."
      featureImage={{ src: "/images/wholesale/occ-wholesale-packed-order.webp", alt: "Sealed roasted coffee bags prepared for a wholesale buyer order" }}
      ctaId="contact"
      ctaEyebrow="B2B Wholesale Enquiry"
      ctaTitle="Tell us what your business needs."
      ctaLabel="Discuss Wholesale Supply"
      ctaHref="/contact"
    >
      <section id="needs" aria-labelledby="wholesale-options-title">
        <span className="eyebrow">What You Can Source</span>
        <h2 className="extended-heading" id="wholesale-options-title">Choose your wholesale path.</h2>
        <p className="extended-intro">Begin with the coffee you need, not a generic wholesale catalogue. We will discuss the available product or lot, sample options and commercial requirements for your intended use. Availability is confirmed per enquiry.</p>
        <div className="extended-grid">
          {options.map((option, index) => <article className="extended-card" key={option.title}><span className="number">{String(index + 1).padStart(2, "0")}</span><h3>{option.title}</h3><p>{option.text}</p><a href={option.href}>{option.cta} →</a></article>)}
        </div>
      </section>
      <section aria-labelledby="wholesale-evidence-title" id="evidence">
        <span className="eyebrow">Evidence Standard</span>
        <h2 className="extended-heading" id="wholesale-evidence-title">From sample to supply.</h2>
        <p className="extended-intro">Evaluate the coffee first. OCC discusses the available reference, quality evidence and practical buying requirements before larger-volume commitments or recurring orders are agreed. For sensory review, see our <a href="/blog/how-to-cup-fine-robusta">Fine Robusta cupping guide</a>.</p>
        <p className="extended-intro">Preparing a sourcing inquiry? <a href="/resources/coffee-buyer-specification-template">Use the Coffee Buyer Specification Template →</a></p>
        <div className="extended-steps" aria-label="Coffee evidence sequence">{steps.map((step, index) => <article className="extended-step" key={step.title}><span className="number">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        <p className="extended-intro">Origin records, lot details, samples and shipping arrangements depend on the actual offer. We confirm what can be provided rather than treating every item as automatically available. <a href="/origins">Explore Cambodian Origins →</a></p>
      </section>
      <section aria-labelledby="wholesale-supply-title" id="supply">
        <span className="eyebrow">Your Wholesale Enquiry</span>
        <h2 className="extended-heading" id="wholesale-supply-title">What buyers can ask OCC.</h2>
        <p className="extended-intro">Tell us the product you need and the market you serve. OCC can then discuss the relevant supply path and confirm what information is available for your enquiry.</p>
        <div className="extended-grid">{buyerTerms.map((term, index) => <article className="extended-card" key={term.title}><span className="number">{String(index + 1).padStart(2, "0")}</span><h3>{term.title}</h3><p>{term.text}</p></article>)}</div>
      </section>
      <section aria-labelledby="wholesale-faq-title" id="wholesale-faq">
        <span className="eyebrow">Buyer Questions</span>
        <h2 className="extended-heading" id="wholesale-faq-title">Wholesale FAQs.</h2>
        <p className="extended-intro">Settle the questions that matter before sample approval, quotation and a purchase commitment.</p>
        <div className="faq-grid">{faqs.map((faq) => <article className="faq-card" key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></article>)}</div>
      </section>
    </OccCommercialHtmlLayout>
  )
}
