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
        <div className="occ-contact-hero-grid">
          <div className="occ-contact-hero-copy">
            <div className="occ-contact-eyebrow">CONTACT</div>
            <h1>Start a conversation with OCC.</h1>
            <p className="occ-contact-intro">
              Wholesale, custom roasting, hotel partnerships and Cambodian coffee sourcing —
              tell us what you&apos;re working on.
            </p>
          </div>

          <aside className="occ-contact-rail" aria-label="Direct contact">
            <div className="occ-contact-rail-kicker">Direct Contact</div>

            <div className="occ-contact-rail-item">
              <span className="occ-contact-rail-label">Company Email</span>
              <div className="occ-contact-rail-value">
                <a href="mailto:service@origincafekh.com">service@origincafekh.com</a>
              </div>
            </div>

            <div className="occ-contact-rail-item">
              <span className="occ-contact-rail-label">Telegram</span>
              <div className="occ-contact-rail-value">
                <a
                  href="https://t.me/+85514360479"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +855 14 360 479
                </a>
              </div>
            </div>

            <div className="occ-contact-rail-item">
              <span className="occ-contact-rail-label">Enquiries</span>
              <div className="occ-contact-rail-note">
                Wholesale · Roasting · Hotel · Distribution
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="occ-contact-main" id="enquiry">
        <div className="occ-contact-form-card">
          <div className="occ-contact-form-heading">
            <div>
              <div className="occ-contact-section-kicker">01 / Enquiry</div>
              <h2>Tell us the essentials.</h2>
            </div>
            <p>
              A short brief is enough. OCC will route your enquiry to the right
              commercial conversation.
            </p>
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
                <label htmlFor="name">Full Name <span className="occ-contact-required" aria-hidden="true">*</span></label>
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
                <label htmlFor="jobTitle">Job Title / Position</label>
                <input
                  id="jobTitle"
                  type="text"
                  autoComplete="organization-title"
                  data-clarity-mask="true"
                  placeholder="Founder, Manager, Purchasing Manager…"
                  aria-invalid={!!errors.jobTitle}
                  {...register("jobTitle")}
                />
                {errors.jobTitle && <p role="alert" className="occ-contact-error">{errors.jobTitle.message}</p>}
              </div>
            </div>

            <div className="occ-contact-field-row">
              <div className="occ-contact-field">
                <label htmlFor="phone">Phone <span className="occ-contact-required" aria-hidden="true">*</span></label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  data-clarity-mask="true"
                  placeholder="+855 12 345 678"
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                />
                {errors.phone && <p role="alert" className="occ-contact-error">{errors.phone.message}</p>}
              </div>

              <div className="occ-contact-field">
                <label htmlFor="email">Work Email <span className="occ-contact-required" aria-hidden="true">*</span></label>
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
            </div>

            <div className="occ-contact-field-row">
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
                      <span>
                        {type === "Wholesale / Sourcing"
                          ? "Wholesale"
                          : type === "Roasting / Solutions"
                            ? "Roasting"
                            : type === "Partnership / Distribution"
                              ? "Hotel / Partner"
                              : "Other"}
                      </span>
                    </label>
                  )
                })}
              </div>
              {errors.service && <p role="alert" className="occ-contact-error">{errors.service.message}</p>}
            </fieldset>

            <div className="occ-contact-field occ-contact-message-field">
              <label htmlFor="message">Project / Requirement <span className="occ-contact-required" aria-hidden="true">*</span></label>
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
              <p>
                Your submission is saved to the OCC commercial inbox before success is shown.
              </p>
              <button type="submit" disabled={isPending}>
                {isPending ? "Sending…" : <>Send Enquiry <span aria-hidden="true">→</span></>}
              </button>
            </div>
          </form>
        </div>

        <div className="occ-contact-brand-strip">
          <div className="occ-contact-brand-group">
            <span><strong>Origin</strong> Cambodia</span>
            <span><strong>Focus</strong> Fine Robusta · B2B</span>
          </div>
          <span>Origin Coffee Cambodia</span>
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
