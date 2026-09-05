"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import {
  submitContactForm,
  contactSchema,
  type ContactFormData,
} from "./action"

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
  "w-full bg-transparent border-0 border-b border-[#d0cdc8] focus:border-[#0f0f0f] py-2.5 text-[15px] font-light text-[#0f0f0f] placeholder:text-[#9a9a9a] placeholder:italic outline-none transition-colors"

const labelBase =
  "block text-[10px] tracking-[0.2em] uppercase text-[#9a9a9a] mb-2.5 [font-family:var(--font-barlow-condensed)]"

interface ContactFormProps {
  fontVars: string
}

export default function ContactForm({ fontVars }: ContactFormProps) {
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
      if (result.success) setIsSuccess(true)
      else setServerError(result.error)
    })
  }

  return (
    <div className={`${fontVars} min-h-screen bg-[#f4f2ef] [font-family:var(--font-barlow)] relative`}>
      <nav aria-label="Breadcrumb" className="absolute top-8 left-8 z-20 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#5a5a5a] hover:text-[#0f0f0f] transition-colors [font-family:var(--font-barlow-condensed)]"
          aria-label="Return to homepage"
        >
          <span className="inline-block w-5 h-px bg-current" aria-hidden="true" />
          Home
        </Link>
        <span className="text-[11px] text-[#9a9a9a] [font-family:var(--font-barlow-condensed)]">/ Contact</span>
      </nav>

      <div className="grid md:grid-cols-2 min-h-screen pt-20">
        <div className="relative flex flex-col justify-between p-10 md:p-16 border-b md:border-b-0 md:border-r border-[#d0cdc8]">
          <div className="flex items-center gap-3 mb-10 text-[11px] tracking-[0.2em] text-[#9a9a9a] uppercase [font-family:var(--font-barlow-condensed)]">
            <span className="inline-block w-8 h-px bg-[#9a9a9a]" />
            Contact
          </div>

          <div>
            <h1 className="leading-[0.92] tracking-[0.02em] text-[#0f0f0f] mb-8 [font-family:var(--font-bebas)]" style={{ fontSize: "clamp(64px, 8vw, 110px)" }}>
              GET IN<br />TOUCH.
            </h1>
            <p className="text-sm font-light italic text-[#5a5a5a] leading-relaxed max-w-[390px] mb-16 pl-4 border-l-2 border-[#0f0f0f]">
              Contact OCC for wholesale and sourcing enquiries, sample requests, lot-list questions, roasting or coffee solutions, as well as editorial and media enquiries.
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex flex-col gap-1 mb-7 pb-7 border-b border-[#d0cdc8]">
              <span className={labelBase}>Business Focus</span>
              <span className="text-sm font-normal text-[#0f0f0f]">Sourcing · Wholesale · Roasting · B2B Coffee Solutions</span>
            </div>
            <div className="flex flex-col gap-1 mb-7 pb-7 border-b border-[#d0cdc8]">
              <span className={labelBase}>Authority Focus</span>
              <span className="text-sm font-normal text-[#0f0f0f]">Cambodia · Fine Robusta · Coffea canephora</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className={labelBase}>Platform</span>
              <span className="text-sm font-normal text-[#0f0f0f]">OCC — Origin Coffee Cambodia</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-10 md:p-16">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.15em] text-[#9a9a9a] uppercase mb-2 [font-family:var(--font-barlow-condensed)]">01 / Contact Form</p>
            <p className="text-[22px] font-medium tracking-[0.08em] uppercase text-[#0f0f0f] [font-family:var(--font-barlow-condensed)]">Start an Enquiry</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-8">
              <label htmlFor="name" className={labelBase}>Full Name</label>
              <input id="name" type="text" autoComplete="name" data-clarity-mask="true" placeholder="Your name" className={inputBase} aria-invalid={!!errors.name} {...register("name")} />
              {errors.name && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>}
            </div>

            <div className="mb-8">
              <label htmlFor="email" className={labelBase}>Email Address</label>
              <input id="email" type="email" autoComplete="email" data-clarity-mask="true" placeholder="your@email.com" className={inputBase} aria-invalid={!!errors.email} {...register("email")} />
              {errors.email && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <fieldset className="mb-8">
              <legend className={labelBase}>Enquiry Type</legend>
              <div className="grid grid-cols-2 gap-2.5 mt-1">
                {ENQUIRY_TYPES.map((type) => {
                  const isSelected = selectedType === type
                  return (
                    <label key={type} className={`flex items-center gap-2.5 px-3.5 py-3 border cursor-pointer transition-all text-[12px] tracking-[0.1em] uppercase [font-family:var(--font-barlow-condensed)] ${isSelected ? "bg-[#0f0f0f] text-[#f4f2ef] border-[#0f0f0f]" : "border-[#d0cdc8] text-[#5a5a5a] hover:border-[#5a5a5a] hover:text-[#0f0f0f]"}`}>
                      <input type="radio" value={type} className="sr-only" {...register("service")} />
                      {type}
                    </label>
                  )
                })}
              </div>
              {errors.service && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.service.message}</p>}
            </fieldset>

            <div className="mb-8">
              <label htmlFor="message" className={labelBase}>Message <span className="normal-case tracking-normal font-normal">(optional)</span></label>
              <textarea id="message" rows={4} data-clarity-mask="true" placeholder="Tell us what you need, the coffee or service context, expected use, timing, and any relevant quality or sourcing requirements." className={`${inputBase} resize-none`} {...register("message")} />
              {errors.message && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.message.message}</p>}
            </div>

            {serverError && <p role="alert" className="mb-6 text-sm text-red-700 border border-red-200 bg-red-50 px-4 py-3">{serverError}</p>}

            <div className="flex items-center justify-end mt-12 pt-8 border-t border-[#d0cdc8]">
              <button type="submit" disabled={isPending} className="flex items-center gap-3.5 bg-[#0f0f0f] text-[#f4f2ef] px-7 py-4 text-[13px] tracking-[0.18em] uppercase [font-family:var(--font-barlow-condensed)] hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] justify-center">
                {isPending ? "Sending…" : <>Send Enquiry <span aria-hidden="true">→</span></>}
              </button>
            </div>
          </form>
        </div>
      </div>

      {isSuccess && (
        <div role="dialog" aria-modal="true" aria-labelledby="success-title" className="fixed inset-0 bg-[#0f0f0f] text-[#f4f2ef] z-50 flex flex-col items-center justify-center text-center p-10">
          <p className="text-[11px] tracking-[0.25em] text-[#888] uppercase mb-6 [font-family:var(--font-barlow-condensed)]">Enquiry Received</p>
          <h2 id="success-title" className="tracking-[0.04em] mb-5 [font-family:var(--font-bebas)]" style={{ fontSize: "72px" }}>NOTED.</h2>
          <p className="text-[15px] font-light italic text-[#aaa] max-w-xs leading-relaxed mb-10">Your enquiry has been received.</p>
          <button onClick={() => setIsSuccess(false)} className="text-[12px] tracking-[0.2em] uppercase text-white border-b border-[#555] pb-1 hover:border-white transition-colors [font-family:var(--font-barlow-condensed)]">← Return</button>
        </div>
      )}
    </div>
  )
}
