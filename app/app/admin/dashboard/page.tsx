"use client"

import {
  Building2,
  Users,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  MinusCircle,
  User2,
  LockKeyhole,
  Activity,
  ListChecks,
  LogOut,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dummy Data for Recent Activities
const activities = [
  {
    admin: "Syed A.",
    action: "Added College",
    details: 'Added "Greenfield College".',
    timestamp: "5 mins ago",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SA",
    color: "bg-blue-500",
  },
  {
    admin: "Nisha R.",
    action: "Created Principal",
    details: 'Created Principal for "Westside College".',
    timestamp: "20 mins ago",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "NR",
    color: "bg-pink-500",
  },
  {
    admin: "Syed A.",
    action: "Deactivated College",
    details: 'Deactivated "Eastview Institute".',
    timestamp: "1 hour ago",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SA",
    color: "bg-blue-500",
  },
  {
    admin: "Nisha R.",
    action: "Updated Access",
    details: "Updated Access.",
    timestamp: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "NR",
    color: "bg-pink-500",
  },
  {
    admin: "Syed A.",
    action: "Assigned Principal",
    details: 'Assigned Principal to "Northside College".',
    timestamp: "2024-04-10 11:15 AM",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SA",
    color: "bg-blue-500",
  },
]

export default function AdminDashboard() {
  return (
    <>
      {/* Header */}
      <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#16103a]/30 backdrop-blur">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm font-medium text-white/90">Welcome, Admin</div>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold border-2 border-blue-400/30">
              SA
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1e1245]" />
          </div>

        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-auto p-8">
        <h2 className="text-lg font-medium mb-6 text-white/90">Overview</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <StatsCard
            title="Total Colleges"
            value="24"
            icon={<Building2 className="text-blue-400" size={24} />}
            statusIcon={<CheckCircle2 className="text-emerald-500" size={24} />}
          />
          <StatsCard
            title="Active Colleges"
            value="18"
            statusIcon={<CheckCircle2 className="text-emerald-500" size={24} />}
          />
          <StatsCard
            title="Inactive Colleges"
            value="6"
            statusIcon={<MinusCircle className="text-red-500" size={24} />}
          />
          <StatsCard
            title="Total Users"
            value="3,450"
            icon={<Users className="text-purple-400" size={28} />}
            extraClass="bg-gradient-to-br from-[#1e1b4b] to-[#2e2b6b]"
          />
        </div>

        {/* Recent Activities */}
        <div className="bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Activities</h3>
          </div>
          
          {/* Table Header */}
          <div className="bg-white/5 px-6 py-3">
            <div className="flex items-center text-sm font-medium text-white/50">
              <div className="w-[15%]">Admin</div>
              <div className="w-[20%]">Action</div>
              <div className="w-[45%]">Details</div>
              <div className="w-[20%] text-right">Timestamp</div>
            </div>
          </div>

          {/* Table Body */}
          <div>
            {activities.map((activity, index) => (
              <div
                key={index}
                className="px-6 py-4 flex items-center border-b border-white/5 hover:bg-white/5 transition group"
              >
                {/* Admin */}
                <div className="w-[15%] flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center text-xs font-bold`}>
                    {activity.initials}
                  </div>
                  <span className="text-sm font-medium text-white/90">{activity.admin}</span>
                </div>

                {/* Action */}
                <div className="w-[20%] text-sm text-white/80">{activity.action}</div>

                {/* Details */}
                <div className="w-[45%] text-sm text-white/60">{activity.details}</div>

                {/* Timestamp */}
                <div className="w-[20%] text-sm text-white/50 text-right">{activity.timestamp}</div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-white/5 text-right">
              <button className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 ml-auto">
                  View All <ChevronRight size={14} />
              </button>
          </div>
        </div>
      </div>
    </>
  )
}

// Helper Components
function StatsCard({
  title,
  value,
  icon,
  statusIcon,
  extraClass = "",
}: {
  title: string
  value: string
  icon?: React.ReactNode
  statusIcon?: React.ReactNode
  extraClass?: string
}) {
  return (
    <div
      className={`bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 p-6 relative overflow-hidden group hover:border-white/10 transition ${extraClass}`}
    >
      <div className="flex flex-col h-full justify-between gap-4">
        <div className="flex items-start justify-between">
            {icon && <div className="p-2 bg-white/5 rounded-lg mb-2">{icon}</div>}
            {!icon && <div className="h-10"></div>} {/* Spacer if no icon */}
            {statusIcon && <div className="opacity-80 group-hover:opacity-100 transition">{statusIcon}</div>}
        </div>
        
        <div>
          <div className="text-sm text-white/60 font-medium mb-1">{title}</div>
          <div className="text-3xl font-bold tracking-tight">{value}</div>
        </div>
      </div>
    </div>
  )
}
