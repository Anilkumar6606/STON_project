"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Bell, Settings } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import HODSidebar from "@/components/hod-sidebar"

export default function DepartmentStatus() {
  const { data: session } = useSession()

  const stats = [
    { label: "Total Students", value: "240", color: "blue" },
    { label: "Resume Ready", value: "185", color: "green" },
    { label: "Avg Package", value: "₹8.2 LPA", color: "purple" },
    { label: "Placements", value: "142", color: "orange" },
  ]

  const yearwiseData = [
    { year: "First Year", total: 55, ready: 32, pending: 23 },
    { year: "Second Year", total: 58, ready: 45, pending: 13 },
    { year: "Third Year", total: 63, ready: 52, pending: 11 },
    { year: "Final Year", total: 64, ready: 56, pending: 8 },
  ]

  const specializations = [
    { name: "Software Dev", students: 85, ratio: 35 },
    { name: "Web Dev", students: 70, ratio: 29 },
    { name: "Data Science", students: 55, ratio: 23 },
    { name: "DevOps", students: 30, ratio: 13 },
  ]

  const pieData = [
    { name: "Resume Ready", value: 185 },
    { name: "In Progress", value: 40 },
    { name: "Pending", value: 15 },
  ]

  const COLORS = ["#10B981", "#F59E0B", "#EF4444"]

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      <HODSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="sticky top-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Department Status</h1>
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
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
                <p className="text-white/70 text-sm">{stat.label}</p>
                <p className="text-white text-3xl font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Yearwise Distribution */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-white font-semibold mb-6">Yearwise Student Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={yearwiseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)" }} />
                  <Legend />
                  <Bar dataKey="total" fill="#3B82F6" name="Total" />
                  <Bar dataKey="ready" fill="#10B981" name="Resume Ready" />
                  <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-white font-semibold mb-6">Resume Status Ratio</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={2} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Specializations */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-white font-semibold mb-6">Specialization Breakdown</h2>
            <div className="space-y-4">
              {specializations.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">{spec.name}</span>
                      <span className="text-white/70">{spec.students} students</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${spec.ratio}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
