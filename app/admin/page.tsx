import type { Metadata } from "next"
import AdminDashboard from "./AdminDashboard"

export const metadata: Metadata = {
  title: "Admin | Origin Coffee Cambodia",
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminDashboard />
}
