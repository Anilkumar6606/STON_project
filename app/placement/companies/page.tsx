"use client"

import { useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import PlacementSidebar from "@/components/placement-sidebar"
import { Bell, Settings, Search, ChevronDown } from "lucide-react"

const companiesData = [
  { rank: 1, name: "Infosys", logo: "IF", department: "Computer Science and Engineering", hires: 105, salary: "6.8", interviews: 350, lastPlacement: "Apr 25, 2026", color: "from-blue-600 to-blue-400" },
  { rank: 2, name: "TCS", logo: "TCS", department: "Tech Mahindra Engineering", hires: 92, salary: "6.5", interviews: 280, lastPlacement: "Apr 24, 2026", color: "from-red-600 to-red-400" },
  { rank: 3, name: "Accenture", logo: "AC", department: "Artificial Intelligence and Technology", hires: 78, salary: "7.0", interviews: 260, lastPlacement: "Apr 24, 2026", color: "from-purple-600 to-purple-400" },
  { rank: 4, name: "Microsoft", logo: "MS", department: "Cloud Engineering", hires: 68, salary: "12.0", interviews: 220, lastPlacement: "Apr 23, 2026", color: "from-green-600 to-green-400" },
  { rank: 5, name: "Google", logo: "GG", department: "Tech Data Engineering", hires: 64, salary: "15.5", interviews: 205, lastPlacement: "Apr 22, 2026", color: "from-yellow-600 to-yellow-400" },
  { rank: 6, name: "Capgemini", logo: "CG", department: "Information Technology", hires: 58, salary: "6.2", interviews: 200, lastPlacement: "Apr 21, 2026", color: "from-pink-600 to-pink-400" },
  { rank: 7, name: "HCL", logo: "HCL", department: "Software Engineering", hires: 56, salary: "6.0", interviews: 195, lastPlacement: "Apr 20, 2026", color: "from-indigo-600 to-indigo-400" },
  { rank: 8, name: "Amazon", logo: "AM", department: "Cloud Services", hires: 52, salary: "14.0", interviews: 190, lastPlacement: "Apr 19, 2026", color: "from-cyan-600 to-cyan-400" },
  { rank: 9, name: "Deloitte", logo: "DL", department: "Consulting", hires: 49, salary: "7.5", interviews: 175, lastPlacement: "Apr 18, 2026", color: "from-orange-600 to-orange-400" },
  { rank: 10, name: "L&T", logo: "LT", department: "Engineering", hires: 45, salary: "7.0", interviews: 165, lastPlacement: "Apr 17, 2026", color: "from-teal-600 to-teal-400" },
]

export default function PlacementTopCompanies() {
  const { data: session } = useSession()
  const [departmentFilter, setDepartmentFilter] = useState("All Departments")
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
          <button className="p-2 hover:bg-white/10 rounded-lg transition">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition">
            <Settings className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold">
              {session?.user?.name?.charAt(0) || "P"}
            </div>
            <span className="text-sm font-medium">{session?.user?.name || "Placement Officer"}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <PlacementSidebar />

        {/* Main Content */}
        <main className="flex-1 ml-56 overflow-y-auto p-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
              <div className="text-sm text-white/60 mb-2">Total Companies</div>
              <div className="text-3xl font-bold text-white">{totalCompanies}</div>
            </div>
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
              <div className="text-sm text-white/60 mb-2">Total Hires</div>
              <div className="text-3xl font-bold text-green-400">{totalHires}</div>
            </div>
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
              <div className="text-sm text-white/60 mb-2">Total Interviews</div>
              <div className="text-3xl font-bold text-blue-400">{totalInterviews}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 bg-black/40 backdrop-blur p-4 rounded-xl border border-white/10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowDeptMenu(!showDeptMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition min-w-[200px] justify-between"
              >
                {departmentFilter}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Companies List */}
          <div className="space-y-4">
            {filteredCompanies.map((company, index) => (
              <div
                key={company.rank}
                className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-white/20 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-2xl font-bold text-white/40 w-8">#{company.rank}</div>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {company.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{company.name}</h3>
                      <p className="text-sm text-white/60">{company.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{company.hires}</div>
                      <div className="text-xs text-white/60">Hires</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">₹{company.salary} LPA</div>
                      <div className="text-xs text-white/60">Avg Package</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{company.interviews}</div>
                      <div className="text-xs text-white/60">Interviews</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-white/80">{company.lastPlacement}</div>
                      <div className="text-xs text-white/60">Last Placement</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
