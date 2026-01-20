"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { User, Bell, Settings } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function HODDashboard() {
  const router = useRouter()

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
    { batch: "FIY", score: 34 },
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
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-sm border-r border-white/10 flex flex-col fixed h-screen">
        {/* Logo */}
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

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link
            href="/hod/dashboard"
            className="block px-4 py-3 text-white bg-white/20 rounded-lg transition text-sm font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/hod/department-status"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Department Status
          </Link>
          <Link
            href="/hod/student-resume-status"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Student Resume Status
          </Link>
          <Link
            href="/hod/student-records"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Student Records
          </Link>
          <Link
            href="/hod/download"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Download
          </Link>
          <Link
            href="/hod/profile"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Profile
          </Link>
        </nav>

        {/* Bottom Logout Bar */}
        <div className="p-4 border-t border-white/10 bg-blue-900/40">
          <button 
            onClick={() => router.push("/login")}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">HOD Dashboard</h1>
          
          {/* Right side actions */}
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

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 80px)" }}>
          <div className="p-8 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-white/70 text-sm mb-2">{stat.label}</div>
                      <div className="text-white text-4xl font-bold">{stat.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Resume Status Yearwise */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-white text-lg font-semibold mb-6">Resume Status Yearwise :</h2>
                <div className="w-full h-80 bg-black/20 rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resumeStatusData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="year" tick={{ fill: "#ffffff", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#ffffff", fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }} />
                      <Legend />
                      <Bar dataKey="completed" fill="#06D9FF" name="Completed" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="pending" fill="#FF6B6B" name="Pending" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ATS Score Trend by Batch */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-white text-lg font-semibold mb-6">ATS Score Trend by Batch :</h2>
                <div className="w-full h-80 bg-black/20 rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={atsScoreTrend} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="batch" tick={{ fill: "#ffffff", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#ffffff", fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)" }} />
                      <Line type="monotone" dataKey="score" stroke="#00D9FF" strokeWidth={3} dot={{ fill: "#00D9FF", r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Department Summary Table */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white text-lg font-semibold mb-6">Department Summary</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Name</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Resume</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Avg ATS</th>
                      <th className="px-4 py-3 text-left text-white/70 text-sm font-semibold">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentSummary.map((student) => (
                      <tr key={student.id} className="border-b border-white/10 hover:bg-white/5 transition">
                        <td className="px-4 py-4 text-white font-medium">{student.name}</td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.resume === "Completed" ? "text-green-400" :
                            student.resume === "Pending" ? "text-yellow-400" :
                            "text-blue-400"
                          }`}>
                            {student.resume}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-white font-medium">{student.atsScore}</td>
                        <td className="px-4 py-4">
                          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center gap-2 transition text-sm font-medium">
                            <span>Download</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* View Full Summary Button */}
              <div className="flex justify-center mt-6">
                <button className="px-8 py-2 bg-white text-blue-900 hover:bg-white/90 rounded-lg transition text-sm font-semibold">
                  View Full Summary
                </button>
              </div>
            </div>

            {/* Spacer */}
            <div className="h-10"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
