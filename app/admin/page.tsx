import type { Metadata } from "next"
import AdminDashboard from "./AdminDashboard"
import AdminPasswordGate from "./AdminPasswordGate"

export const metadata: Metadata = {
  title: "Admin | Origin Coffee Cambodia",
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return (
    <AdminPasswordGate>
      <AdminDashboard />
    </AdminPasswordGate>
  )
}
