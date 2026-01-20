"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Search, Bell, Plus, ChevronRight, LogOut } from "lucide-react"

const metrics = [
  { label: "Total Students", value: "3420", icon: "👥" },
  { label: "Placement Ready", value: "2800", icon: "✓" },
  { label: "Avg ATS", value: "72%", icon: "📊" },
  { label: "Selected", value: "122", icon: "⭐" },
]

const placementStats = [
  { name: "SELECTED", value: 10.5, color: "#30D9A4" },
  { name: "PLACEMENT READY", value: 61.4, color: "#2E9BFF" },
  { name: "NOT ELIGIBLE", value: 28.1, color: "#0D1B3F" },
]

const upcomingInterviews = [
  { name: "Aakash Patel", company: "Infosys", position: "Data Analyst", date: "Apr 28, 2026 | 11:00 AM", avatar: "AP" },
  { name: "Nisha Reddy", company: "Google", position: "Web Developer", date: "Apr 28, 2026 | 03:00 PM", avatar: "NR" },
  { name: "Manish Arora", company: "Microsoft", position: "Software Engineer", date: "Apr 29, 2026 | 10:30 AM", avatar: "MA" },
  { name: "Aditya Joshi", company: "TCS", position: "Network Administrator", date: "Apr 29, 2026 | 02:00 PM", avatar: "AJ" },
]

const topCompanies = [
  { profile: "Aakash Patel", company: "Infosys", dept: "Computers", department: "Selected at Engineering", position: "Data Analyst" },
  { profile: "Nisha Reddy", company: "Google", dept: "Information Technology", department: "Selected at Engineering", position: "Web Developer" },
  { profile: "Manish Arora", company: "Microsoft", dept: "Computers", department: "Selected at Engineering", position: "Software Engineer" },
  { profile: "Anjali Verma", company: "LSR", dept: "Mechanical Engineer", department: "Selected at Engineering", position: "MzlDaemon" },
  { profile: "Aditya Joshi", company: "TCS", dept: "Information Technology", department: "Selected at Engineering", position: "Network Administrator" },
]

const departmentsData = [
  { name: "Computer Science & Engineering", value: 120 },
  { name: "Information Technology", value: 108 },
  { name: "Mechanical Engineering", value: 92 },
  { name: "Artificial Intelligence", value: 85 },
  { name: "Electronics & Communication", value: 78 },
]

export default function PlacementOverview() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(2)
  const [searchTerm, setSearchTerm] = useState("")

  const normalizedSearch = searchTerm.toLowerCase().trim()

  const filteredInterviews = upcomingInterviews.filter((item) => {
    if (!normalizedSearch) return true
    return [item.name, item.company, item.position].some((field) =>
      field.toLowerCase().includes(normalizedSearch)
    )
  })

  const filteredCompanies = topCompanies.filter((item) => {
    if (!normalizedSearch) return true
    return [item.profile, item.company, item.dept, item.department, item.position].some((field) =>
      field.toLowerCase().includes(normalizedSearch)
    )
  })

  const handleLogout = () => {
    window.location.href = "/login"
  }

  return (
    <div className="h-screen bg-gradient-to-br from-[#050616] via-[#0f1a3f] to-[#1a2e66] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/40 backdrop-blur z-50">
        <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <img src="/image/STON.png" alt="STON Logo" className="w-8 h-8 object-contain" />
          STON
        </div>
        <h1 className="text-3xl font-bold">Placement Officer</h1>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold">
            JD
          </div>
          <span className="text-sm font-medium">John Deo</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-56 border-r border-white/10 bg-black/20 flex flex-col">
          <nav className="flex-1 px-6 py-8 space-y-0.5 text-white/70 text-sm overflow-y-auto">
            <NavItem label="Dashboard" onClick={() => router.push('/placement/dashboard')} />
            <NavItem label="Placement Overview" active onClick={() => router.push('/placement/overview')} />
            <NavItem label="Department" onClick={() => router.push('/placement/department')} />
            <NavItem label="Top Recruiting Companies" onClick={() => router.push('/placement/companies')} />
            <NavItem label="Current Job Openings" onClick={() => router.push('/placement/openings')} />
            <NavItem label="Student Records" onClick={() => router.push('/placement/students')} />
            <NavItem label="Profile" onClick={() => router.push('/placement/profile')} />
          </nav>
          <div className="px-6 pb-6">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 py-3 px-4 rounded-lg border border-red-400/50 transition shadow-lg"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-8 py-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold">Placement Overview</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:flex">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border border-white/15 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:bg-white/15 transition"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              </div>
              <button className="relative p-2 rounded-lg bg-white/10 border border-white/15 hover:bg-white/15 transition">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <Link
                href="/placement/openings/post"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition"
              >
                <Plus className="w-5 h-5" />
                Add Placement
              </Link>
              <Link
                href="/placement/students/add"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 px-4 py-2 rounded-lg font-semibold transition"
              >
                <Plus className="w-5 h-5" />
                Add Student
              </Link>
            </div>
          </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-white/15 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-white/60">{metric.label}</p>
              <span className="text-2xl">{metric.icon}</span>
            </div>
            <p className="text-4xl font-bold text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Placement Stats */}
        <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Placement Stats</h2>
            <p className="text-sm text-white/50">Distribution across stages</p>
          </div>

          <div className="flex items-center justify-center h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={placementStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={450}
                >
                  {placementStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {placementStats.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-white/70">{item.name}</span>
                </div>
                <span className="font-semibold text-white">{item.value}%</span>
              </div>
            ))}
          </div>

          <button className="w-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold py-2.5 rounded-lg transition">
            View Full Placement Report
          </button>
        </div>

        {/* Upcoming Interviews */}
        <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Upcoming Interviews This Week</h2>
            </div>
          </div>

          <div className="space-y-4 max-h-80 overflow-y-auto">
            {filteredInterviews.map((interview, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {interview.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{interview.name}</p>
                  <p className="text-xs text-white/60 truncate">{interview.company}</p>
                </div>
                <div className="text-right whitespace-nowrap">
                  <p className="text-xs font-medium text-white">{interview.position}</p>
                  <p className="text-xs text-white/50">{interview.date}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold py-2.5 rounded-lg transition">
            View All Companies
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Top Recruiting Companies */}
        <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-8 space-y-6">
          <h2 className="text-xl font-semibold">Top Recruiting Companies</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-3 py-3 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Profile</th>
                  <th className="px-3 py-3 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Company</th>
                  <th className="px-3 py-3 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Dept</th>
                  <th className="px-3 py-3 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Department</th>
                  <th className="px-3 py-3 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Position</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((item, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-3 py-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold">
                        {item.profile.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-white/70">{item.company}</td>
                    <td className="px-3 py-3 text-white/70 text-xs">{item.dept}</td>
                    <td className="px-3 py-3 text-white/70 text-xs">{item.department}</td>
                    <td className="px-3 py-3 text-white/70 text-xs">{item.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Departments Placed */}
        <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-8 space-y-6">
          <h2 className="text-xl font-semibold">Top Departments Placed</h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12, fill: "rgba(255,255,255,0.7)" }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "rgba(15, 26, 63, 0.9)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="value" fill="#2E9BFF" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold py-2.5 rounded-lg transition">
            View Full Report
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
        </main>
      </div>
    </div>
  )
}

function NavItem({ label, active = false, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition ${
        active ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-white" : "bg-white/30"}`} />
      <span>{label}</span>
    </div>
  )
}
