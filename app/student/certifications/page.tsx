"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  BookOpen,
  Briefcase,
  Check,
  DownloadCloud,
  FileText,
  GraduationCap,
  LayoutGrid,
  MessageSquare,
  Pencil,
  Plus,
  Shield,
  ShieldCheck,
  Sparkles,
  Trash2,
  User,
} from "lucide-react"
import StudentSidebar from "@/components/student-sidebar"

const navItems = [
  { label: "Dashboard", href: "/student", icon: FileText },
  { label: "Profile", href: "/student/profile", icon: User },
  { label: "Education", href: "/student/education", icon: GraduationCap },
  { label: "Projects", href: "/student/projects", icon: Briefcase },
  { label: "Skills", href: "/student/skills", icon: Sparkles },
  { label: "Certifications", href: "/student/certifications", icon: ShieldCheck },
  { label: "Resume Template", href: "/student/templates", icon: FileText },
  { label: "ATS Score", href: "/student/ats", icon: BookOpen },
  { label: "Download", href: "/student/download", icon: DownloadCloud },
]

const certifications = [
  {
    title: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services (AWS)",
    issuedOn: "Aug 2023",
    summary: "Validated skills in designing and deploying scalable systems on AWS.",
    credentialId: "aws-csa-12345",
    badgeColor: "from-[#f59e0b] to-[#f97316]",
  },
  {
    title: "Microsoft Certified: Azure AI Engineer Associate",
    issuer: "Microsoft",
    issuedOn: "Jan 2023",
    summary: "Demonstrated expertise in implementing AI and machine learning solutions on Microsoft Azure.",
    credentialId: "azure-ai-56789",
    badgeColor: "from-[#3b82f6] to-[#0ea5e9]",
  },
  {
    title: "Data Science Professional Certificate",
    issuer: "IBM",
    issuedOn: "May 2022",
    summary: "Comprehensive understanding of data science tools, methodologies, and applications.",
    credentialId: "ibm-ds-24680",
    badgeColor: "from-[#10b981] to-[#14b8a6]",
  },
]

export default function StudentCertificationsPage() {
  const pathname = usePathname()
  const completion = 75
  const completed = 3
  const total = 4

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #0a0a18 0%, #0f1238 50%, #2e3cb3 100%)" }}
    >
      <div className="flex">
        <StudentSidebar />

        {/* Content */}
        <main className="flex-1 ml-64 px-6 md:px-10 py-8 space-y-8 max-w-6xl">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70">Student</p>
              <h1 className="text-3xl font-bold">Certifications</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3d63ff] hover:bg-[#3151d6] text-sm font-semibold shadow-lg shadow-indigo-900/40 transition">
                <Plus className="w-4 h-4" /> Add Certification
              </button>
              <div className="flex items-center gap-3 bg-white/10 rounded-full px-3 py-1">
                <button className="p-2 rounded-full hover:bg-white/10 transition" aria-label="notifications">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-white/10 transition" aria-label="messages">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10">
                  <Image src="/image/STON.png" alt="avatar" width={36} height={36} className="h-full w-full object-cover" />
                </div>
                <div className="leading-tight text-left">
                  <p className="text-sm font-semibold">Anil Kumar</p>
                  <p className="text-[11px] text-white/60">Student</p>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 items-start">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-white/85">
                <Shield className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Certification Skills</h2>
              </div>

              <div className="space-y-4">
                {certifications.map((cert) => (
                  <article key={cert.title} className="bg-white rounded-2xl shadow-lg border border-gray-200 text-gray-900 overflow-hidden">
                    <div className="flex items-start gap-4 px-5 py-4">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${cert.badgeColor} flex items-center justify-center text-white font-semibold shadow`}> 
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-lg font-semibold">{cert.title}</h3>
                        <p className="text-sm text-gray-700">Issued by: {cert.issuer}</p>
                        <p className="text-sm text-gray-700">Issued on: {cert.issuedOn}</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{cert.summary}</p>
                        <p className="text-sm text-indigo-600 font-semibold">Credential ID: {cert.credentialId}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition" aria-label="Edit certification">
                          <Pencil className="w-4 h-4 mx-auto" />
                        </button>
                        <button className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 transition" aria-label="Delete certification">
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="bg-white rounded-2xl shadow-lg border border-gray-200 text-gray-800 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Certification Summary</p>
                  <p className="text-3xl font-bold text-gray-900">{completion}%</p>
                </div>
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 120 120" className="w-full h-full">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="10"
                      strokeDasharray="326"
                      strokeDashoffset={326 - (326 * completion) / 100}
                      strokeLinecap="round"
                      style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                    />
                    <text x="50%" y="50%" textAnchor="middle" dy="8" className="text-xl font-bold fill-gray-900">
                      {completion}%
                    </text>
                  </svg>
                </div>
              </div>

              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <span className="font-semibold">{completed}</span> / {total} certifications completed
                </p>
                <div className="flex items-center gap-2 text-emerald-600">
                  <Check className="w-4 h-4" />
                  <span>{completed} Completed Certifications</span>
                </div>
                <div className="flex items-center gap-2 text-amber-600">
                  <Check className="w-4 h-4" />
                  <span>{total - completed} Remaining Certification</span>
                </div>
              </div>

              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#3d63ff] hover:bg-[#3151d6] text-white font-semibold shadow-md transition">
                Add Remaining Certification
              </button>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  03-01-2024
                </div>
                <span className="font-medium text-gray-700">29°C</span>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
