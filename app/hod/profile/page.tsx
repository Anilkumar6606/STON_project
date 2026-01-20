"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import HODSidebar from "@/components/hod-sidebar"
import { Bell, Settings, Mail, Phone, Building2, User as UserIcon, Edit2, Save, X, Key } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HODProfile() {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || "Dr. Rajesh Kumar",
    email: session?.user?.email || "hod.cse@example.com",
    phone: "+91 98765 43210",
    department: "Computer Science & Engineering",
    employeeId: "HOD-CSE-001",
    college: "STON Technology Institute",
    address: "123 Education Street, Tech City",
    dob: "15 Jan 1972",
    joiningYear: "2020",
    experience: "15 years"
  })

  const [editData, setEditData] = useState(profileData)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleEdit = () => {
    setIsEditing(true)
    setEditData(profileData)
  }

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters")
      return
    }
    alert("Password changed successfully!")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setShowPasswordModal(false)
  }

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <HODSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Settings className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
              {!isEditing ? (
                <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1">
                  Edit Profile
                </Button>
              ) : (
                <Button onClick={handleCancel} className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1">
                  Cancel Edit
                </Button>
              )}
              <Button onClick={() => setShowPasswordModal(true)} className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1">
                Update Password
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl">
                    {profileData.name?.charAt(0) || "H"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{profileData.name}</h2>
                    <p className="text-white/70 mb-1">Head of Department</p>
                    <p className="text-white/60 text-sm">{profileData.department}</p>
                  </div>
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white/60 text-sm">Email</div>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                        />
                      ) : (
                        <div className="text-white text-sm">{profileData.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white/60 text-sm">Phone</div>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                        />
                      ) : (
                        <div className="text-white text-sm">{profileData.phone}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white/60 text-sm">Department</div>
                      <div className="text-white text-sm">{profileData.department}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white/60 text-sm">Employee ID</div>
                      <div className="text-white text-sm">{profileData.employeeId}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="border-t border-white/10 pt-6 pb-6">
                <h3 className="text-white font-semibold mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">College Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.college}
                        onChange={(e) => handleChange("college", e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                      />
                    ) : (
                      <p className="text-white">{profileData.college}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                      />
                    ) : (
                      <p className="text-white">{profileData.address}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.dob}
                        onChange={(e) => handleChange("dob", e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                      />
                    ) : (
                      <p className="text-white">{profileData.dob}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Joining Year</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.joiningYear}
                        onChange={(e) => handleChange("joiningYear", e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                      />
                    ) : (
                      <p className="text-white">{profileData.joiningYear}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white font-semibold mb-4">Experience</h3>
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Total Experience</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.experience}
                      onChange={(e) => handleChange("experience", e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                      placeholder="e.g., 15 years"
                    />
                  ) : (
                    <p className="text-white">{profileData.experience}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-lg p-6 w-96 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold">Change Password</h2>
              <button onClick={() => setShowPasswordModal(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-white/70 text-sm font-medium block mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="text-white/70 text-sm font-medium block mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="text-white/70 text-sm font-medium block mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                onClick={handleChangePassword}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update Password
              </Button>
              <Button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
