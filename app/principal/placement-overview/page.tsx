"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { User, Search, Settings, Bell, TrendingUp, Users, Briefcase, Award } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PrincipalSidebar from "@/components/principal-sidebar"

export default function PlacementOverview() {
  const router = useRouter()
  const { data: session } = useSession()
  const [selectedYear, setSelectedYear] = useState("2023-2024")

  const stats = [
    { label: "Total Students", value: "3240", icon: <Users className="w-6 h-6" />, change: "+5.2%" },
    { label: "Placed", value: "2156", icon: <Briefcase className="w-6 h-6" />, change: "+12.3%" },
    { label: "Placement Rate", value: "66.5%", icon: <TrendingUp className="w-6 h-6" />, change: "+3.1%" },
    { label: "Avg Package", value: "₹8.5 LPA", icon: <Award className="w-6 h-6" />, change: "+4.7%" },
  ]

  const monthlyData = [
    { month: "Jan", placed: 120, offers: 145 },
    { month: "Feb", placed: 135, offers: 160 },
    { month: "Mar", placed: 150, offers: 175 },
    { month: "Apr", placed: 165, offers: 190 },
    { month: "May", placed: 180, offers: 210 },
    { month: "Jun", placed: 195, offers: 225 },
  ]

  const departmentDistribution = [
    { name: "CSE", value: 640, fill: "#3B82F6" },
    { name: "IT", value: 580, fill: "#8B5CF6" },
    { name: "Mech", value: 520, fill: "#F97316" },
    { name: "Others", value: 500, fill: "#06B6D4" },
  ]

  const placementByCompany = [
    { company: "Google", students: 45, package: "₹15 LPA" },
    { company: "Microsoft", students: 38, package: "₹14 LPA" },
    { company: "Amazon", students: 52, package: "₹13.5 LPA" },
    { company: "Adobe", students: 31, package: "₹12.5 LPA" },
    { company: "TCS", students: 95, package: "₹8.5 LPA" },
    { company: "Infosys", students: 87, package: "₹7.5 LPA" },
  ]

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <PrincipalSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Placement Overview</h1>
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white/70 text-sm font-medium">{stat.label}</p>
                  <div className="text-blue-400">{stat.icon}</div>
                </div>
                <p className="text-white text-3xl font-bold">{stat.value}</p>
                <p className="text-green-400 text-xs mt-2">{stat.change} from last year</p>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Placement Trend */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-white font-semibold mb-4">Monthly Placement Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }} />
                  <Legend />
                  <Line type="monotone" dataKey="placed" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="offers" stroke="#8B5CF6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Department Distribution */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-white font-semibold mb-4">Students by Department</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Recruiting Companies */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-white font-semibold mb-4">Top Recruiting Companies</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Company</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Students Placed</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Average Package</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {placementByCompany.map((item, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-white font-medium">{item.company}</td>
                      <td className="px-6 py-4 text-white/80">{item.students}</td>
                      <td className="px-6 py-4 text-white/80">{item.package}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-200">
                          ↑ Increasing
                        </span>
                      </td>
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
