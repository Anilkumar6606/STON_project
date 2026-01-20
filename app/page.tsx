"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  return (
    <div className="min-h-screen text-white" style={{
      background: "radial-gradient(circle at 20% 20%, rgba(55,55,120,0.25) 0, rgba(8,8,20,0) 40%), radial-gradient(circle at 80% 30%, rgba(70,70,255,0.25) 0, rgba(10,10,40,0) 45%), linear-gradient(135deg, #05050f 0%, #0b0b2a 38%, #20208a 70%, #3a3ad8 100%)"
    }}>
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="w-full px-4 md:px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-white">
            <Image
              src="/image/STON.png"
              alt="STON Technology logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain drop-shadow"
              priority
            />
            <span className="tracking-tight">STON TECHNOLOGY</span>
          </Link>
          <div className="flex items-center gap-7 text-sm">
            <Link href="#home" className="text-white/80 hover:text-white transition">
              Home
            </Link>
            <Link href="#features" className="text-white/80 hover:text-white transition">
              Features
            </Link>
            <Link href="#templates" className="text-white/80 hover:text-white transition">
              Templates
            </Link>
            <Link href="#pricing" className="text-white/80 hover:text-white transition">
              Pricing
            </Link>
            <Link href="/placement/dashboard" className="text-white/80 hover:text-white transition">
              ATS Score
            </Link>
            <Link href="#faq" className="text-white/80 hover:text-white transition">
              FAQ
            </Link>
            <Link
              href="/login"
              className="font-medium bg-[#0ca0ff] text-white px-6 py-2.5 rounded-full hover:brightness-110 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="font-medium text-white px-4 py-2 rounded-full hover:text-white/80 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="h-20 w-20 flex items-center justify-center rounded-full bg-white/5 backdrop-blur border border-white/10 shadow-lg">
            <Image
              src="/image/STON.png"
              alt="STON Technology logo"
              width={80}
              height={80}
              className="h-16 w-16 object-contain drop-shadow"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white max-w-3xl uppercase">
            Build a job-winning resume in minutes with AI
          </h1>
          <p className="text-lg text-white/85 max-w-3xl leading-relaxed">
            Our platform helps us to create professional, ATS friendly resume effortlessly
          </p>
          <Link
            href="/login"
            className="group inline-flex items-center gap-3 bg-white text-[#0b0b2a] px-7 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
          >
            Start Free Today
            <span className="h-9 w-9 rounded-full bg-[#0b0b2a] text-white flex items-center justify-center group-hover:scale-105 transition">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-white/10 bg-white/0">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold text-white mb-3 tracking-wide">Why Choose Our AI Resume Platform?</h2>
          <p className="text-base text-white/80 mb-10">Smart Features to elevate your job Applications</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-white/70">
          <p className="text-white/80">© 2025 STON Technology. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
