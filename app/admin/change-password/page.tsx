"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChangePasswordPage() {
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleCancel = () => {
    router.push("/admin/profile")
  }

  const handleUpdatePassword = () => {
    // Handle password update logic here
    console.log("Password update requested")
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

      {/* Change Password Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-2xl">
          {/* Change Password Card */}
          <div className="bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Change Password</h2>
            <p className="text-white/60 text-sm mb-8">
              Enter your current password and the new password you wish to set
            </p>

            <div className="space-y-6">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <Lock size={16} className="text-white/60" />
                  Current Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-12 rounded-lg"
                />
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <Lock size={16} className="text-white/60" />
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-12 rounded-lg"
                />
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <Lock size={16} className="text-white/60" />
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-12 rounded-lg"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="px-8 py-2 h-11 bg-transparent border border-white/20 text-white/80 hover:bg-white/5 hover:text-white rounded-lg font-medium"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdatePassword}
                  className="px-8 py-2 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg shadow-blue-600/30"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
