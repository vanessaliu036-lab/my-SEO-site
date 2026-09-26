import { Metadata } from "next"
import { OccCommercialHtmlLayout } from "@/components/templates/occ-commercial-html-layout"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Coffee Marketing Cambodia | Signature Drink Development | OCC",
  description:
    "Coffee marketing for Cambodian cafés: develop a signature drink, menu direction, product memory, launch support and a clearer reason for customers to return.",
  keywords:
    "coffee marketing Cambodia, cafe marketing Cambodia, signature drink Cambodia, signature coffee drink, coffee menu development Cambodia, cafe signature drink, coffee product development Cambodia, coffee marketing Phnom Penh",
  openGraph: {
    title: "Coffee Marketing Cambodia | OCC",
    description:
      "Build a signature drink customers remember — and come back for. OCC helps Cambodian cafés turn an existing menu into a clearer coffee identity and repeatable product story.",
    url: `${siteUrl}/solutions/coffee-marketing`,
    type: "website",
  },
  alternates: pageAlternates("/solutions/coffee-marketing"),
}

// Visible FAQ content is rendered on the page; FAQPage JSON-LD is intentionally omitted.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteUrl}/solutions` },
    { "@type": "ListItem", position: 3, name: "Coffee Marketing", item: `${siteUrl}/solutions/coffee-marketing` },
  ],
}

