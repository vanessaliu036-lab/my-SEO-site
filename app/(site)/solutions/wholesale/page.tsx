import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl, ogImage } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Wholesale Coffee Cambodia | B2B Sourcing | OCC",
  description:
    "Wholesale coffee supply in Cambodia for cafés, hotels, roasters, importers, and distributors, with Cambodian Fine Robusta, green and roasted coffee, samples, traceability, and B2B sourcing support.",
  keywords:
    "wholesale coffee Cambodia, Cambodian coffee supplier, B2B coffee supplier Cambodia, Fine Robusta wholesale, specialty coffee wholesale Cambodia, Cambodia green coffee, roasted coffee wholesale Cambodia, coffee supplier for cafes, hotel coffee supplier Cambodia, restaurant coffee supplier, coffee sourcing Cambodia, wholesale coffee samples, coffee MOQ Cambodia, coffee lead time Cambodia, coffee traceability Cambodia",
  openGraph: {
    title: "Wholesale Coffee Cambodia | OCC",
    description: "Cambodian-origin wholesale coffee for professional buyers, with Fine Robusta, green and roasted formats, sample evaluation, traceability, and clear commercial terms.",
    url: `${siteUrl}/solutions/wholesale`,
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Wholesale Coffee Cambodia — OCC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale Coffee Cambodia | OCC",
    description: "Cambodian-origin wholesale coffee for professional buyers, with Fine Robusta, green and roasted formats, sample evaluation, traceability, and clear commercial terms.",
  },
  alternates: pageAlternates("/solutions/wholesale"),
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What can OCC supply to wholesale coffee buyers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OCC develops wholesale coffee programs around Cambodian-origin coffee, including Fine Robusta, green coffee for professional roasters, roasted coffee for hospitality and café use, and custom B2B programs based on the buyer's application and approved coffee.",
      },
    },
    {
      "@type": "Question",
      name: "Can wholesale buyers request a coffee sample before ordering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sample evaluation should come before a larger commitment. The sample, lot identity, cup profile, roast requirements where relevant, and approval criteria should be clear before recurring supply is discussed.",
      },
    },
    {
      "@type": "Question",
      name: "How are MOQ, wholesale pricing, and lead time handled?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MOQ, pricing, and lead time depend on coffee format, current lot availability, volume, roast requirements, packaging or delivery scope, and destination. OCC confirms these commercial terms against the specific requirement rather than presenting a single assumption as universal.",
      },
    },
    {
      "@type": "Question",
      name: "How should origin and traceability claims be evaluated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buyers should ask for evidence that matches the coffee being evaluated, including origin, producer or lot information where available, processing, harvest or production timing, quality evaluation, and the chain of custody relevant to the transaction.",
      },
    },
    {
      "@type": "Question",
      name: "What should a wholesale supply agreement clarify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A commercial agreement should clarify the approved coffee or sample, specification, lot substitution rules, volume, pricing basis, delivery responsibilities, quality acceptance, lead time, and what happens when supply conditions change.",
      },
    },
  ],
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

