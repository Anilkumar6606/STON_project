import { redirect } from "next/navigation"

export default function AdminLoginPage() {
  // Route now deprecated: send traffic to the primary login flow.
  redirect("/login")
}
