import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function SiteFinalCta() {
  return (
    <section
      className="occ-universal-final-cta"
      aria-label="Work with Origin Coffee Cambodia"
    >
      <div className="occ-universal-final-cta__inner">
        <div className="occ-universal-final-cta__label">
          <p>Work with OCC</p>
        </div>
        <div className="occ-universal-final-cta__content">
          <h2>Bring Cambodian coffee into your next program.</h2>
          <div className="occ-universal-final-cta__action">
            <Link href="/contact" className="occ-primary-cta occ-universal-final-cta__button">
              Contact OCC <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
