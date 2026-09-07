import type { ReactNode } from "react"
import "../collection/collection-product.css"

export default function OriginsLayout({ children }: { children: ReactNode }) {
  return <div className="occ-collection-shell">{children}</div>
}
