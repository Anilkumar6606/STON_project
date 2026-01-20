"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Bell,
  BookOpen,
  CheckCircle2,
  DownloadCloud,
  FileText,
  GraduationCap,
  LayoutGrid,
  MessageSquare,
  Palette,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  ArrowLeft,
  FileDown,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import StudentSidebar from "@/components/student-sidebar"

const navItems = [
  { label: "Dashboard", href: "/student", icon: FileText },
  { label: "Profile", href: "/student/profile", icon: User },
  { label: "Education", href: "/student/education", icon: GraduationCap },
  { label: "Projects", href: "/student/projects", icon: Sparkles },
  { label: "Skills", href: "/student/skills", icon: Sparkles },
  { label: "Certifications", href: "/student/certifications", icon: ShieldCheck },
  { label: "Resume Template", href: "/student/templates", icon: FileText },
  { label: "ATS Score", href: "/student/ats", icon: BookOpen },
  { label: "Download", href: "/student/download", icon: DownloadCloud },
]

const resumeTemplates = [
  {
    id: 1,
    name: "Anil Kumar",
    title: "B.Tech (AI & ML) Student",
    type: "one-page",
    thumbnail: "/image/resume-1.png",
    key: "classic-blue",
  },
  {
    id: 2,
    name: "Anil Kumar",
    title: "B.Tech (AI & ML) Student",
    type: "one-page",
    thumbnail: "/image/resume-2.png",
    key: "subtle-silver",
  },
  {
    id: 3,
    name: "Anil Kumar",
    title: "B.Tech (AI & ML) Student",
    type: "two-page",
    thumbnail: "/image/resume-3.png",
    key: "golden-highlight",
  },
  {
    id: 4,
    name: "Anil Kumar",
    title: "B.Tech (AI & ML) Student",
    type: "digital",
    thumbnail: "/image/resume-4.png",
    key: "digital",
  },
  {
    id: 5,
    name: "ATS Friendly",
    title: "ATS Optimized",
    type: "one-page",
    thumbnail: "/image/resume-ats-1.png",
    badge: "ATS",
    key: "ats-1",
  },
  {
    id: 6,
    name: "ATS Friendly",
    title: "ATS Optimized",
    type: "one-page",
    thumbnail: "/image/resume-ats-2.png",
    badge: "ATS",
    key: "ats-2",
  },
  {
    id: 7,
    name: "ATS Friendly",
    title: "ATS Optimized",
    type: "two-page",
    thumbnail: "/image/resume-ats-3.png",
    badge: "ATS",
    key: "ats-3",
  },
  {
    id: 8,
    name: "Anil Kumar",
    title: "B.Tech (AI & ML) Student",
    type: "digital",
    thumbnail: "/image/resume-5.png",
    key: "digital-alt",
  },
]

