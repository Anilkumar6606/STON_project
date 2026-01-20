"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"

export default function AddCompany() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [department, setDepartment] = useState("")
  const [avgPackage, setAvgPackage] = useState("")
  const [hires, setHires] = useState(0)
  const [interviews, setInterviews] = useState(0)
  const [lastPlacement, setLastPlacement] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Company added (demo)")
    router.push("/placement/companies")
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
          <h1 className="text-2xl font-bold">Add Company</h1>
        </div>
        <button
          form="add-company-form"
          type="submit"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-lg font-semibold transition border border-purple-400/50"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <form id="add-company-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Field label="Company Name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
                placeholder="Google"
              />
            </Field>
            <Field label="Department / Function">
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
                placeholder="Cloud Engineering"
              />
            </Field>
            <Field label="Average Package (LPA)">
              <input
                value={avgPackage}
                onChange={(e) => setAvgPackage(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
                placeholder="12.5"
              />
            </Field>
            <Field label="Total Hires">
              <input
                type="number"
                min={0}
                value={hires}
                onChange={(e) => setHires(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
              />
            </Field>
            <Field label="Total Interviews">
              <input
                type="number"
                min={0}
                value={interviews}
                onChange={(e) => setInterviews(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/60"
              />
            </Field>
            <Field label="Last Placement Date">
              <input
                type="date"
                value={lastPlacement}
                onChange={(e) => setLastPlacement(e.target.value)}
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
