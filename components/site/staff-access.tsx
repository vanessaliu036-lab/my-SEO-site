import Link from "next/link"

export function StaffAccess({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/admin"
      className={`hidden shrink-0 text-[8px] font-medium uppercase tracking-[0.18em] transition-colors xl:inline-flex ${
        dark ? "text-white/45 hover:text-white" : "text-[#6f746d] hover:text-[#182019]"
      }`}
      aria-label="Staff access"
    >
      Staff Access ↗
    </Link>
  )
}
