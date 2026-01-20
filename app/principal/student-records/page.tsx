"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Search, Settings, Bell, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import PrincipalSidebar from "@/components/principal-sidebar"

export default function StudentRecords() {
  const router = useRouter()
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [currentPage, setCurrentPage] = useState(1)

  const studentData = [
    { id: 1, name: "Ashish Patel", department: "CSE", year: "Final Year", status: "Resume Ready", email: "ashish.patel@student.edu" },
    { id: 2, name: "Tanya Mehta", department: "IT", year: "Final Year", status: "Resume Ready", email: "tanya.mehta@student.edu" },
    { id: 3, name: "Ravi Kumar", department: "Mech", year: "Final Year", status: "Resume Ready", email: "ravi.kumar@student.edu" },
    { id: 4, name: "Nisha Sharma", department: "AI", year: "Final Year", status: "Pending", email: "nisha.sharma@student.edu" },
    { id: 5, name: "Rahul Verma", department: "CSE", year: "Third Year", status: "Resume Ready", email: "rahul.verma@student.edu" },
    { id: 6, name: "Priya Singh", department: "IT", year: "Third Year", status: "Resume Ready", email: "priya.singh@student.edu" },
    { id: 7, name: "Arjun Gupta", department: "EEE", year: "Final Year", status: "Pending", email: "arjun.gupta@student.edu" },
    { id: 8, name: "Sneha Das", department: "Civil", year: "Third Year", status: "Resume Ready", email: "sneha.das@student.edu" },
    { id: 9, name: "Vikram Rao", department: "Mech", year: "Final Year", status: "Resume Ready", email: "vikram.rao@student.edu" },
    { id: 10, name: "Neha Kapoor", department: "CSE", year: "Final Year", status: "Pending", email: "neha.kapoor@student.edu" },
    { id: 11, name: "Karan Singh", department: "IT", year: "Second Year", status: "Resume Ready", email: "karan.singh@student.edu" },
    { id: 12, name: "Meera Patel", department: "Civil", year: "Final Year", status: "Resume Ready", email: "meera.patel@student.edu" },
  ]

  const filteredData = studentData.filter(student => {
    const matchesDepartment = selectedDepartment === "All Departments" || student.department === selectedDepartment
    const matchesYear = selectedYear === "All Years" || student.year === selectedYear
    const matchesStatus = selectedStatus === "All Statuses" || student.status === selectedStatus
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesDepartment && matchesYear && matchesStatus && matchesSearch
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusColor = (status: string) => {
    return status === "Resume Ready" ? "bg-green-500/20 text-green-200" : "bg-yellow-500/20 text-yellow-200"
  }

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <PrincipalSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Student Records</h1>
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
                <SelectItem value="EEE">EEE</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Years">All Years</SelectItem>
                <SelectItem value="Final Year">Final Year</SelectItem>
                <SelectItem value="Third Year">Third Year</SelectItem>
                <SelectItem value="Second Year">Second Year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Statuses">All Statuses</SelectItem>
                <SelectItem value="Resume Ready">Resume Ready</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Student Table */}
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Department</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Year</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((student) => (
                    <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-white text-sm">{student.name}</td>
                      <td className="px-6 py-4 text-white/80 text-sm">{student.department}</td>
                      <td className="px-6 py-4 text-white/80 text-sm">{student.year}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/70 text-sm">{student.email}</td>
                      <td className="px-6 py-4">
                        <button className="p-1 hover:bg-white/10 rounded transition">
                          <Eye className="w-4 h-4 text-white/60" />
                        </button>
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
