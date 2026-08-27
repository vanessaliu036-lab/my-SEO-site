import { permanentRedirect } from "next/navigation"

export default function LegacySovannCollectionPage() {
  permanentRedirect("/blog")
}
