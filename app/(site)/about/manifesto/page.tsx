import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OCC Manifesto | Building Better Coffee in Cambodia",
  description:
    "Why Origin Coffee Cambodia is building more than a coffee brand: Cambodian coffee, barista development, reliable roasting, and the systems behind better coffee experiences.",
  keywords:
    "OCC manifesto, Origin Coffee Cambodia, Cambodian coffee, barista development Cambodia, coffee quality standards, coffee infrastructure Cambodia",
  alternates: pageAlternates("/about/manifesto"),
  openGraph: {
    title: "OCC Manifesto | Building Better Coffee in Cambodia",
    description:
      "OCC's manifesto on Cambodian coffee, skilled people, reliable roasting, and the systems behind consistent coffee experiences.",
    url: `${siteUrl}/about/manifesto`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OCC Manifesto | Building Better Coffee in Cambodia",
    description:
      "OCC's manifesto on Cambodian coffee, skilled people, reliable roasting, and the systems behind consistent coffee experiences.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Manifesto: Building Better Coffee in Cambodia",
  description:
    "Origin Coffee Cambodia's manifesto on Cambodian coffee, barista development, roasting, and the systems required to deliver consistent coffee experiences.",
  url: `${siteUrl}/about/manifesto`,
  about: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
    url: siteUrl,
  },
  mainEntity: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Origin Coffee Cambodia",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    { "@type": "ListItem", position: 3, name: "Manifesto", item: `${siteUrl}/about/manifesto` },
  ],
}

const faqs = [
  {
    q: "Why doesn't OCC operate its own café?",
    a: "OCC is focused on supporting the businesses that already serve coffee across Cambodia. Instead of concentrating resources on one retail location, we develop coffee supply, roasting support, barista capability, and practical systems that can support multiple hospitality businesses.",
  },
  {
    q: "What is the OCC Skilled Barista Army?",
    a: "The Skilled Barista Army is OCC's long-term barista development vision. It is designed to build practical coffee knowledge, technical skills, and professional standards that baristas can carry into cafés, hotels, restaurants, and other hospitality businesses.",
  },
  {
    q: "What does OCC mean by zero-compromise coffee infrastructure?",
    a: "It describes OCC's approach to treating coffee quality as the result of connected elements: coffee origin, roasting, equipment, barista skills, and ongoing support. The objective is consistent execution from the coffee source to the final cup.",
  },
  {
    q: "Does OCC work with Cambodian coffee?",
    a: "Yes. Cambodian coffee and the development of Cambodia's specialty coffee sector are central to OCC's direction. Our work connects origin with the roasting, training, and B2B systems required to represent those coffees consistently.",
  },
]

const sections = [
  {
    title: "Great Coffee Needs More Than Great Beans",
    paragraphs: [
      "Cambodia has the ingredients for a stronger specialty coffee culture: distinctive origins, ambitious hospitality businesses, curious consumers, and a new generation of coffee professionals.",
      "But origin alone cannot guarantee a good cup. Roasting, storage, grinder calibration, extraction, equipment, service, and the people behind each step all shape the result. For OCC, improving Cambodian coffee means strengthening what happens around the bean as well as the bean itself.",
    ],
  },
  {
    title: "One Café Can Serve Customers. A System Can Support Many Businesses.",
    paragraphs: [
      "The obvious path for a coffee company is to open a café. We chose a different one. A single café gives control over one counter, one team, and one customer experience, but Cambodia's coffee culture is much larger than one address.",
      "Hotels need reliable coffee programs. Restaurants need consistent service. Independent cafés need technical support. Hospitality teams need people who understand the coffee they serve. OCC is building behind those businesses rather than competing with all of them for the same customer.",
    ],
  },
  {
    title: "Knowledge Should Travel Further Than One Coffee Bar",
    paragraphs: [
      "Equipment can be purchased and coffee can be delivered. Skills have to be built. The Skilled Barista Army is OCC's long-term vision for developing coffee professionals who understand not only how to operate a machine, but why each step affects the final cup.",
      "Training begins with fundamentals such as origin, roast development, grind size, extraction, milk, workflow, equipment care, and sensory understanding. The goal is to create more people capable of carrying stronger coffee standards into cafés, hotels, restaurants, and hospitality businesses across Cambodia.",
    ],
  },
  {
    title: "Coffee Quality Is Built Across the Entire Chain",
    paragraphs: [
      "OCC approaches coffee as an interconnected operating system. Origin gives the coffee its starting point. Roasting develops its expression. Equipment creates the brewing conditions. Baristas translate those variables into the cup. Service and technical support keep the experience consistent over time.",
      "That is what OCC means by zero-compromise coffee infrastructure: connecting Cambodian coffee with the practical systems required to serve it well. Different partners need different combinations, but the principle remains the same — the coffee should not be left alone after delivery.",
    ],
  },
  {
    title: "Better Coffee Should Create More Value at Origin",
    paragraphs: [
      "Cambodia should not be treated simply as a place where coffee happens to be grown. Its origins deserve to be understood, its producers deserve stronger recognition, and its coffee professionals deserve access to better knowledge.",
      "OCC is building from Cambodia outward. That means developing deeper understanding of Cambodian origins, strengthening the people who work with the coffee, and helping businesses communicate where their coffee comes from and why it matters.",
    ],
  },
  {
    title: "Consistency Is Earned",
    paragraphs: [
      "We do not believe quality comes from one perfect roast, one talented barista, or one exceptional harvest. It comes from repeating good decisions: source carefully, roast intentionally, train continuously, measure what matters, maintain the equipment, correct problems quickly, and keep learning.",
      "That discipline is less romantic than talking about the perfect cup. It is also what makes the perfect cup more likely.",
    ],
  },
]

