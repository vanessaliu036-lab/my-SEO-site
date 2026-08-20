import BlogScrollToContent from "./BlogScrollToContent"
import { publisherLogoImageObject } from "@/lib/organizationSchema"
import { siteDescription, siteName, siteUrl } from "@/lib/siteConfig"

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${siteUrl}/blog#blog`,
  name: `${siteName} Journal`,
  url: `${siteUrl}/blog`,
  description:
    "Research, buyer education, and industry analysis about Fine Robusta, Coffea canephora, Cambodian coffee, processing, roasting, sourcing, and origin development.",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    description: siteDescription,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    logo: publisherLogoImageObject(),
  },
  about: [
    { "@type": "DefinedTerm", name: "Fine Robusta" },
    { "@type": "Thing", name: "Coffea canephora" },
    { "@type": "Thing", name: "Cambodian coffee" },
    { "@type": "Thing", name: "Coffee processing" },
    { "@type": "Thing", name: "Coffee roasting" },
  ],
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <BlogScrollToContent />
      {children}
    </>
  )
}
