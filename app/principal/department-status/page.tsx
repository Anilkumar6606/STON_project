"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Search, Settings, Bell, Plus, X, Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import PrincipalSidebar from "@/components/principal-sidebar"

export default function DepartmentStatus() {
  const router = useRouter()
  const { data: session } = useSession()
  const [selectedYear, setSelectedYear] = useState("2023-2024")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [addFormData, setAddFormData] = useState({
    name: "",
    totalStudents: "",
    placed: "",
    resumeReady: "",
    resumeCompletion: "",
    placementRate: ""
  })

  const stats = [
    { label: "Total Departments", value: "12", icon: "📊" },
    { label: "Total Students", value: "3240", icon: "👥" },
    { label: "Overall Completion Rate", value: "78%", icon: "✅" },
  ]

  const [departmentData, setDepartmentData] = useState([
    { name: "CSE", totalStudents: 640, placed: 215, resumeReady: 520, resumeCompletion: "81%", placementRate: "33.6%" },
    { name: "IT", totalStudents: 580, placed: 180, resumeReady: 452, resumeCompletion: "78%", placementRate: "31.0%" },
    { name: "Mech", totalStudents: 520, placed: 143, resumeReady: 400, resumeCompletion: "77%", placementRate: "27.5%" },
    { name: "Elpo", totalStudents: 460, placed: 125, resumeReady: 358, resumeCompletion: "78%", placementRate: "27.2%" },
    { name: "EXTC", totalStudents: 390, placed: 110, resumeReady: 315, resumeCompletion: "81%", placementRate: "28.2%" },
    { name: "Civil", totalStudents: 300, placed: 93, resumeReady: 235, resumeCompletion: "78%", placementRate: "31.0%" },
  ])

  const filteredData = selectedDepartment === "All Departments" 
    ? departmentData 
    : departmentData.filter(dept => dept.name === selectedDepartment)

  const chartData = [
    { dept: "CSE", completion: 81, placement: 33.6 },
    { dept: "IT", completion: 78, placement: 31.0 },
    { dept: "Mech", completion: 77, placement: 27.5 },
    { dept: "Elpo", completion: 78, placement: 27.2 },
    { dept: "EXTC", completion: 81, placement: 28.2 },
    { dept: "Civil", completion: 78, placement: 31.0 },
  ]

  const handleAddDepartment = () => {
    if (!addFormData.name || !addFormData.totalStudents) {
      alert("Please fill all required fields")
      return
    }

    const newDepartment = {
      name: addFormData.name,
      totalStudents: parseInt(addFormData.totalStudents),
      placed: parseInt(addFormData.placed) || 0,
      resumeReady: parseInt(addFormData.resumeReady) || 0,
      resumeCompletion: addFormData.resumeCompletion || "0%",
      placementRate: addFormData.placementRate || "0%"
    }

    setDepartmentData([...departmentData, newDepartment])
    setAddFormData({ name: "", totalStudents: "", placed: "", resumeReady: "", resumeCompletion: "", placementRate: "" })
    setShowAddModal(false)
    alert("Department added successfully!")
  }

  const handleExport = () => {
    const csvContent = [
      ["Department", "Total Students", "Placed", "Resume Ready", "Resume Completion", "Placement Rate"],
      ...filteredData.map(dept => [
        dept.name,
        dept.totalStudents,
        dept.placed,
        dept.resumeReady,
        dept.resumeCompletion,
        dept.placementRate
      ])
    ]

    const csv = csvContent.map(row => row.join(",")).join("\n")
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(csv))
    element.setAttribute("download", "department-status.csv")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <PrincipalSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Department Status</h1>
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">{stat.label}</p>
                    <p className="text-white text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <span className="text-4xl">{stat.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Filters and Actions */}
          <div className="mb-8 flex flex-wrap gap-4 items-center">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2025-2026">2025-2026</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Departments">All Departments</SelectItem>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Mech">Mech</SelectItem>
                <SelectItem value="Elpo">Elpo</SelectItem>
                <SelectItem value="EXTC">EXTC</SelectItem>
                <SelectItem value="Civil">Civil</SelectItem>
              </SelectContent>
            </Select>

            <input
              type="text"
              placeholder="Search department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />

            <div className="ml-auto flex gap-2">
              <Button
                onClick={handleExport}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Department
              </Button>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
            <h2 className="text-white font-semibold mb-4">Department Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="dept" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Bar dataKey="completion" fill="#8B5CF6" name="Resume Completion %" />
                <Bar dataKey="placement" fill="#3B82F6" name="Placement Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Departments Table */}
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Department</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Total Students</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Placed</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Resume Ready</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Completion Rate</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Placement Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((dept) => (
                    <tr key={dept.name} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-white font-medium">{dept.name}</td>
                      <td className="px-6 py-4 text-white/80">{dept.totalStudents}</td>
                      <td className="px-6 py-4 text-white/80">{dept.placed}</td>
                      <td className="px-6 py-4 text-white/80">{dept.resumeReady}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200">
                          {dept.resumeCompletion}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-200">
                          {dept.placementRate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Department Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-lg p-6 w-96 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-bold">Add New Department</h2>
                  <button onClick={() => setShowAddModal(false)} className="text-white/60 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Department Name"
                    value={addFormData.name}
                    onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  />
                  <input
                    type="number"
                    placeholder="Total Students"
                    value={addFormData.totalStudents}
                    onChange={(e) => setAddFormData({ ...addFormData, totalStudents: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  />
                  <input
                    type="number"
                    placeholder="Placed"
                    value={addFormData.placed}
                    onChange={(e) => setAddFormData({ ...addFormData, placed: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  />
                  <input
                    type="number"
                    placeholder="Resume Ready"
                    value={addFormData.resumeReady}
                    onChange={(e) => setAddFormData({ ...addFormData, resumeReady: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="flex gap-2 mt-6">
                  <Button
                    onClick={handleAddDepartment}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add
                  </Button>
                  <Button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
