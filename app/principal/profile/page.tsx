"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { User, Mail, Phone, Building, MapPin, Calendar, Edit2, Save, X, Key, Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import PrincipalSidebar from "@/components/principal-sidebar"

export default function PrincipalProfilePage() {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "Dr. Ashish Kumar",
    email: "principal@ston.edu.in",
    phone: "+91 98765 43210",
    designation: "Principal",
    department: "Administration",
    college: "STON Technology Institute",
    address: "123 Education Street, Tech City",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    joinDate: "15 Jan 2020",
    employeeId: "STON-PRIN-2020-001",
    dob: "20 Mar 1965",
    joiningYear: "2020",
    experience: "20 years"
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
    <div className="min-h-screen flex bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      <PrincipalSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="sticky top-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-white cursor-pointer hover:text-white/70" />
            <Settings className="w-5 h-5 text-white cursor-pointer hover:text-white/70" />
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="text-right">
                <p className="text-white text-sm font-medium">{profileData.name}</p>
                <p className="text-white/60 text-xs">Principal</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
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

        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Profile Card */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white">{profileData.name}</h2>
                  <p className="text-white/60 text-sm mt-1">{profileData.designation} • {profileData.employeeId}</p>
                </div>
                {!isEditing && (
                  <Button
                    onClick={handleEdit}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                )}
                {isEditing && (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                    <Button
                      onClick={handleCancel}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Contact Information */}
                <div className="border-l-2 border-blue-500 pl-4">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-4">Contact Information</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-white/70 text-sm mb-1 block">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                        />
                      ) : (
                        <p className="text-white flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400" /> {profileData.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-white/70 text-sm mb-1 block">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                        />
                      ) : (
                        <p className="text-white flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400" /> {profileData.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="border-l-2 border-purple-500 pl-4">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-4">Professional</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-white/70 text-sm mb-1 block">Designation</label>
                      <p className="text-white flex items-center gap-2"><Building className="w-4 h-4 text-purple-400" /> {profileData.designation}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm mb-1 block">Department</label>
                      <p className="text-white">{profileData.department}</p>
                    </div>
                  </div>
                </div>

                {/* Institution */}
                <div className="border-l-2 border-green-500 pl-4">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-4">Institution</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-white/70 text-sm mb-1 block">College</label>
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
                      <label className="text-white/70 text-sm mb-1 block">Join Date</label>
                      <p className="text-white flex items-center gap-2"><Calendar className="w-4 h-4 text-green-400" /> {profileData.joinDate}</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="border-l-2 border-yellow-500 pl-4">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-4">Location</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-white/70 text-sm mb-1 block">Address</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.address}
                          onChange={(e) => handleChange("address", e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                        />
                      ) : (
                        <p className="text-white flex items-center gap-2"><MapPin className="w-4 h-4 text-yellow-400" /> {profileData.address}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Location Info */}
              <div className="grid grid-cols-4 gap-4 mb-8 py-6 border-t border-white/10">
                <div>
                  <p className="text-white/70 text-xs mb-1">City</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    />
                  ) : (
                    <p className="text-white font-medium">{profileData.city}</p>
                  )}
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">State</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    />
                  ) : (
                    <p className="text-white font-medium">{profileData.state}</p>
                  )}
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">Pincode</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.pincode}
                      onChange={(e) => handleChange("pincode", e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    />
                  ) : (
                    <p className="text-white font-medium">{profileData.pincode}</p>
                  )}
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">Employee ID</p>
                  <p className="text-white font-medium">{profileData.employeeId}</p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="border-t border-white/10 pt-6 pb-6">
                <h3 className="text-white font-semibold mb-4">Additional Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                      placeholder="e.g., 20 years"
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
