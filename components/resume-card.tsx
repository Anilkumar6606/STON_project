interface ResumeCardProps {
  title: string
  sections: number
  completed: number
  lastModified: string
}

export function ResumeCard({ title, sections, completed, lastModified }: ResumeCardProps) {
  const progress = Math.round((completed / sections) * 100)

  return (
    <div className="group bg-card border border-border rounded-lg p-6 hover:border-accent hover:shadow-sm transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Modified {lastModified}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-muted-foreground">
            {completed} of {sections} sections
          </span>
          <span className="text-sm font-semibold text-primary">{progress}%</span>
        </div>

        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-border flex gap-2">
        <button className="flex-1 text-xs font-medium text-primary hover:bg-primary/5 rounded py-2 transition-colors">
          Edit
        </button>
        <button className="flex-1 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded py-2 transition-colors">
          Preview
        </button>
      </div>
    </div>
  )
}