const featureGrid = [
  {
    label: "01 / Origin",
    title: "Cambodia first.",
    body: "Better coffee should create stronger recognition, knowledge, and value around Cambodian origin.",
  },
  {
    label: "02 / People",
    title: "Skills become infrastructure.",
    body: "Barista knowledge should travel beyond one counter and strengthen many hospitality businesses.",
  },
  {
    label: "03 / Systems",
    title: "Consistency is built.",
    body: "Coffee, roasting, equipment, people, and support must work together to deliver a dependable result.",
  },
]

const chapterImages = [
  { src: "/about/chapters/manifesto-01.webp", alt: "Coffee cherries and origin work representing Cambodia's coffee foundation.", caption: "Origin · Better coffee begins with context", width: 1200, height: 1200 },
  { src: "/about/chapters/manifesto-02.webp", alt: "Coffee professionals working together in a hospitality environment.", caption: "Business · One system can support many teams", width: 1200, height: 1200 },
  { src: "/about/chapters/manifesto-03.webp", alt: "Barista training and coffee preparation in practice.", caption: "People · Knowledge travels through skilled professionals", width: 1200, height: 1200 },
  { src: "/about/chapters/manifesto-04.webp", alt: "Coffee equipment and service workflow supporting consistent preparation.", caption: "Systems · Quality depends on the entire chain", width: 1200, height: 1200 },
  { src: "/about/chapters/manifesto-05.svg", alt: "Editorial diagram connecting Cambodian coffee origin, people, and long-term value.", caption: "Cambodia · Build more value at origin", width: 1200, height: 1200 },
  { src: "/about/chapters/manifesto-06.svg", alt: "Editorial diagram showing repeatable coffee quality through connected operating steps.", caption: "Consistency · Repeat good decisions", width: 1200, height: 1200 },
]

export default function ManifestoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutInstitutionalTemplate
        index="03"
        title="MANIFESTO"
        subtitle="BEYOND THE BEAN."
        lead={[
          "Build the people. Build the standard. Build the industry.",
          "Great coffee happens when origin, roasting, people, equipment, and service work together — consistently.",
        ]}
        sections={sections}
        heroImage={{ src: "/about/occ-about-manifesto-cupping.webp", alt: "Coffee professionals evaluating cups and discussing quality at a cupping table.", width: 1448, height: 1086 }}
        heroCaption="Manifesto · Better coffee is built across people, origin, and systems"
        chapterImages={chapterImages}
        featureGrid={featureGrid}
        practiceLabel="What OCC is building"
        practiceTitle="Build more than a cup."
        closing={[
          "OCC is building a Cambodian coffee company around a simple idea: the value of great coffee should extend beyond the bag.",
          "For coffee businesses, that means stronger supply, roasting, and operational support. For baristas, it means knowledge that can become a profession. For Cambodian coffee, it means stronger representation through origin, craft, and traceability.",
          "The goal is not to become another café. The goal is to help create an environment where better coffee can happen in many places.",
        ]}
        faqs={faqs}
        next={{
          href: "/about/sustainability",
          label: "Sustainability",
          description: "Evidence, documentation, and the boundaries of sustainability claims.",
        }}
      />
    </>
  )
}
