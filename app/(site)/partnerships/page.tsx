import type { Metadata } from "next"
import { OriginEditorialTemplate } from "@/components/templates/origin-editorial-template"
import { pageAlternates, seoDescription, seoTitle } from "@/lib/seo"
import { ogImage, siteLogoUrl, siteUrl } from "@/lib/siteConfig"

const path = "/partnerships"
const pageTitle = seoTitle("Cambodian Coffee Partnerships | OCC × ARUNERA")
const pageDescription = seoDescription(
  "Build meaningful coffee partnerships with OCC and ARUNERA through Cambodian coffee gifts, hotel experiences, retail products and corporate gifting.",
)

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords:
    "Cambodian coffee partnerships, Cambodian coffee gifts, corporate coffee gifting, hotel coffee gifts, coffee distribution Cambodia, OCC ARUNERA",
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteUrl}${path}`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
    images: [{ url: ogImage, width: 1672, height: 941, alt: "Cambodian coffee partnership and gifting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
  },
  alternates: pageAlternates(path),
}

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}${path}#webpage`,
      name: pageTitle,
      description: pageDescription,
      url: `${siteUrl}${path}`,
      inLanguage: "en-KH",
      isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl },
      image: { "@type": "ImageObject", url: ogImage, width: 1672, height: 941 },
      about: { "@type": "Thing", name: "Cambodian coffee partnerships" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Partnerships", item: `${siteUrl}${path}` },
      ],
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Origin Coffee Cambodia",
      url: siteUrl,
      logo: siteLogoUrl,
    },
  ],
}

const sections = [
  {
    title: "A coffee origin can become more than a product.",
    paragraphs: [
      "For many people, their first encounter with Cambodian coffee does not happen in a café. It may happen in a hotel room, at a welcome desk, on a retail shelf, during a corporate event or through a gift brought home from Cambodia.",
      "A well-designed coffee partnership can introduce Cambodian origin, Fine Robusta and local identity in a way that people can taste, understand and remember.",
      "OCC provides the coffee foundation: Cambodia-origin sourcing, Fine Robusta knowledge, quality decisions and roast direction. Our partners help shape the format, experience and market context around the coffee.",
    ],
  },
  {
    title: "Partnerships for different ways of discovering Cambodia",
    items: [
      { title: "Hotels & Hospitality", body: "Create welcome gifts, room experiences, VIP amenities, hotel retail products or seasonal coffee programs with a clear Cambodian identity." },
      { title: "Retailers & Concept Stores", body: "Offer a premium Cambodian coffee product for customers looking for origin, design and cultural value in one experience." },
      { title: "Travel & Tourism Partners", body: "Give visitors a coffee product worth discovering, sharing and taking home after their time in Cambodia." },
      { title: "Corporate & Institutional Buyers", body: "Develop coffee gifts for conferences, partner appreciation, client relationships, tourism events and other meaningful occasions." },
      { title: "Distributors & Importers", body: "Bring Cambodian coffee into selected international markets through focused retail, hospitality and specialty coffee partnerships." },
    ],
  },
  {
    title: "From coffee origin to partner-ready experience",
    paragraphs: [
      "A partnership may include one product or a broader coffee concept, depending on the market and audience. Product format, packaging, pricing structure, territory, order volume and commercial terms are discussed according to the partner’s needs and market requirements.",
    ],
    bullets: [
      "Cambodia-origin roasted coffee",
      "Fine Robusta coffee collections",
      "Hotel welcome and VIP gifts",
      "Corporate coffee gifting",
      "Travel souvenirs",
      "Retail-ready coffee products",
      "Hotel-branded coffee experiences",
      "Seasonal or limited origin collections",
      "Origin storytelling and product education",
      "Coffee content for digital and in-store use",
    ],
  },
  {
    eyebrow: "Featured partnership",
    title: "OCC × ARUNERA: Cambodian coffee worth taking home",
    paragraphs: [
      "ARUNERA is a Cambodian gift platform focused on products worth bringing home. It curates Cambodian-made coffee, crafts and lifestyle products into refined, useful and internationally presentable gift experiences.",
      "For coffee gifting, ARUNERA works with OCC to connect Cambodian coffee with product concept, packaging direction, gifting format, retail presentation and traveller discovery.",
      "OCC remains responsible for the coffee proposition. ARUNERA develops the gifting experience around it.",
      "The goal is not to create another generic souvenir. The goal is to make Cambodian coffee easier to understand and more meaningful to receive: where it comes from, why Fine Robusta matters and why it belongs in someone’s memory of Cambodia.",
    ],
    statement: "Origin → Coffee → Product → Gift → Memory",
  },
  {
    title: "Give people a reason to remember the origin",
    paragraphs: [
      "A successful coffee partnership should work beyond the first purchase or first cup. It can help an audience discover Cambodian coffee through a simple format, understand the story behind the origin, experience Fine Robusta in a premium context and connect a product with a place, journey or occasion.",
      "For hotels, retailers and travel partners, the product can continue working after the guest leaves through origin storytelling, QR content, hotel landing pages, product guides and follow-up discovery.",
    ],
    bullets: [
      "Discover Cambodian coffee through an approachable format",
      "Understand the story behind the origin",
      "Experience Fine Robusta in a premium context",
      "Take home something useful and memorable",
      "Find the coffee again after the original experience",
    ],
  },
  {
    title: "A focused process from first conversation to launch",
    items: [
      { title: "Understand the opportunity", body: "We learn about your market, audience, location, brand, distribution channels and the experience you want to create." },
      { title: "Define the coffee direction", body: "Together, we discuss origin, coffee format, roast direction, product positioning and the role the coffee should play in the partnership." },
      { title: "Shape the product experience", body: "We explore packaging, gifting format, presentation, storytelling, branding and the customer journey around the coffee." },
      { title: "Review commercial requirements", body: "Order volume, territory, pricing basis, delivery responsibilities, timing and other commercial details are discussed according to the project." },
      { title: "Prepare the partnership", body: "Once the direction is agreed, we coordinate the product, content, materials and next steps needed for launch or distribution." },
    ],
  },
  {
    title: "Help us understand what you want to build",
    paragraphs: [
      "When contacting us, please share your company or organisation, target market, partnership type, current channels, intended audience, products or coffee formats of interest, estimated order volume and preferred timing.",
      "The more context you provide, the more useful our first response can be.",
    ],
    bullets: [
      "Company or organisation name",
      "Country, city or target market",
      "Type of partnership you are considering",
      "Retail, hospitality or distribution channels",
      "Intended audience or customer",
      "Products or coffee formats of interest",
      "Estimated order volume or project size",
      "Preferred launch timing",
    ],
  },
] as const

export default function PartnershipsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <OriginEditorialTemplate
        sectionName="Partnerships"
        index="01"
        eyebrow="Brand, Gifting & Distribution"
        title="CAMBODIAN COFFEE PARTNERSHIPS"
        subtitle="Build a coffee experience people remember."
        intro={[
          "Origin Coffee Cambodia works with selected partners to bring Cambodian coffee into new formats, markets and experiences.",
          "Together with ARUNERA, we turn Cambodia-origin coffee into premium gifts and product experiences for hotels, retailers, travel businesses, corporate occasions and people looking for something meaningful to take home.",
        ]}
        sections={sections}
        cta={{ label: "Start a Partnership Enquiry", href: "/contact" }}
      />
    </>
  )
}
