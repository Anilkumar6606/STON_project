"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { User, Settings, Bell, Briefcase, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PrincipalSidebar from "@/components/principal-sidebar"

export default function TopCompanies() {
  const router = useRouter()
  const { data: session } = useSession()
  const [selectedYear, setSelectedYear] = useState("2023-2024")

  const companiesData = [
    { company: "Google", students: 45, package: "₹15", rating: 4.9, established: 2010, category: "Tech" },
    { company: "Microsoft", students: 38, package: "₹14", rating: 4.8, established: 2005, category: "Tech" },
    { company: "Amazon", students: 52, package: "₹13.5", rating: 4.7, established: 2008, category: "Tech" },
    { company: "Adobe", students: 31, package: "₹12.5", rating: 4.6, established: 2012, category: "Tech" },
    { company: "Goldman Sachs", students: 25, package: "₹16", rating: 4.8, established: 2006, category: "Finance" },
    { company: "JPMorgan", students: 22, package: "₹15.5", rating: 4.7, established: 2009, category: "Finance" },
    { company: "TCS", students: 95, package: "₹8.5", rating: 4.5, established: 2002, category: "IT Services" },
    { company: "Infosys", students: 87, package: "₹7.5", rating: 4.4, established: 2003, category: "IT Services" },
  ]

  const chartData = companiesData.slice(0, 6).map(c => ({
    company: c.company.substring(0, 3),
    students: c.students,
    package: parseInt(c.package)
  }))

  const topByPackage = [...companiesData].sort((a, b) => parseFloat(b.package) - parseFloat(a.package)).slice(0, 5)
  const topByStudents = [...companiesData].sort((a, b) => b.students - a.students).slice(0, 5)

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <PrincipalSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Top Companies</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Settings className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="text-right">
                <p className="text-white text-sm font-medium">{session?.user?.name}</p>
                <p className="text-white/60 text-xs">Principal</p>
              </div>
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-auto">
          {/* Filter */}
          <div className="mb-8 flex items-center gap-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2025-2026">2025-2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chart */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
            <h2 className="text-white font-semibold mb-4">Students Recruited vs Average Package</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="company" stroke="rgba(255,255,255,0.5)" />
                <YAxis yAxisId="left" stroke="rgba(255,255,255,0.5)" />
                <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }} />
                <Legend />
                <Bar yAxisId="left" dataKey="students" fill="#3B82F6" name="Students" />
                <Bar yAxisId="right" dataKey="package" fill="#10B981" name="Package (LPA)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top by Package */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                <h2 className="text-white font-semibold">Top by Package</h2>
              </div>

              <div className="space-y-4">
                {topByPackage.map((company, idx) => (
                  <div key={company.company} className="bg-white/5 rounded-lg p-4 border border-white/5 hover:border-white/10 transition">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{company.company}</p>
                          <p className="text-white/60 text-xs">{company.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">{company.package} LPA</p>
                        <p className="text-white/60 text-xs">★ {company.rating}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top by Students */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <h2 className="text-white font-semibold">Top by Students Hired</h2>
              </div>

              <div className="space-y-4">
                {topByStudents.map((company, idx) => (
                  <div key={company.company} className="bg-white/5 rounded-lg p-4 border border-white/5 hover:border-white/10 transition">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{company.company}</p>
                          <p className="text-white/60 text-xs">{company.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400 font-bold">{company.students} Students</p>
                        <p className="text-white/60 text-xs">★ {company.rating}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* All Companies Table */}
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden mt-8">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-white font-semibold">All Companies</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Company</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Category</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Students</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Package</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {companiesData.map((company) => (
                    <tr key={company.company} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-white font-medium">{company.company}</td>
                      <td className="px-6 py-4 text-white/80 text-sm">{company.category}</td>
                      <td className="px-6 py-4 text-white/80">{company.students}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-200">
                          {company.package} LPA
                        </span>
                      </td>
                      <td className="px-6 py-4 text-yellow-400">★ {company.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
