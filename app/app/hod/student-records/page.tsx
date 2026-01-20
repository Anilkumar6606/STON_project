"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { User, Search, Settings, Bell, Download, ChevronLeft, ChevronRight } from "lucide-react"

export default function StudentRecords() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [currentPage, setCurrentPage] = useState(1)

  // Full Student Records Data
  const studentsData = [
    { id: 1, rank: 1, name: "Ashish Patel", dept: "CSE", rollNo: "CS001", resumeStatus: "Completed", atsScore: 82, avgPercentage: 84, placement: "Placed" },
    { id: 2, rank: 2, name: "Tanya Mehta", dept: "IT", rollNo: "CS001", resumeStatus: "Completed", atsScore: 79, avgPercentage: 75, placement: "Placed" },
    { id: 3, rank: 3, name: "Ravi Kumar", dept: "Mech", rollNo: "Mech", resumeStatus: "Completed", atsScore: 74, avgPercentage: 75, placement: "Placed" },
    { id: 4, rank: 4, name: "Nisha Sharma", dept: "AI", rollNo: "L&T", resumeStatus: "Pending", atsScore: 65, avgPercentage: 84, placement: "Placed" },
    { id: 5, rank: 5, name: "Manish Arora", dept: "CSE", rollNo: "CS001", resumeStatus: "Pending", atsScore: 60, avgPercentage: 85, placement: "Placed" },
    { id: 6, rank: 6, name: "Anjali Verma", dept: "IT", rollNo: "IT", resumeStatus: "Completed", atsScore: 78, avgPercentage: 89, placement: "Unplaced" },
    { id: 7, rank: 7, name: "Aditya Joshi", dept: "Mech", rollNo: "Mech", resumeStatus: "Completed", atsScore: 75, avgPercentage: 85, placement: "Unplaced" },
    { id: 8, rank: 8, name: "Pooja Rana", dept: "IT", rollNo: "IT", resumeStatus: "Pending", atsScore: 62, avgPercentage: 74, placement: "Placed" },
    { id: 9, rank: 9, name: "Abhishek Singh", dept: "Civil", rollNo: "Civil", resumeStatus: "Completed", atsScore: 76, avgPercentage: 84, placement: "Unplaced" },
    { id: 10, rank: 10, name: "Kritika Rao", dept: "AI", rollNo: "AI", resumeStatus: "Pending", atsScore: 58, avgPercentage: 89, placement: "Unplaced" },
  ]

  const itemsPerPage = 10
  const totalPages = Math.ceil(studentsData.length / itemsPerPage)
  const paginatedData = studentsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-sm border-r border-white/10 flex flex-col fixed h-screen">
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

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/hod/dashboard" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm">Dashboard</Link>
          <Link href="/hod/department-status" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm">Department Status</Link>
          <Link href="/hod/student-resume-status" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm">Student Resume Status</Link>
          <Link href="/hod/student-records" className="block px-4 py-3 text-white bg-white/20 rounded-lg transition text-sm font-medium">Student Records</Link>
          <Link href="/hod/download" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm">Download</Link>
          <Link href="/hod/profile" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm">Profile</Link>
        </nav>

        <div className="p-4 border-t border-white/10 bg-blue-900/40">
          <button onClick={() => router.push("/login")} className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
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
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">XYZ</div>
              <span className="text-white text-sm font-medium">Dr. Rajesh</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-500/30 p-3 rounded-lg">
                    <User className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <div className="text-white/70 text-sm mb-1">Total Students</div>
                    <div className="text-white text-3xl font-bold">420</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-500/30 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m2-1l-2-1m2 1v2.5" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white/70 text-sm mb-1">Placed Students</div>
                    <div className="text-white text-3xl font-bold">270</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-700/20 backdrop-blur-sm border border-orange-400/30 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500/30 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3m0 0c4.418 0 8-1.79 8-4m0 0c0 2.21-3.582 4-8 4m0-12c-4.418 0-8 1.79-8 4m0 0c0-2.21 3.582-4 8-4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white/70 text-sm mb-1">Unplaced Students</div>
                    <div className="text-white text-3xl font-bold">150</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/30 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white/70 text-sm mb-1">Avg Percentage</div>
                    <div className="text-white text-3xl font-bold">76%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Actions Bar */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="bg-blue-600/80 text-white px-4 py-2 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer"
                    >
                      <option>All Departments</option>
                      <option>CSE</option>
                      <option>IT</option>
                      <option>Mech</option>
                      <option>EEE</option>
                      <option>Civil</option>
                    </select>
                    <svg className="w-4 h-4 text-white absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  <div className="relative">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="bg-blue-600/80 text-white px-4 py-2 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer"
                    >
                      <option>All Years</option>
                      <option>First Year</option>
                      <option>Second Year</option>
                      <option>Third Year</option>
                      <option>Final Year</option>
                    </select>
                    <svg className="w-4 h-4 text-white absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="bg-green-600/80 text-white px-4 py-2 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none cursor-pointer"
                    >
                      <option>All Statuses</option>
                      <option>Placed</option>
                      <option>Unplaced</option>
                    </select>
                    <svg className="w-4 h-4 text-white absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/15 w-64"
                    />
                  </div>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Student Records Table */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-lg font-semibold">Student Records</h2>
                <div className="flex items-center gap-2">
                  <button className="text-blue-400 text-sm hover:underline">Actions</button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium">
                    <Download className="w-3 h-3" />
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Profile</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Name</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Department</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Roll Number</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Resume Status</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">ATS Score</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Avg Percentage</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Placement</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((student) => (
                      <tr key={student.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="px-4 py-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">#{student.rank}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-white font-medium">{student.name}</td>
                        <td className="px-4 py-4 text-white">{student.dept}</td>
                        <td className="px-4 py-4 text-white">{student.rollNo}</td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.resumeStatus === "Completed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-orange-500/20 text-orange-400"
                          }`}>
                            {student.resumeStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-white">{student.atsScore}</td>
                        <td className="px-4 py-4 text-white">{student.avgPercentage}%</td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.placement === "Placed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-purple-500/20 text-purple-400"
                          }`}>
                            {student.placement}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
                            <Download className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <div className="text-white/70 text-sm">
                  Showing 1 to {itemsPerPage} out of {studentsData.length}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-white/10 text-white/70 hover:bg-white/20"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
