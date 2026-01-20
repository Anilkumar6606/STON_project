"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {
  BookOpen,
  Briefcase,
  Check,
  ChevronDown,
  ChevronUp,
  DownloadCloud,
  FileText,
  GraduationCap,
  Home,
  Pencil,
  ShieldCheck,
  Sparkles,
  Trash2,
  User,
  X,
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

const currentEducation = {
  title: "B.Tech – CSE (AI & ML)",
  degree: "B.Tech (Bachelor of Technology)",
  specialization: "Computer Science & Engineering (Artificial Intelligence & Machine Learning)",
  college: "ABC Institute of Technology",
  board: "University",
  expectedYear: 2026,
  cgpa: 8.6,
  status: "In Progress",
  startYear: 2023,
}

const previousEducation = [
  {
    title: "Diploma",
    school: "BSET College",
    board: "State Board",
    year: "2020 - 2023",
    percentage: 6.89,
  },
  {
    title: "SSC",
    school: "Parveda High School",
    board: "State Board",
    year: "2018 - 2020",
    percentage: 9.8,
  },
]

export default function StudentEducationPage() {
  const pathname = usePathname()
  const [previousEducation, setPreviousEducation] = useState([
    {
      id: 1,
      title: "Diploma",
      school: "BSET College",
      board: "State Board",
      year: "2020 - 2023",
      percentage: 6.89,
    },
    {
      id: 2,
      title: "SSC",
      school: "Parveda High School",
      board: "State Board",
      year: "2018 - 2020",
      percentage: 9.8,
    },
  ])

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    title: "",
    school: "",
    board: "",
    year: "",
    percentage: 0,
  })

  // Load education data from localStorage on mount
  useEffect(() => {
    const savedEducation = localStorage.getItem('studentEducation')
    if (savedEducation) {
      setPreviousEducation(JSON.parse(savedEducation))
    }
  }, [])

  // Save to localStorage whenever previousEducation changes
  useEffect(() => {
    localStorage.setItem('studentEducation', JSON.stringify(previousEducation))
  }, [previousEducation])

  const startEdit = (edu: any) => {
    setEditingId(edu.id)
    setEditForm({
      title: edu.title,
      school: edu.school,
      board: edu.board,
      year: edu.year,
      percentage: edu.percentage,
    })
  }

  const saveEdit = (id: number) => {
    setPreviousEducation(
      previousEducation.map((edu) =>
        edu.id === id
          ? {
              ...edu,
              title: editForm.title,
              school: editForm.school,
              board: editForm.board,
              year: editForm.year,
              percentage: editForm.percentage,
            }
          : edu
      )
    )
    setEditingId(null)
    setEditForm({ title: "", school: "", board: "", year: "", percentage: 0 })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({ title: "", school: "", board: "", year: "", percentage: 0 })
  }

  const moveEducationUp = (id: number) => {
    const index = previousEducation.findIndex(edu => edu.id === id)
    if (index > 0) {
      const newEducation = [...previousEducation]
      ;[newEducation[index - 1], newEducation[index]] = [newEducation[index], newEducation[index - 1]]
      setPreviousEducation(newEducation)
    }
  }

  const moveEducationDown = (id: number) => {
    const index = previousEducation.findIndex(edu => edu.id === id)
    if (index < previousEducation.length - 1) {
      const newEducation = [...previousEducation]
      ;[newEducation[index + 1], newEducation[index]] = [newEducation[index], newEducation[index + 1]]
      setPreviousEducation(newEducation)
    }
  }

  const deleteEducation = (id: number) => {
    setPreviousEducation(previousEducation.filter(edu => edu.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f26] via-[#0b1030] to-[#1a2e7a] text-white">
      <div className="flex">
        <StudentSidebar />

        <main className="flex-1 ml-64 px-6 md:px-10 py-8 space-y-8 max-w-6xl">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70">Student</p>
              <h1 className="text-3xl font-bold">Education</h1>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-full px-3 py-1">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10">
                <Image src="/image/STON.png" alt="avatar" width={36} height={36} className="h-full w-full object-cover" />
              </div>
              <div className="leading-tight text-left">
                <p className="text-sm font-semibold">Anil Kumar</p>
                <p className="text-[11px] text-white/60">Student</p>
              </div>
            </div>
          </header>

          <section className="space-y-6">
            {/* Current Education - Main Focus */}
            <div className="bg-gradient-to-br from-[#4c54d2]/40 to-[#5865f2]/20 backdrop-blur-md border border-[#5865f2]/50 rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-8 py-6 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-white">{currentEducation.title}</h2>
                    <p className="text-sm text-white/70 mt-2">{currentEducation.degree}</p>
                  </div>
                  <span className="px-4 py-2 rounded-full text-sm bg-emerald-500/30 text-emerald-200 font-semibold border border-emerald-500/50">
                    {currentEducation.status}
                  </span>
                </div>

                {/* Main Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* College Info */}
                  <div>
                    <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-2">College Name</p>
                    <p className="text-xl font-semibold text-white">{currentEducation.college}</p>
                  </div>

                  {/* CGPA - Highlighted */}
                  <div className="bg-gradient-to-r from-[#5865f2]/30 to-[#7289da]/30 rounded-xl p-4 border border-[#5865f2]/40">
                    <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-2">CGPA / GPA</p>
                    <p className="text-3xl font-bold text-white">{currentEducation.cgpa} / 10</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-6 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex-1">
                    <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-1">Starting Year</p>
                    <p className="text-xl font-bold text-white">{currentEducation.startYear}</p>
                  </div>
                  <div className="text-white/40">
                    <div className="text-3xl">→</div>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-1">Finishing Year</p>
                    <p className="text-xl font-bold text-white">{currentEducation.expectedYear}</p>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-xs text-white/60 font-bold uppercase tracking-wide mb-1">Specialization</p>
                    <p className="text-sm text-white">{currentEducation.specialization}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-xs text-white/60 font-bold uppercase tracking-wide mb-1">University</p>
                    <p className="text-sm text-white">{currentEducation.board}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Education Timeline */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white px-2">Previous Education</h3>
              
              {previousEducation.map((edu, index) => (
                <div key={edu.id} className="bg-gradient-to-br from-[#4c54d2]/40 to-[#5865f2]/20 backdrop-blur-md border border-[#5865f2]/50 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="px-8 py-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-4xl font-bold text-white">{edu.title}</h2>
                        <p className="text-sm text-white/70 mt-2">{edu.school}</p>
                      </div>
                      <span className="px-4 py-2 rounded-full text-sm bg-blue-500/30 text-blue-200 font-semibold border border-blue-500/50">
                        Completed
                      </span>
                    </div>

                    {/* Main Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* School/College Name */}
                      <div>
                        <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-2">School / College</p>
                        <p className="text-xl font-semibold text-white">{edu.school}</p>
                      </div>

                      {/* Percentage - Highlighted */}
                      <div className="bg-gradient-to-r from-[#5865f2]/30 to-[#7289da]/30 rounded-xl p-4 border border-[#5865f2]/40">
                        <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-2">Percentage</p>
                        <p className="text-3xl font-bold text-white">{edu.percentage}%</p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-6 bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex-1">
                        <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-1">Starting Year</p>
                        <p className="text-xl font-bold text-white">{edu.year.split(" - ")[0]}</p>
                      </div>
                      <div className="text-white/40">
                        <div className="text-3xl">→</div>
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-1">Finishing Year</p>
                        <p className="text-xl font-bold text-white">{edu.year.split(" - ")[1]}</p>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <p className="text-xs text-white/60 font-bold uppercase tracking-wide mb-1">Board</p>
                        <p className="text-sm text-white">{edu.board}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <p className="text-xs text-white/60 font-bold uppercase tracking-wide mb-1">Education Type</p>
                        <p className="text-sm text-white">{edu.title}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                      {/* Move Up Button */}
                      <button
                        onClick={() => moveEducationUp(edu.id)}
                        disabled={index === 0}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/40 disabled:bg-gray-500/10 disabled:opacity-50 border border-purple-500/50 hover:border-purple-500 disabled:border-gray-500/30 text-purple-300 hover:text-purple-200 disabled:text-gray-400 rounded-lg transition font-semibold"
                      >
                        <ChevronUp className="w-4 h-4" />
                        Move Up
                      </button>

                      {/* Move Down Button */}
                      <button
                        onClick={() => moveEducationDown(edu.id)}
                        disabled={index === previousEducation.length - 1}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/40 disabled:bg-gray-500/10 disabled:opacity-50 border border-purple-500/50 hover:border-purple-500 disabled:border-gray-500/30 text-purple-300 hover:text-purple-200 disabled:text-gray-400 rounded-lg transition font-semibold"
                      >
                        <ChevronDown className="w-4 h-4" />
                        Move Down
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => startEdit(edu)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#4c54d2]/40 hover:bg-[#4c54d2]/60 border border-[#5865f2]/60 hover:border-[#5865f2] text-white rounded-lg transition font-semibold"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteEducation(edu.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 hover:border-red-500 text-red-400 hover:text-red-300 rounded-lg transition font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Education Button */}
            <button className="w-full bg-gradient-to-r from-[#4c54d2] to-[#5865f2] hover:from-[#3a4299] hover:to-[#4752c4] text-white rounded-xl px-6 py-4 font-semibold shadow-lg transition">
              + Add Education
            </button>
          </section>

          {/* Edit Modal */}
          {editingId !== null && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gradient-to-br from-[#4c54d2]/40 to-[#5865f2]/20 backdrop-blur-md border border-[#5865f2]/50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-8 py-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-white">Edit Education</h2>
                    <button
                      onClick={cancelEdit}
                      className="p-2 hover:bg-white/10 rounded-lg transition"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Education Type</label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#5865f2]"
                        placeholder="e.g., Diploma, SSC, B.Tech"
                      />
                    </div>

                    {/* School/College */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">School / College Name</label>
                      <input
                        type="text"
                        value={editForm.school}
                        onChange={(e) => setEditForm({ ...editForm, school: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#5865f2]"
                        placeholder="Enter school or college name"
                      />
                    </div>

                    {/* Board */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Board / University</label>
                      <input
                        type="text"
                        value={editForm.board}
                        onChange={(e) => setEditForm({ ...editForm, board: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#5865f2]"
                        placeholder="e.g., State Board, University"
                      />
                    </div>

                    {/* Year Range */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Year Range</label>
                      <input
                        type="text"
                        value={editForm.year}
                        onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#5865f2]"
                        placeholder="e.g., 2020 - 2023"
                      />
                    </div>

                    {/* Percentage */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Percentage / CGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.percentage}
                        onChange={(e) => setEditForm({ ...editForm, percentage: parseFloat(e.target.value) })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#5865f2]"
                        placeholder="e.g., 85.5"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => saveEdit(editingId)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500/30 hover:bg-emerald-500/50 border border-emerald-500/50 hover:border-emerald-500 text-emerald-300 hover:text-emerald-200 rounded-lg transition font-semibold"
                    >
                      <Check className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 hover:border-red-500 text-red-400 hover:text-red-300 rounded-lg transition font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <footer className="text-right text-xs text-white/60">03-01-2024</footer>
        </main>
      </div>
    </div>
  )
}
