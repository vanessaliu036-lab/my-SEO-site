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

const SERVICES = [
  "Wholesale",
  "Roasting Program",
  "Barista Staffing",
  "Equipment Service",
] as const satisfies readonly ContactFormData["service"][]

// Base Tailwind classes shared across form inputs
const inputBase =
  "w-full bg-transparent border-0 border-b border-[#d0cdc8] focus:border-[#0f0f0f] py-2.5 text-[15px] font-light text-[#0f0f0f] placeholder:text-[#9a9a9a] placeholder:italic outline-none transition-colors"

const labelBase =
  "block text-[10px] tracking-[0.2em] uppercase text-[#9a9a9a] mb-2.5 [font-family:var(--font-barlow-condensed)]"

interface ContactFormProps {
  /** CSS variable classNames injected by the Server Component parent */
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

  const selectedService = watch("service")

  const onSubmit = (data: ContactFormData) => {
    setServerError(null)
    startTransition(async () => {
      const result = await submitContactForm(data)
      if (result.success) {
        setIsSuccess(true)
      } else {
        setServerError(result.error)
      }
    })
  }

  return (
    <div
      className={`${fontVars} min-h-screen bg-[#f4f2ef] [font-family:var(--font-barlow)] relative`}
    >
      {/* ── Breadcrumb nav ─────────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="absolute top-8 left-8 z-20 flex items-center gap-4"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#5a5a5a] hover:text-[#0f0f0f] transition-colors [font-family:var(--font-barlow-condensed)]"
          aria-label="Return to homepage"
        >
          <span className="inline-block w-5 h-px bg-current" aria-hidden="true" />
          Home
        </Link>
        <span className="text-[11px] text-[#9a9a9a] [font-family:var(--font-barlow-condensed)]">
          / Contact
        </span>
      </nav>

      {/* ── Vertical side label ────────────────────────────────────────────── */}
      <div
        className="fixed right-5 top-1/2 -translate-y-1/2 rotate-90 text-[10px] tracking-[0.25em] text-[#9a9a9a] uppercase whitespace-nowrap hidden md:flex items-center gap-3 [font-family:var(--font-barlow-condensed)]"
        aria-hidden="true"
      >
        <span className="inline-block w-5 h-px bg-[#9a9a9a]" />
        Enquiries
        <span className="inline-block w-5 h-px bg-[#9a9a9a]" />
      </div>

      {/* ── Main two-column grid ───────────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 min-h-screen pt-20">

        {/* Left panel — info */}
        <div className="relative flex flex-col justify-between p-10 md:p-16 border-b md:border-b-0 md:border-r border-[#d0cdc8]">
          <div
            className="flex items-center gap-3 mb-10 text-[11px] tracking-[0.2em] text-[#9a9a9a] uppercase [font-family:var(--font-barlow-condensed)]"
            aria-hidden="true"
          >
            <span className="inline-block w-8 h-px bg-[#9a9a9a]" />
            Contact
          </div>

          <div>
            <h1
              className="leading-[0.92] tracking-[0.02em] text-[#0f0f0f] mb-8 [font-family:var(--font-bebas)]"
              style={{ fontSize: "clamp(64px, 8vw, 110px)" }}
            >
              LET&apos;S<br />TALK.
            </h1>
            <p className="text-sm font-light italic text-[#5a5a5a] leading-relaxed max-w-[340px] mb-16 pl-4 border-l-2 border-[#0f0f0f]">
              Every serious operation starts with a conversation.
              Tell us what you need — we&apos;ll respond with precision.
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex flex-col gap-1 mb-7 pb-7 border-b border-[#d0cdc8]">
              <span className={labelBase}>Location</span>
              <span className="text-sm font-normal text-[#0f0f0f]">
                Phnom Penh, Cambodia
              </span>
            </div>
            <div className="flex flex-col gap-1 mb-7 pb-7 border-b border-[#d0cdc8]">
              <span className={labelBase}>Response Time</span>
              <span className="text-sm font-normal text-[#0f0f0f]">
                Within 1 business day
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className={labelBase}>Brand</span>
              <span className="text-sm font-normal text-[#0f0f0f]">
                ORIGINS — Origin Coffee Crafter
              </span>
            </div>
          </div>

          {/* Dot grid decoration */}
          <div
            className="absolute bottom-20 right-10 hidden md:grid grid-cols-6 gap-1.5"
            aria-hidden="true"
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="w-[3px] h-[3px] rounded-full bg-[#9a9a9a] opacity-40"
              />
            ))}
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex flex-col justify-center p-10 md:p-16">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.15em] text-[#9a9a9a] uppercase mb-2 [font-family:var(--font-barlow-condensed)]">
              01 / Enquiry Form
            </p>
            <p className="text-[22px] font-medium tracking-[0.08em] uppercase text-[#0f0f0f] [font-family:var(--font-barlow-condensed)]">
              Send Your Enquiry
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* Name */}
            <div className="mb-8">
              <label htmlFor="name" className={labelBase}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className={inputBase}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name")}
              />
              {errors.name && (
                <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-8">
              <label htmlFor="email" className={labelBase}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="your@email.com"
                className={inputBase}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Service selector */}
            <fieldset className="mb-8">
              <legend className={labelBase}>Service Type</legend>
              <div
                className="grid grid-cols-2 gap-2.5 mt-1"
                role="group"
                aria-describedby={errors.service ? "service-error" : undefined}
              >
                {SERVICES.map((svc) => {
                  const isSelected = selectedService === svc
                  return (
                    <label
                      key={svc}
                      className={`flex items-center gap-2.5 px-3.5 py-3 border cursor-pointer transition-all text-[12px] tracking-[0.1em] uppercase [font-family:var(--font-barlow-condensed)] ${
                        isSelected
                          ? "bg-[#0f0f0f] text-[#f4f2ef] border-[#0f0f0f]"
                          : "border-[#d0cdc8] text-[#5a5a5a] hover:border-[#5a5a5a] hover:text-[#0f0f0f]"
                      }`}
                    >
                      <input
                        type="radio"
                        value={svc}
                        className="sr-only"
                        {...register("service")}
                      />
                      <span
                        className={`text-[10px] flex-shrink-0 ${isSelected ? "text-[#f4f2ef]" : "text-[#9a9a9a]"}`}
                        aria-hidden="true"
                      >
                        ✕
                      </span>
                      {svc}
                    </label>
                  )
                })}
              </div>
              {errors.service && (
                <p id="service-error" role="alert" className="mt-1.5 text-xs text-red-600">
                  {errors.service.message}
                </p>
              )}
            </fieldset>

            {/* Message (optional) */}
            <div className="mb-8">
              <label htmlFor="message" className={labelBase}>
                Message{" "}
                <span className="normal-case tracking-normal font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us about your operation, volume requirements, or any questions."
                className={`${inputBase} resize-none`}
                aria-describedby={errors.message ? "message-error" : undefined}
                {...register("message")}
              />
              {errors.message && (
                <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Server-side error */}
            {serverError && (
              <p
                role="alert"
                className="mb-6 text-sm text-red-700 border border-red-200 bg-red-50 px-4 py-3"
              >
                {serverError}
              </p>
            )}

            {/* Submit row */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#d0cdc8] flex-wrap gap-4">
              <p className="text-xs italic text-[#9a9a9a] max-w-[200px] leading-relaxed">
                We respond within one business day.
              </p>
              <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-3.5 bg-[#0f0f0f] text-[#f4f2ef] px-7 py-4 text-[13px] tracking-[0.18em] uppercase [font-family:var(--font-barlow-condensed)] hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] justify-center"
              >
                {isPending ? "Sending…" : (
                  <>Send Enquiry <span aria-hidden="true">→</span></>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Bottom strip ───────────────────────────────────────────────────── */}
      <div className="border-t border-[#d0cdc8] px-10 py-5 flex justify-between items-center flex-wrap gap-2">
        <span className="text-[11px] tracking-[0.15em] text-[#9a9a9a] uppercase [font-family:var(--font-barlow-condensed)]">
          ORIGINS — Origin Coffee Crafter
        </span>
        <span className="text-[11px] tracking-[0.1em] text-[#9a9a9a] [font-family:var(--font-barlow-condensed)]">
          Phnom Penh, Cambodia
        </span>
      </div>

      {/* ── Success overlay ────────────────────────────────────────────────── */}
      {isSuccess && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
          className="fixed inset-0 bg-[#0f0f0f] text-[#f4f2ef] z-50 flex flex-col items-center justify-center text-center p-10"
        >
          <p className="text-[11px] tracking-[0.25em] text-[#888] uppercase mb-6 [font-family:var(--font-barlow-condensed)]">
            Enquiry Received
          </p>
          <h2
            id="success-title"
            className="tracking-[0.04em] mb-5 [font-family:var(--font-bebas)]"
            style={{ fontSize: "72px" }}
          >
            NOTED.
          </h2>
          <p className="text-[15px] font-light italic text-[#aaa] max-w-xs leading-relaxed mb-10">
            Your enquiry has been received.
            <br />
            We&apos;ll be in touch within one business day.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-[12px] tracking-[0.2em] uppercase text-white border-b border-[#555] pb-1 hover:border-white transition-colors [font-family:var(--font-barlow-condensed)]"
          >
            ← Return
          </button>
        </div>
      )}
    </div>
  )
}
