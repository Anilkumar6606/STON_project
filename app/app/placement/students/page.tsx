"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Bell, Settings, Plus, LogOut, ChevronDown, Eye, Download } from "lucide-react"

const studentRecords = [
  { id: 1, name: "Ashish Patel", email: "Gmail", company: "Infosys", department: "Computer Science & Eng.", status: "Placed", package: "₹6.8", date: "Apr 15, 2026", lastUpdated: "Apr 25, 2026", avatar: "AP" },
  { id: 2, name: "Tanya Mehta", email: "Gmail30@gmail", company: "Thin Computer", department: "Information Technology", status: "Selected", package: "₹2.65 LPA", date: "Apr 15, 2026", lastUpdated: "Apr 25, 2026", avatar: "TM" },
  { id: 3, name: "Ravi Kumar", email: "Gmail30@gmail", company: "Accenture", department: "Computer Science & Eng.", status: "Incomplete", package: "Not Available", date: "May 10, 2026", lastUpdated: "Apr 25, 2026", avatar: "RK" },
  { id: 4, name: "Nisha Sharma", email: "Premium@Gmail", company: "HCOL", department: "Informatical Engineering", status: "Selected", package: "₹2.05 LPA", date: "Apr 16, 2026", lastUpdated: "Apr 25, 2026", avatar: "NS" },
  { id: 5, name: "Manish Arora", email: "Gmail30@gmail", company: "Deloitte", department: "Artisroff Data Engineering", status: "Selected", package: "₹2.05 LPA", date: "Apr 26, 2026", lastUpdated: "Apr 15, 2026", avatar: "MA" },
  { id: 6, name: "Anjali Verma", email: "Gmail30@gmail", company: "Microsoft", department: "Mechanical Engineering", status: "Selected", package: "₹3.65 LPA", date: "May 26, 2026", lastUpdated: "Apr 24, 2026", avatar: "AV" },
  { id: 7, name: "Aditya Joshi", email: "Gmail30@gmail", company: "Google", department: "Computer Science & Eng", status: "Selected", package: "₹2.5 LPA", date: "Apr 25, 2026", lastUpdated: "Apr 15, 2026", avatar: "AJ" },
  { id: 8, name: "Pooja Rana", email: "Gmail30@gmail", company: "LUT", department: "Mforinter Fcience & Eng.", status: "Selected", package: "₹2.35 Led", date: "May 29, 2026", lastUpdated: "Apr 15, 2026", avatar: "PR" },
  { id: 9, name: "Abhishek Singh", email: "Gmail30@gmail", company: "Amirosoft", department: "Arrirical Intelligent", status: "Selected", package: "₹2.5 LPA", date: "Apr 29, 2026", lastUpdated: "Apr 15, 2026", avatar: "AS" },
  { id: 10, name: "Kritika Rao", email: "Gmail30@gmail", company: "Google", department: "Civil Engineering", status: "Selected", package: "₹3.65 LPA", date: "Apr 11, 2026", lastUpdated: "Apr 19, 2026", avatar: "KR" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Placed":
      return { bg: "bg-green-500/20", text: "text-green-300", border: "border-green-500/30" }
    case "Selected":
      return { bg: "bg-green-500/20", text: "text-green-300", border: "border-green-500/30" }
    case "Incomplete":
      return { bg: "bg-purple-500/20", text: "text-purple-300", border: "border-purple-500/30" }
    default:
      return { bg: "bg-gray-500/20", text: "text-gray-300", border: "border-gray-500/30" }
  }
}

const getAvatarColor = (index: number) => {
  const colors = [
    "from-blue-600 to-blue-400",
    "from-red-600 to-red-400",
    "from-purple-600 to-purple-400",
    "from-green-600 to-green-400",
    "from-yellow-600 to-yellow-400",
    "from-pink-600 to-pink-400",
    "from-indigo-600 to-indigo-400",
    "from-cyan-600 to-cyan-400",
    "from-orange-600 to-orange-400",
    "from-teal-600 to-teal-400",
  ]
  return colors[index % colors.length]
}

