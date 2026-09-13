import { Metadata } from "next"
import { LocalMarketSolutionTemplate } from "@/components/templates/local-market-solution-template"
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
    url: `${siteUrl}/solutions/coffee-marketing`,
    type: "website",
  },
  alternates: pageAlternates("/solutions/coffee-marketing"),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <LocalMarketSolutionTemplate
        index="03"
        title="COFFEE MARKETING"
        subtitle="Coffee marketing for Cambodian cafés built around a signature drink, stronger product memory, and a clearer reason for customers to return."
        heroStatement="Make customers remember who you are — and come back."
        heroCtaLabel="Design Your Signature Drink"
        highlightTitle="A Beautiful Café Needs a Memorable Product"
        highlightIntro="Cambodia's cafés already compete strongly on space, design, and social presentation. OCC adds the product layer that turns attention into something customers can remember and reorder."
        highlightCards={[
          {
            title: "Strong First Impression",
            meta: "Cambodian Market",
            text: "Beautiful interiors and polished social content already create strong reasons for customers to visit and share the space.",
          },
          {
            title: "Product Memory",
            meta: "Brand Recall",
            text: "A recognizable coffee product gives customers something specific to associate with the café after the first visit ends.",
          },
          {
            title: "Signature Drink",
            meta: "Ownable Product",
            text: "A drink developed around the menu, coffee base, customer, service workflow, and brand can become a flavor language the café owns.",
          },
          {
            title: "Repeat Visit",
            meta: "Commercial Value",
            text: "The strongest signature does more than generate launch attention. It gives customers a concrete reason to come back and order again.",
          },
        ]}
        sections={sections}
        relatedLinks={[
          {
            title: "Wholesale Coffee Supply",
            description: "Choose an OCC-developed coffee direction when the café needs a ready-to-sell coffee foundation.",
            href: "/solutions/wholesale",
          },
          {
            title: "Custom Roasting Program",
            description: "Develop a roast profile around the café's own market, application, and product direction.",
            href: "/solutions/roasting-program",
          },
          {
            title: "Fine Robusta Cambodia",
            description: "Explore the Cambodia-origin coffee expertise behind OCC's product development work.",
            href: "/fine-robusta-cambodia",
          },
        ]}
        sidebarFacts={[
          "Current menu and product-gap review",
          "Signature drink concept development",
          "Coffee base and flavor direction",
          "Naming, menu language, and product story",
          "Staff explanation and launch communication",
          "Refinement around customer response",
        ]}
        processTitle="From Menu Review to Signature Launch"
        processIntro="The process turns an existing menu into a clearer product opportunity, then develops that opportunity into something the café can serve, explain, and repeat."
        processSteps={[
          {
            title: "Current Menu Review",
            text: "Review the existing drinks, pricing structure, menu balance, customer context, and the products already carrying the strongest commercial role.",
          },
          {
            title: "Opportunity Definition",
            text: "Identify the missing signature opportunity and define what role the new drink should play in the menu and customer experience.",
          },
          {
            title: "Signature Concept",
            text: "Develop the coffee base, flavor structure, ingredients, sweetness, texture, visual direction, and the product story around the brand.",
          },
          {
            title: "Trial & Refinement",
            text: "Refine balance, presentation, operational practicality, repeatability, and the way the drink performs in the real service environment.",
          },
          {
            title: "Naming & Positioning",
            text: "Create a name, menu description, and clearer language that helps the customer understand what makes the drink specific to the café.",
          },
          {
            title: "Launch & Communication",
            text: "Prepare staff explanation points, menu placement, launch direction, and the communication needed to turn the signature into a repeatable brand asset.",
          },
        ]}
        darkEyebrow="Signature Drink Development"
        darkTitle="The Product Gives Customers a Reason to Return"
        darkDescription="OCC connects menu strategy, coffee direction, drink development, naming, staff communication, and launch logic so the signature is built as a product the café can own — not just a temporary promotion."
        darkCta="Start With Your Menu"
        supportTitle="The Signature Extends Beyond the Recipe"
        supportCards={[
          {
            eyebrow: "Product Direction",
            title: "Signature Drink",
            description: "Build the drink around the café's menu, coffee, customer, flavor direction, pricing context, and service reality.",
            href: "/contact",
            cta: "Design Your Signature Drink",
            active: true,
          },
          {
            eyebrow: "Launch Direction",
            title: "Brand Memory",
            description: "Turn the product into clearer menu language, staff explanation, social storytelling, and a stronger reason for customers to remember the café.",
            href: "/contact",
            cta: "Build the Launch Direction",
          },
        ]}
        faqs={faqs}
        ctaLabel="Design Your Signature Drink"
        ctaDescription="Start with the menu you already have. OCC will identify the missing signature opportunity and develop a clearer product direction around your café, customer, and commercial goal."
      />
    </>
  )
}
