"use client"

import { ChevronDown, User, Shield, Settings as SettingsIcon, Eye, EyeOff, Check, X } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  // Admin Account State
  const [adminName, setAdminName] = useState("Syed Sameer")
  const [adminEmail, setAdminEmail] = useState("admin@stoncv.com")
  const [accountUpdated, setAccountUpdated] = useState(false)

  // Password State
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // Access Controls State
  const [sessionTimeout, setSessionTimeout] = useState(30)
  const [mfaEnabled, setMfaEnabled] = useState(true)

  // System Settings State
  const [maintenanceMode, setMaintenanceMode] = useState(true)
  const [auditLogging, setAuditLogging] = useState(true)

  const handleUpdateInfo = () => {
    if (!adminName.trim() || !adminEmail.trim()) return
    setAccountUpdated(true)
    setTimeout(() => setAccountUpdated(false), 3000)
  }

  const handleChangePassword = () => {
    setPasswordError("")
    setPasswordSuccess(false)

    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setPasswordError("All fields are required")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters")
      return
    }

    setPasswordSuccess(true)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setShowPasswordForm(false)
    setTimeout(() => setPasswordSuccess(false), 3000)
  }

  return (
    <>
      <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#16103a]/30 backdrop-blur">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Settings</h1>
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
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl space-y-6">
            
            {/* Admin Account Section */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <div className="flex items-center gap-2 mb-6 text-white/80">
                    <User size={20} />
                    <h2 className="font-semibold">Admin Account</h2>
                </div>
                
                {accountUpdated && (
                  <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-2 text-emerald-400 text-sm">
                    <Check size={16} />
                    Admin information updated successfully
                  </div>
                )}

                <div className="flex gap-6">
                    <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-white/60">Admin Name</label>
                            <input
                              type="text"
                              value={adminName}
                              onChange={(e) => setAdminName(e.target.value)}
                              className="w-full bg-[#1e1245]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white/90 focus:outline-none focus:border-blue-500/50 transition"
                            />
                        </div>
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-white/60">Admin Email</label>
                            <input
                              type="email"
                              value={adminEmail}
                              onChange={(e) => setAdminEmail(e.target.value)}
                              className="w-full bg-[#1e1245]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white/90 focus:outline-none focus:border-blue-500/50 transition"
                            />
                        </div>
                    </div>
                    
                    <div className="w-40 flex flex-col gap-3">
                        <button
                          onClick={handleUpdateInfo}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition shadow-lg shadow-blue-900/20"
                        >
                            Update Info
                        </button>
                        <button
                          onClick={() => setShowPasswordForm((prev) => !prev)}
                          className="text-xs text-white/50 hover:text-white transition text-center"
                        >
                            Change Password
                        </button>
                    </div>
                </div>

                {showPasswordForm && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                    <h3 className="text-sm font-medium text-white/80">Change Password</h3>

                    {passwordError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                        <X size={16} />
                        {passwordError}
                      </div>
                    )}

                    {passwordSuccess && (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-2 text-emerald-400 text-sm">
                        <Check size={16} />
                        Password changed successfully
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="relative">
                        <label className="block text-xs text-white/60 mb-1.5">Current Password</label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full bg-[#1e1245]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white/90 focus:outline-none focus:border-blue-500/50 transition"
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                          >
                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-white/60 mb-1.5">New Password</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-[#1e1245]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white/90 focus:outline-none focus:border-blue-500/50 transition"
                            placeholder="Enter new password (min 8 chars)"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                          >
                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-white/60 mb-1.5">Confirm New Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-[#1e1245]/50 border border-white/10 rounded-lg px-4 py-2.5 text-white/90 focus:outline-none focus:border-blue-500/50 transition"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-3">
                      <button
                        onClick={handleChangePassword}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition"
                      >
                        Update Password
                      </button>
                      <button
                        onClick={() => {
                          setShowPasswordForm(false)
                          setCurrentPassword("")
                          setNewPassword("")
                          setConfirmPassword("")
                          setPasswordError("")
                        }}
                        className="px-4 py-2 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
            </div>

            {/* Access Controls Section */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <div className="flex items-center gap-2 mb-6 text-white/80">
                    <Shield size={20} />
                    <h2 className="font-semibold">Access Controls</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-8">
                        <label className="text-sm text-white/60 w-[200px]">Session Timeout (Minutes)</label>
                        <div className="flex-1 flex items-center gap-4">
                            <input
                              type="range"
                              min="5"
                              max="120"
                              value={sessionTimeout}
                              onChange={(e) => setSessionTimeout(Number(e.target.value))}
                              className="flex-1 h-1.5 bg-blue-900/30 rounded-full cursor-pointer accent-blue-600"
                            />
                            <div className="bg-white/10 px-3 py-1 rounded text-sm font-medium min-w-[50px] text-center">
                              {sessionTimeout}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <label className="text-sm text-white/60 w-[200px]">Enable Multi-Factor Authentication</label>
                        <div className="flex items-center gap-3">
                            <button
                              onClick={() => setMfaEnabled((prev) => !prev)}
                              className={`w-11 h-6 rounded-full relative transition-colors ${
                                mfaEnabled ? "bg-blue-600" : "bg-white/10"
                              }`}
                            >
                              <div
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                                  mfaEnabled ? "right-1" : "left-1"
                                }`}
                              />
                            </button>
                            <span className="text-sm text-white/90">{mfaEnabled ? "Enabled" : "Disabled"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* System Settings Section */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <div className="flex items-center gap-2 mb-6 text-white/80">
                    <SettingsIcon size={20} />
                    <h2 className="font-semibold">System Settings</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-8">
                        <label className="text-sm text-white/60 w-[200px]">Platform Maintenance Mode</label>
                        <div className="flex items-center gap-3">
                            <button
                              onClick={() => setMaintenanceMode((prev) => !prev)}
                              className={`w-11 h-6 rounded-full relative transition-colors ${
                                maintenanceMode ? "bg-blue-600" : "bg-white/10"
                              }`}
                            >
                              <div
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                                  maintenanceMode ? "right-1" : "left-1"
                                }`}
                              />
                            </button>
                            <span className="text-sm text-white/90">{maintenanceMode ? "Enabled" : "Disabled"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <label className="text-sm text-white/60 w-[200px]">Enable Audit Logging</label>
                        <div className="flex items-center gap-3">
                            <button
                              onClick={() => setAuditLogging((prev) => !prev)}
                              className={`w-11 h-6 rounded-full relative transition-colors ${
                                auditLogging ? "bg-blue-600" : "bg-white/10"
                              }`}
                            >
                              <div
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                                  auditLogging ? "right-1" : "left-1"
                                }`}
                              />
                            </button>
                            <span className="text-sm text-white/90">{auditLogging ? "Enabled" : "Disabled"}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </>
  )
}
