"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { User, Search, Settings, Bell, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function StudentResumeStatus() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [currentPage, setCurrentPage] = useState(1)

  // Department-wise Average ATS Score Data
  const departmentAtsData = [
    { department: "CSE", avgScore: 92 },
    { department: "IT", avgScore: 79 },
    { department: "Mech", avgScore: 74 },
    { department: "EEE", avgScore: 70 },
    { department: "Civil", avgScore: 85 },
  ]

  // Top Students with Profile and Resume Data
  const topStudents = [
    { rank: 1, name: "Ashish Patel", status: "Completed", score: 82 },
    { rank: 2, name: "Tanya Mehta", status: "Completed", score: 79 },
    { rank: 3, name: "Ravi Kumar", status: "Completed", score: 74 },
    { rank: 4, name: "Nisha Sharma", status: "Pending", score: 65 },
  ]

  // Full Student Resume Status Data
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

  const itemsPerPage = 10
  const totalPages = Math.ceil(resumeData.length / itemsPerPage)
  const paginatedData = resumeData.slice(
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
          <Link href="/hod/student-resume-status" className="block px-4 py-3 text-white bg-white/20 rounded-lg transition text-sm font-medium">Student Resume Status</Link>
          <Link href="/hod/student-records" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm">Student Records</Link>
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
          <h1 className="text-2xl font-bold text-white">Student Resume Status</h1>
          
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white/70 text-sm mb-1">Resume Completed</div>
                    <div className="text-white text-3xl font-bold">300</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-700/20 backdrop-blur-sm border border-orange-400/30 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500/30 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white/70 text-sm mb-1">Resume Pending</div>
                    <div className="text-white text-3xl font-bold">120</div>
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
                    <div className="text-white/70 text-sm mb-1">Avg ATS Score</div>
                    <div className="text-white text-3xl font-bold">72%</div>
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
                      <option>Completed</option>
                      <option>Pending</option>
                      <option>In Progress</option>
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

            {/* Charts and Top Students Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Department-wise Average ATS Score Chart */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white text-lg font-semibold">Department-wise Average ATS Score</h2>
                  <button className="text-blue-400 text-sm hover:underline">Actions</button>
                </div>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentAtsData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="department" tick={{ fill: "#ffffff", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#ffffff", fontSize: 12 }} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: "8px"
                        }}
                        labelStyle={{ color: "#ffffff" }}
                      />
                      <Bar dataKey="avgScore" name="Avg ATS Score" radius={[8, 8, 0, 0]} fill="#06D9FF" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Students Card */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white text-lg font-semibold">Top Performers</h2>
                  <button className="text-blue-400 text-sm hover:underline">Actions</button>
                </div>
                <div className="space-y-4">
                  {topStudents.map((student) => (
                    <div
                      key={student.rank}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">#{student.rank}</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{student.name}</div>
                          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                            student.status === "Completed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-orange-500/20 text-orange-400"
                          }`}>
                            {student.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-white/70 text-xs">ATS Score</div>
                          <div className="text-white font-bold text-lg">{student.score}</div>
                        </div>
                        <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Resume Status Table */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white text-lg font-semibold mb-6">Student Resume Status</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Profile</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Student Name</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Department</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Resume Status</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">ATS Score</th>
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
                        <td className="px-4 py-4 text-white">{student.department}</td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.status === "Completed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-orange-500/20 text-orange-400"
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-white">{student.score}</td>
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
                  Showing 1 to {itemsPerPage} out of {resumeData.length}
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
