"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Bell, Settings, LogOut, Camera, Edit, Mail, Phone, MapPin, Calendar, Award, FileText, ChevronDown } from "lucide-react"

export default function PlacementOfficerProfile() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(2)
  const [isEditing, setIsEditing] = useState(false)

  const handleLogout = () => {
    window.location.href = "/login"
  }

  return (
    <div className="h-screen bg-gradient-to-br from-[#050616] via-[#0f1a3f] to-[#1a2e66] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/40 backdrop-blur z-50">
        <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <img src="/image/STON.png" alt="STON Logo" className="w-8 h-8 object-contain" />
          STON
        </div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold">
            JD
          </div>
          <span className="text-sm font-medium">John Deo</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-56 border-r border-white/10 bg-black/20 flex flex-col">
          <nav className="flex-1 px-6 py-8 space-y-0.5 text-white/70 text-sm overflow-y-auto">
            <NavItem label="Dashboard" onClick={() => router.push('/placement/dashboard')} />
            <NavItem label="Placement Overview" onClick={() => router.push('/placement/overview')} />
            <NavItem label="Departments" onClick={() => router.push('/placement/department')} />
            <NavItem label="Top Recruiting Companies" onClick={() => router.push('/placement/companies')} />
            <NavItem label="Current Job Openings" onClick={() => router.push('/placement/openings')} />
            <NavItem label="Student Records" onClick={() => router.push('/placement/students')} />
            <NavItem label="Profile" active onClick={() => router.push('/placement/profile')} />
          </nav>
          <div className="px-6 pb-6">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 py-3 px-4 rounded-lg border border-red-400/50 transition shadow-lg"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="col-span-1">
              {/* Profile Header Card */}
              <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur p-8 space-y-6 mb-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-5xl font-bold">
                      JD
                    </div>
                    <button className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 p-3 rounded-full border border-white/20 transition">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>

                  <h2 className="text-2xl font-bold mt-4">John Deo</h2>
                  <p className="text-purple-400 font-semibold">Placement Officer</p>
                  <p className="text-white/60 text-sm mt-1">STON Technology</p>
                </div>

                {/* Quick Stats */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Placements Done</span>
                    <span className="text-lg font-bold">1835</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Avg Package</span>
                    <span className="text-lg font-bold">₹ 7.4 LPA</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Companies</span>
                    <span className="text-lg font-bold">62</span>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg font-semibold transition border border-purple-400/50"
                >
                  <Edit className="w-4 h-4" />
                  {isEditing ? "Cancel Editing" : "Edit Profile"}
                </button>
              </div>

              {/* Documents Card */}
              <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur p-8 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Documents
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                    <span className="text-sm">Resume</span>
                    <span className="text-xs text-white/60">View</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                    <span className="text-sm">Certificates</span>
                    <span className="text-xs text-white/60">View</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                    <span className="text-sm">License</span>
                    <span className="text-xs text-white/60">View</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Details */}
            <div className="col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur p-8 space-y-6">
                <h3 className="text-xl font-bold">Personal Information</h3>

                <div className="grid grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="text-sm text-white/60 block mb-2">First Name</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      defaultValue="John"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="text-sm text-white/60 block mb-2">Last Name</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      defaultValue="Deo"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="col-span-2">
                    <label className="text-sm text-white/60 block mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      disabled={!isEditing}
                      defaultValue="john.deo@stontechnology.com"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm text-white/60 block mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      disabled={!isEditing}
                      defaultValue="+91 9876543210"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                    />
                  </div>

                  {/* Phone Secondary */}
                  <div>
                    <label className="text-sm text-white/60 block mb-2">Alternate Phone</label>
                    <input
                      type="tel"
                      disabled={!isEditing}
                      defaultValue="+91 8765432109"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur p-8 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  Address
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/60 block mb-2">Street Address</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      defaultValue="123 Tech Street, Silicon Valley"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-white/60 block mb-2">City</label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        defaultValue="Bangalore"
                        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white/60 block mb-2">State</label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        defaultValue="Karnataka"
                        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-white/60 block mb-2">Pin Code</label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        defaultValue="560001"
                        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white/60 block mb-2">Country</label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        defaultValue="India"
                        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur p-8 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  Professional Details
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-white/60 block mb-2">Position</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      defaultValue="Placement Officer"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/60 block mb-2">Department</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      defaultValue="Student Affairs"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/60 block mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Joining Date
                    </label>
                    <input
                      type="date"
                      disabled={!isEditing}
                      defaultValue="2022-01-15"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/60 block mb-2">Experience</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      defaultValue="4+ Years"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-sm text-white/60 block mb-2">Bio</label>
                    <textarea
                      disabled={!isEditing}
                      defaultValue="Experienced placement officer with a proven track record of successful student placements and strong industry connections. Passionate about bridging the gap between academia and industry."
                      rows={4}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 disabled:opacity-60 transition resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="flex gap-4">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition border border-purple-400/50">
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-white/10 hover:bg-white/15 px-6 py-3 rounded-lg font-semibold transition border border-white/15"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function NavItem({ label, active = false, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition ${
        active ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-white" : "bg-white/30"}`} />
      <span>{label}</span>
    </div>
  )
}
