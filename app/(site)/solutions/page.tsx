import { permanentRedirect } from "next/navigation"

export default function LegacySolutionsPage() {
  permanentRedirect("/blog")
}
