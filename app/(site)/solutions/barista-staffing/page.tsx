import { Metadata } from "next"
import { SolutionDetailTemplate } from "@/components/templates/solution-detail-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Coffee Marketing Cambodia | Signature Drink Development | OCC",
  description:
    "Coffee marketing for Cambodian cafés built around signature drink development, menu direction, product memory, launch support, and stronger reasons for customers to return.",
  keywords:
    "coffee marketing Cambodia, cafe marketing Cambodia, signature drink Cambodia, signature coffee drink, coffee menu development Cambodia, cafe signature drink, coffee product development Cambodia, coffee marketing Phnom Penh",
  openGraph: {
    title: "Coffee Marketing Cambodia | OCC",
    description:
      "Build a signature drink customers remember — and come back for. OCC helps Cambodian cafés turn an existing menu into a clearer coffee identity and repeatable product story.",
    url: `${siteUrl}/solutions/barista-staffing`,
    type: "website",
  },
  alternates: pageAlternates("/solutions/barista-staffing"),
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does OCC Coffee Marketing include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The program starts with the current menu and commercial context, then develops a clearer signature drink direction, product story, menu language, launch direction, and practical next steps for staff and customer communication.",
      },
    },
    {
      "@type": "Question",
      name: "Does a café need to replace its current menu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. OCC begins with the menu the café already has, identifies the missing product opportunity, and develops a signature drink that can strengthen the existing offer rather than forcing a complete menu reset.",
      },
    },
    {
      "@type": "Question",
      name: "Why focus on a signature drink?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A signature drink gives customers a specific product to associate with the café. The goal is to create stronger product memory, clearer differentiation, and a more concrete reason to return beyond the visual experience of the space.",
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
    { "@type": "ListItem", position: 3, name: "Coffee Marketing", item: `${siteUrl}/solutions/barista-staffing` },
  ],
}

export default function CoffeeMarketingPage() {
  const relatedServices = [
    {
      title: "Wholesale Coffee Supply",
      href: "/solutions/wholesale",
      desc: "Ready-to-sell Cambodian coffee supply for cafés and B2B partners",
    },
    {
      title: "Custom Roasting Program",
      href: "/solutions/roasting-program",
      desc: "Develop a roast profile around a specific market or product direction",
    },
    {
      title: "Fine Robusta Cambodia",
      href: "/fine-robusta-cambodia",
      desc: "Explore OCC's core Cambodia-origin coffee expertise",
    },
  ]

  const sections = [
    {
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
      title: "A Signature Drink Creates Product Memory",
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
      title: "We Build From the Menu You Already Have",
      content: (
        <div className="space-y-6">
          <p>
            OCC starts with the café&apos;s current menu rather than forcing a generic trend onto the business. We look at what is already being served, where the menu feels interchangeable, which products carry the strongest commercial role, and where a signature opportunity can make the brand easier to remember.
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
      title: "From Menu Review to Signature Launch",
      content: (
        <div className="space-y-6">
          <p>
            The process begins with the current menu and commercial context, then moves through opportunity definition, signature concept development, trial and refinement, naming and positioning, and launch communication.
          </p>
          <p>
            OCC can help connect the product decision to how the drink is explained by staff and introduced to customers, so the signature is not only technically workable but also easier to understand and remember at the point of sale.
          </p>
          <p>
            The objective is a drink with a clear role: something the café can own, repeat, communicate, and build future customer memory around.
          </p>
        </div>
      ),
    },
  ]

  const faqs = [
    {
      q: "What does OCC Coffee Marketing include?",
      a: <>
        It can include current-menu review, signature drink direction, coffee-base and flavor development, menu wording, staff explanation points, launch positioning, and product refinement based on the commercial goal.
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionDetailTemplate
        index="03"
        title="COFFEE MARKETING"
        subtitle="Make customers remember who you are — and come back. OCC helps Cambodian cafés turn an existing menu into a signature coffee experience customers can associate with the brand."
        sections={sections}
        factsTitle="Signature Drink Development"
        facts={[
          "Current menu and product-gap review",
          "Signature drink concept development",
          "Coffee base and flavor direction",
          "Naming, menu language, and product story",
          "Staff explanation and launch communication",
          "Refinement around customer response and commercial use",
        ]}
        faqs={faqs}
        relatedServices={relatedServices}
        ctaLabel="Design Your Signature Drink"
      />
    </>
  )
}
