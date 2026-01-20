"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Briefcase, 
  User,
  LogOut,
  TrendingUp
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/placement/dashboard", icon: LayoutDashboard },
  { label: "Placement Overview", href: "/placement/overview", icon: TrendingUp },
  { label: "Departments", href: "/placement/department", icon: Building2 },
  { label: "Top Companies", href: "/placement/companies", icon: Building2 },
  { label: "Job Openings", href: "/placement/openings", icon: Briefcase },
  { label: "Student Records", href: "/placement/students", icon: Users },
  { label: "Profile", href: "/placement/profile", icon: User },
]

export default function PlacementSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await signOut({ redirect: true, callbackUrl: "/login" })
  }

  return (
    <aside className="w-56 border-r border-white/10 bg-black/20 flex flex-col fixed h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image
            src="/image/STON.png"
            alt="STON Technology logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <div className="text-xl font-bold text-white">STON</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-8 space-y-0.5 text-white/70 text-sm overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-left ${
                isActive
                  ? "bg-white/20 text-white font-medium"
                  : "hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="px-6 pb-6">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600/80 hover:bg-red-600 disabled:bg-red-800 text-white text-sm rounded-lg transition"
        >
          <LogOut className="w-4 h-4" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  )
}
