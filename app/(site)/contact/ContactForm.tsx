"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { submitContactForm } from "./action"
import { contactSchema, type ContactFormData } from "./schema"

const ENQUIRY_TYPES = [
  "Wholesale / Sourcing",
  "Roasting / Solutions",
  "Partnership / Distribution",
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
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

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
          page_path: `${window.location.pathname}${window.location.search}`,
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
            <div className="occ-contact-eyebrow">Contact · Origin Coffee Cambodia</div>
            <h1>
              LET&apos;S
              <br />
              <em>TALK.</em>
            </h1>
            <p className="occ-contact-intro">
              From Cambodian coffee sourcing and Fine Robusta samples to roasting programs,
              distribution and editorial enquiries — start with what you need, and OCC will
              route the conversation clearly.
            </p>
          </div>

          <div className="occ-contact-quick-links" aria-label="Contact routes">
            <a className="occ-contact-quick" href="#enquiry">
              <span className="occ-contact-quick-number">01</span>
              <strong>Source Coffee</strong>
              <small>Wholesale · lots · samples</small>
            </a>
            <a className="occ-contact-quick" href="#enquiry">
              <span className="occ-contact-quick-number">02</span>
              <strong>Build a Program</strong>
              <small>Roasting · B2B solutions</small>
            </a>
            <a className="occ-contact-quick" href="#enquiry">
              <span className="occ-contact-quick-number">03</span>
              <strong>Collaborate</strong>
              <small>Media · partnerships · editorial</small>
            </a>
          </div>
        </div>

        <div className="occ-contact-hero-visual">
          <div className="occ-contact-visual-art" aria-hidden="true">
            <span className="occ-contact-art-kicker">Origin Coffee Cambodia</span>
            <span className="occ-contact-art-word">CAMBODIA</span>
            <span className="occ-contact-art-line">Fine Robusta · Origin · B2B Coffee</span>
            <span className="occ-contact-art-mark">OCC.</span>
          </div>
          <div className="occ-contact-visual-tag">Cambodia · Origin · Coffee</div>
          <div className="occ-contact-visual-note">
            <small>Start from origin</small>
            <strong>A clearer route from Cambodia to your next coffee project.</strong>
          </div>
        </div>
      </section>

      <section className="occ-contact-main" id="enquiry">
        <aside className="occ-contact-aside">
          <div className="occ-contact-sticky">
            <div className="occ-contact-section-no">01 / Start an enquiry</div>
            <h2>
              Tell us what
              <br />
              you are building.
            </h2>
            <p>
              Choose the closest enquiry type and share the market, quantity, timing or
              project context you already know. You do not need a perfect brief.
            </p>

            <div className="occ-contact-methods">
              <a href="mailto:service@origincafekh.com" className="occ-contact-method">
                <span aria-hidden="true">↗</span>
                <span>service@origincafekh.com</span>
                <span className="occ-contact-arrow" aria-hidden="true">→</span>
              </a>
              <a
                href="https://t.me/+85514360479"
                target="_blank"
                rel="noopener noreferrer"
                className="occ-contact-method"
              >
                <span aria-hidden="true">↗</span>
                <span>Telegram · +855 14 360 479</span>
                <span className="occ-contact-arrow" aria-hidden="true">→</span>
              </a>
              <div className="occ-contact-method">
                <span aria-hidden="true">•</span>
                <span>Phnom Penh · Cambodia</span>
                <span />
              </div>
            </div>
          </div>
        </aside>

        <div className="occ-contact-form-card">
          <div className="occ-contact-form-heading">
            <h2>
              What can we
              <br />
              help with?
            </h2>
            <p>Wholesale · sourcing · samples · roasting · partnerships · media</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
            >
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>
            <div className="occ-contact-field-row">
              <div className="occ-contact-field">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  data-clarity-mask="true"
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && <p role="alert" className="occ-contact-error">{errors.name.message}</p>}
              </div>

              <div className="occ-contact-field">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  autoComplete="organization"
                  data-clarity-mask="true"
                  placeholder="Company name"
                  aria-invalid={!!errors.company}
                  {...register("company")}
                />
                {errors.company && <p role="alert" className="occ-contact-error">{errors.company.message}</p>}
              </div>
            </div>

            <div className="occ-contact-field-row">
              <div className="occ-contact-field">
                <label htmlFor="email">Work Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  data-clarity-mask="true"
                  placeholder="name@company.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && <p role="alert" className="occ-contact-error">{errors.email.message}</p>}
              </div>

              <div className="occ-contact-field">
                <label htmlFor="country">Country / Market</label>
                <input
                  id="country"
                  type="text"
                  autoComplete="country-name"
                  data-clarity-mask="true"
                  placeholder="e.g. Cambodia, Singapore"
                  aria-invalid={!!errors.country}
                  {...register("country")}
                />
                {errors.country && <p role="alert" className="occ-contact-error">{errors.country.message}</p>}
              </div>
            </div>

            <fieldset className="occ-contact-enquiry">
              <legend>Intent</legend>
              <div className="occ-contact-pills">
                {ENQUIRY_TYPES.map((type) => {
                  const isSelected = selectedType === type
                  return (
                    <label key={type} className={`occ-contact-pill${isSelected ? " is-selected" : ""}`}>
                      <input type="radio" value={type} {...register("service")} />
                      <span>{type}</span>
                    </label>
                  )
                })}
              </div>
              {errors.service && <p role="alert" className="occ-contact-error">{errors.service.message}</p>}
            </fieldset>

            <fieldset className="occ-contact-enquiry">
              <legend>Project Stage</legend>
              <div className="occ-contact-pills">
                {PROJECT_STAGES.map((stage) => {
                  const isSelected = selectedStage === stage
                  return (
                    <label key={stage} className={`occ-contact-pill${isSelected ? " is-selected" : ""}`}>
                      <input type="radio" value={stage} {...register("projectStage")} />
                      <span>{stage}</span>
                    </label>
                  )
                })}
              </div>
              {errors.projectStage && <p role="alert" className="occ-contact-error">{errors.projectStage.message}</p>}
            </fieldset>

            <div className="occ-contact-field occ-contact-message-field">
              <label htmlFor="message">Project / Requirement <span>(optional)</span></label>
              <p id="message-help" className="occ-contact-message-help">
                Useful context: market, expected use, timing, estimated quantity, roast format,
                quality or sourcing requirements.
              </p>
              <textarea
                id="message"
                rows={6}
                maxLength={2000}
                data-clarity-mask="true"
                placeholder="Tell us what you are looking for…"
                className="occ-contact-message resize-y"
                aria-describedby={`message-help message-count${errors.message ? " message-error" : ""}`}
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              <div className="occ-contact-message-meta">
                <div>
                  {errors.message && (
                    <p id="message-error" role="alert" className="occ-contact-error">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <p id="message-count" aria-live="polite">{message.length} / 2000</p>
              </div>
            </div>

            {serverError && (
              <p role="alert" className="occ-contact-server-error">{serverError}</p>
            )}

            <div className="occ-contact-submit-row">
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
          <div className="occ-contact-routes-heading">
            <h2>
              One contact.
              <br />
              Three clear routes.
            </h2>
            <p>
              Every enquiry begins here and moves to the right OCC conversation without
              making visitors decode our internal structure.
            </p>
          </div>

          <div className="occ-contact-route-grid">
            <article>
              <span>01</span>
              <h3>Sourcing &amp; Supply</h3>
              <p>
                For wholesale coffee, Cambodian origin sourcing, sample requests, current
                lots and supply conversations.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Roasting &amp; Coffee Solutions</h3>
              <p>
                For roast development, B2B coffee programs, product support and practical
                coffee solutions.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Partnerships &amp; Media</h3>
              <p>
                For distribution, brand collaboration, interviews, editorial requests and
                source corrections.
              </p>
            </article>
          </div>
        </div>
      </section>

      {isSuccess && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
          className="occ-contact-success"
        >
          <p>Enquiry Received</p>
          <h2 id="success-title">NOTED.</h2>
          <div>Your enquiry has been saved to the OCC commercial inbox.</div>
          <button type="button" onClick={() => setIsSuccess(false)}>← Return</button>
        </div>
      )}
    </div>
  )
}
