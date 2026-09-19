import Image from "next/image"
import { MotionReveal } from "@/components/ui/motion-reveal"
import { cn } from "@/lib/utils"

type EditorialVisualProps = {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

/** A restrained visual pause for long-form pages: 30% image, 70% editorial copy. */
export function EditorialVisual({ src, alt, className, priority = false }: EditorialVisualProps) {
  return (
    <MotionReveal direction="right" className={cn("occ-editorial-visual-wrap", className)}>
      <figure className="occ-editorial-visual relative aspect-[4/5] min-h-[260px] overflow-hidden bg-occ-primary shadow-[0_18px_50px_rgba(42,33,29,0.12)]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, 100vw"
          className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.025]"
        />
      </figure>
    </MotionReveal>
  )
}
