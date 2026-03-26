"use client"

import Link from "next/link"

export default function Navigation() {
  const menuItems = [
    { title: "About", sub: "philosophy, mission, manifesto", href: "/about" },
    { title: "Vision", sub: "overview, philosophy, the big idea", href: "/vision" },
    { title: "System", sub: "methodology, process, frameworks", href: "/system" },
    { 
      title: "Wholesale", 
      sub: "B2B supply, consistency protocols, volume pricing", 
      href: "/coffee/wholesale" 
    },
    { 
      title: "Single Origin", 
      sub: "geographic coordinates, altitude data, terroir analysis", 
      href: "/coffee/single-origin" 
    },
    { title: "Archive", sub: "past projects, experiments, case studies", href: "/archive" },
    { title: "Matter", sub: "resources, tools, downloads", href: "/matter" },
    { title: "Signal", sub: "blog, updates, publications", href: "/signal" },
    { title: "Contact", sub: "connect, collaborate, reach out", href: "/contact" },
  ]

  return (
    <nav className="min-h-screen bg-[#F8F9FA] px-8 py-16 md:px-24">
      <h2 className="text-[10px] tracking-[0.5em] text-gray-400 uppercase mb-16 font-bold">
        Navigation
      </h2>

      <div className="max-w-3xl">
        {menuItems.map((item, index) => (
          <Link href={item.href} key={index} className="group block border-b border-gray-200 py-8 transition-all hover:pl-4">
            <h3 className="text-3xl font-light text-gray-900 tracking-tight group-hover:text-black">
              {item.title}
            </h3>
            <p className="text-sm text-gray-400 mt-2 font-light italic tracking-wide group-hover:text-gray-600">
              {item.sub}
            </p>
          </Link>
        ))}
      </div>
    </nav>
  )
}