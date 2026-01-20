"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Bell, Plus, LogOut, ChevronDown } from "lucide-react"

const departments = [
  {
    category: "Core Engineering Departments",
    items: [
      { name: "CSE", fullName: "Computer Science and Engineering", students: 650, placement: 80, year: 2026, icon: "🏛️" },
      { name: "Mech", fullName: "Mechanical Engineering", students: 480, placement: 73, year: 2025, icon: "⚙️" },
      { name: "Civil", fullName: "Civil Engineering", students: 310, placement: 72, year: 2024, icon: "🏗️" },
      { name: "EEE", fullName: "Electrical and Electronics Engineering", students: 420, placement: 69, year: 2025, icon: "⚡" },
      { name: "Chem", fullName: "Chemical Engineering", students: 250, placement: 67, year: 2024, icon: "🧪" },
    ]
  },
  {
    category: "AI & Advanced Data Departments",
    items: [
      { name: "AI", fullName: "Artificial Intelligence", students: 180, placement: 67, year: 2025, icon: "🤖" },
      { name: "AI & ML", fullName: "Artificial Intelligence and Machine Learning", students: 200, placement: 68, year: 2026, icon: "🧠" },
      { name: "AIDS", fullName: "Artificial Intelligence and Data Science", students: 160, placement: 69, year: 2024, icon: "📊" },
      { name: "ECE", fullName: "Electronics and Communication", students: 380, placement: 68, year: 2025, icon: "📡" },
      { name: "Chem", fullName: "Chemical Engineering", students: 150, placement: 67, year: 2024, icon: "🧬" },
    ]
  },
  {
    category: "Emerging Tech Departments",
    items: [
      { name: "AI", fullName: "Artificial Intelligence", students: 180, placement: 67, year: 2026, icon: "🤖" },
      { name: "AI & ML", fullName: "Artificial Intelligence and Machine Learning", students: 200, placement: 68, year: 2026, icon: "🧠" },
      { name: "AIDS", fullName: "Data Science", students: 160, placement: 69, year: 2025, icon: "📚" },
      { name: "CSD", fullName: "Data Science", students: 140, placement: 75, year: 2024, icon: "🔍" },
      { name: "IT", fullName: "Information Technology", students: 480, placement: 73, year: 2025, icon: "💻" },
      { name: "Cyber", fullName: "Cybersecurity", students: 250, placement: 60, year: 2024, icon: "🔐" },
    ]
  }
]

export default function DepartmentOverview() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(2)
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [yearFilter, setYearFilter] = useState("All Years")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCategoryMenu, setShowCategoryMenu] = useState(false)
  const [showYearMenu, setShowYearMenu] = useState(false)

  const categoryOptions = useMemo(
    () => ["All Categories", ...departments.map((d) => d.category)],
    []
  )

  const yearOptions = ["All Years", 2026, 2025, 2024]

  const normalizedSearch = searchTerm.toLowerCase().trim()

  const filteredSections = useMemo(() => {
    return departments
      .filter((section) => categoryFilter === "All Categories" || section.category === categoryFilter)
      .map((section) => ({
        ...section,
        items: section.items.filter((dept) => {
          const yearOk = yearFilter === "All Years" || dept.year === yearFilter
          const searchOk =
            !normalizedSearch ||
            [dept.name, dept.fullName].some((f) => f.toLowerCase().includes(normalizedSearch))
          return yearOk && searchOk
        }),
      }))
      .filter((section) => section.items.length > 0)
  }, [categoryFilter, yearFilter, normalizedSearch])

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
        <h1 className="text-3xl font-bold">Departments Overview</h1>
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
            <NavItem label="Departments" active onClick={() => router.push('/placement/department')} />
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
              <h1 className="text-4xl font-bold">Departments Overview</h1>
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
                href="/placement/department/add"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition"
              >
                <Plus className="w-5 h-5" />
                Add Department
              </Link>
            </div>
          </div>

          {/* Filters Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <button
                onClick={() => setShowCategoryMenu((o) => !o)}
                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
              >
                {categoryFilter}
                <ChevronDown className="h-4 w-4 text-white/50" />
              </button>
              {showCategoryMenu && (
                <div className="absolute mt-2 w-64 rounded-lg border border-white/15 bg-[#0b122f] shadow-xl z-10">
                  {categoryOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setCategoryFilter(option)
                        setShowCategoryMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 ${
                        categoryFilter === option ? "bg-white/10 text-white" : "text-white/80"
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
                onClick={() => setShowYearMenu((o) => !o)}
                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
              >
                {yearFilter}
                <ChevronDown className="h-4 w-4 text-white/50" />
              </button>
              {showYearMenu && (
                <div className="absolute mt-2 w-44 rounded-lg border border-white/15 bg-[#0b122f] shadow-xl z-10">
                  {yearOptions.map((option) => (
                    <button
                      key={String(option)}
                      onClick={() => {
                        setYearFilter(option as any)
                        setShowYearMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 ${
                        yearFilter === option ? "bg-white/10 text-white" : "text-white/80"
                      }`}
                    >
                      {String(option)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setCategoryFilter("All Categories")
                setYearFilter("All Years")
                setSearchTerm("")
              }}
              className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
            >
              Reset Filters
            </button>
          </div>

          {/* Departments Sections */}
          <div className="space-y-12">
            {filteredSections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold mb-6">{section.category}</h2>
                <div className="grid grid-cols-5 gap-4">
                  {section.items.map((dept, deptIdx) => (
                    <div
                      key={deptIdx}
                      className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur p-6 hover:border-white/30 transition space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-3xl mb-2">{dept.icon}</div>
                          <h3 className="text-xl font-bold text-white">{dept.name}</h3>
                          <p className="text-xs text-white/60 mt-1">{dept.fullName}</p>
                        </div>
                        <span className="text-2xl font-bold text-white">{dept.students}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Total Students</span>
                          <span className="text-sm font-semibold bg-green-500/20 text-green-300 px-2 py-1 rounded">
                            {dept.placement}%
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full"
                            style={{ width: `${dept.placement}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-xl">
                🏛️
              </div>
              <div>
                <p className="text-sm text-white/60">Total Departments</p>
                <p className="text-3xl font-bold">18</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-xl">
                ✓
              </div>
              <div>
                <p className="text-sm text-white/60">Overall Placement</p>
                <p className="text-3xl font-bold">71%</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-xl">
                👥
              </div>
              <div>
                <p className="text-sm text-white/60">Total Students Placed</p>
                <p className="text-3xl font-bold">1835</p>
              </div>
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
