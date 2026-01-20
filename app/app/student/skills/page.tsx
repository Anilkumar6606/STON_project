"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
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
  ShieldCheck,
  Sparkles,
  Trash2,
  User,
  Wrench,
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

const communicationSkills = [
  { id: "c-1", label: "Verbal Communication", level: 85 },
  { id: "c-2", label: "Written Communication", level: 78 },
  { id: "c-3", label: "Team Collaboration", level: 88 },
  { id: "c-4", label: "Public Speaking", level: 72 },
]

const technicalSkills = [
  { id: "t-tech-1", label: "Python", level: 90 },
  { id: "t-tech-2", label: "Java", level: 75 },
  { id: "t-tech-3", label: "JavaScript", level: 82 },
  { id: "t-tech-4", label: "HTML/CSS", level: 85 },
  { id: "t-tech-5", label: "Machine Learning", level: 78 },
  { id: "t-tech-6", label: "Data Structures", level: 88 },
  { id: "t-tech-7", label: "OOP", level: 84 },
  { id: "t-tech-8", label: "SQL", level: 80 },
]

const toolsTechnologies = [
  { id: "t-1", label: "TensorFlow", level: 80 },
  { id: "t-2", label: "Keras", level: 76 },
  { id: "t-3", label: "Scikit-Learn", level: 82 },
  { id: "t-4", label: "Git & GitHub", level: 90 },
  { id: "t-5", label: "Jupyter", level: 85 },
  { id: "t-6", label: "MySQL", level: 79 },
  { id: "t-7", label: "VS Code", level: 92 },
  { id: "t-8", label: "Docker", level: 74 },
]

