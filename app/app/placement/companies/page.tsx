"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Bell, Plus, LogOut, ChevronDown, ChevronRight } from "lucide-react"

const companiesData = [
  { rank: 1, name: "Infosys", logo: "IF", department: "Computer Science and Engineering", hires: 105, salary: "6.8", interviews: 350, lastPlacement: "Apr 25, 2026" },
  { rank: 2, name: "TCS", logo: "TCS", department: "Tech Mahindra Engineering", hires: 92, salary: "6.5", interviews: 280, lastPlacement: "Apr 24, 2026" },
  { rank: 3, name: "Accenture", logo: "AC", department: "Artificial Intelligence and Technology", hires: 78, salary: "7.0", interviews: 260, lastPlacement: "Apr 24, 2026" },
  { rank: 4, name: "Microsoft", logo: "MS", department: "Cloud Engineering", hires: 68, salary: "12.0", interviews: 220, lastPlacement: "Apr 23, 2026" },
  { rank: 5, name: "Google", logo: "GG", department: "Tech Data Engineering", hires: 64, salary: "10.5", interviews: 205, lastPlacement: "Apr 22, 2026" },
  { rank: 6, name: "Capgemini", logo: "CG", department: "Capgemini", hires: 58, salary: "6.2", interviews: 200, lastPlacement: "Apr 21, 2026" },
  { rank: 7, name: "HCL", logo: "HCL", department: "Capgemini", hires: 56, salary: "6.0", interviews: 195, lastPlacement: "Apr 20, 2026" },
  { rank: 8, name: "Amazon", logo: "AM", department: "Pressures", hires: 52, salary: "14.0", interviews: 190, lastPlacement: "Apr 19, 2026" },
  { rank: 9, name: "Deloitte", logo: "DB", department: "L&T", hires: 49, salary: "7.5", interviews: 175, lastPlacement: "Apr 18, 2026" },
  { rank: 10, name: "L&T", logo: "LT", department: "L&T", hires: 45, salary: "7.0", interviews: 165, lastPlacement: "Apr 17, 2026" },
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
    { bg: "from-teal-600 to-teal-400", text: "text-teal-100" },
  ]
  return colors[index % colors.length]
}

export default function TopRecruitingCompanies() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(2)
  const [departmentFilter, setDepartmentFilter] = useState("All Departments")
  const [sortBy, setSortBy] = useState("Rank")
  const [showDeptMenu, setShowDeptMenu] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const departmentOptions = useMemo(
    () => ["All Departments", ...Array.from(new Set(companiesData.map((c) => c.department)))],
    []
  )

  const normalizedSearch = searchTerm.toLowerCase().trim()

  const filteredCompanies = useMemo(() => {
    return companiesData.filter((c) => {
      const deptMatch = departmentFilter === "All Departments" || c.department === departmentFilter
      const searchMatch =
        !normalizedSearch ||
        [c.name, c.department].some((field) => field.toLowerCase().includes(normalizedSearch))
      return deptMatch && searchMatch
    })
  }, [departmentFilter, normalizedSearch])

  const handleLogout = () => {
    window.location.href = "/login"
  }

  const totalCompanies = companiesData.length
  const totalHires = companiesData.reduce((sum, c) => sum + c.hires, 0)
  const totalInterviews = companiesData.reduce((sum, c) => sum + c.interviews, 0)

  return (
    <div className="h-screen bg-gradient-to-br from-[#050616] via-[#0f1a3f] to-[#1a2e66] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/40 backdrop-blur z-50">
        <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <img src="/image/STON.png" alt="STON Logo" className="w-8 h-8 object-contain" />
          STON
        </div>
        <h1 className="text-3xl font-bold">Top Recruiting Companies</h1>
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
            <NavItem label="Top Recruiting Companies" active onClick={() => router.push('/placement/companies')} />
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
              <h1 className="text-4xl font-bold">Top Recruiting Companies</h1>
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
                href="/placement/companies/add"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition"
              >
                <Plus className="w-5 h-5" />
                Add Company
              </Link>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                <span className="text-sm text-white/60">Total Companies</span>
              </div>
              <p className="text-4xl font-bold">{totalCompanies}</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 10a3 3 0 100-6 3 3 0 000 6zM3 18a6 6 0 0112 0H3z" />
                  </svg>
                </div>
                <span className="text-sm text-white/60">Total Hires</span>
              </div>
              <p className="text-4xl font-bold">{totalHires.toLocaleString()}</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-white/60">Total Interviews</span>
              </div>
              <p className="text-4xl font-bold">{totalInterviews.toLocaleString()}</p>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
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
            </div>
            <span className="text-sm text-white/60">Sort by: {sortBy}</span>
          </div>

          {/* Companies Table */}
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-black/30">
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Rank #</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Company</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Total Hires</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold cursor-pointer hover:text-white">Annual Package Avg</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Interviews</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-white/50 font-semibold cursor-pointer hover:text-white">Last Placement</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company, idx) => {
                  const colors = getLogoColors(idx)
                  return (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-sm font-bold text-white/70">{company.rank}.</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center text-xs font-bold ${colors.text}`}>
                            {company.logo}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{company.name}</p>
                            <p className="text-xs text-white/60">{company.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">{company.hires}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">₹ {company.salary} <span className="text-xs text-white/60">LPA</span></td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">{company.interviews}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">{company.lastPlacement}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* View All Button */}
          <div className="flex items-center justify-end mt-6">
            <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition">
              View All Companies
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
