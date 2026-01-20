"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Bell, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import HODSidebar from "@/components/hod-sidebar"

export default function StudentResumeStatus() {
  const { data: session } = useSession()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedYear, setSelectedYear] = useState("All")
  const itemsPerPage = 10

  const atsScoreData = [
    { range: "80-90", count: 32 },
    { range: "70-80", count: 48 },
    { range: "60-70", count: 52 },
    { range: "50-60", count: 38 },
    { range: "<50", count: 15 },
  ]

  const students = [
    { rank: 1, name: "Ashish Patel", year: "Final Year", atsScore: 89, status: "Excellent" },
    { rank: 2, name: "Priya Singh", year: "Final Year", atsScore: 87, status: "Excellent" },
    { rank: 3, name: "Rahul Sharma", year: "Final Year", atsScore: 85, status: "Very Good" },
    { rank: 4, name: "Neha Kapoor", year: "Third Year", atsScore: 82, status: "Very Good" },
    { rank: 5, name: "Vikram Rao", year: "Final Year", atsScore: 80, status: "Good" },
    { rank: 6, name: "Tanya Mehta", year: "Final Year", atsScore: 78, status: "Good" },
    { rank: 7, name: "Arjun Gupta", year: "Third Year", atsScore: 76, status: "Good" },
    { rank: 8, name: "Sneha Das", year: "Final Year", atsScore: 74, status: "Average" },
    { rank: 9, name: "Karan Singh", year: "Second Year", atsScore: 72, status: "Average" },
    { rank: 10, name: "Meera Patel", year: "Final Year", atsScore: 70, status: "Average" },
  ]

  const paginatedStudents = students.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(students.length / itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-500/20 text-green-200"
      case "Very Good":
        return "bg-blue-500/20 text-blue-200"
      case "Good":
        return "bg-cyan-500/20 text-cyan-200"
      case "Average":
        return "bg-yellow-500/20 text-yellow-200"
      default:
        return "bg-white/10 text-white"
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      <HODSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="sticky top-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Student Resume Status</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-white cursor-pointer" />
            <Settings className="w-5 h-5 text-white cursor-pointer" />
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="text-right">
                <p className="text-white text-sm font-medium">{session?.user?.name || "HOD"}</p>
                <p className="text-white/60 text-xs">Head of Department</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-auto space-y-6">
          {/* ATS Score Chart */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-white font-semibold mb-6">ATS Score Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={atsScoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="range" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)" }} />
                <Bar dataKey="count" fill="#3B82F6" name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Years</SelectItem>
                <SelectItem value="Final Year">Final Year</SelectItem>
                <SelectItem value="Third Year">Third Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Student Rankings Table */}
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Student Name</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Year</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">ATS Score</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paginatedStudents.map((student) => (
                  <tr key={student.rank} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4 text-white">{student.rank}</td>
                    <td className="px-6 py-4 text-white">{student.name}</td>
                    <td className="px-6 py-4 text-white/70">{student.year}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                            style={{ width: `${student.atsScore}%` }}
                          />
                        </div>
                        <span className="text-white font-medium">{student.atsScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-white/60 text-sm">Page {currentPage} of {totalPages}</p>
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
