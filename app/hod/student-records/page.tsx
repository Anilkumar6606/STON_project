"use client"

import { useState } from "react"
import { useRef } from "react"
import { useSession } from "next-auth/react"
import HODSidebar from "@/components/hod-sidebar"
import { Bell, Settings, Search, Download, ChevronLeft, ChevronRight } from "lucide-react"

export default function HODStudentRecords() {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [currentPage, setCurrentPage] = useState(1)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Student Records Data
  const initialStudentsData = [
    { id: 1, rank: 1, name: "Ashish Patel", dept: "CSE", rollNo: "CS001", resumeStatus: "Completed", atsScore: 82, avgPercentage: 84, placement: "Placed" },
    { id: 2, rank: 2, name: "Tanya Mehta", dept: "IT", rollNo: "IT002", resumeStatus: "Completed", atsScore: 79, avgPercentage: 75, placement: "Placed" },
    { id: 3, rank: 3, name: "Ravi Kumar", dept: "Mech", rollNo: "ME003", resumeStatus: "Completed", atsScore: 74, avgPercentage: 75, placement: "Placed" },
    { id: 4, rank: 4, name: "Nisha Sharma", dept: "AI", rollNo: "AI004", resumeStatus: "Pending", atsScore: 65, avgPercentage: 84, placement: "Placed" },
    { id: 5, rank: 5, name: "Manish Arora", dept: "CSE", rollNo: "CS005", resumeStatus: "Pending", atsScore: 60, avgPercentage: 85, placement: "Placed" },
    { id: 6, rank: 6, name: "Anjali Verma", dept: "IT", rollNo: "IT006", resumeStatus: "Completed", atsScore: 78, avgPercentage: 89, placement: "Unplaced" },
    { id: 7, rank: 7, name: "Aditya Joshi", dept: "Mech", rollNo: "ME007", resumeStatus: "Completed", atsScore: 75, avgPercentage: 85, placement: "Unplaced" },
    { id: 8, rank: 8, name: "Pooja Rana", dept: "IT", rollNo: "IT008", resumeStatus: "Pending", atsScore: 62, avgPercentage: 74, placement: "Placed" },
    { id: 9, rank: 9, name: "Abhishek Singh", dept: "Civil", rollNo: "CE009", resumeStatus: "Completed", atsScore: 76, avgPercentage: 84, placement: "Unplaced" },
    { id: 10, rank: 10, name: "Kritika Rao", dept: "AI", rollNo: "AI010", resumeStatus: "Pending", atsScore: 58, avgPercentage: 89, placement: "Unplaced" },
  ]

  const [records, setRecords] = useState(initialStudentsData)

  const filteredRecords = records.filter((s) => {
    const term = searchTerm.trim().toLowerCase()
    const matchesSearch = term
      ? [s.name, s.dept, s.rollNo].some((v) => String(v).toLowerCase().includes(term))
      : true
    const matchesDept = selectedDepartment === "All Departments" || s.dept === selectedDepartment
    const matchesStatus = selectedStatus === "All Statuses" || s.resumeStatus === selectedStatus
    // Year filter placeholder (no year in mock data)
    const matchesYear = true
    return matchesSearch && matchesDept && matchesStatus && matchesYear
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const paginatedData = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  function exportCSV() {
    const headers = [
      "rank",
      "name",
      "dept",
      "rollNo",
      "resumeStatus",
      "atsScore",
      "avgPercentage",
      "placement",
    ]
    const rows = filteredRecords.map((s) => [
      s.rank,
      s.name,
      s.dept,
      s.rollNo,
      s.resumeStatus,
      s.atsScore,
      s.avgPercentage,
      s.placement,
    ])

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "student-records.csv"
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  async function importCSV(file: File) {
    const text = await file.text()
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
    if (lines.length < 2) return
    const header = lines[0].split(",").map((h) => h.trim().toLowerCase())
    const required = [
      "rank",
      "name",
      "dept",
      "rollno",
      "resumestatus",
      "atsscore",
      "avgpercentage",
      "placement",
    ]
    const hasAll = required.every((r) => header.includes(r))
    if (!hasAll) {
      alert("Invalid CSV format. Expected headers: " + required.join(", "))
      return
    }

    const idx = (key: string) => header.indexOf(key)
    const parsed = lines.slice(1).map((line, i) => {
      const cols = line.split(",")
      return {
        id: records.length + i + 1,
        rank: Number(cols[idx("rank")] || i + 1),
        name: cols[idx("name")] || "Unknown",
        dept: cols[idx("dept")] || "CSE",
        rollNo: cols[idx("rollno")] || `ROLL${i + 1}`,
        resumeStatus: cols[idx("resumestatus")] || "Pending",
        atsScore: Number(cols[idx("atsscore")] || 0),
        avgPercentage: Number(cols[idx("avgpercentage")] || 0),
        placement: cols[idx("placement")] || "Unplaced",
      }
    })

    setRecords((prev) => [...prev, ...parsed])
    setCurrentPage(1)
    alert(`Imported ${parsed.length} records successfully.`)
  }

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <HODSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Student Records</h1>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Settings className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                {session?.user?.name?.charAt(0) || "H"}
              </div>
              <span className="text-white text-sm font-medium">{session?.user?.name || "Dr. Rajesh"}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6">
              <div className="text-sm font-medium text-white/70 mb-2">Total Students</div>
              <div className="text-3xl font-bold text-white">640</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
              <div className="text-sm font-medium text-white/70 mb-2">Resume Completed</div>
              <div className="text-3xl font-bold text-white">456</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
              <div className="text-sm font-medium text-white/70 mb-2">Avg ATS Score</div>
              <div className="text-3xl font-bold text-white">72%</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-700/20 backdrop-blur-sm border border-orange-400/30 rounded-xl p-6">
              <div className="text-sm font-medium text-white/70 mb-2">Placement Rate</div>
              <div className="text-3xl font-bold text-white">68%</div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[250px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) importCSV(file)
                  // reset to allow re-upload the same file
                  if (fileInputRef.current) fileInputRef.current.value = ""
                }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                Import CSV
              </button>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Rank</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Name</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Department</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Roll No</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Resume Status</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">ATS Score</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Avg %</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-white/70">Placement</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((student) => (
                    <tr key={student.id} className="border-t border-white/5 hover:bg-white/5 transition">
                      <td className="py-4 px-6 text-white font-medium">{student.rank}</td>
                      <td className="py-4 px-6 text-white">{student.name}</td>
                      <td className="py-4 px-6 text-white/70">{student.dept}</td>
                      <td className="py-4 px-6 text-white/70">{student.rollNo}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          student.resumeStatus === "Completed" 
                            ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                            : "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                        }`}>
                          {student.resumeStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-bold ${
                          student.atsScore >= 70 ? "text-green-400" : student.atsScore >= 50 ? "text-yellow-400" : "text-red-400"
                        }`}>
                          {student.atsScore}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white">{student.avgPercentage}%</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          student.placement === "Placed" 
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                            : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                        }`}>
                          {student.placement}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-t border-white/10">
              <div className="text-sm text-white/70">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} students
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
