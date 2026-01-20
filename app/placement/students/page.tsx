"use client"

import { useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import PlacementSidebar from "@/components/placement-sidebar"
import { Bell, Settings, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StudentRecord {
  id: string
  rank: string
  name: string
  department: string
  rollNo: string
  companiesApplied: number
  interviews: number
  offers: number
  currentStatus: "Placed" | "Offer Pending" | "Interviewing" | "Applied" | "Unplaced"
  highestPackage: string
  placedAt?: string
}

const STUDENTS_DATA: StudentRecord[] = [
  {
    id: "1",
    rank: "1",
    name: "Ravi Kumar",
    department: "CSE",
    rollNo: "CSE001",
    companiesApplied: 8,
    interviews: 5,
    offers: 2,
    currentStatus: "Placed",
    highestPackage: "₹18 LPA",
    placedAt: "Google"
  },
  {
    id: "2",
    rank: "2",
    name: "Priya Singh",
    department: "IT",
    rollNo: "IT001",
    companiesApplied: 10,
    interviews: 6,
    offers: 3,
    currentStatus: "Placed",
    highestPackage: "₹16 LPA",
    placedAt: "Microsoft"
  },
  {
    id: "3",
    rank: "3",
    name: "Atul Mishra",
    department: "CSE",
    rollNo: "CSE002",
    companiesApplied: 7,
    interviews: 4,
    offers: 1,
    currentStatus: "Placed",
    highestPackage: "₹14 LPA",
    placedAt: "Amazon"
  },
  {
    id: "4",
    rank: "4",
    name: "Ananya Patel",
    department: "ECE",
    rollNo: "ECE001",
    companiesApplied: 6,
    interviews: 3,
    offers: 1,
    currentStatus: "Placed",
    highestPackage: "₹12 LPA",
    placedAt: "Infosys"
  },
  {
    id: "5",
    rank: "5",
    name: "Vikas Sharma",
    department: "Mech",
    rollNo: "MECH001",
    companiesApplied: 5,
    interviews: 2,
    offers: 0,
    currentStatus: "Offer Pending",
    highestPackage: "—"
  },
  {
    id: "6",
    rank: "6",
    name: "Deepika Verma",
    department: "CSE",
    rollNo: "CSE003",
    companiesApplied: 9,
    interviews: 7,
    offers: 2,
    currentStatus: "Placed",
    highestPackage: "₹17 LPA",
    placedAt: "TCS"
  },
  {
    id: "7",
    rank: "7",
    name: "Manish Gupta",
    department: "IT",
    rollNo: "IT002",
    companiesApplied: 4,
    interviews: 2,
    offers: 0,
    currentStatus: "Interviewing",
    highestPackage: "—"
  },
  {
    id: "8",
    rank: "8",
    name: "Sneha Reddy",
    department: "Civil",
    rollNo: "CIVIL001",
    companiesApplied: 3,
    interviews: 1,
    offers: 0,
    currentStatus: "Applied",
    highestPackage: "—"
  },
  {
    id: "9",
    rank: "9",
    name: "Rajesh Kumar",
    department: "ECE",
    rollNo: "ECE002",
    companiesApplied: 8,
    interviews: 4,
    offers: 1,
    currentStatus: "Placed",
    highestPackage: "₹13 LPA",
    placedAt: "Accenture"
  },
  {
    id: "10",
    rank: "10",
    name: "Pooja Tiwari",
    department: "CSE",
    rollNo: "CSE004",
    companiesApplied: 2,
    interviews: 0,
    offers: 0,
    currentStatus: "Unplaced",
    highestPackage: "—"
  },
  {
    id: "11",
    rank: "11",
    name: "Sanjay Malhotra",
    department: "IT",
    rollNo: "IT003",
    companiesApplied: 6,
    interviews: 3,
    offers: 2,
    currentStatus: "Placed",
    highestPackage: "₹15 LPA",
    placedAt: "Capgemini"
  },
  {
    id: "12",
    rank: "12",
    name: "Kavya Nair",
    department: "Mech",
    rollNo: "MECH002",
    companiesApplied: 5,
    interviews: 3,
    offers: 1,
    currentStatus: "Placed",
    highestPackage: "₹10 LPA",
    placedAt: "L&T"
  }
]

const STATUS_COLORS = {
  Placed: "bg-green-500/20 text-green-300 border-green-500/30",
  "Offer Pending": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Interviewing: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Applied: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Unplaced: "bg-red-500/20 text-red-300 border-red-500/30"
}

export default function PlacementStudents() {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  const departments = ["All", "CSE", "IT", "ECE", "Mech", "Civil"]
  const statuses = ["All", "Placed", "Offer Pending", "Interviewing", "Applied", "Unplaced"]
  const itemsPerPage = 8

  const filteredStudents = useMemo(() => {
    return STUDENTS_DATA.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDept = departmentFilter === "All" || student.department === departmentFilter
      const matchesStatus = statusFilter === "All" || student.currentStatus === statusFilter
      return matchesSearch && matchesDept && matchesStatus
    })
  }, [searchTerm, departmentFilter, statusFilter])

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedStudents = filteredStudents.slice(startIdx, startIdx + itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-[#050616] via-[#0f1a3f] to-[#1a2e66] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/40 backdrop-blur z-50 sticky top-0">
        <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <img src="/image/STON.png" alt="STON Logo" className="w-8 h-8 object-contain" />
          STON
        </div>
        <h1 className="text-3xl font-bold">Student Placement Records</h1>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white/10 rounded-lg transition">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition">
            <Settings className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold">
              {session?.user?.name?.charAt(0) || "P"}
            </div>
            <span className="text-sm font-medium">{session?.user?.name || "Placement Officer"}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <PlacementSidebar />

        <main className="flex-1 ml-56 overflow-y-auto p-8">
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="text-sm font-medium text-white/60 mb-2">Total Students</div>
                <div className="text-3xl font-bold text-white">{STUDENTS_DATA.length}</div>
              </div>
              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="text-sm font-medium text-white/60 mb-2">Placed</div>
                <div className="text-3xl font-bold text-green-400">
                  {STUDENTS_DATA.filter((s) => s.currentStatus === "Placed").length}
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="text-sm font-medium text-white/60 mb-2">Pending</div>
                <div className="text-3xl font-bold text-yellow-400">
                  {STUDENTS_DATA.filter((s) => s.currentStatus === "Offer Pending").length}
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="text-sm font-medium text-white/60 mb-2">Placement Rate</div>
                <div className="text-3xl font-bold text-blue-400">
                  {Math.round((STUDENTS_DATA.filter((s) => s.currentStatus === "Placed").length / STUDENTS_DATA.length) * 100)}%
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="w-5 h-5 text-white/60" />
                <h3 className="text-lg font-semibold text-white">Filters</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search by name or roll no..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                  />
                </div>

                {/* Department Filter */}
                <div>
                  <select
                    value={departmentFilter}
                    onChange={(e) => {
                      setDepartmentFilter(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept} className="bg-gray-900">
                        {dept === "All" ? "All Departments" : `${dept} Department`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status} className="bg-gray-900">
                        {status === "All" ? "All Statuses" : status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-sm text-white/60 pt-2">
                Showing {paginatedStudents.length} of {filteredStudents.length} results
              </div>
            </div>

            {/* Table */}
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/60">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">#</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Department</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Roll No</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-white/70">Applied</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-white/70">Interviews</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-white/70">Offers</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">Package / Company</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStudents.map((student, idx) => (
                      <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-sm text-white/70">{startIdx + idx + 1}</td>
                        <td className="px-6 py-4 text-sm font-medium text-white">{student.name}</td>
                        <td className="px-6 py-4 text-sm text-white/70">{student.department}</td>
                        <td className="px-6 py-4 text-sm text-white/70">{student.rollNo}</td>
                        <td className="px-6 py-4 text-sm text-center text-white/70 font-medium">{student.companiesApplied}</td>
                        <td className="px-6 py-4 text-sm text-center text-white/70 font-medium">{student.interviews}</td>
                        <td className="px-6 py-4 text-sm text-center text-white/70 font-medium">{student.offers}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${STATUS_COLORS[student.currentStatus]}`}>
                            {student.currentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/70">
                          {student.currentStatus === "Placed" ? `${student.highestPackage} @ ${student.placedAt}` : student.highestPackage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-black/60">
                <div className="text-sm text-white/60">
                  Page {currentPage} of {totalPages || 1}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 hover:bg-white/20 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 hover:bg-white/20 disabled:opacity-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