export default function StudentRecords() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(3)
  const [departmentFilter, setDepartmentFilter] = useState("All Departments")
  const [placementFilter, setPlacementFilter] = useState("Placement Ready")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [showDepartmentMenu, setShowDepartmentMenu] = useState(false)
  const [showPlacementMenu, setShowPlacementMenu] = useState(false)
  const [showStatusMenu, setShowStatusMenu] = useState(false)

  const departmentOptions = [
    "All Departments",
    ...Array.from(new Set(studentRecords.map((s) => s.department))),
  ]

  const placementOptions = ["Placement Ready", "All Students", "Not Ready"]

  const statusOptions = ["All Status", ...Array.from(new Set(studentRecords.map((s) => s.status)))]

  const filteredRecords = studentRecords.filter((student) => {
    const departmentMatch =
      departmentFilter === "All Departments" || student.department === departmentFilter

    const placementReady = student.status !== "Incomplete"
    const placementMatch =
      placementFilter === "All Students" ||
      (placementFilter === "Placement Ready" && placementReady) ||
      (placementFilter === "Not Ready" && !placementReady)

    const statusMatch = statusFilter === "All Status" || student.status === statusFilter

    return departmentMatch && placementMatch && statusMatch
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
        <h1 className="text-3xl font-bold">Student Records</h1>
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
            <NavItem label="Placement Overview" onClick={() => router.push('/placement/overview')} />
            <NavItem label="Departments" onClick={() => router.push('/placement/department')} />
            <NavItem label="Top Recruiting Companies" onClick={() => router.push('/placement/companies')} />
            <NavItem label="Current Job Openings" onClick={() => router.push('/placement/openings')} />
            <NavItem label="Student Records" active onClick={() => router.push('/placement/students')} />
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
              <h1 className="text-4xl font-bold">Student Records</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:flex">
                <input
                  type="text"
                  placeholder="Search..."
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
              <button className="p-2 rounded-lg bg-white/10 border border-white/15 hover:bg-white/15 transition">
                <Settings className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition">
                <Plus className="w-5 h-5" />
                Add Student
              </button>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 10a3 3 0 100-6 3 3 0 000 6zM3 18a6 6 0 0112 0H3z" />
                  </svg>
                </div>
                <span className="text-sm text-white/60">Total Students</span>
              </div>
              <p className="text-4xl font-bold">3420</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-white/60">Placed Students</span>
              </div>
              <p className="text-4xl font-bold">1835</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155.03.299.076.438.114a.75.75 0 0 0 .898-.72v-.906a.75.75 0 0 0-.898-.72c-.138.038-.283.084-.438.114a6 6 0 1 1 0 7.152c.155.03.299.076.438.114a.75.75 0 0 0 .898-.72v-.906a.75.75 0 0 0-.898-.72c-.138.038-.283.084-.438.114a6 6 0 1 1 0-7.152Z" />
                  </svg>
                </div>
                <span className="text-sm text-white/60">Avg Package</span>
              </div>
              <p className="text-4xl font-bold">₹ 7.4 <span className="text-lg">LPA</span></p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 13a3.5 3.5 0 0 1-.369-6.98 4 4 0 1 1 7.753-1.3A4.5 4.5 0 1 1 13.5 13H11V9.413l1.293 1.293a1 1 0 0 0 1.414-1.414l-3-3a1 1 0 0 0-1.414 0l-3 3a1 1 0 0 0 1.414 1.414L9 9.414V13H5.5Z" />
                  </svg>
                </div>
                <span className="text-sm text-white/60">All Package</span>
              </div>
              <p className="text-4xl font-bold">3.58</p>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <button
                onClick={() => setShowDepartmentMenu((open) => !open)}
                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
              >
                {departmentFilter}
                <ChevronDown className="h-4 w-4 text-white/50" />
              </button>
              {showDepartmentMenu && (
                <div className="absolute mt-2 w-56 rounded-lg border border-white/15 bg-[#0b122f] shadow-xl z-10">
                  {departmentOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setDepartmentFilter(option)
                        setShowDepartmentMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 ${
                        departmentFilter === option ? "bg-white/10 text-white" : "text-white/80"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowPlacementMenu((open) => !open)}
                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
              >
                {placementFilter}
                <ChevronDown className="h-4 w-4 text-white/50" />
              </button>
              {showPlacementMenu && (
                <div className="absolute mt-2 w-48 rounded-lg border border-white/15 bg-[#0b122f] shadow-xl z-10">
                  {placementOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setPlacementFilter(option)
                        setShowPlacementMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 ${
                        placementFilter === option ? "bg-white/10 text-white" : "text-white/80"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowStatusMenu((open) => !open)}
                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
              >
                {statusFilter}
                <ChevronDown className="h-4 w-4 text-white/50" />
              </button>
              {showStatusMenu && (
                <div className="absolute mt-2 w-44 rounded-lg border border-white/15 bg-[#0b122f] shadow-xl z-10">
                  {statusOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setStatusFilter(option)
                        setShowStatusMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 ${
                        statusFilter === option ? "bg-white/10 text-white" : "text-white/80"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setDepartmentFilter("All Departments")
                setPlacementFilter("Placement Ready")
                setStatusFilter("All Status")
              }}
              className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
            >
              Reset Filters
            </button>
          </div>

          {/* Student Records Table */}
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-black/30">
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Profile #</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Student Name</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Applying For</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Department</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Package</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((student, idx) => {
                  const statusColor = getStatusColor(student.status)
                  const avatarBg = getAvatarColor(idx)
                  return (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-sm font-bold text-white/70">{student.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarBg} flex items-center justify-center text-xs font-bold text-white`}>
                            {student.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">{student.name}</p>
                            <p className="text-xs text-white/60">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/70">{student.company}</td>
                      <td className="px-6 py-4 text-sm text-white/70">{student.department}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text} border ${statusColor.border}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">{student.package}</td>
                      <td className="px-6 py-4 text-sm text-white/70">{student.lastUpdated}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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
