"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  BookOpen,
  Briefcase,
  DownloadCloud,
  Edit2,
  FileText,
  GraduationCap,
  LayoutGrid,
  MessageSquare,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  User,
} from "lucide-react"
import StudentSidebar from "@/components/student-sidebar"

type Project = {
  id: string
  title: string
  description: string
  tech: string
  github: string
  live: string
}

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

const defaultProjects: Project[] = [
  {
    id: "p-1",
    title: "AI-Powered Chatbot Application",
    description: "Developed an AI-powered chatbot capable of natural language understanding and context-aware responses.",
    tech: "Python, TensorFlow, NLTK",
    github: "github.com/anilkumar/chatbot-ai",
    live: "chatbot.example.com",
  },
  {
    id: "p-2",
    title: "E-commerce Website with Recommendation System",
    description: "Built an e-commerce platform featuring a recommendation system that suggests products based on user behavior and preferences.",
    tech: "HTML, CSS, JavaScript, Django, Scikit-Learn",
    github: "github.com/anilkumar/ecommerce-site",
    live: "www.myonlineshop.com",
  },
  {
    id: "p-3",
    title: "Real-Time Disease Prediction Using Machine Learning",
    description: "Created a real-time disease prediction model that analyzes medical data to predict illnesses with high accuracy.",
    tech: "Python, Pandas, Scikit-Learn",
    github: "github.com/anilkumar/healthcare-ml",
    live: "diseasedetector.example.com",
  },
]

export default function StudentProjectsPage() {
  const pathname = usePathname()
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Project>({
    id: "",
    title: "",
    description: "",
    tech: "",
    github: "",
    live: "",
  })

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("studentProjects")
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Project[]
        // Ensure every record has an id; fallback to defaults when empty
        const sanitized = parsed.map((p, idx) => ({ ...p, id: p.id || `proj-${idx}-${Date.now()}` }))
        setProjects(sanitized.length ? sanitized : defaultProjects)
      } catch (e) {
        console.error("Failed to load projects from storage", e)
        setProjects(defaultProjects)
      }
    }
  }, [])

  // Persist to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem("studentProjects", JSON.stringify(projects))
  }, [projects])

  const startAdd = () => {
    setFormData({ id: "", title: "", description: "", tech: "", github: "", live: "" })
    setEditingId(null)
    setFormOpen(true)
  }

  const startEdit = (project: Project) => {
    setFormData(project)
    setEditingId(project.id)
    setFormOpen(true)
  }

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
    if (editingId === id) {
      startAdd()
      setFormOpen(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.description.trim()) return

    const normalizedGithub = formData.github.trim()
    const normalizedLive = formData.live.trim()

    if (editingId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, ...formData, github: normalizedGithub, live: normalizedLive }
            : p
        )
      )
    } else {
      const newProject: Project = {
        ...formData,
        id: `proj-${Date.now()}`,
        github: normalizedGithub,
        live: normalizedLive,
      }
      setProjects((prev) => [newProject, ...prev])
    }

    setFormOpen(false)
    setEditingId(null)
    setFormData({ id: "", title: "", description: "", tech: "", github: "", live: "" })
  }

  const handleChange = (key: keyof Project, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

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
              <h1 className="text-3xl font-bold">Projects</h1>
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

          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 items-start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/80">
                  <LayoutGrid className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">Current Projects</h2>
                </div>
                <button
                  onClick={startAdd}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3d63ff] hover:bg-[#3151d6] text-sm font-semibold shadow-lg shadow-indigo-900/40 transition"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>

              {formOpen && (
                <form
                  onSubmit={handleSubmit}
                  className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/15 rounded-2xl shadow-2xl backdrop-blur text-white overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Briefcase className="w-4 h-4" />
                      {editingId ? "Edit Project" : "Add Project"}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormOpen(false)}
                      className="text-white/60 hover:text-white text-sm"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="px-5 py-5 space-y-4 text-sm">
                    <div className="grid md:grid-cols-2 gap-4">
                      <label className="space-y-2">
                        <span className="text-white/70">Title</span>
                        <input
                          value={formData.title}
                          onChange={(e) => handleChange("title", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[#3d63ff]"
                          placeholder="Project title"
                          required
                        />
                      </label>
                      <label className="space-y-2">
                        <span className="text-white/70">Tech (comma separated)</span>
                        <input
                          value={formData.tech}
                          onChange={(e) => handleChange("tech", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[#3d63ff]"
                          placeholder="React, Next.js, Tailwind"
                        />
                      </label>
                    </div>

                    <label className="space-y-2 block">
                      <span className="text-white/70">Description</span>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        className="w-full px-3 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[#3d63ff] min-h-[110px]"
                        placeholder="What did you build and why does it matter?"
                        required
                      />
                    </label>

                    <div className="grid md:grid-cols-2 gap-4">
                      <label className="space-y-2">
                        <span className="text-white/70">GitHub URL</span>
                        <input
                          value={formData.github}
                          onChange={(e) => handleChange("github", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[#3d63ff]"
                          placeholder="https://github.com/username/repo"
                        />
                      </label>
                      <label className="space-y-2">
                        <span className="text-white/70">Live URL</span>
                        <input
                          value={formData.live}
                          onChange={(e) => handleChange("live", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[#3d63ff]"
                          placeholder="https://project.live"
                        />
                      </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setFormOpen(false)
                          setEditingId(null)
                        }}
                        className="px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3d63ff] hover:bg-[#3151d6] text-sm font-semibold shadow-lg shadow-indigo-900/40 transition"
                      >
                        {editingId ? "Update" : "Save"}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              <div className="space-y-5">
                {projects.length === 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-white/70">
                    No projects yet. Click "Add Project" to create your first one.
                  </div>
                )}

                {projects.map((project) => {
                  const techList = project.tech
                    ? project.tech.split(",").map((t) => t.trim()).filter(Boolean)
                    : []
                  const githubUrl = project.github
                    ? project.github.startsWith("http")
                      ? project.github
                      : `https://${project.github}`
                    : ""
                  const liveUrl = project.live
                    ? project.live.startsWith("http")
                      ? project.live
                      : `https://${project.live}`
                    : ""
                  return (
                    <article
                      key={project.title}
                      className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/15 rounded-2xl shadow-2xl backdrop-blur text-white overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                          <Briefcase className="w-4 h-4" />
                          {project.title}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(project)}
                            className="w-9 h-9 rounded-lg border border-white/20 hover:border-[#3d63ff] hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition"
                            aria-label="Edit project"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(project.id)}
                            className="w-9 h-9 rounded-lg border border-red-400/50 hover:border-red-400 hover:bg-red-500/10 text-red-300 hover:text-red-200 flex items-center justify-center transition"
                            aria-label="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="px-5 py-4 space-y-3 text-sm leading-relaxed">
                        <p className="text-white/80">{project.description}</p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {techList.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white/90"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-3 pt-2">
                          {githubUrl && (
                            <a
                              href={githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#3d63ff]/30 hover:bg-[#3d63ff]/50 border border-[#3d63ff]/50 text-white text-xs font-semibold transition"
                            >
                              GitHub
                            </a>
                          )}
                          {liveUrl && (
                            <a
                              href={liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/30 hover:bg-emerald-500/50 border border-emerald-500/50 text-white text-xs font-semibold transition"
                            >
                              Live Demo
                            </a>
                          )}
                          {!githubUrl && !liveUrl && (
                            <span className="text-xs text-white/60">Links not provided</span>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
