"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import PlacementSidebar from "@/components/placement-sidebar"
import { Bell, Settings, TrendingUp, Users, Briefcase, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const placementData = [
  { month: "Jan", placements: 45, internships: 32 },
  { month: "Feb", placements: 52, internships: 38 },
  { month: "Mar", placements: 68, internships: 45 },
  { month: "Apr", placements: 78, internships: 52 },
]

const departmentData = [
  { name: "CSE", value: 285, color: "#3b82f6" },
  { name: "IT", value: 210, color: "#8b5cf6" },
  { name: "Mech", value: 145, color: "#ec4899" },
  { name: "Civil", value: 98, color: "#f59e0b" },
]

const salaryDistribution = [
  { range: "5-6 LPA", students: 120 },
  { range: "6-7 LPA", students: 180 },
  { range: "7-10 LPA", students: 210 },
  { range: "10-15 LPA", students: 145 },
  { range: "15+ LPA", students: 85 },
]

export default function PlacementOverview() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <PlacementSidebar />

      <main className="flex-1 ml-56 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Placement Overview</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-white cursor-pointer hover:text-white/70" />
            <Settings className="w-5 h-5 text-white cursor-pointer hover:text-white/70" />
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="text-right">
                <p className="text-white text-sm font-medium">{session?.user?.name || "Placement Officer"}</p>
                <p className="text-white/60 text-xs">Officer</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white/70 mb-2">Total Placed</div>
                  <div className="text-3xl font-bold text-white">738</div>
                </div>
                <CheckCircle className="w-10 h-10 text-blue-400 opacity-50" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white/70 mb-2">Placement Rate</div>
                  <div className="text-3xl font-bold text-white">82%</div>
                </div>
                <TrendingUp className="w-10 h-10 text-green-400 opacity-50" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white/70 mb-2">Pending Placements</div>
                  <div className="text-3xl font-bold text-white">156</div>
                </div>
                <Clock className="w-10 h-10 text-purple-400 opacity-50" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-700/20 backdrop-blur-sm border border-orange-400/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white/70 mb-2">Avg Salary</div>
                  <div className="text-3xl font-bold text-white">8.4 LPA</div>
                </div>
                <Briefcase className="w-10 h-10 text-orange-400 opacity-50" />
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Placement Trend */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Placement Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={placementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="placements" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="internships" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Department Distribution */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Department-wise Placements</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={departmentData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Salary Distribution */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Salary Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="range" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="students" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  )
}
