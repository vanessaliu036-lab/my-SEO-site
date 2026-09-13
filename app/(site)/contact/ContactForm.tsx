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
  "Wholesale",
  "Custom Roasting",
  "Coffee Marketing",
  "Other Enquiry",
] as const satisfies readonly ContactFormData["service"][]

const COMMERCIAL_PATHS = [
  {
    eyebrow: "Ready-to-Sell",
    title: "Wholesale",
    service: "Wholesale" as const,
    description: "Choose an OCC-developed coffee for distribution, retail, hospitality, or B2B supply.",
  },
  {
    eyebrow: "Made-for-You",
    title: "Custom Roasting",
    service: "Custom Roasting" as const,
    description: "Develop a roast profile around your market, application, customer, and commercial product.",
  },
  {
    eyebrow: "Cambodian Market",
    title: "Coffee Marketing",
    service: "Coffee Marketing" as const,
    description: "Turn your existing menu into a signature drink customers remember and return for.",
  },
] as const

const PROJECT_CONTEXT: Record<ContactFormData["service"], string> = {
  Wholesale:
    "Tell us your market, preferred coffee format, intended channel, and what you would like to evaluate.",
  "Custom Roasting":
    "Tell us the market, brewing application, customer, and product direction you want to build.",
  "Coffee Marketing":
    "Tell us about your café, current menu, and the product experience you want customers to remember.",
  "Other Enquiry":
    "Tell us the context of your enquiry and the most useful next step for OCC to consider.",
}

