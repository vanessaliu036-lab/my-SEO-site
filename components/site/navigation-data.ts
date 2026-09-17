export type SiteNavChild = {
  label: string
  href: string
}

export type SiteNavItem = {
  label: "ABOUT" | "ORIGINS" | "SOLUTIONS" | "PARTNERSHIPS" | "BLOG" | "CONTACT"
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
      { label: "Cambodia & Regions", href: "/origins/cambodia-regions" },
      { label: "Farm & Terroir", href: "/origins/farm-terroir" },
      { label: "Fine Robusta Cambodia", href: "/fine-robusta-cambodia" },
    ],
  },
  {
    label: "SOLUTIONS",
    href: "/solutions",
    children: [
      { label: "Wholesale", href: "/solutions/wholesale" },
      { label: "Roasting Program", href: "/solutions/roasting-program" },
      { label: "Coffee Marketing", href: "/solutions/coffee-marketing" },
    ],
  },
  {
    label: "PARTNERSHIPS",
    href: "/partnerships",
    children: [
      { label: "Brand & Gifting", href: "/partnerships" },
      { label: "Distribution Partners", href: "/distribution" },
    ],
  },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
] as const
