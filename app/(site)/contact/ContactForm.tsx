"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { submitContactForm } from "./action"
import { contactSchema, type ContactFormData } from "./schema"

const ENQUIRY_TYPES = [
  "Wholesale / Sourcing",
  "Roasting / Solutions",
  "Distribution / Partnership",
  "Other / General",
] as const satisfies readonly ContactFormData["service"][]

const PROJECT_STAGES = [
  "Exploring",
  "Comparing suppliers",
  "Sampling / Trial",
  "Ready to order",
] as const satisfies readonly ContactFormData["projectStage"][]

export default function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const selectedType = watch("service")
  const selectedStage = watch("projectStage")
  const message = watch("message") ?? ""

  const onSubmit = (data: ContactFormData) => {
    setServerError(null)
    startTransition(async () => {
      const result = await submitContactForm(data)
      if (result.success) {
        window.gtag?.("event", "generate_lead", {
          lead_type: data.service,
          company: data.company,
          market: data.country,
          project_stage: data.projectStage,
          page_path: window.location.pathname + window.location.search,
        })
        setIsSuccess(true)
      } else {
        setServerError(result.error)
      }
    })
  }

  return (
    <div className="occ-contact-page">
      <section className="occ-contact-hero">
        <div className="occ-contact-hero-copy">
          <div>
            <p className="occ-contact-eyebrow">Contact · Origin Coffee Cambodia</p>
            <h1>LET&apos;S<br /><em>TALK.</em></h1>
            <p className="occ-contact-intro">
              From Cambodian coffee sourcing and Fine Robusta supply to roasting programs,
              distribution and commercial partnerships — tell OCC what you are building.
            </p>
          </div>

          <div className="occ-contact-quick-grid">
            <a href="#enquiry" className="occ-contact-quick">
              <span>01</span><strong>Source Coffee</strong><small>Wholesale · lots · supply</small>
            </a>
            <a href="#enquiry" className="occ-contact-quick">
              <span>02</span><strong>Build a Program</strong><small>Roasting · B2B solutions</small>
            </a>
            <a href="#enquiry" className="occ-contact-quick">
              <span>03</span><strong>Partner</strong><small>Distribution · hospitality · gifting</small>
            </a>
          </div>
        </div>

        <div className="occ-contact-hero-visual">
          <img src="/hero-home.webp" alt="Cambodian coffee origin" />
          <span className="occ-contact-image-tag">Cambodia · Origin · Coffee</span>
          <div className="occ-contact-image-copy">
            <small>Start from origin</small>
            <strong>A clearer route from Cambodia to your next coffee project.</strong>
          </div>
        </div>
      </section>

      <section className="occ-contact-enquiry" id="enquiry">
        <aside className="occ-contact-aside">
          <div>
            <p className="occ-contact-section-no">01 / Start an enquiry</p>
            <h2>Tell us what<br />you are building.</h2>
            <p>
              Company, market, commercial intent and project stage go directly into the OCC
              staff inbox so the enquiry can be qualified without re-entering information.
            </p>
            <div className="occ-contact-methods">
              <a href="mailto:service@origincafekh.com"><span>↗</span><b>service@origincafekh.com</b><i>→</i></a>
              <a href="https://t.me/+85514360479" target="_blank" rel="noopener noreferrer"><span>↗</span><b>Telegram · +855 14 360 479</b><i>→</i></a>
              <div><span>•</span><b>Phnom Penh · Cambodia</b><i /></div>
            </div>
          </div>
        </aside>

        <div className="occ-contact-form-card">
          <div className="occ-contact-form-head">
            <h2>Commercial<br />enquiry.</h2>
            <p>One form · one staff inbox · no duplicate data entry</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="occ-contact-fields-two">
              <div className="occ-contact-field">
                <label htmlFor="name">Full Name</label>
                <input id="name" type="text" autoComplete="name" data-clarity-mask="true" placeholder="Your name" aria-invalid={!!errors.name} {...register("name")} />
                {errors.name && <p role="alert" className="occ-contact-error">{errors.name.message}</p>}
              </div>
              <div className="occ-contact-field">
                <label htmlFor="company">Company</label>
                <input id="company" type="text" autoComplete="organization" data-clarity-mask="true" placeholder="Company name" aria-invalid={!!errors.company} {...register("company")} />
                {errors.company && <p role="alert" className="occ-contact-error">{errors.company.message}</p>}
              </div>
            </div>

            <div className="occ-contact-fields-two">
              <div className="occ-contact-field">
                <label htmlFor="email">Work Email</label>
                <input id="email" type="email" autoComplete="email" data-clarity-mask="true" placeholder="name@company.com" aria-invalid={!!errors.email} {...register("email")} />
                {errors.email && <p role="alert" className="occ-contact-error">{errors.email.message}</p>}
              </div>
              <div className="occ-contact-field">
                <label htmlFor="country">Country / Market</label>
                <input id="country" type="text" autoComplete="country-name" data-clarity-mask="true" placeholder="e.g. Cambodia, Singapore" aria-invalid={!!errors.country} {...register("country")} />
                {errors.country && <p role="alert" className="occ-contact-error">{errors.country.message}</p>}
              </div>
            </div>

            <fieldset className="occ-contact-fieldset">
              <legend>Intent</legend>
              <div className="occ-contact-pills">
                {ENQUIRY_TYPES.map((type) => (
                  <label key={type} className={selectedType === type ? "is-selected" : ""}>
                    <input type="radio" value={type} {...register("service")} />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
              {errors.service && <p role="alert" className="occ-contact-error">{errors.service.message}</p>}
            </fieldset>

            <fieldset className="occ-contact-fieldset">
              <legend>Project Stage</legend>
              <div className="occ-contact-pills">
                {PROJECT_STAGES.map((stage) => (
                  <label key={stage} className={selectedStage === stage ? "is-selected" : ""}>
                    <input type="radio" value={stage} {...register("projectStage")} />
                    <span>{stage}</span>
                  </label>
                ))}
              </div>
              {errors.projectStage && <p role="alert" className="occ-contact-error">{errors.projectStage.message}</p>}
            </fieldset>

            <div className="occ-contact-field">
              <label htmlFor="message">Project / Requirement <span>(optional)</span></label>
              <p className="occ-contact-help" id="message-help">
                Useful context: expected use, timing, estimated quantity, roast format, quality or sourcing requirements.
              </p>
              <textarea
                id="message"
                rows={6}
                maxLength={2000}
                data-clarity-mask="true"
                placeholder="Tell us what you are looking for…"
                aria-describedby={"message-help message-count" + (errors.message ? " message-error" : "")}
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              <div className="occ-contact-count-row">
                {errors.message ? <p id="message-error" role="alert" className="occ-contact-error">{errors.message.message}</p> : <span />}
                <span id="message-count">{message.length} / 2000</span>
              </div>
            </div>

            {serverError && <p role="alert" className="occ-contact-server-error">{serverError}</p>}

            <div className="occ-contact-submit">
              <p>Your submission is saved to the OCC staff inbox before success is shown.</p>
              <button type="submit" disabled={isPending}>
                {isPending ? "Sending…" : <>Send Enquiry <span aria-hidden="true">→</span></>}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="occ-contact-routes">
        <div className="occ-contact-routes-inner">
          <div className="occ-contact-routes-head">
            <h2>One contact.<br />Three clear routes.</h2>
            <p>Every commercial enquiry begins here and moves into the right OCC workflow.</p>
          </div>
          <div className="occ-contact-route-grid">
            <article><span>01</span><h3>Sourcing & Supply</h3><p>Wholesale coffee, Cambodian origin sourcing and supply conversations.</p><Link href="/solutions/wholesale">Explore wholesale →</Link></article>
            <article><span>02</span><h3>Roasting & Coffee Solutions</h3><p>Roast development, B2B coffee programs and product support.</p><Link href="/solutions/roasting-program">Explore roasting →</Link></article>
            <article><span>03</span><h3>Partnerships & Distribution</h3><p>Distribution, hospitality, gifting and brand partnership conversations.</p><Link href="/partnerships">Explore partnerships →</Link></article>
          </div>
        </div>
      </section>

      {isSuccess && (
        <div role="dialog" aria-modal="true" aria-labelledby="success-title" className="occ-contact-success">
          <p>Enquiry Received</p>
          <h2 id="success-title">NOTED.</h2>
          <span>Your enquiry has been saved to the OCC commercial inbox.</span>
          <button onClick={() => setIsSuccess(false)}>← Return</button>
        </div>
      )}
    </div>
  )
}
