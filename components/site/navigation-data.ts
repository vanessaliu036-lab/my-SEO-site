export type SiteNavChild = {
  label: string
  href: string
}

export type SiteNavItem = {
  label: "ABOUT" | "SOLUTIONS" | "BLOG" | "CONTACT"
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
      { label: "Wholesale", href: "/solutions/wholesale" },
      { label: "Roasting Program", href: "/solutions/roasting-program" },
      { label: "Barista Staffing", href: "/solutions/barista-staffing" },
      { label: "Equipment Service", href: "/solutions/equipment-service" },
    ],
  },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
] as const
