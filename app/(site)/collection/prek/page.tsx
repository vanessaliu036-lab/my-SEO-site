import { permanentRedirect } from "next/navigation"

export default function LegacyPrekCollectionPage() {
  permanentRedirect("/blog")
}
