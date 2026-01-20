"use client"

import { useSession } from "next-auth/react"
import PlacementSidebar from "@/components/placement-sidebar"
import { Bell, Settings, Users, Briefcase, Building2, TrendingUp, Calendar, AlertCircle } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const placementTrendData = [
  { month: "Jan", placed: 145, interviews: 220, applications: 340 },
  { month: "Feb", placed: 168, interviews: 250, applications: 380 },
  { month: "Mar", placed: 192, interviews: 280, applications: 420 },
  { month: "Apr", placed: 215, interviews: 310, applications: 450 },
]

const departmentData = [
  { dept: "CSE", students: 420, placed: 378, rate: 90 },
  { dept: "IT", students: 380, placed: 342, rate: 90 },
  { dept: "ECE", students: 350, placed: 294, rate: 84 },
  { dept: "Mech", students: 320, placed: 253, rate: 79 },
  { dept: "Civil", students: 280, placed: 218, rate: 78 },
]

const recentActivities = [
  { id: 1, title: "Google Interview Round", dept: "CSE", students: 15, date: "Today, 2:00 PM" },
  { id: 2, title: "Microsoft Campus Drive", dept: "IT", students: 25, date: "Tomorrow, 10:00 AM" },
  { id: 3, title: "Amazon Pre-Placement Talk", dept: "CSE", students: 40, date: "Jan 22, 3:00 PM" },
  { id: 4, title: "TCS Final Selection", dept: "Multiple", students: 60, date: "Jan 23, 11:00 AM" },
]

export default function PlacementDashboard() {
  const { data: session } = useSession()

  return (
    <div className="h-screen bg-gradient-to-br from-[#050616] via-[#0f1a3f] to-[#1a2e66] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/40 backdrop-blur z-50 sticky top-0">
        <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <img src="/image/STON.png" alt="STON Logo" className="w-8 h-8 object-contain" />
          STON
        </div>
        <h1 className="text-3xl font-bold">Placement Dashboard</h1>
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">3,420</div>
                <div className="text-sm text-white/60">Total Students</div>
              </div>

              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-green-400 mb-1">2,800</div>
                <div className="text-sm text-white/60">Students Placed</div>
                <div className="text-xs text-green-400 mt-1">82% Placement Rate</div>
              </div>

              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-xs text-white/60">+5 this month</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">45</div>
                <div className="text-sm text-white/60">Partner Companies</div>
              </div>

              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-orange-400" />
                  </div>
                  <span className="text-xs text-green-400">5 Active</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">8</div>
                <div className="text-sm text-white/60">Job Openings</div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Placement Trend Chart */}
              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Placement Trend (2026)</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={placementTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                    <YAxis stroke="rgba(255,255,255,0.6)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="placed" stroke="#10b981" strokeWidth={2} name="Placed" />
                    <Line type="monotone" dataKey="interviews" stroke="#3b82f6" strokeWidth={2} name="Interviews" />
                    <Line type="monotone" dataKey="applications" stroke="#8b5cf6" strokeWidth={2} name="Applications" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Department Performance Chart */}
              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Department-wise Placement</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="dept" stroke="rgba(255,255,255,0.6)" />
                    <YAxis stroke="rgba(255,255,255,0.6)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="students" fill="#3b82f6" name="Total Students" />
                    <Bar dataKey="placed" fill="#10b981" name="Placed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activities & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activities */}
              <div className="lg:col-span-2 bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
                  <Calendar className="w-5 h-5 text-white/60" />
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{activity.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span>{activity.dept}</span>
                          <span>•</span>
                          <span>{activity.students} Students</span>
                        </div>
                      </div>
                      <div className="text-sm text-white/60">{activity.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">156</div>
                    <div className="text-sm text-white/70">Pending Applications</div>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">₹8.4 LPA</div>
                    <div className="text-sm text-white/70">Average Package</div>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400 mb-1">₹24 LPA</div>
                    <div className="text-sm text-white/70">Highest Package</div>
                  </div>
                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-400 mb-1">12</div>
                    <div className="text-sm text-white/70">Interviews This Week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <p className="text-gray-800 font-semibold mb-3">Achievements</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {achievements.map((item) => (
                        <li key={item} className="flex gap-2 items-start">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-[2px]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <p className="text-gray-800 font-semibold mb-3">Improvements</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {improvements.map((item) => (
                        <li key={item} className="flex gap-2 items-start">
                          <XCircle className="h-4 w-4 text-rose-500 mt-[2px]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white">
                <h4 className="text-lg font-semibold mb-3">Match Analysis</h4>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-white/70 mb-2">Current Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {currentKeywords.map((kw) => (
                        <span key={kw} className="bg-indigo-500/50 border border-white/20 rounded-full px-3 py-1 text-xs">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-white/70 mb-2">Missing Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {missingKeywords.map((kw) => (
                        <span key={kw} className="bg-rose-500/40 border border-white/20 rounded-full px-3 py-1 text-xs">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white/70 mb-2">Keyword Relevance</p>
                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300" style={{ width: "70%" }} />
                  </div>
                  <p className="text-xs text-white/70 mt-2">7/10</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="bg-white/10 border border-white/15 backdrop-blur rounded-3xl p-6 shadow-2xl shadow-indigo-900/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Uploaded Resume</h3>
                <span className="text-xs text-emerald-200 font-semibold">ATS Checked</span>
              </div>
              <div className="bg-white rounded-2xl p-4 text-gray-800 shadow-inner">
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 text-white flex items-center justify-center font-semibold">
                    AK
                  </div>
                  <div className="leading-tight">
                    <p className="font-semibold">Anil Kumar</p>
                    <p className="text-xs text-emerald-600 font-semibold">ATS Checked</p>
                    <p className="text-xs text-gray-600 mt-1">Profile Summary • Profile Overview</p>
                  </div>
                </div>
                <div className="rounded-xl border border-dashed border-gray-300 p-3 text-xs text-gray-600">
                  <p className="font-semibold text-gray-800 mb-2">Resume Snapshot</p>
                  <p className="leading-relaxed">
                    “Proficient in cloud deployment, containerization, and automation. Experienced with Kubernetes, Docker, CI/CD pipelines, and observability. Led migration projects improving performance and reliability.”
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  onClick={() => router.push("/resume")}
                  className="h-12 rounded-xl bg-gradient-to-r from-indigo-400 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 hover:scale-[1.01] transition"
                >
                  <Upload className="h-4 w-4" /> Change Resume
                </button>
                <button className="h-12 rounded-xl bg-white/15 text-white font-semibold border border-white/20 hover:bg-white/20 transition">
                  <RefreshCw className="h-4 w-4 inline mr-2" /> Re-check
                </button>
              </div>

              <button className="mt-3 w-full h-12 rounded-xl bg-white text-indigo-900 font-semibold flex items-center justify-center gap-2 hover:bg-indigo-50 transition">
                <Download className="h-4 w-4" /> Download Resume
              </button>
            </div>

            <div className="bg-white/10 border border-white/15 backdrop-blur rounded-2xl px-4 py-3 text-right text-white/70 text-sm">
              03-01-2024
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
