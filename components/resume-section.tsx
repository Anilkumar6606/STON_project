"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface ResumeSectionProps {
  title: string
  description: string
  children: React.ReactNode
}

export function ResumeSection({ title, description, children }: ResumeSectionProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-secondary/30 hover:bg-secondary/50 flex items-center justify-between transition-colors"
      >
        <div className="text-left">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
        <ChevronDown size={20} className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && <div className="px-6 py-4 border-t border-border bg-card space-y-4">{children}</div>}
    </div>
  )
}
