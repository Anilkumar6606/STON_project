"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search, Bell, Plus, LogOut, ChevronDown, ChevronRight } from "lucide-react"

const jobOpenings = [
  { rank: 1, company: "Infosys", logo: "IF", description: "Computer Science and Engineering", positions: 105, department: "Computer Science & Engineering", location: "Bengaluru", deadline: "May 15, 2026" },
  { rank: 2, company: "TCS", logo: "TCS", description: "Nasscom Tech Engineering", positions: 92, department: "Information Technology", location: "Hyderabad", deadline: "May 18, 2026" },
  { rank: 3, company: "Google", logo: "GG", description: "Computer Science and Engineering", positions: 78, department: "Computer Science & Engineering", location: "Bangalore", deadline: "May 20, 2026" },
  { rank: 4, company: "Microsoft", logo: "MS", description: "Amphagy Penthaer", positions: 68, department: "Electronics & Communication", location: "Noida", deadline: "May 22, 2026" },
  { rank: 5, company: "Google", logo: "GG", description: "Computer Intelligence and Engineering", positions: 64, department: "Artificial Intelligence", location: "Hyderabad", deadline: "May 22, 2026" },
  { rank: 6, company: "Amazon", logo: "AM", description: "Cybersecurity", positions: 58, department: "Cybersecurity", location: "Chennai", deadline: "May 25, 2026" },
  { rank: 7, company: "HCL", logo: "HCL", description: "SILs + Data Science", positions: 56, department: "Data Scientist CSS +%24", location: "Pune", deadline: "May 26, 2026" },
  { rank: 8, company: "Deloitte", logo: "DB", description: "Robotics and Automation", positions: 49, department: "Robotics Engineer +100 Data", location: "Mumbai", deadline: "May 28, 2026" },
  { rank: 9, company: "L&T", logo: "LT", description: "Civil Engineering", positions: 45, department: "Civil Engineering", location: "Bengaluru", deadline: "Jun 1, 2026" },
]

const getLogoColors = (index: number) => {
  const colors = [
    { bg: "from-blue-600 to-blue-400", text: "text-blue-100" },
    { bg: "from-red-600 to-red-400", text: "text-red-100" },
    { bg: "from-purple-600 to-purple-400", text: "text-purple-100" },
    { bg: "from-green-600 to-green-400", text: "text-green-100" },
    { bg: "from-yellow-600 to-yellow-400", text: "text-yellow-100" },
    { bg: "from-pink-600 to-pink-400", text: "text-pink-100" },
    { bg: "from-indigo-600 to-indigo-400", text: "text-indigo-100" },
    { bg: "from-cyan-600 to-cyan-400", text: "text-cyan-100" },
    { bg: "from-orange-600 to-orange-400", text: "text-orange-100" },
  ]
  return colors[index % colors.length]
}

export default function CurrentJobOpenings() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(2)
  const [departmentFilter, setDepartmentFilter] = useState("All Departments")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeptMenu, setShowDeptMenu] = useState(false)
  const [showLocationMenu, setShowLocationMenu] = useState(false)

  const departmentOptions = useMemo(
    () => ["All Departments", ...Array.from(new Set(jobOpenings.map((job) => job.department)))],
    []
  )

  const locationOptions = useMemo(
    () => ["All Locations", ...Array.from(new Set(jobOpenings.map((job) => job.location)))],
    []
  )

  const normalizedSearch = searchTerm.toLowerCase().trim()

  const filteredJobs = useMemo(() => {
    return jobOpenings.filter((job) => {
      const departmentMatch = departmentFilter === "All Departments" || job.department === departmentFilter
      const locationMatch = locationFilter === "All Locations" || job.location === locationFilter
      const searchMatch =
        !normalizedSearch ||
        [job.company, job.department, job.location, job.description].some((field) =>
          field.toLowerCase().includes(normalizedSearch)
        )
      return departmentMatch && locationMatch && searchMatch
    })
  }, [departmentFilter, locationFilter, normalizedSearch])

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
        <h1 className="text-3xl font-bold">Current Job Openings</h1>
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
            <NavItem label="Current Job Openings" active onClick={() => router.push('/placement/openings')} />
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
              <h1 className="text-4xl font-bold">Current Job Openings</h1>
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
              <button
                onClick={() => router.push('/placement/openings/post')}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition"
              >
                <Plus className="w-5 h-5" />
                Post Job
              </button>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                <span className="text-sm text-white/60">Total Job Openings</span>
              </div>
              <p className="text-4xl font-bold">120</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-2.77 3.066 3.066 0 00-3.58 3.03A3.066 3.066 0 006.267 3.455zm9.8 9.267a4 4 0 01-7.753 1.977A4.5 4.5 0 1113.5 13a3.5 3.5 0 01-1.933-.732z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-white/60">Active Listings</span>
              </div>
              <p className="text-4xl font-bold">86</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-sm text-white/60">New Applications</span>
              </div>
              <p className="text-4xl font-bold">640</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-white/60">Qualified</span>
              </div>
              <p className="text-4xl font-bold">236</p>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <button
                onClick={() => setShowDeptMenu((o) => !o)}
                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
              >
                {departmentFilter}
                <ChevronDown className="h-4 w-4 text-white/50" />
              </button>
              {showDeptMenu && (
                <div className="absolute mt-2 w-64 rounded-lg border border-white/15 bg-[#0b122f] shadow-xl z-10">
                  {departmentOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setDepartmentFilter(option)
                        setShowDeptMenu(false)
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
                onClick={() => setShowLocationMenu((o) => !o)}
                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
              >
                {locationFilter}
                <ChevronDown className="h-4 w-4 text-white/50" />
              </button>
              {showLocationMenu && (
                <div className="absolute mt-2 w-52 rounded-lg border border-white/15 bg-[#0b122f] shadow-xl z-10">
                  {locationOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setLocationFilter(option)
                        setShowLocationMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 ${
                        locationFilter === option ? "bg-white/10 text-white" : "text-white/80"
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
                setLocationFilter("All Locations")
                setSearchTerm("")
              }}
              className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
            >
              Reset Filters
            </button>
          </div>

          {/* Job Openings Table */}
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-black/30">
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Rank #</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Company</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Department</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Department</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Location</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Deadline</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Applications</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job, idx) => {
                  const colors = getLogoColors(idx)
                  return (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-sm font-bold text-white/70">{job.rank}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center text-xs font-bold ${colors.text}`}>
                            {job.logo}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{job.company}</p>
                            <p className="text-xs text-white/60">{job.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">{job.positions}</td>
                      <td className="px-6 py-4 text-sm text-white/70">{job.department}</td>
                      <td className="px-6 py-4 text-sm text-white/70">{job.location}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">{job.deadline}</td>
                      <td className="px-6 py-4 text-sm">
                        <button className="flex items-center gap-1 text-purple-400 hover:text-purple-300 font-semibold transition">
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* View All Links */}
          <div className="flex items-center justify-between mt-6">
            <button className="flex items-center gap-2 text-white/70 hover:text-white font-semibold transition">
              View All Companies
            </button>
            <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition">
              View All Openings
              <ChevronRight className="w-5 h-5" />
            </button>
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
