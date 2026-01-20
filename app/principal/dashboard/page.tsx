"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import PrincipalSidebar from "@/components/principal-sidebar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, CheckCircle, AlertCircle, Bell, Settings } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"

export default function PrincipalDashboard() {
  const router = useRouter()
  const { data: session } = useSession()
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedEmail, setSelectedEmail] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedAccessLevel, setSelectedAccessLevel] = useState("")
  const [grantedAccessList, setGrantedAccessList] = useState([
    {
      id: 1,
      email: "placement@example.com",
      role: "Placement Officer",
      department: "Information Technology",
      access: "Full Access",
      status: "Active",
    },
    {
      id: 2,
      email: "hod.cse@example.com",
      role: "HOD",
      department: "Computer Science",
      access: "Full Access",
      status: "Active",
    }
  ])
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const stats = [
    { label: "Total Students", value: "3240" },
    { label: "Departments", value: "12" },
    { label: "Active Users", value: "27" },
    { label: "Suspended users", value: "3" },
  ]

  const departmentData = [
    { dept: "CSE", pastYear: 65, currentYear: 75 },
    { dept: "IT", pastYear: 80, currentYear: 70 },
    { dept: "Mech", pastYear: 85, currentYear: 90 },
    { dept: "Elpo", pastYear: 70, currentYear: 80 },
    { dept: "EXTC", pastYear: 75, currentYear: 85 },
    { dept: "Civil", pastYear: 60, currentYear: 70 },
  ]

  const grantedAccess = {
    email: "placement@gmail.com",
    role: "Placement officer",
    department: "Information Technology",
    access: "Full Access",
    status: "Active",
  }

  const handleGrantAccess = () => {
    console.log("Granting access:", {
      role: selectedRole,
      email: selectedEmail,
      department: selectedDepartment,
      accessLevel: selectedAccessLevel,
    })
  }

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <PrincipalSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col overflow-auto">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Principal Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Settings className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="text-right">
                <p className="text-white text-sm font-medium">{session?.user?.name || "Ashish Kumar"}</p>
                <p className="text-white/60 text-xs">Principal</p>
              </div>
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 space-y-6 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
              >
                <div className="text-white/70 text-sm mb-2">{stat.label}</div>
                <div className="text-white text-4xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Department Chart - Takes 2 columns */}
            <div className="col-span-2 bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white text-lg font-semibold mb-6">Department wise Resume Completion</h2>
              
              {/* Chart Container */}
              <div className="w-full h-80 bg-black/20 rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    {/* Grid Background */}
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    
                    {/* X Axis - Department Names */}
                    <XAxis
                      dataKey="dept"
                      tick={{ fill: "#ffffff", opacity: 0.8, fontSize: 12 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                      tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
                    />
                    
                    {/* Y Axis - Percentage Scale */}
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: "#ffffff", opacity: 0.8, fontSize: 12 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                      tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
                      label={{ value: "Completion %", angle: -90, position: "insideLeft", fill: "#ffffff", offset: 10 }}
                    />
                    
                    {/* Tooltip on Hover */}
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                      }}
                      labelStyle={{ color: "#ffffff" }}
                      itemStyle={{ color: "#ffffff" }}
                      formatter={(value) => `${value}%`}
                      cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                    />
                    
                    {/* Legend */}
                    <Legend
                      wrapperStyle={{
                        paddingTop: "20px",
                      }}
                      iconType="circle"
                      formatter={(value) => <span style={{ color: "#ffffff", opacity: 0.8 }}>{value}</span>}
                    />
                    
                    {/* Past Year Bar - Blue */}
                    <Bar
                      dataKey="pastYear"
                      name="Past Year"
                      fill="#3B82F6"
                      radius={[8, 8, 0, 0]}
                      barSize={35}
                      isAnimationActive={true}
                      animationDuration={1000}
                    />
                    
                    {/* Current Year Bar - White/Cyan */}
                    <Bar
                      dataKey="currentYear"
                      name="Current Year"
                      fill="#00D9FF"
                      radius={[8, 8, 0, 0]}
                      barSize={35}
                      isAnimationActive={true}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Grant Access Panel */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white text-lg font-semibold mb-6">Grant and Manage Access</h2>
              
              <div className="space-y-4 mb-6">
                {/* Role */}
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Role :</label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-full bg-white text-black border-0">
                      <SelectValue placeholder="Placement officer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="placement">Placement officer</SelectItem>
                      <SelectItem value="hod">HOD</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Official Mail */}
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Official mail :</label>
                  <Select value={selectedEmail} onValueChange={setSelectedEmail}>
                    <SelectTrigger className="w-full bg-white text-black border-0">
                      <SelectValue placeholder="placement@gmail.com" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="placement@gmail.com">placement@gmail.com</SelectItem>
                      <SelectItem value="hod@gmail.com">hod@gmail.com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Department */}
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Department :</label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-full bg-white text-black border-0">
                      <SelectValue placeholder="Computer Science and Engineering" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">Computer Science and Engineering</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="mech">Mechanical Engineering</SelectItem>
                      <SelectItem value="elpo">Electronics and Power</SelectItem>
                      <SelectItem value="extc">EXTC</SelectItem>
                      <SelectItem value="civil">Civil Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Access Level */}
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Access level :</label>
                  <Select value={selectedAccessLevel} onValueChange={setSelectedAccessLevel}>
                    <SelectTrigger className="w-full bg-white text-black border-0">
                      <SelectValue placeholder="Full Access" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Access</SelectItem>
                      <SelectItem value="read">Read Only</SelectItem>
                      <SelectItem value="limited">Limited Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Grant Access Button */}
                <Button
                  onClick={handleGrantAccess}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white border-0 font-medium"
                >
                  Grant Access
                </Button>
              </div>

              {/* Granted Access Section */}
              <div className="border-t border-white/20 pt-6">
                <h3 className="text-white font-semibold mb-4">Granted Access :</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">E - mail :</span>
                    <span className="text-white">{grantedAccess.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Role :</span>
                    <span className="text-white">{grantedAccess.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Department :</span>
                    <span className="text-white">{grantedAccess.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Access :</span>
                    <span className="text-white">{grantedAccess.access}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Status :</span>
                    <span className="text-green-400">{grantedAccess.status}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white/70">Action :</span>
                    <Button className="bg-red-500 hover:bg-red-600 text-white text-xs px-6 py-1 h-auto">
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
