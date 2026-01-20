"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, User, Lock, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"

export default function AdminProfilePage() {
  const [mfaEnabled, setMfaEnabled] = useState(true)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Profile state
  const [profileData, setProfileData] = useState({
    name: "Syed Sameer",
    email: "admin@stoncv.com",
    phone: "+1 234-567-8900",
    role: "Platform Admin",
  })

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Demo current password for testing
  const DEMO_PASSWORD = "Admin@123"

  const handleEditProfile = () => {
    setIsEditingProfile(true)
  }

  const handleSaveProfile = () => {
    if (!profileData.name.trim()) {
      setErrorMessage("Admin name is required")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    if (!profileData.email.trim() || !profileData.email.includes("@")) {
      setErrorMessage("Valid email is required")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    setSuccessMessage("Profile updated successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
    setIsEditingProfile(false)
  }

  const handleCancelEdit = () => {
    setIsEditingProfile(false)
  }

  const handleChangePassword = () => {
    if (!passwordData.currentPassword.trim()) {
      setErrorMessage("Current password is required")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    if (passwordData.currentPassword !== DEMO_PASSWORD) {
      setErrorMessage("Current password is incorrect. Try: Admin@123")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    if (!passwordData.newPassword.trim() || passwordData.newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("Passwords do not match")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    setSuccessMessage("✅ Password changed successfully! New password is now active.")
    setTimeout(() => setSuccessMessage(""), 5000)
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setIsChangingPassword(false)
  }

  const handleCancelPassword = () => {
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setIsChangingPassword(false)
    setErrorMessage("")
  }

  const toggleMFA = () => {
    setMfaEnabled(!mfaEnabled)
    setSuccessMessage(`Multi-Factor Authentication ${!mfaEnabled ? "enabled" : "disabled"}`)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  return (
    <>
      {/* Header */}
      <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#16103a]/30 backdrop-blur">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Admin Profile</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm font-medium text-white/90">Welcome, Admin</div>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold border-2 border-blue-400/30">
              SA
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1e1245]" />
          </div>
          <button className="text-white/50 hover:text-white transition">
            <ChevronDown size={20} />
          </button>
        </div>
      </header>

      {/* Profile Content */}
      <div className="flex-1 overflow-auto p-8">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-start gap-3">
            <CheckCircle size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-400">{successMessage}</p>
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{errorMessage}</p>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 p-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-3xl font-bold border-4 border-blue-400/30 shadow-lg shadow-blue-500/30">
                SA
              </div>
              
              {/* Info */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{profileData.name}</h2>
                <p className="text-white/60 text-sm">{profileData.role}</p>
              </div>
            </div>

            {/* Edit Button */}
            {!isEditingProfile && (
              <button 
                onClick={handleEditProfile}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-blue-600/30 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 p-8 mb-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <User size={20} />
            Personal Information
          </h3>
          
          {isEditingProfile ? (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-white/60 text-sm">Admin Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="col-span-2 bg-[#1e1245]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 transition"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-white/60 text-sm">Email Address</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="col-span-2 bg-[#1e1245]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 transition"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-white/60 text-sm">Phone Number</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="col-span-2 bg-[#1e1245]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 transition"
                />
              </div>

              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-2.5 border border-white/10 hover:bg-white/10 text-white rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-white/60 text-sm">Admin Name</div>
                <div className="col-span-2 text-white">{profileData.name}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-white/60 text-sm">Email Address</div>
                <div className="col-span-2 text-white">{profileData.email}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-white/60 text-sm">Phone Number</div>
                <div className="col-span-2 text-white">{profileData.phone}</div>
              </div>
            </div>
          )}
        </div>

        {/* Security Settings */}
        <div className="bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 p-8 mb-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Lock size={20} />
            Security Settings
          </h3>
          
          <div className="space-y-5">
            {/* MFA Toggle */}
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div className="text-white/90 text-sm">Enable Multi-Factor Authentication</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMFA}
                  className={`w-11 h-6 rounded-full relative transition-colors ${
                    mfaEnabled ? "bg-emerald-600" : "bg-white/10"
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                    mfaEnabled ? "right-1" : "left-1"
                  }`}></div>
                </button>
                <span className="text-sm text-white/90 font-medium">
                  {mfaEnabled ? "Enabled" : "Disabled"}
                </span>
                <ChevronRight size={18} className="text-white/40" />
              </div>
            </div>

            {/* Change Password */}
            {!isChangingPassword ? (
              <button 
                onClick={() => setIsChangingPassword(true)}
                className="flex items-center justify-between w-full py-3 border-b border-white/5 hover:bg-white/5 rounded-lg px-2 transition group"
              >
                <div>
                  <div className="text-white/90 text-sm">Change Password</div>
                  <div className="text-xs text-white/50 mt-0.5">Demo: Use current password: <span className="text-blue-400 font-mono">Admin@123</span></div>
                </div>
                <ChevronRight size={18} className="text-white/40 group-hover:text-white/70 transition" />
              </button>
            ) : (
              <div className="space-y-4 py-3 border-b border-white/5">
                {/* Inline Error Message for Password Section */}
                {errorMessage && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                    <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-400">{errorMessage}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm text-white/60 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                      className="w-full bg-[#1e1245]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 transition pr-10"
                    />
                    <button
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
                    >
                      {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Enter new password (min 8 characters)"
                      className="w-full bg-[#1e1245]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 transition pr-10"
                    />
                    <button
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
                    >
                      {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                      className="w-full bg-[#1e1245]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 transition pr-10"
                    />
                    <button
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
                    >
                      {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleChangePassword}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition"
                  >
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelPassword}
                    className="px-6 py-2.5 border border-white/10 hover:bg-white/10 text-white rounded-lg font-medium transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
