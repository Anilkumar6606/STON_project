"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Download, Zap, Star, CheckCircle2, Palette, LayoutGrid, Bell, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import StudentSidebar from "@/components/student-sidebar"

const templates = [
  {
    id: "classic-blue",
    title: "Classic Blue",
    subtitle: "ATS-friendly, clean columns",
    accent: "from-[#1d4ed8] to-[#2563eb]",
    badge: "Recommended",
  },
  {
    id: "subtle-silver",
    title: "Subtle Silver",
    subtitle: "Minimal, muted palette",
    accent: "from-[#d1d5db] to-[#e5e7eb]",
    badge: "Modern",
  },
  {
    id: "golden-highlight",
    title: "Golden Highlight",
    subtitle: "Bold headings, crisp body",
    accent: "from-[#f59e0b] to-[#fbbf24]",
    badge: "Hiring manager favorite",
  },
  {
    id: "emerald-blocks",
    title: "Emerald Blocks",
    subtitle: "Profile-first narrative",
    accent: "from-[#10b981] to-[#34d399]",
    badge: "Story driven",
  },
  {
    id: "indigo-stripes",
    title: "Indigo Stripes",
    subtitle: "Dense content fit",
    accent: "from-[#4338ca] to-[#6366f1]",
    badge: "Compact",
  },
  {
    id: "slate-contrast",
    title: "Slate Contrast",
    subtitle: "Strong type hierarchy",
    accent: "from-[#0f172a] to-[#1e293b]",
    badge: "Executive",
  },
  {
    id: "bill-basic",
    title: "Bill Page",
    subtitle: "Simple invoice layout",
    accent: "from-[#111827] to-[#374151]",
    badge: "Bill",
  },
  {
    id: "bill-modern",
    title: "Bill Page",
    subtitle: "Modern invoice layout",
    accent: "from-[#0ea5e9] to-[#2563eb]",
    badge: "Bill",
  },
]

export default function StudentTemplatesPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #0a0a18 0%, #0f1238 50%, #2e3cb3 100%)" }}
    >
      <div className="flex">
        <StudentSidebar />

        <main className="flex-1 ml-64 px-6 md:px-10 py-8 space-y-8 max-w-6xl">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70">Student</p>
              <h1 className="text-3xl font-bold">Resume Templates</h1>
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

          <section className="space-y-3">
            <p className="text-lg text-white/80">Select your favorite resume templates</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {templates.map((tpl) => (
                <article
                  key={tpl.id}
                  className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col"
                >
                  <div className="relative px-5 pt-5">
                    <div
                      className={`h-40 rounded-xl bg-gradient-to-br ${tpl.accent} shadow-lg shadow-indigo-900/30 flex items-center justify-between px-5 text-white`}
                    >
                      <div className="space-y-1">
                        <div className="text-xs uppercase tracking-wider opacity-80">Profile Summary</div>
                        <div className="h-2 w-20 bg-white/70 rounded" />
                        <div className="h-2 w-16 bg-white/60 rounded" />
                      </div>
                      <div className="h-12 w-12 rounded-full bg-white/85 text-indigo-800 flex items-center justify-center font-semibold text-sm">AK</div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <PreviewRows />
                      <div className="grid grid-cols-2 gap-3">
                        <PreviewRows condensed />
                        <PreviewRows condensed />
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pt-4 pb-5 space-y-3 text-gray-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-base font-semibold text-gray-900">{tpl.title}</p>
                        <p className="text-sm text-gray-600">{tpl.subtitle}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                        <Star className="w-3 h-3" />
                        {tpl.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 border border-gray-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> ATS Ready
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 border border-gray-200">
                        <Palette className="w-3 h-3 text-indigo-500" /> Color Variants
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={`/student/download?template=${tpl.id}`}
                        className="px-4 py-2 rounded-lg bg-[#3d63ff] hover:bg-[#3151d6] text-white font-semibold text-sm shadow-md transition"
                      >
                        Select
                      </Link>
                      <Link
                        href={`/student/resume-preview?template=${tpl.id}`}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition"
                      >
                        Preview
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer className="flex items-center justify-between text-xs text-white/70 pt-4">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" /> 03-01-2024
            </div>
          
          </footer>
        </main>
      </div>
    </div>
  )
}

function PreviewRows({ condensed = false }: { condensed?: boolean }) {
  return (
    <div className="space-y-2">
      <div className={`h-2 rounded ${condensed ? "w-16" : "w-28"} bg-gray-200"`} />
      <div className="space-y-1">
        <div className="h-1.5 rounded bg-gray-200" />
        <div className="h-1.5 rounded bg-gray-200 w-5/6" />
        <div className="h-1.5 rounded bg-gray-200 w-4/6" />
      </div>
      <div className="flex gap-1">
        <span className="flex-1 h-1.5 rounded bg-gray-200" />
        <span className="flex-1 h-1.5 rounded bg-gray-200" />
        <span className="flex-1 h-1.5 rounded bg-gray-200" />
      </div>
    </div>
  )
}
