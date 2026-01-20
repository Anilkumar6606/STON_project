"use client"

import Image from "next/image"
import Link from "next/link"
import { LogOut, User, GraduationCap, Briefcase, Zap, Award, FileText, Download, Eye, FileCheck } from "lucide-react"
import StudentSidebar from "@/components/student-sidebar"

type ResumeSection = {
  icon: React.ReactNode
  label: string
  status: "Completed" | "Pending" | "PNG/PDF/JPG"
}

export default function StudentDashboard() {
  const resumeSections: ResumeSection[] = [
    { icon: <User className="w-5 h-5" />, label: "Personal Information", status: "Completed" },
    { icon: <GraduationCap className="w-5 h-5" />, label: "Education", status: "Pending" },
    { icon: <Zap className="w-5 h-5" />, label: "Skills", status: "Completed" },
    { icon: <Briefcase className="w-5 h-5" />, label: "Projects", status: "Pending" },
    { icon: <Award className="w-5 h-5" />, label: "Certifications", status: "Completed" },
    { icon: <Download className="w-5 h-5" />, label: "Download", status: "PNG/PDF/JPG" },
  ]

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "linear-gradient(135deg, #0a0a18 0%, #0f1238 50%, #2e3cb3 100%)",
      }}
    >
      <div className="flex">
        <StudentSidebar />

      {/* Content */}
      <div className="ml-64 px-10 py-10 w-full">
        <div className="space-y-8">
          {/* Header */}
          <header className="flex items-center justify-between">
            <div className="w-24" />
            <h1 className="text-3xl font-extrabold tracking-wide">Dashboard</h1>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium">Anil kumar</div>
                <div className="text-xs text-white/60">anilkumarpeddabayi@gmail.com</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold">
                Ak
              </div>
            </div>
          </header>

          {/* Top Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Completion */}
            <div className="bg-white/95 text-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="text-sm font-medium text-gray-600 mb-4">Profile Completion</div>
              <div className="text-5xl font-bold mb-6">75%</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>

            {/* ATS Score */}
            <div className="bg-white/95 text-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="text-sm font-medium text-gray-600 mb-4">ATS Score</div>
              <div className="text-5xl font-bold mb-2">82</div>
              <div className="text-sm text-gray-500">Above average</div>
            </div>

            {/* Resume Templates */}
            <div className="bg-white/95 text-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="text-sm font-medium text-gray-600 mb-4">Resume Templates</div>
              <div className="text-base text-gray-700 mt-12">3 templates available</div>
            </div>
          </section>

          {/* Resume Sections */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Resume Sections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resumeSections.map((section) => (
                <div
                  key={section.label}
                  className="bg-white/95 text-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 text-xl">
                      {section.icon}
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-semibold ${
                        section.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : section.status === "Pending"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {section.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{section.label}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-6 shadow-lg transition flex items-center justify-center gap-3 font-semibold text-lg">
              <FileCheck className="w-6 h-6" />
              Select Template
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-6 shadow-lg transition flex items-center justify-center gap-3 font-semibold text-lg">
              <Eye className="w-6 h-6" />
              Preview Resume
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-6 shadow-lg transition flex items-center justify-center gap-3 font-semibold text-lg">
              <Download className="w-6 h-6" />
              Download PDF
            </button>
          </section>
        </div>
      </div>
      </div>
    </div>
  )
}
