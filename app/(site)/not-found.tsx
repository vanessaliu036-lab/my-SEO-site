import type { Metadata } from "next"
import { NotFoundContent } from "@/components/site/not-found-content"

export const metadata: Metadata = {
  title: "404 | Page Not Found | Origin Coffee Cambodia",
  description: "The page you are looking for could not be found. Explore Cambodian coffee origins, wholesale sourcing, or get in touch with Origin Coffee Cambodia.",
  alternates: {
    canonical: null,
    languages: null,
  },
  robots: { index: false, follow: true },
}

export default function PublicSiteNotFound() {
  return <NotFoundContent />
}
