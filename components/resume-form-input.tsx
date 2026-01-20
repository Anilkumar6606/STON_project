"use client"

import { Input } from "@/components/ui/input"

interface ResumeFormInputProps {
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  rows?: number
}

export function ResumeFormInput({
  type = "text",
  placeholder,
  value,
  onChange,
  multiline = false,
  rows = 4,
}: ResumeFormInputProps) {
  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground text-sm"
      />
    )
  }

  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-background"
    />
  )
}
