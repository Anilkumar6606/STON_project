"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"

export default function AddDepartment() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [fullName, setFullName] = useState("")
  const [year, setYear] = useState<number | "">("")
  const [students, setStudents] = useState(0)
  const [placement, setPlacement] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Department added (demo)")
    router.push("/placement/department")
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
          <h1 className="text-2xl font-bold">Add Department</h1>
        </div>
        <button
          form="add-dept-form"
          type="submit"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-lg font-semibold transition border border-purple-400/50"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <form id="add-dept-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Field label="Short Name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
                placeholder="CSE"
              />
            </Field>
            <Field label="Full Name">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
                placeholder="Computer Science and Engineering"
              />
            </Field>
            <Field label="Year">
              <input
                type="number"
                value={year as number}
                onChange={(e) => setYear(Number(e.target.value))}
                min={2000}
                max={2100}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
              />
            </Field>
            <Field label="Total Students">
              <input
                type="number"
                min={0}
                value={students}
                onChange={(e) => setStudents(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
              />
            </Field>
            <Field label="Placement %">
              <input
                type="number"
                min={0}
                max={100}
                value={placement}
                onChange={(e) => setPlacement(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
              />
            </Field>
          </div>
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
