import { permanentRedirect } from "next/navigation"

export default function SingleOriginPage() {
  permanentRedirect("/origins")
}
