"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  User2,
  Activity,
  ListChecks,
} from "lucide-react"

export function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onClickAway = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setPanelOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickAway)
    return () => document.removeEventListener("mousedown", onClickAway)
  }, [])

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <aside className="w-64 bg-[#16103a]/50 backdrop-blur border-r border-white/5 flex flex-col h-screen sticky top-0">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center p-1.5">
          <Image src="/image/STON.png" alt="STON" width={40} height={40} className="w-full h-full object-contain" />
        </div>
        <div className="leading-tight">
          <div className="text-lg font-bold tracking-wide text-white">STON</div>
          <div className="text-[10px] text-white/50 tracking-[0.2em] uppercase">Technology</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        <NavItem 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          href="/admin/dashboard" 
          active={pathname === "/admin/dashboard"} 
        />
        <NavItem 
          icon={<Building2 size={20} />} 
          label="Colleges" 
          href="/admin/colleges" 
          active={pathname === "/admin/colleges"} 
        />
        <NavItem 
          icon={<Users size={20} />} 
          label="Principals" 
          href="/admin/principals" 
          active={pathname === "/admin/principals"} 
        />
        <NavItem 
          icon={<FileText size={20} />} 
          label="Audit Logs" 
          href="/admin/audit-logs" 
          active={pathname === "/admin/audit-logs"} 
        />
        <NavItem 
          icon={<Settings size={20} />} 
          label="Settings" 
          href="/admin/settings" 
          active={pathname === "/admin/settings"} 
        />
      </nav>

      {/* Bottom Panel */}
      <div className="relative p-4 border-t border-white/5 space-y-2" ref={panelRef}>
        <button
          onClick={() => setPanelOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm font-medium group"
        >
          <span>Admin Panel</span>
          <ChevronRight
            size={16}
            className={`text-white/40 transition-transform group-hover:text-white/70 ${panelOpen ? "rotate-90" : ""}`}
          />
        </button>

        {panelOpen && (
          <div className="absolute left-3 right-3 -top-56 rounded-2xl border border-white/10 bg-[#0c0926]/95 shadow-2xl shadow-blue-900/50 backdrop-blur-xl p-4 text-white space-y-3">
            <div className="text-sm font-semibold text-white/90">Admin Panel</div>
            <div className="space-y-2 text-sm">
              <PanelItem icon={<User2 size={16} className="text-blue-200" />} label="Profile" href="/admin/profile" />
              <PanelItem
                icon={<Activity size={16} className="text-emerald-200" />}
                label="Activity Logs"
                helper="View recent changes"
                href="/admin/audit-logs"
              />
            </div>
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-red-300 hover:text-red-200 hover:bg-red-500/10 w-full rounded-lg px-3 py-2 transition"
              >
                <LogOut size={16} />
                <span className="text-sm font-medium">Log Out</span>
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition text-sm font-medium"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  )
}

function PanelItem({
  icon,
  label,
  helper,
  href,
}: {
  icon: React.ReactNode
  label: string
  helper?: string
  href?: string
}) {
  const content = (
    <>
      <div className="mt-0.5">{icon}</div>
      <div className="leading-tight">
        <div className="font-medium text-white/90">{label}</div>
        {helper && <div className="text-xs text-white/50">{helper}</div>}
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-white/5 transition cursor-pointer">
        {content}
      </Link>
    )
  }

  return (
    <div className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-white/5 transition cursor-pointer">
      {content}
    </div>
  )
}

function NavItem({ icon, label, href, active = false }: { icon: React.ReactNode; label: string; href: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition text-sm font-medium ${
        active
          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-l-4 border-blue-500 bg-white/5"
          : "text-white/60 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
