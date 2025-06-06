import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AdminDashboard from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    redirect("/auth/signin")
  }

  return <AdminDashboard />
}
