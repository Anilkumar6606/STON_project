"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { User, Search, Settings, Bell, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PrincipalSidebar from "@/components/principal-sidebar"

export default function StudentResumeStatus() {
  const router = useRouter()
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [currentPage, setCurrentPage] = useState(1)

  const departmentAtsData = [
    { department: "CSE", avgScore: 92 },
    { department: "IT", avgScore: 79 },
    { department: "Mech", avgScore: 74 },
    { department: "EEE", avgScore: 70 },
    { department: "Civil", avgScore: 85 },
  ]

  const resumeData = [
    { id: 1, rank: 1, name: "Ashish Patel", department: "CSE", status: "Completed", score: 82 },
    { id: 2, rank: 2, name: "Tanya Mehta", department: "IT", status: "Completed", score: 79 },
    { id: 3, rank: 3, name: "Ravi Kumar", department: "Mech", status: "Completed", score: 74 },
    { id: 4, rank: 4, name: "Nisha Sharma", department: "AI", status: "Pending", score: 65 },
    { id: 5, rank: 5, name: "Rahul Verma", department: "CSE", status: "Completed", score: 88 },
    { id: 6, rank: 6, name: "Priya Singh", department: "IT", status: "Completed", score: 81 },
    { id: 7, rank: 7, name: "Arjun Gupta", department: "EEE", status: "Pending", score: 58 },
    { id: 8, rank: 8, name: "Sneha Das", department: "Civil", status: "Completed", score: 76 },
    { id: 9, rank: 9, name: "Vikram Rao", department: "Mech", status: "Completed", score: 72 },
    { id: 10, rank: 10, name: "Neha Kapoor", department: "CSE", status: "Pending", score: 63 },
  ]

  const filteredData = resumeData.filter(student => {
    const matchesDept = selectedDepartment === "All Departments" || student.department === selectedDepartment
    const matchesStatus = selectedStatus === "All Statuses" || student.status === selectedStatus
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesDept && matchesStatus && matchesSearch
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusColor = (status: string) => {
    return status === "Completed" ? "bg-green-500/20 text-green-200" : "bg-yellow-500/20 text-yellow-200"
  }

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <PrincipalSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Student Resume Status</h1>
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
          {/* ATS Score Chart */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
            <h2 className="text-white font-semibold mb-4">Average ATS Scores by Department</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentAtsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="department" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="avgScore" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Filters */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>

            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Departments">All Departments</SelectItem>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Mech">Mech</SelectItem>
                <SelectItem value="Civil">Civil</SelectItem>
                <SelectItem value="AI">AI</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Statuses">All Statuses</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 w-full justify-center">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>

          {/* Students Table */}
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Rank</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Department</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">ATS Score</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((student) => (
                    <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-white font-medium">#{student.rank}</td>
                      <td className="px-6 py-4 text-white">{student.name}</td>
                      <td className="px-6 py-4 text-white/80">{student.department}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200">
                          {student.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {paginatedData.length === 0 && (
              <div className="p-8 text-center text-white/60">
                No students found
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-white/60 text-sm">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