export default function StudentSkillsPage() {
  const pathname = usePathname()
  const [skills, setSkills] = useState({ communication: communicationSkills, technical: technicalSkills, tools: toolsTechnologies })
  const [editMode, setEditMode] = useState<null | "communication" | "technical" | "tools">(null)
  const [newSkillName, setNewSkillName] = useState("")
  const [newSkillLevel, setNewSkillLevel] = useState(75)
  const completion = 75
  const completed = 3
  const total = 4

  const handleDeleteCommunication = (id: string) => {
    setSkills((prev) => ({ ...prev, communication: prev.communication.filter((s) => s.id !== id) }))
  }

  const handleDeleteTechnical = (id: string) => {
    setSkills((prev) => ({ ...prev, technical: prev.technical.filter((s) => s.id !== id) }))
  }

  const handleDeleteTools = (id: string) => {
    setSkills((prev) => ({ ...prev, tools: prev.tools.filter((s) => s.id !== id) }))
  }

  const handleAddSkill = () => {
    if (!newSkillName.trim() || !editMode) return

    const newId = `${editMode.charAt(0)}-${Date.now()}`
    const newSkill = { id: newId, label: newSkillName, level: newSkillLevel }

    if (editMode === "communication") {
      setSkills((prev) => ({ ...prev, communication: [...prev.communication, newSkill] }))
    } else if (editMode === "technical") {
      setSkills((prev) => ({ ...prev, technical: [...prev.technical, newSkill] }))
    } else if (editMode === "tools") {
      setSkills((prev) => ({ ...prev, tools: [...prev.tools, newSkill] }))
    }

    setNewSkillName("")
    setNewSkillLevel(75)
    setEditMode(null)
  }

  const handleCloseEditModal = () => {
    setEditMode(null)
    setNewSkillName("")
    setNewSkillLevel(75)
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #0a0a18 0%, #0f1238 50%, #2e3cb3 100%)" }}
    >
      <div className="flex">
        <StudentSidebar />

        {/* Content */}
        <main className="flex-1 ml-64 px-6 md:px-10 py-8 space-y-8 w-full">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70">Student</p>
              <h1 className="text-3xl font-bold">Skills</h1>
            </div>
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
          </header>

          <div className="grid grid-cols-2 gap-6 w-full">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 w-full">
                <Card>
                  <div className="flex items-center justify-between">
                    <SectionHeader icon={<MessageSquare className="w-5 h-5" />} title="Communication Skills" />
                    <button
                      onClick={() => setEditMode("communication")}
                      className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-600 hover:text-blue-600 hover:border-blue-500 flex items-center justify-center transition"
                      aria-label="Edit communication skills"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {skills.communication.map((skill) => (
                      <SkillBar key={skill.id} label={skill.label} level={skill.level} color="emerald" onDelete={() => handleDeleteCommunication(skill.id)} />
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 w-full">
                <Card>
                  <div className="flex items-center justify-between">
                    <SectionHeader icon={<GraduationCap className="w-5 h-5" />} title="Technical Skills" />
                    <button
                      onClick={() => setEditMode("technical")}
                      className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-600 hover:text-blue-600 hover:border-blue-500 flex items-center justify-center transition"
                      aria-label="Edit technical skills"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {skills.technical.map((skill) => (
                      <SkillBar key={skill.id} label={skill.label} level={skill.level} color="blue" onDelete={() => handleDeleteTechnical(skill.id)} />
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="w-full">
            <Card>
              <div className="flex items-center justify-between">
                <SectionHeader icon={<Wrench className="w-5 h-5" />} title="Tools & Technologies" />
                <button
                  onClick={() => setEditMode("tools")}
                  className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-600 hover:text-blue-600 hover:border-blue-500 flex items-center justify-center transition"
                  aria-label="Edit tools and technologies"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4 mt-4">
                {skills.tools.map((tool) => (
                  <SkillBar key={tool.id} label={tool.label} level={tool.level} color="violet" onDelete={() => handleDeleteTools(tool.id)} />
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Add{" "}
                {editMode === "communication"
                  ? "Communication Skill"
                  : editMode === "technical"
                    ? "Technical Skill"
                    : "Tool/Technology"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">Enter the name and proficiency level</p>
            </div>

            <div className="space-y-4 mb-6">
              {/* Skill Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Skill Name</label>
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g., Python, Leadership, Git"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                />
              </div>

              {/* Proficiency Level Slider */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Proficiency Level: {newSkillLevel}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCloseEditModal}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSkill}
                disabled={!newSkillName.trim()}
                className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return <section className="bg-white rounded-2xl shadow-lg border border-gray-200 text-gray-800 p-5 space-y-4">{children}</section>
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-800 font-semibold text-base">
      {icon}
      {title}
    </div>
  )
}

function SkillRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm">
      <div className="flex items-center gap-2 text-gray-800">
        <Check className="w-4 h-4 text-emerald-500" />
        {label}
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <button className="w-8 h-8 rounded-md border border-gray-200 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center transition" aria-label="Edit skill">
          <Pencil className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-md border border-gray-200 hover:border-red-500 hover:text-red-600 flex items-center justify-center transition" aria-label="Delete skill">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function SkillBar({ label, level, color = "blue", onDelete }: { label: string; level: number; color?: "blue" | "emerald" | "violet"; onDelete?: () => void }) {
  const colorGradients = {
    blue: "from-[#3d63ff] via-[#5865f2] to-[#7f8cff]",
    emerald: "from-[#10b981] via-[#34d399] to-[#6ee7b7]",
    violet: "from-[#a855f7] via-[#d946ef] to-[#f0abfc]",
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm text-gray-700">
        <span className="font-semibold text-gray-800">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">{level}%</span>
          {onDelete && (
            <button
              onClick={onDelete}
              className="w-6 h-6 rounded-md border border-gray-200 hover:border-red-500 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition"
              aria-label="Delete skill"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
      <div className="h-2.5 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorGradients[color]}`}
          style={{ width: `${Math.min(Math.max(level, 0), 100)}%` }}
        />
      </div>
    </div>
  )
}

function Pill({ label, variant = "solid" }: { label: string; variant?: "solid" | "ghost" }) {
  const base = "px-3 py-1.5 rounded-lg text-sm font-medium"
  const styles =
    variant === "solid"
      ? "bg-gray-100 text-gray-800 border border-gray-200"
      : "bg-white text-gray-800 border border-gray-200"
  return <span className={`${base} ${styles}`}>{label}</span>
}

function PrimaryButton({ label }: { label: string }) {
  return (
    <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#3d63ff] hover:bg-[#3151d6] text-white font-semibold shadow-md transition">
      <Plus className="w-4 h-4" />
      {label}
    </button>
  )
}
