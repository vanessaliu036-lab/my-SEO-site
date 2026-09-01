import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mission | Origin Coffee Cambodia - OCC",
  description:
    "OCC exists to empower Cambodia's coffee community through exceptional roasting, knowledge, and training. Learn our vision, mission, and purpose.",
  keywords:
    "specialty coffee supplier Cambodia, coffee roaster Phnom Penh, Cambodia coffee culture, coffee mission, OCC mission",
  alternates: pageAlternates("/about/mission"),
  openGraph: {
    title: "Mission | Origin Coffee Cambodia - OCC",
    description:
      "Vision, Mission, and Why We Exist. OCC exists to close the gap in Cambodia's coffee market.",
    url: `${siteUrl}/about/mission`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Mission",
  description: "Vision, Mission, and Why We Exist",
  url: `${siteUrl}/about/mission`,
  isPartOf: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    description:
      "Specialty coffee supplier Cambodia, coffee roaster Phnom Penh, empowering Cambodia's coffee culture.",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    { "@type": "ListItem", position: 3, name: "Mission", item: `${siteUrl}/about/mission` },
  ],
}

const sections = [
  {
    title: "Vision",
    paragraphs: [
      "To inspire and elevate Cambodia's coffee culture through knowledge, craftsmanship, and education.",
    ],
  },
  {
    title: "Mission",
    paragraphs: [
      "To empower Cambodia's coffee community by supplying exceptionally roasted coffee, sharing practical knowledge, and supporting partners with the tools and training they need to thrive.",
    ],
  },
  {
    title: "Why We Exist",
    paragraphs: [
      "Cambodia's coffee market has a problem — not with its origins, but with what happens after. Inconsistent roasts. Undertrained baristas. Suppliers who disappear after the sale.",
      "OCC was built to close that gap. Not just as a supplier, but as a partner in every cup that carries our name.",
    ],
  },
]

export default function MissionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutInstitutionalTemplate
        index="01"
        title="MISSION"
        subtitle="VISION, MISSION, AND WHY WE EXIST."
        lead={[
          "“Settle for nothing. Answer for everything.”",
          "“Standards are not negotiable. Excellence is not optional.” This is not a philosophy we hang on the wall. It is the reason OCC exists.",
        ]}
        sections={sections}
        next={{
          href: "/about/founder",
          label: "Founder",
          description: "Philosophy, Credentials, and the Big Idea.",
        }}
      />
    </>
  )
}