const internalLinks: Record<string, string> = {
  "Fine Robusta Cambodia": "/fine-robusta-cambodia",
  "roasting program": "/solutions/roasting-program",
  "roast development": "/solutions/roasting-program",
  "single-origin coffee": "/origins/single-origin",
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

export default function WholesalePage() {
  const relatedServices = [
    { title: "Fine Robusta Cambodia", href: "/fine-robusta-cambodia", desc: "Cambodian Fine Robusta origin, quality, and buyer reference" },
    { title: "Roasting Program", href: "/solutions/roasting-program", desc: "Roast development and production-readiness for commercial coffee programs" },
    {
      title: "Wholesale Buying Guide",
      href: "/blog/b2b-coffee-sourcing-in-cambodia-minimum-order-pricing-lead-times-explained",
      desc: "MOQ, pricing, lead time, and B2B coffee sourcing considerations in Cambodia",
    },
  ]

  const sections = [
    {
      title: "What OCC Can Supply",
      content: (
        <div className="space-y-5">
          <p>OCC is a Cambodian coffee supplier built around origin-led B2B supply rather than anonymous volume. Wholesale programs can be structured around Cambodian Fine Robusta, green coffee for professional roasting, roasted coffee for cafés and hospitality, or a custom coffee program developed around the buyer&apos;s application.</p>
          <p><strong>Fine Robusta.</strong> For buyers looking for a differentiated Cambodian origin and a quality-focused Canephora proposition. {renderWithLinks("See Fine Robusta Cambodia for the central origin and quality reference.")}</p>
          <p><strong>Green coffee.</strong> For roasters, importers, and professional buyers that need to evaluate the coffee before defining a roast or commercial program.</p>
          <p><strong>Roasted coffee.</strong> For cafés, hotels, restaurants, offices, and operators that need a ready-to-use coffee format with the roast profile aligned to the application.</p>
          <p><strong>Custom B2B program.</strong> For buyers that need sample evaluation, roast development, recurring supply planning, and a clearer path from Cambodian origin to commercial use.</p>
        </div>
      ),
    },
    {
      title: "Built Around Your Business",
      content: (
        <div className="space-y-5">
          <p>Wholesale coffee requirements change by use case. A café may be evaluating a house coffee or signature drink base; a hotel may need consistency across breakfast, restaurant, café, and in-room coffee; a roaster may need green coffee with enough lot and processing information for roast development; an importer or distributor may need origin evidence, commercial terms, repeatability, and a clear supply pathway.</p>
          <p>OCC therefore starts with the buyer&apos;s format, use case, expected volume, quality target, and approval process. The objective is not to force every buyer into one wholesale package, but to define what a workable Cambodian coffee supply program needs to prove before scale.</p>
        </div>
      ),
    },
    {
      title: "From Sample to Supply",
      content: (
        <div className="space-y-5">
          <p><strong>01 — Requirement.</strong> Define green or roasted coffee, target cup profile, application, expected volume, destination, and documentation needs.</p>
          <p><strong>02 — Sample.</strong> Evaluate the actual coffee or the closest available commercial reference before discussing a larger commitment.</p>
          <p><strong>03 — Cupping &amp; roast evaluation.</strong> Use {renderWithLinks("cupping")} to establish the sensory baseline. When roasted coffee is required, the {renderWithLinks("roasting program")} can align roast development with the intended beverage, equipment, and customer experience.</p>
          <p><strong>04 — Approval.</strong> Confirm the coffee, lot or specification, roast requirement where relevant, quality acceptance criteria, and substitution rules.</p>
          <p><strong>05 — Commercial terms.</strong> Confirm MOQ, wholesale pricing basis, lead time, volume, delivery responsibility, storage, and any recurring-supply assumptions.</p>
          <p><strong>06 — Ongoing supply.</strong> Scale only after the approved reference and commercial conditions are clear enough to repeat.</p>
        </div>
      ),
    },
    {
      title: "Origin, Quality & Traceability",
      content: (
        <div className="space-y-5">
          <p>A wholesale coffee supplier should be able to connect commercial claims to the coffee a buyer is actually evaluating. OCC&apos;s evidence framework centers on four questions: where the coffee comes from, how it was processed, how quality was evaluated, and what traceability or lot documentation can support the transaction.</p>
          <p><strong>Origin.</strong> Cambodian origin should be specific enough to evaluate rather than used only as branding language. Where producer, farm, lot, subregion, or harvest information is available for the offered coffee, it should remain connected to that coffee.</p>
          <p><strong>Processing.</strong> Processing information matters because it changes cup profile, roasting behavior, consistency, and buyer expectations.</p>
          <p><strong>Quality.</strong> Sensory quality should be evaluated through an agreed sample and {renderWithLinks("cupping")} process, not inferred from origin language alone.</p>
          <p><strong>Traceability.</strong> Documentation should match the relevant lot or supply program. OCC does not treat broad claims as a substitute for evidence that a professional buyer can review.</p>
        </div>
      ),
    },
    {
      title: "Commercial Terms to Confirm",
      content: (
        <div className="space-y-5">
          <p>MOQ, wholesale coffee pricing, lead time, and delivery conditions should be confirmed against the actual requirement. They can change with green versus roasted format, current lot availability, monthly volume, roast development, packaging scope, destination, and logistics responsibility.</p>
          <p>Before contracting, buyers should confirm the approved sample, coffee specification, current lot or substitution policy, MOQ, price basis, expected lead time, delivery point, storage assumptions, quality-acceptance process, and what happens if supply conditions change.</p>
          <p>This is especially important for cafés, hotels, restaurant groups, roasters, importers, and distributors comparing Cambodian coffee suppliers for recurring B2B supply rather than a one-time purchase.</p>
        </div>
      ),
    },
    {
      title: "What a Buyer Should Compare",
      content: (
        <div className="space-y-5">
          <p>When comparing wholesale coffee suppliers in Cambodia, price is only one part of the decision. Compare the coffee itself, origin evidence, sample-to-order consistency, processing information, roast suitability, traceability, MOQ, lead time, delivery scope, communication, and the supplier&apos;s ability to explain what changes from one lot or production cycle to the next.</p>
          <p>For buyers specifically evaluating Cambodian Fine Robusta or {renderWithLinks("single-origin coffee")}, the strongest comparison is the one that keeps quality, origin, commercial fit, and repeatability in the same decision—not four separate conversations.</p>
        </div>
      ),
    },
  ]

  const faqs = [
    {
      q: "What can OCC supply to wholesale coffee buyers?",
      a: <>OCC develops B2B supply programs around Cambodian Fine Robusta, green coffee, roasted coffee, and custom commercial requirements for cafés, hotels, restaurants, roasters, importers, and distributors.</>,
    },
    {
      q: "Can wholesale buyers request a coffee sample before ordering?",
      a: <>Yes. Sample evaluation should come before a larger commitment so the buyer can approve the coffee, cup profile, lot or specification, and roast requirements where relevant.</>,
    },
    {
      q: "How are MOQ, wholesale pricing, and lead time handled?",
      a: <>MOQ, pricing, and lead time depend on coffee format, current availability, volume, roast requirements, delivery scope, and destination. They are confirmed against the specific buyer requirement rather than treated as one universal number.</>,
    },
    {
      q: "How should origin and traceability claims be evaluated?",
      a: <>Ask for evidence that can be checked against the coffee being offered, including origin, processing, lot or producer information where available, quality evaluation, and the chain of custody relevant to the transaction.</>,
    },
    {
      q: "What should a wholesale supply agreement clarify?",
      a: <>Clarify the approved coffee or sample, specification, substitution rules, volume, MOQ, pricing basis, lead time, delivery responsibilities, quality acceptance, and how changes in supply conditions are handled.</>,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="01"
        title="WHOLESALE"
        subtitle="Cambodian-origin wholesale coffee for cafés, hotels, roasters, importers, and distributors — from Fine Robusta and green coffee to roasted and custom B2B supply programs."
        sections={sections}
        factsTitle="Wholesale Buyer Checklist"
        facts={[
          "Fine Robusta, green, roasted, or custom program",
          "Buyer use case and target cup profile",
          "Sample approval and coffee specification",
          "Origin, processing, quality, and traceability evidence",
          "MOQ, pricing basis, lead time, and delivery scope",
          "Recurring supply and substitution rules",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Discuss your requirements"
      />
    </>
  )
}
