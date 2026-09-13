export type SiteNavChild = {
  label: string
  href: string
}

export type SiteNavItem = {
  label: "ABOUT" | "ORIGINS" | "SOLUTIONS" | "BLOG" | "CONTACT" | "DISTRIBUTION"
  href: string
  children?: readonly SiteNavChild[]
}

export const siteNavigation: readonly SiteNavItem[] = [
  {
    label: "ABOUT",
    href: "/about",
    children: [
      { label: "Mission", href: "/about/mission" },
      { label: "Founder", href: "/about/founder" },
      { label: "Manifesto", href: "/about/manifesto" },
      { label: "Sustainability", href: "/about/sustainability" },
    ],
  },
  {
    label: "ORIGINS",
    href: "/origins",
    children: [
      { label: "Single Origin", href: "/origins/single-origin" },
      { label: "Fine Robusta Cambodia", href: "/fine-robusta-cambodia" },
      { label: "Farm & Terroir", href: "/origins/farm-terroir" },
    ],
  },
  {
    label: "SOLUTIONS",
    href: "/solutions",
    children: [
      { label: "Wholesale", href: "/solutions/wholesale" },
      { label: "Roasting Program", href: "/solutions/roasting-program" },
      { label: "Coffee Marketing", href: "/solutions/barista-staffing" },
    ],
  },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
  { label: "DISTRIBUTION", href: "/distribution" },
] as const
