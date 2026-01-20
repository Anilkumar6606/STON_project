"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"

export default function PostJob() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [department, setDepartment] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [positions, setPositions] = useState(1)
  const [deadline, setDeadline] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, post to API then redirect
    alert("Job posted (demo)")
    router.push("/placement/openings")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050616] via-[#0f1a3f] to-[#1a2e66] text-white">
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/15 hover:bg-white/15 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-2xl font-bold">Post a Job</h1>
        </div>
        <button
          form="post-job-form"
          type="submit"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-lg font-semibold transition border border-purple-400/50"
        >
          <Save className="w-4 h-4" />
          Save & Publish
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <form id="post-job-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Field label="Job Title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
                placeholder="Software Engineer"
              />
            </Field>
            <Field label="Company">
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
                placeholder="ACME Corp"
              />
            </Field>
            <Field label="Department">
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
                placeholder="Computer Science & Engineering"
              />
            </Field>
            <Field label="Location">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
                placeholder="Bengaluru"
              />
            </Field>
            <Field label="Positions">
              <input
                type="number"
                min={1}
                value={positions}
                onChange={(e) => setPositions(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
              />
            </Field>
            <Field label="Deadline">
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
              />
            </Field>
          </div>

          <Field label="Job Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={6}
              className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60 resize-none"
              placeholder="Describe the role, responsibilities, and requirements."
            />
          </Field>
        </form>
      </main>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2 block text-sm font-medium text-white">
      <span className="text-white/70">{label}</span>
      {children}
    </label>
  )
}
