import type React from "react"
interface FormGroupProps {
  label: string
  required?: boolean
  children: React.ReactNode
  helpText?: string
}

export function FormGroup({ label, required, children, helpText }: FormGroupProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {children}
      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
    </div>
  )
}
