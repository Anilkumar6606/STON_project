"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import PlacementSidebar from "@/components/placement-sidebar"
import { Bell, Settings, Mail, Phone, Building2, Calendar, Briefcase, MapPin, Lock, Eye, EyeOff, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfileData {
  name: string
  email: string
  phone: string
  college: string
  address: string
  city: string
  state: string
  dob: string
  joiningYear: string
  experience: string
}

const INITIAL_PROFILE: ProfileData = {
  name: "Raj Patel",
  email: "raj.patel@placement.example.com",
  phone: "+91 98765 43210",
  college: "STON Technology Institute",
  address: "Block A, Tech Park",
  city: "Bangalore",
  state: "Karnataka",
  dob: "22 Jan 1975",
  joiningYear: "2019",
  experience: "12 years"
}

export default function PlacementProfile() {
  const { data: session } = useSession()
  const [isEditMode, setIsEditMode] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>(INITIAL_PROFILE)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const handleEditField = (field: keyof ProfileData, value: string) => {
    setProfileData({ ...profileData, [field]: value })
  }

  const handleSaveProfile = () => {
    setIsEditMode(false)
  }

  const handleCancelEdit = () => {
    setProfileData(INITIAL_PROFILE)
    setIsEditMode(false)
  }

  const handlePasswordChange = () => {
    setPasswordError("")
    setPasswordSuccess(false)

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    setPasswordSuccess(true)
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setTimeout(() => {
      setShowPasswordModal(false)
      setPasswordSuccess(false)
    }, 2000)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-[#050616] via-[#0f1a3f] to-[#1a2e66] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/40 backdrop-blur z-50 sticky top-0">
        <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <img src="/image/STON.png" alt="STON Logo" className="w-8 h-8 object-contain" />
          STON
        </div>
        <h1 className="text-3xl font-bold">My Profile</h1>
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
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-8">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl">
                    {profileData.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{profileData.name}</h2>
                    <p className="text-white/70 mb-1">Placement Officer</p>
                    <p className="text-white/60 text-sm">Training & Placement Cell</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isEditMode ? (
                    <>
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Save Profile
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        variant="outline"
                        className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => setIsEditMode(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Edit Profile
                      </Button>
                      <Button
                        onClick={() => setShowPasswordModal(true)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Update Password
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-4 h-4 text-white/60" />
                    <label className="text-sm font-medium text-white/60">Email</label>
                  </div>
                  {isEditMode ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleEditField("email", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                    />
                  ) : (
                    <div className="text-white">{profileData.email}</div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-4 h-4 text-white/60" />
                    <label className="text-sm font-medium text-white/60">Phone</label>
                  </div>
                  {isEditMode ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleEditField("phone", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                    />
                  ) : (
                    <div className="text-white">{profileData.phone}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* College */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-4 h-4 text-white/60" />
                    <label className="text-sm font-medium text-white/60">College</label>
                  </div>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={profileData.college}
                      onChange={(e) => handleEditField("college", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                    />
                  ) : (
                    <div className="text-white">{profileData.college}</div>
                  )}
                </div>

                {/* Joining Year */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-4 h-4 text-white/60" />
                    <label className="text-sm font-medium text-white/60">Joining Year</label>
                  </div>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={profileData.joiningYear}
                      onChange={(e) => handleEditField("joiningYear", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                    />
                  ) : (
                    <div className="text-white">{profileData.joiningYear}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-4 h-4 text-white/60" />
                    <label className="text-sm font-medium text-white/60">Address</label>
                  </div>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => handleEditField("address", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                    />
                  ) : (
                    <div className="text-white">{profileData.address}</div>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="text-sm font-medium text-white/60 mb-2 block">City</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={profileData.city}
                      onChange={(e) => handleEditField("city", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                    />
                  ) : (
                    <div className="text-white">{profileData.city}</div>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="text-sm font-medium text-white/60 mb-2 block">State</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={profileData.state}
                      onChange={(e) => handleEditField("state", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                    />
                  ) : (
                    <div className="text-white">{profileData.state}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date of Birth */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-4 h-4 text-white/60" />
                    <label className="text-sm font-medium text-white/60">Date of Birth</label>
                  </div>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={profileData.dob}
                      onChange={(e) => handleEditField("dob", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                    />
                  ) : (
                    <div className="text-white">{profileData.dob}</div>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-4 h-4 text-white/60" />
                    <label className="text-sm font-medium text-white/60">Experience</label>
                  </div>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={profileData.experience}
                      onChange={(e) => handleEditField("experience", e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                    />
                  ) : (
                    <div className="text-white">{profileData.experience}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="text-sm font-medium text-white/60 mb-2">Total Students</div>
                <div className="text-3xl font-bold text-white">3420</div>
              </div>
              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="text-sm font-medium text-white/60 mb-2">Placed Students</div>
                <div className="text-3xl font-bold text-green-400">2800</div>
              </div>
              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="text-sm font-medium text-white/60 mb-2">Companies</div>
                <div className="text-3xl font-bold text-blue-400">45</div>
              </div>
              <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
                <div className="text-sm font-medium text-white/60 mb-2">Avg Package</div>
                <div className="text-3xl font-bold text-purple-400">₹7.2L</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/80 border border-white/20 rounded-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Update Password</h2>
              <button
                onClick={() => {
                  setShowPasswordModal(false)
                  setPasswordError("")
                  setPasswordSuccess(false)
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!passwordSuccess ? (
              <div className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="text-sm font-medium text-white/70 mb-2 block">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 pr-10"
                      placeholder="Enter current password"
                    />
                    <button
                      onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="text-sm font-medium text-white/70 mb-2 block">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 pr-10"
                      placeholder="Enter new password (min 6 characters)"
                    />
                    <button
                      onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm font-medium text-white/70 mb-2 block">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 pr-10"
                      placeholder="Confirm new password"
                    />
                    <button
                      onClick={() =>
                        setShowPassword({ ...showPassword, confirm: !showPassword.confirm })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {passwordError && <div className="text-red-400 text-sm">{passwordError}</div>}

                <Button
                  onClick={handlePasswordChange}
                  className="w-full bg-green-600 hover:bg-green-700 text-white mt-6"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-green-400 text-lg font-medium">Password updated successfully!</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
