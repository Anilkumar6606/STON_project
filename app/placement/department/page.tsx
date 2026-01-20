"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import PlacementSidebar from "@/components/placement-sidebar"
import { Bell, Settings, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const departmentStats = [
  {
    id: 1,
    dept: "Computer Science & Engineering",
    totalStudents: 285,
    placed: 255,
    placementRate: 89,
    avgSalary: 9.2,
    topCompany: "Google",
    highestPackage: 28.5
  },
  {
    id: 2,
    dept: "Information Technology",
    totalStudents: 210,
    placed: 185,
    placementRate: 88,
    avgSalary: 8.5,
    topCompany: "Microsoft",
    highestPackage: 25.0
  },
  {
    id: 3,
    dept: "Mechanical Engineering",
    totalStudents: 145,
    placed: 115,
    placementRate: 79,
    avgSalary: 7.2,
    topCompany: "L&T",
    highestPackage: 18.0
  },
  {
    id: 4,
    dept: "Civil Engineering",
    totalStudents: 98,
    placed: 72,
    placementRate: 73,
    avgSalary: 6.8,
    topCompany: "Larsen & Toubro",
    highestPackage: 16.5
  },
  {
    id: 5,
    dept: "Electrical Engineering",
    totalStudents: 120,
    placed: 102,
    placementRate: 85,
    avgSalary: 8.0,
    topCompany: "Siemens",
    highestPackage: 22.0
  },
]

const deptTrendData = [
  { year: "2024", CSE: 75, IT: 72, Mech: 65, Civil: 60, Electrical: 70 },
  { year: "2025", CSE: 82, IT: 80, Mech: 72, Civil: 68, Electrical: 78 },
  { year: "2026", CSE: 89, IT: 88, Mech: 79, Civil: 73, Electrical: 85 },
]

export default function DepartmentStatus() {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredDepts = departmentStats.filter(d =>
    d.dept.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredDepts.length / itemsPerPage)
  const paginatedData = filteredDepts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <PlacementSidebar />

      <main className="flex-1 ml-56 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Department Status</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-white cursor-pointer hover:text-white/70" />
            <Settings className="w-5 h-5 text-white cursor-pointer hover:text-white/70" />
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="text-right">
                <p className="text-white text-sm font-medium">{session?.user?.name || "Placement Officer"}</p>
                <p className="text-white/60 text-xs">Officer</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Placement Trend Chart */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Year-wise Placement Trend by Department</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deptTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="CSE" fill="#3b82f6" />
                <Bar dataKey="IT" fill="#8b5cf6" />
                <Bar dataKey="Mech" fill="#ec4899" />
                <Bar dataKey="Civil" fill="#f59e0b" />
                <Bar dataKey="Electrical" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Search and Filter */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* Department Stats Table */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Department</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Total Students</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Placed</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Placement Rate</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Avg Salary</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Top Company</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Highest Package</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((dept) => (
                    <tr key={dept.id} className="border-t border-white/5 hover:bg-white/5 transition">
                      <td className="py-4 px-6 text-white">{dept.dept}</td>
                      <td className="py-4 px-6 text-white/70">{dept.totalStudents}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-xs font-medium">
                          {dept.placed}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          dept.placementRate >= 85
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : dept.placementRate >= 75
                            ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                            : "bg-red-500/20 text-red-300 border border-red-500/30"
                        }`}>
                          {dept.placementRate}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white font-medium">{dept.avgSalary} LPA</td>
                      <td className="py-4 px-6 text-white/70">{dept.topCompany}</td>
                      <td className="py-4 px-6 text-white font-medium text-lg">{dept.highestPackage} LPA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-t border-white/10">
              <div className="text-sm text-white/70">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredDepts.length)} of {filteredDepts.length} departments
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 hover:bg-white/10 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 hover:bg-white/10 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
