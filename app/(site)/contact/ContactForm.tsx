"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { submitContactForm } from "./action"
import { contactSchema, type ContactFormData } from "./schema"

const ENQUIRY_TYPES = [
  "Wholesale / Sourcing",
  "Sample Request",
  "Lot List",
  "Roasting / Solutions",
  "Editorial / Source Correction",
  "Media / Interview",
  "General Enquiry",
] as const satisfies readonly ContactFormData["service"][]

const inputBase =
  "w-full bg-transparent border-0 border-b border-occ-surface focus:border-occ-primary py-2.5 text-[15px] font-light text-occ-primary placeholder:text-occ-secondary placeholder:italic outline-none transition-colors"

const labelBase =
  "block text-[10px] tracking-[0.2em] uppercase text-occ-secondary mb-2.5 [font-family:var(--occ-font-subtitle)]"

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

  const onSubmit = (data: ContactFormData) => {
    setServerError(null)
    startTransition(async () => {
      const result = await submitContactForm(data)
      if (result.success) {
        window.gtag?.("event", "generate_lead", {
          lead_type: data.service,
          page_path: `${window.location.pathname}${window.location.search}`,
        })
        setIsSuccess(true)
      } else {
        setServerError(result.error)
      }
    })
  }

  return (
    <div className="min-h-screen bg-occ-background [font-family:var(--occ-font-body)] relative">
      <nav aria-label="Breadcrumb" className="absolute top-8 left-8 z-20 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-occ-secondary hover:text-occ-primary transition-colors [font-family:var(--occ-font-subtitle)]"
          aria-label="Return to homepage"
        >
          <span className="inline-block w-5 h-px bg-current" aria-hidden="true" />
          Home
        </Link>
        <span className="text-[11px] text-occ-secondary [font-family:var(--occ-font-subtitle)]">/ Contact</span>
      </nav>

      <div className="grid min-h-screen pt-20 md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative flex flex-col justify-between p-10 md:p-16 border-b md:border-b-0 md:border-r border-occ-surface">
          <div className="flex items-center gap-3 mb-10 text-[11px] tracking-[0.2em] text-occ-secondary uppercase [font-family:var(--occ-font-subtitle)]">
            <span className="inline-block w-8 h-px bg-occ-secondary" />
            Contact
          </div>

          <div>
            <h1 className="mb-8 leading-[0.94] tracking-[-0.03em] text-occ-primary [font-family:var(--occ-font-title)]" style={{ fontSize: "clamp(48px, 6vw, 72px)" }}>
              GET IN<br />TOUCH.
            </h1>
            <p className="text-sm font-light italic text-occ-secondary leading-relaxed max-w-[390px] mb-16 pl-4 border-l-2 border-occ-primary">
              Contact OCC for wholesale and sourcing enquiries, sample requests, lot-list questions, roasting or coffee solutions, as well as editorial and media enquiries.
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex flex-col gap-1 mb-7 pb-7 border-b border-occ-surface">
              <span className={labelBase}>Business Focus</span>
              <span className="text-sm font-normal text-occ-primary">Sourcing · Wholesale · Roasting · B2B Coffee Solutions</span>
            </div>
            <div className="flex flex-col gap-1 mb-7 pb-7 border-b border-occ-surface">
              <span className={labelBase}>Authority Focus</span>
              <span className="text-sm font-normal text-occ-primary">Cambodia · Fine Robusta · Coffea canephora</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className={labelBase}>Platform</span>
              <span className="text-sm font-normal text-occ-primary">OCC — Origin Coffee Cambodia</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-10 md:p-16">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.15em] text-occ-secondary uppercase mb-2 [font-family:var(--occ-font-subtitle)]">01 / Contact Form</p>
            <p className="text-[22px] font-medium tracking-[0.08em] uppercase text-occ-primary [font-family:var(--occ-font-subtitle)]">Start an Enquiry</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-8">
              <label htmlFor="name" className={labelBase}>Full Name</label>
              <input id="name" type="text" autoComplete="name" data-clarity-mask="true" placeholder="Your name" className={inputBase} aria-invalid={!!errors.name} {...register("name")} />
              {errors.name && <p role="alert" className="mt-1.5 text-xs text-occ-burgundy">{errors.name.message}</p>}
            </div>

            <div className="mb-8">
              <label htmlFor="email" className={labelBase}>Email Address</label>
              <input id="email" type="email" autoComplete="email" data-clarity-mask="true" placeholder="your@email.com" className={inputBase} aria-invalid={!!errors.email} {...register("email")} />
              {errors.email && <p role="alert" className="mt-1.5 text-xs text-occ-burgundy">{errors.email.message}</p>}
            </div>

            <fieldset className="mb-8">
              <legend className={labelBase}>Enquiry Type</legend>
              <div className="grid grid-cols-2 gap-2.5 mt-1">
                {ENQUIRY_TYPES.map((type) => {
                  const isSelected = selectedType === type
                  return (
                    <label key={type} className={`flex items-center gap-2.5 px-3.5 py-3 border cursor-pointer transition-all text-[12px] tracking-[0.1em] uppercase [font-family:var(--occ-font-subtitle)] ${isSelected ? "bg-occ-primary text-occ-background border-occ-primary" : "border-occ-surface text-occ-secondary hover:border-occ-secondary hover:text-occ-primary"}`}>
                      <input type="radio" value={type} className="sr-only" {...register("service")} />
                      {type}
                    </label>
                  )
                })}
              </div>
              {errors.service && <p role="alert" className="mt-1.5 text-xs text-occ-burgundy">{errors.service.message}</p>}
            </fieldset>

            <div className="mb-8">
              <label htmlFor="message" className={labelBase}>Message <span className="normal-case tracking-normal font-normal">(optional)</span></label>
              <textarea id="message" rows={4} data-clarity-mask="true" placeholder="Tell us what you need, the coffee or service context, expected use, timing, and any relevant quality or sourcing requirements." className={`${inputBase} resize-none`} {...register("message")} />
              {errors.message && <p role="alert" className="mt-1.5 text-xs text-occ-burgundy">{errors.message.message}</p>}
            </div>

            {serverError && <p role="alert" className="mb-6 border border-occ-burgundy bg-occ-surface px-4 py-3 text-sm text-occ-burgundy">{serverError}</p>}

            <div className="flex items-center justify-end mt-12 pt-8 border-t border-occ-surface">
              <button type="submit" disabled={isPending} className="flex items-center gap-3.5 bg-occ-primary text-occ-background px-7 py-4 text-[13px] tracking-[0.18em] uppercase [font-family:var(--occ-font-subtitle)] hover:bg-occ-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] justify-center">
                {isPending ? "Sending…" : <>Send Enquiry <span aria-hidden="true">→</span></>}
              </button>
            </div>
          </form>
        </div>
      </div>

      {isSuccess && (
        <div role="dialog" aria-modal="true" aria-labelledby="success-title" className="fixed inset-0 bg-occ-primary text-occ-background z-50 flex flex-col items-center justify-center text-center p-10">
          <p className="text-[11px] tracking-[0.25em] text-occ-secondary uppercase mb-6 [font-family:var(--occ-font-subtitle)]">Enquiry Received</p>
          <h2 id="success-title" className="tracking-[0.04em] mb-5 [font-family:var(--occ-font-title)]" style={{ fontSize: "72px" }}>NOTED.</h2>
          <p className="text-[15px] font-light italic text-occ-secondary max-w-xs leading-relaxed mb-10">Your enquiry has been received.</p>
          <button onClick={() => setIsSuccess(false)} className="text-[12px] tracking-[0.2em] uppercase text-white border-b border-occ-secondary pb-1 hover:border-white transition-colors [font-family:var(--occ-font-subtitle)]">← Return</button>
        </div>
      )}
    </div>
  )
}
