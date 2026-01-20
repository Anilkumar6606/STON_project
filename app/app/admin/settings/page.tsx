"use client"

import { useState } from "react"
import { ChevronDown, User, Shield, Settings as SettingsIcon, AlertCircle, CheckCircle } from "lucide-react"

export default function SettingsPage() {
  const [adminName, setAdminName] = useState("Syed Sameer")
  const [adminEmail, setAdminEmail] = useState("admin@stoncv.com")
  const [sessionTimeout, setSessionTimeout] = useState(30)
  const [mfaEnabled, setMfaEnabled] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(true)
  const [auditLogging, setAuditLogging] = useState(true)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleUpdateInfo = () => {
    if (!adminName.trim()) {
      setErrorMessage("Admin name is required")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    if (!adminEmail.trim() || !adminEmail.includes("@")) {
      setErrorMessage("Valid email is required")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    setSuccessMessage("Admin information updated successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleSessionTimeoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 30
    if (value >= 5 && value <= 120) {
      setSessionTimeout(value)
    }
  }

  const toggleMFA = () => {
    setMfaEnabled(!mfaEnabled)
    setSuccessMessage(`Multi-Factor Authentication ${!mfaEnabled ? "enabled" : "disabled"}`)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const toggleMaintenanceMode = () => {
    setMaintenanceMode(!maintenanceMode)
    setSuccessMessage(`Platform Maintenance Mode ${!maintenanceMode ? "enabled" : "disabled"}`)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const toggleAuditLogging = () => {
    setAuditLogging(!auditLogging)
    setSuccessMessage(`Audit Logging ${!auditLogging ? "enabled" : "disabled"}`)
    setTimeout(() => setSuccessMessage(""), 3000)
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
          
          {/* Success/Error Messages */}
          {successMessage && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-start gap-3">
              <CheckCircle size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-400">{successMessage}</p>
            </div>
          )}
          {errorMessage && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{errorMessage}</p>
            </div>
          )}
            
            {/* Admin Account Section */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <div className="flex items-center gap-2 mb-6 text-white/80">
                    <User size={20} />
                    <h2 className="font-semibold">Admin Account</h2>
                </div>
                
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
                        <button className="text-xs text-white/50 hover:text-white transition text-center">
                            Change Password
                        </button>
                    </div>
                </div>
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
                        <div className="flex-1 flex items-center gap-4 max-w-md">
                            <input 
                              type="range"
                              min="5"
                              max="120"
                              value={sessionTimeout}
                              onChange={handleSessionTimeoutChange}
                              className="flex-1 h-2 bg-blue-900/30 rounded-full appearance-none cursor-pointer accent-blue-600"
                            />
                            <input 
                              type="number"
                              min="5"
                              max="120"
                              value={sessionTimeout}
                              onChange={handleSessionTimeoutChange}
                              className="bg-white/10 px-3 py-1 rounded text-sm font-medium min-w-[60px] text-center border border-white/10 text-white"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <label className="text-sm text-white/60 w-[200px]">Enable Multi-Factor Authentication</label>
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
                              onClick={toggleMaintenanceMode}
                              className={`w-11 h-6 rounded-full relative transition-colors ${
                                maintenanceMode ? "bg-emerald-600" : "bg-white/10"
                              }`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                                  maintenanceMode ? "right-1" : "left-1"
                                }`}></div>
                            </button>
                            <span className="text-sm text-white/90">{maintenanceMode ? "Enabled" : "Disabled"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <label className="text-sm text-white/60 w-[200px]">Enable Audit Logging</label>
                        <div className="flex items-center gap-3">
                            <button
                              onClick={toggleAuditLogging}
                              className={`w-11 h-6 rounded-full relative transition-colors ${
                                auditLogging ? "bg-emerald-600" : "bg-white/10"
                              }`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                                  auditLogging ? "right-1" : "left-1"
                                }`}></div>
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
