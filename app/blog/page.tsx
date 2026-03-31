import { siteUrl } from "@/lib/siteConfig"

export const metadata = {
  title: "Blog | Arunéra Coffee Cambodia",
  description: "Insights on specialty coffee sourcing, Cambodia origins, and precision roasting from Origin Coffee Crafter.",
  alternates: { canonical: `${siteUrl}/blog` },
};

export const dynamic = "force-dynamic";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
  ],
}

export default async function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p>Coming soon...</p>
      </div>
      </main>
    </>
  )
}
