import type { ReactNode } from "react"
import "./collection-product.css"

export default function CollectionLayout({ children }: { children: ReactNode }) {
  return <div className="occ-collection-shell">{children}</div>
}
