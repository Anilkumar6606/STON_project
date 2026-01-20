import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"

interface NotificationCardProps {
  type: "info" | "success" | "warning"
  title: string
  description: string
  action?: string
}

export function NotificationCard({ type, title, description, action }: NotificationCardProps) {
  const styles = {
    info: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
      title: "text-blue-900 dark:text-blue-100",
      text: "text-blue-800 dark:text-blue-200",
      icon: "text-blue-600 dark:text-blue-400",
    },
    success: {
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-200 dark:border-emerald-800",
      title: "text-emerald-900 dark:text-emerald-100",
      text: "text-emerald-800 dark:text-emerald-200",
      icon: "text-emerald-600 dark:text-emerald-400",
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-800",
      title: "text-amber-900 dark:text-amber-100",
      text: "text-amber-800 dark:text-amber-200",
      icon: "text-amber-600 dark:text-amber-400",
    },
  }

  const style = styles[type]

  const IconComponent = {
    info: AlertCircle,
    success: CheckCircle2,
    warning: AlertTriangle,
  }[type]

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 flex items-start gap-3`}>
      <div className={`${style.icon} mt-0.5 flex-shrink-0`}>
        <IconComponent size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`${style.title} font-semibold text-sm`}>{title}</h4>
        <p className={`${style.text} text-xs opacity-80 mt-1`}>{description}</p>
      </div>
      {action && (
        <button
          className={`${style.title} text-xs font-medium whitespace-nowrap flex-shrink-0 hover:opacity-75 transition-opacity`}
        >
          {action}
        </button>
      )}
    </div>
  )
}
