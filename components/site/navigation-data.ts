export type SiteNavChild = {
  label: string
  href: string
}

export type SiteNavItem = {
  label: "ABOUT" | "COLLECTION" | "BLOG" | "CONTACT"
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
    label: "COLLECTION",
    href: "/collection",
    children: [
      { label: "Mondulkiri Origin Collection", href: "/collection" },
      { label: "SOVANN", href: "/collection/sovann" },
      { label: "PREK", href: "/collection/prek" },
      { label: "ANGKAR", href: "/collection/angkar" },
    ],
  },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
] as const
