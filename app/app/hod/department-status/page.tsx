"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { User, Search, Settings, Bell } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"

export default function HODDepartmentStatus() {
  const router = useRouter()
  const [selectedYear, setSelectedYear] = useState("2024-2025")
  const [searchTerm, setSearchTerm] = useState("")

  // HOD's department - CSE (Computer Science and Engineering)
  const departmentName = "CSE"
  const departmentFull = "Computer Science and Engineering"

  const stats = [
    { label: "Total Students", value: "640", icon: "👥" },
    { label: "Placement Ready", value: "420", icon: "✅" },
    { label: "Resumes Completed", value: "520", icon: "📄" },
    { label: "Resumes Pending", value: "120", icon: "⏳" },
  ]

  const detailedStats = [
    { label: "Overall Completion Rate", value: "81%", trend: "+5%" },
    { label: "Placement Rate", value: "33.6%", trend: "+2.1%" },
    { label: "Average Package", value: "₹8.5L", trend: "+₹0.5L" },
  ]

  // Semester-wise breakdown
  const semesterData = [
    { semester: "Sem 1", completed: 85, pending: 15, placement: 28 },
    { semester: "Sem 2", completed: 82, pending: 18, placement: 30 },
    { semester: "Sem 3", completed: 79, pending: 21, placement: 25 },
    { semester: "Sem 4", completed: 76, pending: 24, placement: 22 },
  ]

  // Monthly progress for current semester
  const monthlyProgress = [
    { month: "January", completion: 40, placement: 15 },
    { month: "February", completion: 55, placement: 22 },
    { month: "March", completion: 72, placement: 28 },
    { month: "April", completion: 81, placement: 33 },
  ]

  // Company-wise placements
  const companyPlacements = [
    { company: "Google", count: 45, package: "₹15L" },
    { company: "Microsoft", count: 38, package: "₹14L" },
    { company: "Amazon", count: 52, package: "₹13.5L" },
    { company: "TCS", count: 95, package: "₹7L" },
    { company: "Infosys", count: 82, package: "₹6.5L" },
    { company: "Wipro", count: 65, package: "₹6L" },
  ]

  // Skill-wise distribution
  const skillData = [
    { skill: "Full Stack", students: 156, placement: 148 },
    { skill: "Data Science", students: 142, placement: 128 },
    { skill: "Cloud Computing", students: 134, placement: 121 },
    { skill: "DevOps", students: 98, placement: 87 },
    { skill: "AI/ML", students: 110, placement: 95 },
  ]

  const handleExport = () => {
    const csvContent = [
      [`Department Status Report - ${departmentName}`, `Academic Year: ${selectedYear}`],
      [],
      ["Metric", "Value", "Trend"],
      ...detailedStats.map(stat => [stat.label, stat.value, stat.trend]),
      [],
      ["Semester", "Completed", "Pending", "Placement"],
      ...semesterData.map(data => [data.semester, data.completed, data.pending, data.placement]),
      [],
      ["Company", "Count", "Package"],
      ...companyPlacements.map(comp => [comp.company, comp.count, comp.package]),
    ]
      .map(row => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${departmentName}-status-${selectedYear}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-sm border-r border-white/10 flex flex-col fixed h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image
              src="/image/STON.png"
              alt="STON Technology logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
            <div>
              <div className="text-white font-bold text-sm">STON</div>
              <div className="text-white/70 text-xs">TECHNOLOGY</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link
            href="/hod/dashboard"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Dashboard
          </Link>
          <Link
            href="/hod/department-status"
            className="block px-4 py-3 text-white bg-white/20 rounded-lg transition text-sm font-medium"
          >
            Department Status
          </Link>
          <Link
            href="/hod/student-resume-status"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Student Resume Status
          </Link>
          <Link
            href="/hod/student-records"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Student Records
          </Link>
          <Link
            href="/hod/download"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Download
          </Link>
          <Link
            href="/hod/profile"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Profile
          </Link>
        </nav>

        {/* Bottom Logout Bar */}
        <div className="p-4 border-t border-white/10 bg-blue-900/40">
          <button 
            onClick={() => router.push("/login")}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">{departmentName} Department Status</h1>
            <span className="text-white/60 text-sm">({departmentFull})</span>
          </div>
          
          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/20"
              />
            </div>
            
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Bell className="w-5 h-5 text-white" />
            </button>
            
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Settings className="w-5 h-5 text-white" />
            </button>
            
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <User className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">Dr. Rajesh Kumar</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-6">
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-white/70 text-sm mb-2">{stat.label}</div>
                      <div className="text-white text-3xl font-bold">{stat.value}</div>
                    </div>
                    <div className="text-3xl">{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-3 gap-6">
              {detailedStats.map((metric, index) => (
                <div key={index} className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <div className="text-white/70 text-sm mb-2">{metric.label}</div>
                  <div className="flex items-end gap-4">
                    <div className="text-white text-4xl font-bold">{metric.value}</div>
                    <div className="text-green-400 text-sm font-medium mb-2">{metric.trend}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-40 bg-black/40 text-white border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2022-2023">2022-2023</SelectItem>
                </SelectContent>
              </Select>
              
              <button 
                onClick={handleExport}
                className="ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition font-medium"
              >
                <span>📥</span> Export Report
              </button>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Semester-wise Progress */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-white text-lg font-semibold mb-6">Semester-wise Progress</h2>
                <div className="w-full h-80 bg-black/20 rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={semesterData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="semester" tick={{ fill: "#ffffff", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#ffffff", fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }} />
                      <Legend />
                      <Bar dataKey="completed" fill="#10B981" name="Completed" />
                      <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Trend */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-white text-lg font-semibold mb-6">Monthly Progress - {selectedYear}</h2>
                <div className="w-full h-80 bg-black/20 rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyProgress} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" tick={{ fill: "#ffffff", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#ffffff", fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }} />
                      <Legend />
                      <Line type="monotone" dataKey="completion" stroke="#3B82F6" strokeWidth={2} name="Completion %" dot={{ fill: "#3B82F6" }} />
                      <Line type="monotone" dataKey="placement" stroke="#10B981" strokeWidth={2} name="Placement %" dot={{ fill: "#10B981" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Company-wise Placements Table */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white text-lg font-semibold mb-6">Top Recruiting Companies</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Company Name</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Students Placed</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Package Offered</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyPlacements.map((company, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition">
                        <td className="px-4 py-4 text-white font-medium">{company.company}</td>
                        <td className="px-4 py-4 text-white">{company.count}</td>
                        <td className="px-4 py-4 text-white">{company.package}</td>
                        <td className="px-4 py-4">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Completed</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Skills Offered */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white text-lg font-semibold mb-6">Skills-wise Placement Rate</h2>
              <div className="space-y-4">
                {skillData.map((skill, index) => {
                  const placementRate = Math.round((skill.placement / skill.students) * 100)
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="text-white font-medium">{skill.skill}</span>
                          <span className="text-white/70 text-sm">{skill.placement}/{skill.students} placed</span>
                        </div>
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${placementRate}%`,
                              backgroundColor: placementRate >= 80 ? "#10B981" : placementRate >= 60 ? "#3B82F6" : "#F59E0B"
                            }}
                          />
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <span className="text-white font-semibold">{placementRate}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Spacer */}
            <div className="h-10"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
