import { cn } from "@/lib/utils"

type CoffeeBagVisualProps = {
  name?: string
  subtitle?: string
  tone?: "olive" | "sand" | "charcoal"
  context?: "product" | "editorial"
  className?: string
}

const toneMap = {
  olive: "from-[#283028] via-[#1f261f] to-[#151a15] text-[#f4f0e7]",
  sand: "from-[#d8c9aa] via-[#c5b28d] to-[#a99067] text-[#1b211b]",
  charcoal: "from-[#3a3934] via-[#262824] to-[#151713] text-[#f4f0e7]",
}

export function CoffeeBagVisual({
  name = "OCC",
  subtitle = "MONDULKIRI",
  tone = "olive",
  context = "product",
  className,
}: CoffeeBagVisualProps) {
  const isEditorial = context === "editorial"
  const topRight = isEditorial ? "Editorial Research" : "KH 2026"
  const bottomLeft = isEditorial ? "Cambodia Research" : "Single Origin Cambodia"
  const bottomRight = isEditorial ? "Evidence-Led Canephora" : "Traceable Lot Canephora"
  const ariaLabel = isEditorial
    ? `${name} ${subtitle} coffee research visual`
    : `${name} ${subtitle} coffee package`

  return (
    <div className={cn("relative h-[390px] w-[245px] sm:h-[450px] sm:w-[282px] md:h-[520px] md:w-[325px]", className)} aria-label={ariaLabel}>
      <div className="absolute inset-x-[6%] top-0 h-5 rounded-t-[6px] bg-black/15 blur-[1px]" aria-hidden="true" />
      <div
        className={cn(
          "absolute inset-0 overflow-hidden rounded-[7px] bg-gradient-to-br shadow-[0_30px_70px_rgba(25,28,23,0.24)]",
          toneMap[tone]
        )}
        style={{ clipPath: "polygon(3% 3%, 97% 3%, 100% 98%, 0 98%)" }}
      >
        <div className="absolute inset-x-0 top-[9%] border-t border-current/20" />
        <div className="absolute inset-y-0 left-[14%] border-l border-current/10" />
        <div className="absolute inset-y-0 right-[14%] border-r border-current/10" />
        <div className="flex h-full flex-col p-7 sm:p-8">
          <div className="flex items-start justify-between gap-4 text-[8px] uppercase tracking-[0.22em] opacity-60">
            <span>Origin Coffee<br />Cambodia</span>
            <span className="max-w-[86px] text-right leading-4">{topRight}</span>
          </div>

          <div className="my-auto">
            <p className="mb-3 text-[9px] uppercase tracking-[0.28em] opacity-60">FINE ROBUSTA</p>
            <p className="font-[var(--font-display)] text-[68px] leading-[0.78] tracking-[-0.07em] sm:text-[76px] md:text-[86px]">{name}</p>
            <div className="mt-5 h-px w-14 bg-current/35" />
            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.24em]">{subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-current/20 pt-5 text-[7px] uppercase leading-4 tracking-[0.18em] opacity-60">
            <span>{bottomLeft}</span>
            <span className="text-right">{bottomRight}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
