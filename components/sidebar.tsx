"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home, User, GraduationCap, Briefcase, Zap, Award, Layout, BarChart3, Download, LogOut } from "lucide-react"

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: GraduationCap, label: "Education", href: "/education" },
  { icon: Briefcase, label: "Projects", href: "/projects" },
  { icon: Zap, label: "Skills", href: "/skills" },
  { icon: Award, label: "Certifications", href: "/certifications" },
  { icon: Layout, label: "Resume Template", href: "/template" },
  { icon: BarChart3, label: "ATS Score", href: "/ats-score" },
  { icon: Download, label: "Download", href: "/download" },
]

export function Sidebar() {
  const router = useRouter()

  const handleSignOut = () => {
    // Clear any session data and redirect to login
    router.push("/login")
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-white/5 backdrop-blur border-r border-white/10 flex flex-col pt-8 shadow-sm">
      <div className="px-6 mb-12">
        <div className="flex items-center gap-3">
          <Image
            src="/image/STON.png"
            alt="STON Technology logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain drop-shadow"
            priority
          />
          <div>
            <div className="text-sm font-semibold text-white">STON Technology</div>
            <div className="text-xs text-white/70">Platform</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer spacer */}
      <div className="px-4 pb-8 border-t border-white/10 pt-4">
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  )
}
