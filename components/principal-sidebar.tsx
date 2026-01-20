"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  FileText, 
  Download, 
  User,
  LogOut,
  ChevronDown,
  Building2
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/principal/dashboard", icon: LayoutDashboard },
  { label: "Student Records", href: "/principal/student-records", icon: Users },
  { label: "Granted Access", href: "/principal/granted-access", icon: Shield },
  { label: "Department Status", href: "/principal/department-status", icon: Building2 },
  { label: "Student Resume Status", href: "/principal/student-resume-status", icon: FileText },
  { label: "Download", href: "/principal/download", icon: Download },
  { label: "Profile", href: "/principal/profile", icon: User },
]

export default function PrincipalSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await signOut({ redirect: true, callbackUrl: "/login" })
  }

  return (
    <aside className="w-64 bg-black/40 backdrop-blur-sm border-r border-white/10 flex flex-col fixed h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image
            src="/image/STON.png"
            alt="STON Technology logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <div>
            <div className="text-white font-bold text-sm">STON</div>
            <div className="text-white/70 text-xs">TECHNOLOGY</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm ${
                isActive
                  ? "bg-white/20 text-white font-medium"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10 bg-blue-900/40">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  )
}
