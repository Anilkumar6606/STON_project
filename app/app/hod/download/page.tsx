"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { User, Settings, Bell, Download, FileText, ChevronLeft, ChevronRight } from "lucide-react"

export default function DownloadPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)

  // Download Files
  const downloadFiles = [
    { id: 1, name: "Student Records List", format: "CSV", date: "Downloaded 16 Apr 2026", icon: FileText },
    { id: 2, name: "Student Records List as Excel", format: "Excel", date: "Downloaded 15 Apr 2025", icon: FileText },
    { id: 3, name: "Department-wise Resume Reports", format: "PDF", date: "Downloaded 20 Mar 2026", icon: FileText },
    { id: 4, name: "AI-Ready Candidates List", format: "PDF", date: "Downloaded 03 Feb 2026", icon: FileText },
    { id: 5, name: "IT Placed Students", format: "PDF", date: "Downloaded 23 Jan 2026", icon: FileText },
    { id: 6, name: "Mech Resume Ready List", format: "Excel", date: "Downloaded 16 Dec 2025", icon: FileText },
    { id: 7, name: "Shaniome Records List", format: "CSV", date: "Downloaded 15 Feb 2026", icon: FileText },
    { id: 8, name: "L&T Placements Detailed Report", format: "PDF", date: "Downloaded 06 Oct 2026", icon: FileText },
    { id: 9, name: "Civil Engineering Candidates", format: "CSV", date: "Downloaded 16 Aug 2025", icon: FileText },
  ]

  // Student Records Table
  const studentRecords = [
    { id: 1, rank: 1, name: "Ashish Patel", department: "CSE", rollNo: "CS001", resumeStatus: "Completed", atsScore: 82, placement: "Placed" },
    { id: 2, rank: 2, name: "Tanya Mehta", department: "IT", rollNo: "C3002", resumeStatus: "Completed", atsScore: 79, placement: "Placed" },
    { id: 3, rank: 3, name: "Ravi Kumar", department: "Mech", rollNo: "C3002", resumeStatus: "Pending", atsScore: 74, placement: "Placed" },
    { id: 4, rank: 4, name: "Nisha Sharma", department: "AI", rollNo: "C3001", resumeStatus: "Pending", atsScore: 65, placement: "Placed" },
  ]

  const itemsPerPage = 10
  const totalPages = Math.ceil(studentRecords.length / itemsPerPage)
  const paginatedData = studentRecords.slice(
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
          <Link href="/hod/student-records" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm">Student Records</Link>
          <Link href="/hod/download" className="block px-4 py-3 text-white bg-white/20 rounded-lg transition text-sm font-medium">Download</Link>
          <Link href="/hod/profile" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm">Profile</Link>
        </nav>

        <div className="p-4 border-t border-white/10 bg-blue-900/40">
          <button onClick={() => router.push("/login")} className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Download</h1>
          
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
          <div className="p-8 space-y-8">
            {/* Download Section */}
            <section>
              <h2 className="text-white text-2xl font-bold mb-6">Download</h2>
              
              {/* Download Cards Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {downloadFiles.map((file) => (
                  <div
                    key={file.id}
                    className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6 hover:border-blue-400/50 transition"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-blue-500/30 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-sm mb-1">{file.name}</h3>
                        <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-medium mb-2">
                          {file.format}
                        </span>
                        <p className="text-white/70 text-xs">{file.date}</p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Student Records Table Section */}
            <section className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-lg font-semibold">Student Records</h2>
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
                        <td className="px-4 py-4 text-white">{student.department}</td>
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
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.placement === "Placed"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-red-500/20 text-red-400"
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
                  Showing 1 to {itemsPerPage} out of {studentRecords.length}
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
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
