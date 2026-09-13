export type SiteNavChild = {
  label: string
  href: string
}

export type SiteNavItem = {
  label: "ABOUT" | "SOLUTIONS" | "ORIGINAL" | "BLOG" | "CONTACT"
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
    label: "SOLUTIONS",
    href: "/solutions",
    children: [
      { label: "Wholesale & Sourcing", href: "/solutions/wholesale" },
      { label: "Roasted Coffee Supply", href: "/solutions/roasted-coffee-supply" },
      { label: "Roasting Program", href: "/solutions/roasting-program" },
      { label: "Distribution Partnership", href: "/distribution" },
    ],
  },
  {
    label: "ORIGINAL",
    href: "/original",
    children: [
      { label: "Origin Evidence", href: "/origins" },
      { label: "Fine Robusta Cambodia", href: "/fine-robusta-cambodia" },
      { label: "Farm & Terroir", href: "/origins/farm-terroir" },
    ],
  },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
] as const
