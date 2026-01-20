"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import HODSidebar from "@/components/hod-sidebar"
import { Bell, Settings } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function HODDashboard() {
  const router = useRouter()
  const { data: session } = useSession()

  const stats = [
    { label: "Total Students", value: "640" },
    { label: "Resume Completed", value: "71%" },
    { label: "Resume Pending", value: "122" },
  ]

  // Resume Status Yearwise Data
  const resumeStatusData = [
    { year: "First Year", completed: 78, pending: 22 },
    { year: "Second Year", completed: 75, pending: 25 },
    { year: "Third Year", completed: 68, pending: 32 },
    { year: "Final Year", completed: 65, pending: 35 },
  ]

  // ATS Score Trend by Batch
  const atsScoreTrend = [
    { batch: "FY", score: 2 },
    { batch: "SY", score: 15 },
    { batch: "TY", score: 10 },
    { batch: "FY", score: 34 },
  ]

  // Department Summary - Student Data
  const departmentSummary = [
    { id: 1, name: "Rahul Sharma", resume: "Completed", atsScore: 82 },
    { id: 2, name: "Ujwal Sharma", resume: "Pending", atsScore: 35 },
    { id: 3, name: "Priya Singh", resume: "Completed", atsScore: 78 },
    { id: 4, name: "Arjun Patel", resume: "In Progress", atsScore: 45 },
    { id: 5, name: "Neha Kumar", resume: "Completed", atsScore: 88 },
  ]

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <HODSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">HOD Dashboard</h1>
          
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
              <span className="text-white text-sm font-medium">{session?.user?.name || "HOD"}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6"
              >
                <div className="text-sm font-medium text-white/70 mb-2">{stat.label}</div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resume Status Chart */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-6">Resume Status Yearwise</h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={resumeStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="year" stroke="#ffffff80" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#ffffff80" />
                  <Tooltip 
                    contentStyle={{ background: '#1a1a3e', border: '1px solid #ffffff20', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="completed" fill="#10b981" name="Completed %" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="pending" fill="#ef4444" name="Pending %" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* ATS Score Trend */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-6">ATS Score Trend by Batch</h2>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={atsScoreTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="batch" stroke="#ffffff80" />
                  <YAxis stroke="#ffffff80" />
                  <Tooltip 
                    contentStyle={{ background: '#1a1a3e', border: '1px solid #ffffff20', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Summary Table */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">Department Summary</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm font-medium text-white/70">Student Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-white/70">Resume Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-white/70">ATS Score</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentSummary.map((student) => (
                    <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="py-3 px-4 text-white">{student.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          student.resume === "Completed" 
                            ? "bg-green-500/20 text-green-300" 
                            : student.resume === "Pending"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}>
                          {student.resume}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-bold ${
                          student.atsScore >= 70 ? "text-green-400" : student.atsScore >= 50 ? "text-yellow-400" : "text-red-400"
                        }`}>
                          {student.atsScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
