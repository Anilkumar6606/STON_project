"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { 
  FileText, 
  User, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  DownloadCloud, 
  LogOut,
  ChevronDown
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/student", icon: FileText },
  { label: "Profile", href: "/student/profile", icon: User },
  { label: "Education", href: "/student/education", icon: GraduationCap },
  { label: "Projects", href: "/student/projects", icon: Sparkles },
  { label: "Skills", href: "/student/skills", icon: Sparkles },
  { label: "Certifications", href: "/student/certifications", icon: ShieldCheck },
  { label: "Resume Template", href: "/student/templates", icon: FileText },
  { label: "ATS Score", href: "/student/ats", icon: BookOpen },
  { label: "Download", href: "/student/download", icon: DownloadCloud },
]

export default function StudentSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await signOut({ 
        redirect: true, 
        callbackUrl: "/login" 
      })
    } catch (error) {
      console.error("Logout error:", error)
      setLoggingOut(false)
    }
  }

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-black/45 backdrop-blur border-r border-white/15 flex flex-col py-8 px-6 gap-8">
      {/* Logo */}
      <div className="flex items-center gap-4 px-1 pb-4 border-b border-white/15">
        <Image src="/image/STON.png" alt="STON" width={48} height={48} className="h-12 w-12" />
        <div className="leading-tight">
          <div className="text-lg font-bold text-white">STON Technology</div>
          <div className="text-xs text-white/70 tracking-widest">Platform</div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-2 text-sm overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 text-left px-4 py-3 rounded border transition ${
                isActive
                  ? "bg-white/15 text-white border-white/25"
                  : "border-transparent hover:bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout Button at Bottom */}
      <div className="pt-6 border-t border-white/15">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>{loggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </aside>
  )
}