const SUCCESS_PATH: Record<ContactFormData["service"], { href: string; label: string }> = {
  Wholesale: { href: "/solutions/wholesale", label: "Explore Wholesale Supply" },
  "Custom Roasting": { href: "/solutions/roasting-program", label: "Explore Roast Development" },
  "Coffee Marketing": { href: "/solutions/coffee-marketing", label: "Explore Coffee Marketing" },
  "Other Enquiry": { href: "/solutions", label: "Explore OCC Solutions" },
}

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
  const [submittedService, setSubmittedService] = useState<ContactFormData["service"] | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const selectedType = watch("service")
  const contextPlaceholder = selectedType
    ? PROJECT_CONTEXT[selectedType]
    : "Select a commercial path above, then tell us the market, product, or project context that matters."

  const selectPath = (service: ContactFormData["service"]) => {
    setValue("service", service, { shouldValidate: true, shouldDirty: true })
    window.gtag?.("event", "contact_path_select", {
      lead_type: service,
      page_path: `${window.location.pathname}${window.location.search}`,
    })
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const onSubmit = (data: ContactFormData) => {
    setServerError(null)
    startTransition(async () => {
      const result = await submitContactForm(data)
      if (result.success) {
        window.gtag?.("event", "generate_lead", {
          lead_type: data.service,
          page_path: `${window.location.pathname}${window.location.search}`,
        })
        setSubmittedService(data.service)
        setIsSuccess(true)
      } else {
        setServerError(result.error)
      }
    })
  }

  const successPath = submittedService ? SUCCESS_PATH[submittedService] : SUCCESS_PATH["Other Enquiry"]

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
        <div className="relative flex flex-col p-8 sm:p-10 md:p-14 lg:p-16 border-b md:border-b-0 md:border-r border-[#d0cdc8]">
          <div className="flex items-center gap-3 mb-10 text-[11px] tracking-[0.2em] text-[#a8542a] uppercase font-semibold [font-family:var(--font-barlow-condensed)]">
            <span className="inline-block w-8 h-px bg-[#a8542a]" />
            Contact / Commercial Enquiries
          </div>

          <div>
            <h1 className="leading-[0.9] tracking-[-0.02em] text-[#0f0f0f] mb-8 [font-family:var(--font-bebas)]" style={{ fontSize: "clamp(58px, 7.6vw, 104px)" }}>
              START A PROJECT<br />WITH OCC.
            </h1>
            <p className="text-[15px] font-light text-[#4f514d] leading-8 max-w-[500px] mb-12 pl-4 border-l-2 border-[#a8542a]">
              Wholesale supply, custom roasting, and coffee marketing — three clear ways to work with OCC. Bring us the commercial objective; we will continue through the most relevant coffee, product-development, or market path.
            </p>
          </div>

          <section aria-labelledby="commercial-paths-title" className="border-t border-[#d0cdc8] pt-8">
            <p className={labelBase}>Three Ways to Work With OCC</p>
            <h2 id="commercial-paths-title" className="mb-5 text-[22px] uppercase tracking-[0.07em] text-[#0f0f0f] [font-family:var(--font-barlow-condensed)]">
              Clear Commercial Paths
            </h2>
            <div className="border-t border-[#d0cdc8]">
              {COMMERCIAL_PATHS.map((path, index) => {
                const isSelected = selectedType === path.service
                return (
                  <button
                    key={path.service}
                    type="button"
                    onClick={() => selectPath(path.service)}
                    className={`group grid w-full grid-cols-[34px_1fr_auto] gap-3 border-b border-[#d0cdc8] py-5 text-left transition-colors ${isSelected ? "bg-[#0f0f0f] text-[#f4f2ef] px-4" : "hover:bg-white/55"}`}
                  >
                    <span className={`pt-1 text-[9px] tracking-[0.18em] ${isSelected ? "text-[#d99167]" : "text-[#a8542a]"}`}>{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className={`block text-[9px] font-semibold uppercase tracking-[0.2em] ${isSelected ? "text-[#d99167]" : "text-[#a8542a]"}`}>{path.eyebrow}</span>
                      <span className="mt-1 block text-[18px] font-medium tracking-[0.02em] [font-family:var(--font-barlow-condensed)]">{path.title}</span>
                      <span className={`mt-2 block max-w-[430px] text-[13px] leading-6 ${isSelected ? "text-white/65" : "text-[#62645f]"}`}>{path.description}</span>
                    </span>
                    <span className="pt-1 text-lg transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </button>
                )
              })}
            </div>
          </section>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="border-t border-[#d0cdc8] pt-5">
              <span className={labelBase}>Commercial Paths</span>
              <span className="text-sm font-normal leading-6 text-[#0f0f0f]">Wholesale · Custom Roasting · Coffee Marketing</span>
            </div>
            <div className="border-t border-[#d0cdc8] pt-5">
              <span className={labelBase}>Coffee Focus</span>
              <span className="text-sm font-normal leading-6 text-[#0f0f0f]">Cambodia · Fine Robusta · Origin-led Coffee</span>
            </div>
          </div>
        </div>

        <div id="contact-form" className="flex flex-col justify-center scroll-mt-24 p-8 sm:p-10 md:p-14 lg:p-16">
          <div className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#a8542a] uppercase mb-3 [font-family:var(--font-barlow-condensed)]">01 / Start the Conversation</p>
            <p className="text-[26px] font-medium tracking-[0.06em] uppercase text-[#0f0f0f] [font-family:var(--font-barlow-condensed)]">Commercial Enquiry</p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#62645f]">A clear project context is enough to begin. Detailed commercial qualification can follow once the relevant path is established.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-7">
              <label htmlFor="name" className={labelBase}>Full Name</label>
              <input id="name" type="text" autoComplete="name" data-clarity-mask="true" placeholder="Your name" className={inputBase} aria-invalid={!!errors.name} {...register("name")} />
              {errors.name && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>}
            </div>

            <div className="mb-7">
              <label htmlFor="email" className={labelBase}>Work Email</label>
              <input id="email" type="email" autoComplete="email" data-clarity-mask="true" placeholder="you@company.com" className={inputBase} aria-invalid={!!errors.email} {...register("email")} />
              {errors.email && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <div className="mb-7">
              <label htmlFor="company" className={labelBase}>Company / Brand</label>
              <input id="company" type="text" autoComplete="organization" data-clarity-mask="true" placeholder="Company or brand name" className={inputBase} aria-invalid={!!errors.company} {...register("company")} />
              {errors.company && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.company.message}</p>}
            </div>

            <fieldset className="mb-8">
              <legend className={labelBase}>Commercial Path</legend>
              <div className="grid grid-cols-1 gap-2.5 mt-1 sm:grid-cols-2">
                {ENQUIRY_TYPES.map((type) => {
                  const isSelected = selectedType === type
                  return (
                    <label key={type} className={`flex min-h-[48px] items-center gap-2.5 px-3.5 py-3 border cursor-pointer transition-all text-[11px] tracking-[0.09em] uppercase [font-family:var(--font-barlow-condensed)] ${isSelected ? "bg-[#0f0f0f] text-[#f4f2ef] border-[#0f0f0f]" : "border-[#d0cdc8] text-[#5a5a5a] hover:border-[#5a5a5a] hover:text-[#0f0f0f]"}`}>
                      <input type="radio" value={type} className="sr-only" {...register("service")} />
                      {type}
                    </label>
                  )
                })}
              </div>
              {errors.service && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.service.message}</p>}
              <p className="mt-3 text-xs leading-5 text-[#858680]">Editorial, media, source correction, or another request can be sent through Other Enquiry.</p>
            </fieldset>

            <div className="mb-8">
              <label htmlFor="message" className={labelBase}>Project Context <span className="normal-case tracking-normal font-normal">(optional)</span></label>
              <textarea id="message" rows={5} data-clarity-mask="true" placeholder={contextPlaceholder} className={`${inputBase} resize-none leading-7`} {...register("message")} />
              {errors.message && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.message.message}</p>}
            </div>

            {serverError && <p role="alert" className="mb-6 text-sm text-red-700 border border-red-200 bg-red-50 px-4 py-3">{serverError}</p>}

            <div className="flex items-center justify-between gap-5 mt-10 pt-7 border-t border-[#d0cdc8]">
              <p className="hidden max-w-[260px] text-xs leading-5 text-[#858680] sm:block">OCC will review the commercial context before continuing with the most relevant next step.</p>
              <button type="submit" disabled={isPending} className="ml-auto flex items-center gap-3.5 bg-[#0f0f0f] text-[#f4f2ef] px-6 py-4 text-[12px] tracking-[0.16em] uppercase [font-family:var(--font-barlow-condensed)] hover:bg-[#272722] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[205px] justify-center">
                {isPending ? "Sending…" : <>Start the Conversation <span aria-hidden="true">→</span></>}
              </button>
            </div>
          </form>
        </div>
      </div>

      {isSuccess && (
        <div role="dialog" aria-modal="true" aria-labelledby="success-title" className="fixed inset-0 bg-[#0f0f0f] text-[#f4f2ef] z-50 flex flex-col items-center justify-center text-center p-8 sm:p-10">
          <p className="text-[11px] font-semibold tracking-[0.24em] text-[#d99167] uppercase mb-6 [font-family:var(--font-barlow-condensed)]">Enquiry Received</p>
          <h2 id="success-title" className="max-w-3xl leading-[0.9] tracking-[-0.02em] mb-6 [font-family:var(--font-bebas)]" style={{ fontSize: "clamp(54px, 8vw, 88px)" }}>ENQUIRY RECEIVED.</h2>
          <p className="text-[15px] font-light text-white/65 max-w-md leading-7 mb-10">OCC will review the commercial context and continue with the most relevant next step.</p>
          <Link href={successPath.href} className="group inline-flex items-center gap-3 border-b border-white/30 pb-2 text-[12px] uppercase tracking-[0.16em] transition-colors hover:border-[#d99167] [font-family:var(--font-barlow-condensed)]">
            {successPath.label} <span className="text-[#d99167] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
          <button onClick={() => setIsSuccess(false)} className="mt-8 text-[10px] tracking-[0.18em] uppercase text-white/45 hover:text-white transition-colors [font-family:var(--font-barlow-condensed)]">Return to Contact</button>
        </div>
      )}
    </div>
  )
}
