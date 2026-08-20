import { AboutInstitutionalTemplate } from "@/components/templates/about-institutional-template"
import { siteUrl } from "@/lib/siteConfig"
import { pageAlternates } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Founder | Origin Coffee Cambodia - OCC",
  description:
    "OCC didn't begin with a business plan. It began with a question no one in Cambodia's coffee industry was asking. Meet the philosophy behind the craft.",
  keywords:
    "coffee founder Cambodia, OCC founder, specialty coffee philosophy Cambodia, coffee craftsmanship, Phnom Penh coffee roaster origin",
  alternates: pageAlternates("/about/founder"),
  openGraph: {
    title: "Founder | Origin Coffee Cambodia - OCC",
    description:
      "Philosophy, Credentials, and the Big Idea. OCC didn't begin with a business plan. It began with a question no one was asking.",
    url: `${siteUrl}/about/founder`,
    siteName: "Origin Coffee Cambodia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder | Origin Coffee Cambodia - OCC",
    description:
      "Philosophy, Credentials, and the Big Idea. The story behind Cambodia's most uncompromising coffee infrastructure company.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "OCC Founder — Philosophy, Credentials, and the Big Idea",
  description:
    "OCC didn't begin with a business plan. It began with a question no one in Cambodia's coffee industry was asking: why does a great origin produce a forgettable cup?",
  url: `${siteUrl}/about/founder`,
  isPartOf: {
    "@type": "Organization",
    name: "Origin Coffee Cambodia (OCC)",
    description:
      "Specialty coffee infrastructure company based in Phnom Penh, Cambodia.",
  },
  mainEntity: {
    "@type": "Person",
    name: "OCC Founder",
    jobTitle: "Founder & Head Roaster",
    description:
      "Craftsman who refused to accept that Cambodia's coffee culture was defined by its weakest cup.",
    knowsAbout: [
      "Specialty Coffee Roasting",
      "Coffee Supply Chain Infrastructure",
      "Barista Training",
      "Coffee Traceability",
      "Cambodian Coffee Industry",
    ],
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    { "@type": "ListItem", position: 3, name: "Founder", item: `${siteUrl}/about/founder` },
  ],
}

const faqs = [
  {
    q: "Why was OCC founded?",
    a: "OCC began with a question no one in Cambodia's coffee industry was asking: why does a great origin produce a forgettable cup? The answer was never the bean — it was the roast, the training, and the supplier who moved on after the sale. OCC was built to fix the system, not one part of it.",
  },
  {
    q: "What is the founder's philosophy on craftsmanship?",
    a: "Craftsmanship at OCC is not a credential. It is a standard held internally before anyone else applies it. Every roast profile, every training session, every service call is either right or it isn't — there is no in between.",
  },
  {
    q: "What does the OCC founder focus on today?",
    a: "Specialty coffee roasting, coffee supply chain infrastructure, barista training, and traceability across Cambodia's coffee industry — the four handoffs where quality is usually lost.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  // FAQ content is rendered visibly; no FAQ structured data is emitted.
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
}

const sections = [
  {
    title: "The Question",
    paragraphs: [
      "The answer was never the bean. It was everything that happened after. The roast that wasn't dialed in. The barista who wasn't trained. The supplier who moved on after the sale. We saw a system that was broken at every handoff — and decided that fixing one part wasn't enough.",
    ],
  },
  {
    title: "Craftsmanship",
    paragraphs: [
      "Craftsmanship, to us, is not a credential. It is a standard we hold ourselves to before anyone else does. Every roast profile, every training session, every service call — each one is either right or it isn't. There is no in between.",
    ],
  },
  {
    title: "One of Us",
    paragraphs: [
      "OCC was built by people who refused to accept that Cambodia's coffee culture was defined by its weakest cup. If you're reading this, you probably feel the same way. That makes you one of us.",
    ],
  },
]

export default function FounderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutInstitutionalTemplate
        index="02"
        title="FOUNDER"
        subtitle="PHILOSOPHY, CREDENTIALS, AND THE BIG IDEA."
        lead={[
          "OCC didn't begin with a business plan. It began with a question no one in Cambodia's coffee industry was asking: why does a great origin produce a forgettable cup?",
        ]}
        sections={sections}
        faqs={faqs}
        next={{
          href: "/about/manifesto",
          label: "Manifesto",
          description: "The Barista Army Thesis: Why We'll Never Open a Cafe.",
          note: "Which brings us to the big idea. The one that made everyone think we were crazy.",
        }}
      />
    </>
  )
}
