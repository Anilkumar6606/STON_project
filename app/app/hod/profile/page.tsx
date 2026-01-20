"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { User, Settings, Bell, Mail, Phone, Shield, Lock, Eye, EyeOff } from "lucide-react"

export default function Profile() {
  const router = useRouter()
  const [isEditMode, setIsEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@ston.com",
    phone: "+91 98765 43210",
    department: "Computer Science and Engineering (CSE)",
    designation: "Head of Department",
    qualification: "Ph.D. in Computer Science",
    joinDate: "2015-06-15",
    office: "CSE Block, Room 301"
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <aside className="w-64 bg-black/40 backdrop-blur-sm border-r border-white/10 flex flex-col fixed h-screen">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image src="/image/STON.png" alt="STON Technology logo" width={40} height={40} className="h-10 w-10 object-contain" priority />
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
          <Link href="/hod/download" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm">Download</Link>
          <Link href="/hod/profile" className="block px-4 py-3 text-white bg-white/20 rounded-lg transition text-sm font-medium">Profile</Link>
        </nav>
        <div className="p-4 border-t border-white/10 bg-blue-900/40">
          <button onClick={() => router.push("/login")} className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium">Logout</button>
        </div>
      </aside>

      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition"><Bell className="w-5 h-5 text-white" /></button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition"><Settings className="w-5 h-5 text-white" /></button>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <User className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">Dr. Rajesh</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <div className="lg:col-span-4 bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">RK</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
                  <p className="text-white/60 mb-1">{formData.designation}</p>
                  <p className="text-white/60 text-sm">{formData.department}</p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
              <div className="border-b border-white/10 flex">
                <button onClick={() => {setActiveTab("general"); setIsEditMode(false)}} className={`flex-1 px-6 py-4 font-medium transition text-sm ${activeTab === "general" ? "bg-blue-600/30 text-white border-b-2 border-blue-500" : "text-white/60 hover:text-white"}`}>
                  General Information
                </button>
                <button onClick={() => {setActiveTab("security"); setIsEditMode(false)}} className={`flex-1 px-6 py-4 font-medium transition text-sm ${activeTab === "security" ? "bg-blue-600/30 text-white border-b-2 border-blue-500" : "text-white/60 hover:text-white"}`}>
                  Security & Password
                </button>
              </div>

              <div className="p-8">
                {activeTab === "general" ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Basic Information</h3>
                      {!isEditMode && (
                        <button onClick={() => setIsEditMode(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium">
                          Edit Profile
                        </button>
                      )}
                    </div>

                    {!isEditMode ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-white/60 text-xs font-medium mb-1 flex items-center gap-2"><User className="w-4 h-4" />Name</div>
                            <div className="text-white font-medium">{formData.name}</div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-white/60 text-xs font-medium mb-1 flex items-center gap-2"><Mail className="w-4 h-4" />Email</div>
                            <div className="text-white font-medium">{formData.email}</div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-white/60 text-xs font-medium mb-1 flex items-center gap-2"><Phone className="w-4 h-4" />Phone</div>
                            <div className="text-white font-medium">{formData.phone}</div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-white/60 text-xs font-medium mb-1">Designation</div>
                            <div className="text-white font-medium">{formData.designation}</div>
                          </div>
                          <div className="md:col-span-2 bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-white/60 text-xs font-medium mb-1">Department</div>
                            <div className="text-white font-medium">{formData.department}</div>
                          </div>
                          <div className="md:col-span-2 bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-white/60 text-xs font-medium mb-1">Qualification</div>
                            <div className="text-white font-medium">{formData.qualification}</div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-white/60 text-xs font-medium mb-1">Office Location</div>
                            <div className="text-white font-medium">{formData.office}</div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-white/60 text-xs font-medium mb-1">Join Date</div>
                            <div className="text-white font-medium">{new Date(formData.joinDate).toLocaleDateString('en-IN', {year: 'numeric', month: 'long', day: 'numeric'})}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="text-white/70 text-sm mb-2 block font-medium">Full Name</label>
                          <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-blue-500/50" placeholder="Enter your full name" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-white/70 text-sm mb-2 block font-medium">Email</label>
                            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-blue-500/50" placeholder="your.email@example.com" />
                          </div>
                          <div>
                            <label className="text-white/70 text-sm mb-2 block font-medium">Phone</label>
                            <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-blue-500/50" placeholder="+91 98765 43210" />
                          </div>
                        </div>
                        <div>
                          <label className="text-white/70 text-sm mb-2 block font-medium">Office Location</label>
                          <input type="text" value={formData.office} onChange={(e) => setFormData({...formData, office: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-blue-500/50" placeholder="Office room/location" />
                        </div>
                        <div className="flex gap-3 pt-6">
                          <button onClick={() => setIsEditMode(false)} className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition font-medium">Cancel</button>
                          <button onClick={() => {setIsEditMode(false); alert("Profile updated successfully!");}} className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium">Save Changes</button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Shield className="w-6 h-6" />Change Password</h3>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="text-white/70 text-sm mb-2 block font-medium">Current Password</label>
                        <input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-blue-500/50" placeholder="Enter current password" />
                      </div>
                      <div>
                        <label className="text-white/70 text-sm mb-2 block font-medium">New Password</label>
                        <div className="relative">
                          <input type={showPassword ? "text" : "password"} value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-blue-500/50" placeholder="Enter new password" />
                          <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-white/60 hover:text-white">
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="text-white/70 text-sm mb-2 block font-medium">Confirm Password</label>
                        <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-blue-500/50" placeholder="Confirm new password" />
                      </div>
                      <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-3 mt-4">
                        <p className="text-blue-200 text-sm">Password must contain at least 8 characters, including uppercase, lowercase, and numbers.</p>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button onClick={() => setActiveTab("general")} className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition font-medium">Cancel</button>
                        <button onClick={() => {alert("Password changed successfully!"); setPasswordData({currentPassword: "", newPassword: "", confirmPassword: ""});}} className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium">Change Password</button>
                      </div>
                    </div>

                    <div className="mt-10 pt-10 border-t border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Lock className="w-5 h-5" />Security Options</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                          <div>
                            <div className="text-white font-medium">Two-Factor Authentication</div>
                            <div className="text-white/60 text-sm">Add an extra layer of security to your account</div>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium">Enable</button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                          <div>
                            <div className="text-white font-medium">Active Sessions</div>
                            <div className="text-white/60 text-sm">Manage your login sessions across devices</div>
                          </div>
                          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition text-sm font-medium">View</button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="h-10"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