export default function CoffeeMarketingPage() {
  const sections = [
    {
      label: "01 / Market Reality",
      title: "The Market Is Already Visually Strong",
      content: (
        <div className="space-y-6">
          <p>
            Cambodia&apos;s café market is becoming more polished every year. Interiors are carefully designed. Instagram feeds are refined. New cafés often create a strong first impression and give customers a reason to visit, photograph the space, and share it.
          </p>
          <p>
            But one commercial gap appears repeatedly: many cafés still do not have a coffee product customers can clearly associate with the brand itself. The space is memorable, but the coffee language is not always equally distinctive.
          </p>
          <p>
            That can turn a visit into a one-time check-in. Customers come because the café feels new, but without a recognizable product memory there is less reason to return for something they can only get from that brand.
          </p>
        </div>
      ),
    },
    {
      label: "02 / Product Memory",
      title: "A Signature Drink Creates a Reason to Return",
      content: (
        <div className="space-y-6">
          <p>
            A signature drink gives the café a product customers can remember, describe, recommend, and order again. It creates a clearer flavor language for the brand instead of leaving the menu as a collection of familiar drinks that could exist almost anywhere.
          </p>
          <p>
            The objective is not novelty for its own sake. The signature needs to make sense for the existing menu, target customer, coffee base, price position, service workflow, and the kind of experience the café wants to be known for.
          </p>
          <p>
            <strong>Make customers remember who you are — and come back.</strong> The product becomes part of the brand memory, not just another item on the menu.
          </p>
        </div>
      ),
    },
    {
      label: "03 / Development",
      title: "Built From the Menu You Already Have",
      content: (
        <div className="space-y-6">
          <p>
            OCC starts with the café&apos;s current menu rather than forcing a generic trend onto the business. We review what is already being served, where the menu feels interchangeable, which products carry the strongest commercial role, and where a signature opportunity can make the brand easier to remember.
          </p>
          <p>
            From there, the work can move into drink concept development, coffee-base direction, flavor structure, sweetness, texture, visual presentation, naming, menu wording, staff explanation points, and launch communication.
          </p>
          <p>
            The result is not simply a new recipe. It is a clearer product direction designed to belong to the café.
          </p>
        </div>
      ),
    },
    {
      label: "04 / Brand Memory",
      title: "The Drink Becomes Part of the Brand",
      content: (
        <div className="space-y-6">
          <p>
            A strong café brand should be remembered for more than the space. When one drink becomes recognizably yours, the product starts carrying part of the identity that was previously carried only by interior design, packaging, or social content.
          </p>
          <p>
            That creates a stronger foundation for customer recall, repeat ordering, word-of-mouth, seasonal extensions, staff recommendations, and future marketing content. Instead of asking social media to create all of the differentiation, the product itself begins doing part of the work.
          </p>
          <p>
            <strong>Your café should be remembered for more than the space. It should be remembered for the drink.</strong>
          </p>
        </div>
      ),
    },
    {
      label: "05 / Commercial Role",
      title: "Designed to Be Remembered and Reordered",
      content: (
        <div className="space-y-6">
          <p>
            The signature should have a commercial role beyond launch-week attention. OCC develops the concept around menu fit, customer appeal, operational practicality, repeatability, and the way the café needs staff to explain and recommend the drink.
          </p>
          <p>
            This gives the business a stronger product asset for repeat visits, future seasonal variations, membership campaigns, tasting events, short-form content, and customer recommendations.
          </p>
          <p>
            The goal is a product customers can connect back to the café itself — not a drink that disappears into the wider market once the initial novelty fades.
          </p>
        </div>
      ),
    },
  ]

  const faqs = [
    {
      q: "What does OCC Coffee Marketing include?",
      a: <>
        It can include current-menu review, signature drink direction, coffee-base and flavor development, menu wording, staff explanation points, launch positioning, and product refinement around the commercial goal.
      </>,
    },
    {
      q: "Do we need to replace our current menu?",
      a: <>
        No. The work begins with what the café already serves. The objective is to identify the missing signature opportunity and strengthen the menu with a product that feels specific to the brand.
      </>,
    },
    {
      q: "Can OCC develop the signature around our existing coffee?",
      a: <>
        Yes, when the current coffee fits the intended product direction. If a different coffee or roast direction would better support the signature, that can be evaluated through OCC&apos;s wholesale or custom roasting pathways.
      </>,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <OccCommercialHtmlLayout
        className="occ-coffee-marketing"
        eyebrow="Coffee Marketing"
        title="COFFEE MARKETING"
        lead="Make customers remember who you are — and come back."
        description="Signature drink development, menu direction, product memory, and launch support for Cambodian cafés building a clearer reason for customers to return."
        heroImage={{ src: "/images/solutions/occ-solutions-signature-drink-development.webp", alt: "Signature coffee drink development for a Cambodian café" }}
        heroCtaLabel="Design Your Signature Drink"
        heroCtaHref="/contact"
        splitId="program"
        processImages={[
          { src: "/images/partnerships/occ-partnerships-cafe-conversation.webp", alt: "Café team discussing a signature drink and menu direction" },
          { src: "/images/partnerships/occ-partnerships-roast.webp", alt: "Coffee product evaluation supporting a café menu concept" },
        ]}
        splitTitle="Built from the menu you already have"
        splitDescription="OCC reviews the current menu, identifies the missing product opportunity, develops the signature concept, and connects the drink to clearer naming, staff explanation, and launch communication."
        splitCtaLabel="Explore the Program"
        splitCtaHref="#marketing-focus"
        featureId="signature"
        featureEyebrow="Product memory"
        featureTitle="A memorable product for a visually strong market."
        featureDescription="Cambodia's cafés already compete strongly on space and presentation. OCC adds a product layer customers can remember, recommend, and reorder."
        featureImage={{ src: "/images/solutions/occ-solutions-custom-roasting-profile.webp", alt: "Coffee development work for a repeatable signature café product" }}
        ctaId="contact"
        ctaEyebrow="Signature Drink Development"
        ctaTitle="Build the drink your café can own."
        ctaLabel="Start With Your Menu"
        ctaHref="/contact"
      >
        <section id="marketing-focus" aria-labelledby="marketing-focus-title">
          <span className="eyebrow">01 / Market Focus</span>
          <h2 className="extended-heading" id="marketing-focus-title">From First Visit to Product Memory</h2>
          <p className="extended-intro">The program connects the existing menu, customer context, coffee direction, service workflow, and launch language so the signature works as a repeatable product.</p>
          <div className="extended-grid">
            {[
              ["Strong First Impression", "Cambodian Market", "Beautiful interiors and polished communication already give customers a reason to visit and share the space."],
              ["Product Memory", "Brand Recall", "A recognizable coffee product gives customers something specific to associate with the café after the visit."],
              ["Signature Drink", "Ownable Product", "The drink is developed around the menu, coffee base, customer, workflow, and brand position."],
              ["Repeat Visit", "Commercial Value", "A useful signature gives customers a concrete reason to return and order again."],
            ].map(([title, label, text], index) => <article className="extended-card" key={title}><span className="number">{String(index + 1).padStart(2, "0")} / {label}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>
        <section aria-label="Coffee marketing and signature drink development">
          {sections.map((section) => <article className="extended-prose" key={section.title}><div><span className="eyebrow">{section.label}</span><h3>{section.title}</h3></div>{section.content}</article>)}
        </section>
        <section aria-labelledby="marketing-process-title" id="process">
          <span className="eyebrow">02 / Process</span>
          <h2 className="extended-heading" id="marketing-process-title">From Menu Review to Signature Launch</h2>
          <p className="extended-intro">A clear sequence turns the existing menu into a product opportunity the café can serve, explain, refine, and repeat.</p>
          <div className="extended-steps">
            {[
              ["Current Menu Review", "Review the drinks, pricing structure, customer context, and products carrying the strongest role."],
              ["Opportunity Definition", "Define the missing signature opportunity and the role it should play in the customer experience."],
              ["Signature Concept", "Develop the coffee base, flavor structure, ingredients, texture, presentation, and product story."],
              ["Trial & Refinement", "Refine balance, service practicality, repeatability, and performance in the real café environment."],
              ["Naming & Positioning", "Create a name and menu language that explain what makes the drink specific to the café."],
              ["Launch & Communication", "Prepare staff explanation points, menu placement, and the launch direction for the product."],
            ].map(([title, text], index) => <article className="extended-step" key={title}><span className="number">{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>
        <section aria-labelledby="marketing-faq-title" id="marketing-faq">
          <span className="eyebrow">03 / Reference</span>
          <h2 className="extended-heading" id="marketing-faq-title">Program details, kept clear.</h2>
          <div className="faq-grid">{faqs.map((faq) => <details className="faq-card" key={faq.q}><summary><h3>{faq.q}</h3><span aria-hidden="true">+</span></summary><div className="faq-answer">{faq.a}</div></details>)}</div>
        </section>
        <p className="extended-intro">Start with the menu you already have. OCC will identify the missing signature opportunity and develop a clearer product direction around your café, customer, and commercial goal.</p>
      </OccCommercialHtmlLayout>
    </>
  )
}
