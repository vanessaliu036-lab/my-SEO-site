import "./wholesale-approved.css"

/**
 * Approved Wholesale inner-page composition. Header, site CTA and footer
 * are provided by app/(site)/layout.tsx -> SiteShell.
 * New design source: OCC_Wholesale_Coffee_Supply_CTA_Box(2).html.
 */
export function WholesaleApprovedLayout() {
  return (
    <div className="occ-wholesale">
      <div className="page">
      
      <section className="hero" id="overview">
      <div className="hero-copy">
      <span className="eyebrow">Cambodia-origin wholesale coffee</span>
      <h1>WHOLESALE COFFEE SUPPLY</h1>
      <p className="lead">Cambodian coffee for the way your business buys, roasts and serves.</p>
      <p className="desc">OCC works with roasters, cafés, hotels and retailers sourcing 100% Cambodia-origin coffee. Explore Cambodian Fine Robusta and OCC-developed coffee, then discuss samples, current availability and supply terms for your market.</p>
      <div className="button-row">
      <a className="pill-btn" href="#needs">Explore Wholesale Options →</a>
      <a className="pill-btn outline" href="/contact">Discuss Wholesale Supply →</a>
      </div>
      </div>
      <div className="hero-visual">
      <img alt="Cambodia-origin coffee for wholesale and B2B sourcing" src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&amp;fit=crop&amp;w=1400&amp;q=85" />
      </div>
      </section>
      <section className="section" id="needs">
      <div className="section-head">
      <div>
      <span className="eyebrow">What You Can Source</span>
      <h2>Choose your wholesale path.</h2>
      </div>
      <p className="section-intro">Begin with the coffee you need, not a generic wholesale catalogue. We will discuss the available product or lot, sample options and commercial requirements for your intended use. Availability is confirmed per enquiry.</p>
      </div>
      <div className="intent-grid">
      <article className="intent-card">
      <div>
      <div className="intent-index">01 / Fine Robusta</div>
      <h3>Cambodian Fine Robusta</h3>
      <p>For roasters and cafés exploring Cambodian Canephora. Ask about the specific origin, process, sample and cup profile available for evaluation.</p>
      </div>
      <a className="text-link" href="/fine-robusta-cambodia">Explore Fine Robusta →</a>
      </article>
      <article className="intent-card">
      <div>
      <div className="intent-index">02 / Roasted coffee</div>
      <h3>Roasted Coffee</h3>
      <p>For hotels, cafés and retailers seeking an OCC-developed coffee. Discuss roast direction, suitable format, packaging and replenishment requirements.</p>
      </div>
      <a className="text-link" href="/contact">Discuss Roasted Coffee →</a>
      </article>
      </div>
      </section>
      <section className="split-section" id="why-occ">
      <div className="media-grid">
      <div className="media-card"><img alt="Coffee business environment for OCC wholesale coffee sourcing" src="https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&amp;fit=crop&amp;w=1400&amp;q=85" /></div>
      </div>
      <div className="info-panel">
      <span className="eyebrow">Why OCC</span>
      <h2>From Cambodian origin to your market.</h2>
      <p className="section-copy">OCC focuses entirely on coffee grown in Cambodia, with Fine Robusta as a specialist starting point. We help buyers connect coffee selection with the evidence and commercial decisions needed to assess a real supply opportunity. Wholesale is for OCC-developed products; buyers seeking a made-to-order roast profile can explore our <a href="/solutions/roasting-program">Roasting Program</a>.</p>
      <div className="reason-list">
      <div className="reason"><strong>100% Cambodia Origin</strong><span>Our Cambodia-origin commitment does not rely on blending imported coffee to fill an order.</span></div>
      <div className="reason"><strong>Fine Robusta Focus</strong><span>Ask about the coffee’s origin, processing, cup character and suitability for your use.</span></div>
      <div className="reason"><strong>Buyer-Ready Coffee</strong><span>Evaluate OCC-developed coffee for hospitality, café service or retail.</span></div>
      <div className="reason"><strong>Commercial Clarity</strong><span>Confirm a sample, product or lot, specifications and terms before discussing repeat supply.</span></div>
      </div>
      <div className="why-cta"><a className="pill-btn" href="#evidence">Review Our Evidence →</a></div>
      </div>
      </section>
      <div className="divider"></div>
      <section className="evidence-section" id="evidence">
      <div className="evidence-top">
      <div className="evidence-intro">
      <span className="eyebrow">Evidence Standard</span>
      <h3>From sample to supply.</h3>
      <p>Evaluate the coffee first. OCC discusses the available reference, quality evidence and practical buying requirements before larger-volume commitments or recurring orders are agreed.</p>
      </div>
      <div className="evidence-image">
      <img alt="Coffee cupping used for sample and quality evaluation" src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&amp;fit=crop&amp;w=1400&amp;q=85" />
      </div>
      </div>
      <p className="buyer-template-cta">Preparing a sourcing inquiry? <a href="/resources/coffee-buyer-specification-template">Use the Coffee Buyer Specification Template →</a></p>
      <div aria-label="Coffee evidence sequence" className="evidence-grid">
      <article className="evidence-card">
      <span className="evidence-no">01</span>
      <div><h4>Coffee Selection</h4><p>Tell us which OCC-developed coffee you want to evaluate and how you intend to use it.</p></div>
      </article>
      <article className="evidence-card">
      <span className="evidence-no">02</span>
      <div><h4>Sample Evaluation</h4><p>Discuss a sample or closest commercial reference; approval depends on the coffee actually available.</p></div>
      </article>
      <article className="evidence-card">
      <span className="evidence-no">03</span>
      <div><h4>Origin &amp; Process</h4><p>Review origin and processing records where they are available for the specific product or lot.</p></div>
      </article>
      <article className="evidence-card">
      <span className="evidence-no">04</span>
      <div><h4>Quality Approval</h4><p>Agree on cup profile, sample acceptance and relevant lot or product specifications.</p></div>
      </article>
      <article className="evidence-card">
      <span className="evidence-no">05</span>
      <div><h4>Commercial Terms</h4><p>Confirm availability, MOQ, price basis, volume, lead time, packaging and delivery responsibility.</p></div>
      </article>
      <article className="evidence-card">
      <span className="evidence-no">06</span>
      <div><h4>Repeat Supply</h4><p>Use the approved product and agreed terms to discuss future orders and any substitution rules.</p></div>
      </article>
      </div>
      <div className="evidence-footer">
      <span className="small-note">Origin records, lot details, samples and shipping arrangements depend on the actual offer. We confirm what can be provided rather than treating every item as automatically available.</span>
      <a className="pill-btn" href="/origins">Explore Cambodian Origins →</a>
      </div>
      </section>
      <section className="supply-section" id="supply">
      <div className="supply-grid">
      <div className="supply-copy">
      <span className="eyebrow">Your Wholesale Enquiry</span>
      <h2>What buyers can ask OCC.</h2>
      <p>Tell us the product you need and the market you serve. OCC can then discuss the relevant supply path and confirm what information is available for your enquiry.</p>
      <div aria-label="Commercial overview" className="supply-highlights">
      <div className="supply-highlight"><span className="label">Origin</span><strong>100% Cambodia</strong><span>Discussed according to how you buy, roast or serve coffee.</span></div>
      <div className="supply-highlight"><span className="label">Specialty</span><strong>Fine Robusta</strong><span>Origin-led specialty positioning with Cambodia as the starting point.</span></div>
      <div className="supply-highlight"><span className="label">Formats</span><strong>Cafés to hotels</strong><span>Built for cafés, hotels, restaurants, roasters and retailers.</span></div>
      <div className="supply-highlight"><span className="label">Next step</span><strong>Sample discussion</strong><span>From initial evaluation to recurring supply discussions and program fit.</span></div>
      </div>
      </div>
      <div>
      <dl className="supply-table">
      <div className="supply-row"><dt>Product &amp; format</dt><dd>Specify the Cambodian coffee or OCC-developed roasted product you need; product availability must be confirmed.</dd></div>
      <div className="supply-row"><dt>Buyer &amp; market</dt><dd>Tell us whether you are a roaster, retailer, hotel or café, and where the coffee will be used or delivered.</dd></div>
      <div className="supply-row"><dt>Volume &amp; timing</dt><dd>Provide an estimated initial order, anticipated repeat volume and target purchasing date.</dd></div>
      <div className="supply-row"><dt>Samples &amp; evidence</dt><dd>Request the relevant sample, cup profile, origin, processing, lot and quality information; available records vary by coffee.</dd></div>
      <div className="supply-row"><dt>Packaging &amp; delivery</dt><dd>Describe your preferred pack format, destination and logistics requirements so the scope can be confirmed.</dd></div>
      <div className="supply-row"><dt>MOQ &amp; quotation</dt><dd>MOQ, price, lead time and shipping capability are confirmed against the actual product and destination, not promised universally.</dd></div>
      </dl>
      </div>
      </div>
      </section>
      <section aria-labelledby="wholesale-faq-title" className="section" id="wholesale-faq"><div className="section-head"><div><span className="eyebrow">Buyer Questions</span><h2 id="wholesale-faq-title">Wholesale FAQs.</h2></div><p className="section-intro">Here are the questions to settle before sample approval, quotation and a purchase commitment.</p></div><div className="intent-grid"><article className="intent-card"><div><h3>Where can I buy Cambodian coffee beans wholesale?</h3><p>Contact OCC with your preferred format, destination and estimated volume. We can discuss Cambodia-origin coffee options and confirm availability for your enquiry.</p></div></article><article className="intent-card"><div><h3>Can I request a Cambodian Fine Robusta sample?</h3><p>Discuss the coffee and the sample or closest commercial reference available. Any sampling arrangement is confirmed before an order.</p></div></article><article className="intent-card"><div><h3>Does OCC offer wholesale roasted coffee for cafés and hotels?</h3><p>OCC discusses its developed roasted-coffee directions for professional use. Roast, format, packaging and availability depend on the specific requirement.</p></div></article></div><div className="intent-grid"><article className="intent-card"><div><h3>What are your MOQ, wholesale prices and lead times?</h3><p>These depend on product, lot or format, volume, packaging, destination and current availability. We confirm commercial terms for each enquiry.</p></div></article><article className="intent-card"><div><h3>Can OCC create a custom roast or private-label product?</h3><p>Wholesale covers OCC-developed coffee. A made-to-order roast profile belongs to the Roasting Program. Private-label packaging is subject to an explicit feasibility discussion, not a standing offer.</p></div></article><article className="intent-card"><div><h3>Which countries can you ship to?</h3><p>Share your destination and delivery requirements. Export documentation, logistics responsibility and shipping feasibility must be confirmed for the actual order.</p></div></article></div></section><section className="b2b-cta" id="contact">
      <div className="b2b-cta-copy"><span className="eyebrow">B2B Wholesale Enquiry</span><h3>Tell us what your business needs.</h3><p className="section-copy">Share your market, preferred OCC-developed coffee, estimated volume and destination. Ask about a sample or current availability; OCC will discuss the relevant next step without promising unconfirmed stock or shipping terms.</p></div>
      <a className="cta-btn" href="/contact">Discuss Wholesale Supply →</a>
      </section>
      
      </div>
    </div>
  )
}
