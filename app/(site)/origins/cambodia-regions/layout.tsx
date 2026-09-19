import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight, Leaf, Mountain, NotebookPen } from "lucide-react"
import "./template.css"

/** The global SiteShell owns the only header, logo, primary navigation, CTA and footer. */
export default function CambodiaRegionsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="occ-regions-template">
      <div className="occ-regions-frame">
        <section className="occ-regions-hero" aria-labelledby="cambodia-origin-title">
          <div className="occ-regions-hero-copy">
            <p className="occ-regions-kicker occ-regions-kicker-light"><Link href="/origins">ORIGINS</Link> / CAMBODIA &amp; REGIONS</p>
            <h1 id="cambodia-origin-title">Coffee begins<br />with a <em>place.</em><br />Ours is<br />Cambodia.</h1>
            <p className="occ-regions-hero-description">Cambodia coffee origins, the Mondulkiri highlands, and the evidence connecting a place to a cup.</p>
            <a className="occ-regions-pill occ-regions-pill-light" href="#regions-approach">Discover our origin <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <span className="occ-regions-origin-stamp" aria-label="OCC's commitment to Cambodia-grown coffee"><Leaf size={25} strokeWidth={1.2} />100%<br />CAMBODIA<br />ORIGIN</span>
          <a className="occ-regions-scroll" href="#regions-approach" aria-label="Continue to Cambodia coffee origin"><ArrowDown size={18} /></a>
        </section>

        <section className="occ-regions-split occ-regions-approach" id="regions-approach" aria-labelledby="regions-approach-title">
          <div className="occ-regions-paper">
            <p className="occ-regions-kicker">OUR APPROACH</p>
            <h2 id="regions-approach-title">Rooted in place,<br /><em>proven by context.</em></h2>
            <p className="occ-regions-body">Cambodia-grown coffee begins with an agricultural origin, not a packaging location. We map the highlands, distinguish regions and connect each quality claim to the coffee it actually describes.</p>
            <div className="occ-regions-points">
              <div><Leaf size={25} strokeWidth={1.25} /><h3>Cambodia<br />first</h3><p>Grown here, not simply roasted, packed or branded here.</p><a href="#regions-field-notes">Origin overview <ArrowUpRight size={12} /></a></div>
              <div><Mountain size={25} strokeWidth={1.25} /><h3>Mondulkiri<br />highlands</h3><p>Our central regional focus within Cambodia’s northeast.</p><a href="#regions-field-notes">Meet the region <ArrowUpRight size={12} /></a></div>
              <div><NotebookPen size={25} strokeWidth={1.25} /><h3>Records,<br />not claims</h3><p>Evidence belongs to a named farm, sample or lot.</p><a href="#regions-field-notes">Read the records <ArrowUpRight size={12} /></a></div>
            </div>
          </div>
          <div className="occ-regions-photo occ-regions-photo-mist">
            <div className="occ-regions-photo-copy"><h2>One origin.<br /><em>Many contexts.</em></h2><p>Altitude, rainfall, soil and processing vary. A region is not a guaranteed flavor or quality grade.</p><a href="#regions-field-notes" className="occ-regions-line-link">Explore the geography <span><ArrowRight size={18} /></span></a></div>
          </div>
        </section>

        <section className="occ-regions-impact" aria-labelledby="regions-impact-title">
          <div className="occ-regions-impact-heading"><p className="occ-regions-kicker occ-regions-kicker-light">OUR ORIGIN</p><h2 id="regions-impact-title">Real places.<br /><em>Clearer proof.</em></h2><a href="#regions-field-notes">Explore the research <ArrowUpRight size={13} /></a></div>
          <div className="occ-regions-metric"><Leaf size={24} strokeWidth={1.2} /><strong>100%</strong><span>Cambodia-grown coffee<br />Our sourcing commitment</span></div>
          <div className="occ-regions-metric"><Mountain size={24} strokeWidth={1.2} /><strong>01</strong><span>Primary regional focus<br />Mondulkiri, Cambodia</span></div>
          <div className="occ-regions-metric"><NotebookPen size={24} strokeWidth={1.2} /><strong>09</strong><span>Origin-record fields<br />Verification framework*</span></div>
        </section>

        <section className="occ-regions-split occ-regions-closing" aria-label="Continue from geography to coffee quality">
          <div className="occ-regions-closing-paper"><p className="occ-regions-kicker">THE NEXT LAYER</p><h2>From the land<br /><em>to the cup.</em></h2><Link href="/fine-robusta-cambodia" className="occ-regions-pill occ-regions-pill-dark">Explore Fine Robusta <ArrowRight size={16} aria-hidden="true" /></Link><Leaf className="occ-regions-botanical" size={220} strokeWidth={0.7} aria-hidden="true" /></div>
          <div className="occ-regions-photo occ-regions-photo-forest"><div className="occ-regions-photo-copy occ-regions-photo-copy-left"><h2>A name on a map<br />is a beginning.<br /><em>A traceable lot<br />takes us further.</em></h2><p>Follow the journey from region to farm, harvest, process and a sample that represents the coffee offered.</p><Link href="/origins/single-origin" className="occ-regions-line-link">View single-origin collection <span><ArrowRight size={18} /></span></Link></div></div>
        </section>
      </div>

      <section id="regions-field-notes" className="occ-regions-research" aria-label="Cambodia coffee geography and origin research">
        <div className="occ-regions-research-intro"><p className="occ-regions-kicker">CAMBODIA / GEOGRAPHY / EVIDENCE</p><h2>Understand the place.<br /><em>Keep the claims precise.</em></h2><p>The full existing Cambodia &amp; Regions research follows below. The geography, evidence distinctions and long-form source content remain available without duplicating the global website navigation.</p><p className="occ-regions-note">*Nine is the number of verification fields in the framework, not a claim that nine source records have been completed or certified.</p></div>
        <div className="occ-regions-original-content">{children}</div>
        <div className="occ-regions-bottom-links"><Link href="/fine-robusta-cambodia">Explore Fine Robusta Cambodia <ArrowUpRight size={16} /></Link><Link href="/origins/single-origin">View single-origin collection <ArrowUpRight size={16} /></Link></div>
      </section>
    </div>
  )
}
