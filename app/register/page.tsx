"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: hook up to real registration
    console.log({ username, email, password, confirm })
    
    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true)
      setIsSubmitting(false)
      
      // Navigate to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 800)
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(55,55,120,0.25) 0, rgba(8,8,20,0) 40%), radial-gradient(circle at 80% 30%, rgba(70,70,255,0.25) 0, rgba(10,10,40,0) 45%), linear-gradient(135deg, #05050f 0%, #0b0b2a 38%, #20208a 70%, #3a3ad8 100%)",
      }}
    >
      <div className="w-full max-w-md bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl text-white">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight">Create your account</h1>
          <p className="text-sm text-white/80 mt-2">Start building your job-winning resume with STON Technology.</p>
        </div>

        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
            <p className="text-white/80 mb-4">Your account has been created successfully.</p>
            <p className="text-sm text-white/70">Redirecting to dashboard...</p>
          </div>
        ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm text-white/90" htmlFor="username">Username</label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your_username"
              className="bg-white text-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/90" htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="bg-white text-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/90" htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-white text-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/90" htmlFor="confirm">Confirm Password</label>
            <Input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="bg-white text-foreground"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-[#0b0b2a] hover:brightness-95 font-semibold py-2.5 disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
        )}

        <div className="mt-6 flex items-center gap-2 text-sm justify-center text-white/80">
          Already have an account?
          <Link href="/login" className="font-semibold text-white hover:text-white/90 underline">
            Login
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center text-xs text-white/60 gap-1">
          By signing up, you agree to our
          <Link href="#" className="underline">Terms</Link>
          and
          <Link href="#" className="underline">Privacy Policy</Link>.
        </div>
      </div>
    </main>
  )
}
