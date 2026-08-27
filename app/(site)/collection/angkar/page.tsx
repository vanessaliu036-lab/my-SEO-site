import { permanentRedirect } from "next/navigation"

export default function LegacyAngkarCollectionPage() {
  permanentRedirect("/blog")
}
