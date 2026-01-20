"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { User, Settings, Bell, Building } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PrincipalSidebar from "@/components/principal-sidebar"

export default function Departments() {
  const router = useRouter()
  const { data: session } = useSession()
  const [selectedYear, setSelectedYear] = useState("2023-2024")

  const departmentData = [
    { name: "CSE", students: 640, placed: 215, resumeReady: 520, rating: 4.8 },
    { name: "IT", students: 580, placed: 180, resumeReady: 452, rating: 4.7 },
    { name: "Mech", students: 520, placed: 143, resumeReady: 400, rating: 4.6 },
    { name: "Civil", students: 300, placed: 93, resumeReady: 235, rating: 4.4 },
    { name: "EEE", students: 390, placed: 110, resumeReady: 315, rating: 4.5 },
    { name: "AI", students: 250, placed: 89, resumeReady: 210, rating: 4.9 },
  ]

  const chartData = departmentData.map(d => ({
    dept: d.name,
    students: d.students,
    placed: d.placed,
    resumeReady: d.resumeReady
  }))

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <PrincipalSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Departments</h1>
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
            <h2 className="text-white font-semibold mb-4">Department Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="dept" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }} />
                <Legend />
                <Bar dataKey="students" fill="#3B82F6" name="Total Students" />
                <Bar dataKey="placed" fill="#10B981" name="Placed" />
                <Bar dataKey="resumeReady" fill="#8B5CF6" name="Resume Ready" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentData.map((dept) => (
              <div key={dept.name} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Building className="w-6 h-6 text-blue-400" />
                    <h3 className="text-white font-bold text-lg">{dept.name}</h3>
                  </div>
                  <span className="text-yellow-400">★ {dept.rating}</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-white/70 text-sm">Total Students</p>
                    <p className="text-white text-xl font-semibold">{dept.students}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-white/70 text-xs">Placed</p>
                      <p className="text-green-400 font-bold">{dept.placed}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-xs">Resume Ready</p>
                      <p className="text-blue-400 font-bold">{dept.resumeReady}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-white/70 text-xs mb-1">Placement Rate</p>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${(dept.placed / dept.students) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-white/60 text-xs mt-1">{((dept.placed / dept.students) * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