export default function StudentDownloadPage() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedResume, setSelectedResume] = useState<any>(null)

  const templateKey = searchParams.get("template")
  useEffect(() => {
    if (templateKey) {
      const match = resumeTemplates.find((r) => r.key === templateKey)
      if (match) setSelectedResume(match)
    }
  }, [templateKey])

  const filteredResumes = resumeTemplates.filter((resume) => {
    if (selectedTab === "all") return true
    if (selectedTab === "one-page") return resume.type === "one-page"
    if (selectedTab === "two-page") return resume.type === "two-page"
    if (selectedTab === "three-page") return resume.type === "three-page"
    if (selectedTab === "digital") return resume.type === "digital"
    return true
  })

  const handleDownload = (format: string) => {
    if (!selectedResume) return
    const name = selectedResume.name || "Resume"
    const title = selectedResume.title || ""
    const type = selectedResume.type || ""
    const content = `Name: ${name}\nTitle: ${title}\nType: ${type}\nGenerated: ${new Date().toISOString()}`
    const mime =
      format === "pdf"
        ? "application/pdf"
        : format === "docx"
        ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        : "text/plain"
    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `resume-${selectedResume.id || "selected"}.${format}`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handlePreview = () => {
    const key = selectedResume?.key || templateKey || ""
    router.push(key ? `/student/resume-preview?template=${key}` : "/student/resume-preview")
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #0a0a18 0%, #0f1238 50%, #2e3cb3 100%)" }}
    >
      <div className="flex">
        <StudentSidebar />

        {/* Main Content */}
        <main className="flex-1 ml-64">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-black/30 backdrop-blur border-b border-white/15 px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Download Resume</h1>
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg hover:bg-white/10 transition-all relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-semibold">
                  AK
                </div>
              </div>
            </div>
          </header>

          {!selectedResume ? (
            // Resume Selection View
            <div className="px-8 py-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Download Resume</h2>
                <p className="text-white/60">Choose and download the resume that suits your needs</p>
              </div>

              {/* Tabs */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex bg-white/10 backdrop-blur rounded-lg p-1">
                  <button
                    onClick={() => setSelectedTab("all")}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      selectedTab === "all"
                        ? "bg-[#4f46e5] text-white shadow-lg"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedTab("one-page")}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      selectedTab === "one-page"
                        ? "bg-[#4f46e5] text-white shadow-lg"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    One Page
                  </button>
                  <button
                    onClick={() => setSelectedTab("two-page")}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      selectedTab === "two-page"
                        ? "bg-[#4f46e5] text-white shadow-lg"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    Two Page
                  </button>
                  <button
                    onClick={() => setSelectedTab("three-page")}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      selectedTab === "three-page"
                        ? "bg-[#4f46e5] text-white shadow-lg"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    Three Page
                  </button>
                  <button
                    onClick={() => setSelectedTab("digital")}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                      selectedTab === "digital"
                        ? "bg-[#4f46e5] text-white shadow-lg"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    Digital
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
                      New
                    </span>
                  </button>
                </div>
              </div>

              {/* Resume Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {filteredResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/15 transition-all group cursor-pointer"
                  >
                    <div className="relative mb-4">
                      {resume.badge && (
                        <Badge className="absolute top-2 left-2 bg-[#4f46e5] text-white border-0 z-10">
                          {resume.badge}
                        </Badge>
                      )}
                      <div className="bg-white rounded-lg overflow-hidden aspect-[1/1.4] flex items-center justify-center">
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <FileText className="w-20 h-20 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-white mb-1">{resume.name}</h3>
                      <p className="text-xs text-white/60">{resume.title}</p>
                    </div>
                    <Button
                      onClick={() => setSelectedResume(resume)}
                      className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-lg py-2 flex items-center justify-center gap-2 transition-all"
                    >
                      Download <FileDown className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Download Options View
            <div className="px-8 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">Your Resume is Ready!</h2>
                  <p className="text-white/60">Choose and download the resume that suits your needs</p>
                </div>

                <div className="bg-gradient-to-br from-[#4f46e5]/20 to-[#7c3aed]/20 backdrop-blur rounded-2xl p-8 border border-white/20">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
                          AK
                        </div>
                        <div className="absolute bottom-0 right-0 w-7 h-7 bg-green-500 rounded-full border-4 border-white/20 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-center mb-2">{selectedResume.name}</h3>
                    <p className="text-center text-white/70 mb-6">{selectedResume.title}</p>

                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-48">
                        <div className="bg-white rounded-lg overflow-hidden aspect-[1/1.4] flex items-center justify-center shadow-xl">
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <FileText className="w-16 h-16 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4">
                          <Palette className="w-5 h-5 text-[#4f46e5]" />
                          <h4 className="font-semibold text-lg">
                            {selectedResume.badge === "ATS" ? "ATS Friendly Resume" : "Professional Resume"}
                          </h4>
                        </div>
                        <p className="text-white/70 text-sm mb-4">
                          {selectedResume.badge === "ATS"
                            ? "Single page, ATS optimized resume with a clean, simple, and professional design."
                            : "Professional resume with clean layout and modern design."}
                        </p>
                        <div className="mb-4">
                          <p className="text-sm text-white/80 mb-2">
                            <span className="font-semibold">Total Pages:</span> 1
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs font-medium">Primary Keywords:</span>
                            <Badge variant="secondary" className="bg-[#4f46e5]/20 text-white border-0">
                              Python
                            </Badge>
                            <Badge variant="secondary" className="bg-[#4f46e5]/20 text-white border-0">
                              Machine Learning
                            </Badge>
                            <Badge variant="secondary" className="bg-[#4f46e5]/20 text-white border-0">
                              Java
                            </Badge>
                            <Badge variant="secondary" className="bg-[#4f46e5]/20 text-white border-0">
                              AI
                            </Badge>
                            <Badge variant="secondary" className="bg-[#4f46e5]/20 text-white border-0">
                              Django
                            </Badge>
                          </div>
                        </div>

                        <div className="flex gap-3 mb-3">
                          <Button
                            onClick={handlePreview}
                            className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-semibold"
                          >
                            <Eye className="w-5 h-5" />
                            Preview Resume
                          </Button>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleDownload("pdf")}
                            className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-semibold"
                          >
                            <FileText className="w-5 h-5" />
                            Download PDF
                          </Button>
                          <Button
                            onClick={() => handleDownload("docx")}
                            className="flex-1 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-semibold"
                          >
                            <FileText className="w-5 h-5" />
                            Download DOCX
                          </Button>
                          <Button
                            onClick={() => handleDownload("txt")}
                            className="flex-1 bg-gray-500/50 hover:bg-gray-500/70 text-white rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-semibold"
                          >
                            <FileText className="w-5 h-5" />
                            Download TXT
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedResume(null)}
                    className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-all mx-auto text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Choose Different Resume
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
