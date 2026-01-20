"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { AlertCircle, X, CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<"email" | "otp" | "reset" | "success">("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!email.trim()) {
      setError("Please enter your email address")
      setIsLoading(false)
      return
    }

    // Simulate sending OTP
    try {
      setTimeout(() => {
        setMessage(`OTP sent to ${email}`)
        setStep("otp")
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError("Failed to send OTP. Please try again.")
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!otp.trim() || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      setIsLoading(false)
      return
    }

    // Simulate verifying OTP
    try {
      setTimeout(() => {
        setMessage(null)
        setStep("reset")
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError("Invalid OTP. Please try again.")
      setIsLoading(false)
    }
  }

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Simulate resetting password
    try {
      setTimeout(() => {
        setStep("success")
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError("Failed to reset password. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl text-white">
        <div className="flex justify-between items-center mb-4">
          {step !== "email" && step !== "success" && (
            <button
              type="button"
              onClick={() => {
                if (step === "otp") setStep("email")
                else if (step === "reset") setStep("otp")
              }}
              className="p-2 rounded-full hover:bg-white/10 transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="p-2 rounded-full hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/image/STON.png"
              alt="STON Technology logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain drop-shadow"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">STON TECHNOLOGY</h1>
          <p className="text-sm text-white/80">
            {step === "email" && "Reset your password"}
            {step === "otp" && "Verify your email"}
            {step === "reset" && "Create new password"}
            {step === "success" && "Password reset successful"}
          </p>
        </div>

        <div className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {message && (
            <Alert className="border-green-500/50 bg-green-500/10">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-100">{message}</AlertDescription>
            </Alert>
          )}

          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-sm text-white/70">
                <p>Enter your email address and we'll send you an OTP to reset your password.</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:opacity-90 text-primary-foreground font-medium py-2 rounded-lg transition-opacity"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>

              <div className="text-center text-xs">
                <Link href="/login" className="text-white/80 hover:text-white">
                  Back to login
                </Link>
              </div>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-sm text-white/70">
                <p>We've sent a 6-digit OTP to <span className="font-semibold text-white">{email}</span></p>
              </div>

              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium text-foreground">
                  Enter OTP
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="w-full text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:opacity-90 text-primary-foreground font-medium py-2 rounded-lg transition-opacity"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>

              <div className="text-center text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setOtp("")
                    setEmail("")
                    setStep("email")
                  }}
                  className="text-white/80 hover:text-white"
                >
                  Use different email
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Reset Password */}
          {step === "reset" && (
            <form onSubmit={handleResetSubmit} className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-sm text-white/70">
                <p>Create a new password for your account. Make sure it's strong and unique.</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium text-white">
                  New Password
                </label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full"
                  required
                />
                <p className="text-xs text-white/60">Minimum 8 characters</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:opacity-90 text-primary-foreground font-medium py-2 rounded-lg transition-opacity"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}

          {/* Step 4: Success */}
          {step === "success" && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold">Password Reset Successful!</h2>
                <p className="text-sm text-white/80">Your password has been updated successfully.</p>
              </div>

              <Button
                onClick={() => router.push("/login")}
                className="w-full bg-primary hover:opacity-90 text-primary-foreground font-medium py-2 rounded-lg transition-opacity"
              >
                Back to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
