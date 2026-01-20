"use client"

import { useMemo, useState } from "react"
import {
  Search,
  Calendar,
  Plus,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Activity Logs Data
const initialActivityLogs = [
  {
    id: 1,
    user: { name: "SA Sameer", initials: "SA", color: "bg-blue-600" },
    activity: "Logged in",
    details: "admin@stoncv.com",
    result: "Success",
    date: "2024-05-02T09:05:00Z",
  },
  {
    id: 2,
    user: { name: "SA Sameer", initials: "SA", color: "bg-blue-600" },
    activity: "Updated Email",
    details: "",
    result: "Success",
    date: "2024-05-02T08:52:00Z",
  },
  {
    id: 3,
    user: { name: "SA Sameer", initials: "SA", color: "bg-blue-600" },
    activity: "Changed Password",
    details: "",
    result: "Success",
    date: "2024-05-02T08:40:00Z",
  },
  {
    id: 4,
    user: { name: "SA Sameer", initials: "SA", color: "bg-blue-600" },
    activity: "Enabled Multi-Factor",
    details: "+1 234-567-8900",
    result: "Success",
    date: "2024-05-02T08:00:00Z",
  },
  {
    id: 5,
    user: { name: "SA Sameer", initials: "SA", color: "bg-blue-600" },
    activity: "Updated Phone Number",
    details: "",
    result: "Success",
    date: "2024-04-29T10:20:00Z",
  },
  {
    id: 6,
    user: { name: "SA Sameer", initials: "SA", color: "bg-blue-600" },
    activity: "Logged out",
    details: "",
    result: "Success",
    date: "2024-04-29T10:10:00Z",
  },
]

const ITEMS_PER_PAGE = 6

const dateRanges = {
  "Last 7 Days": 7,
  "Last 30 Days": 30,
  "Last 3 Months": 90,
  "Last 6 Months": 180,
  "Last Year": 365,
  "All Time": null,
} as const

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState(initialActivityLogs)
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<keyof typeof dateRanges>("Last 7 Days")
  const [currentPage, setCurrentPage] = useState(1)
  const [dateOpen, setDateOpen] = useState(false)

  const filteredLogs = useMemo(() => {
    const now = new Date()
    return logs.filter((log) => {
      const matchesSearch = `${log.user.name} ${log.activity} ${log.details} ${log.result}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim())

      const days = dateRanges[dateRange]
      if (days === null) return matchesSearch
      const logDate = new Date(log.date)
      const cutoff = new Date(now)
      cutoff.setDate(now.getDate() - days)
      return matchesSearch && logDate >= cutoff
    })
  }, [logs, searchQuery, dateRange])

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleAddLog = () => {
    const now = new Date()
    const newLog = {
      id: logs.length ? Math.max(...logs.map((l) => l.id)) + 1 : 1,
      user: { name: "SA Sameer", initials: "SA", color: "bg-blue-600" },
      activity: "Manual entry",
      details: "Triggered from Activity Log button",
      result: "Success",
      date: now.toISOString(),
    }
    setLogs((prev) => [newLog, ...prev])
    setCurrentPage(1)
  }

  return (
    <>
      {/* Header */}
      <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#16103a]/30 backdrop-blur">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Activity Logs</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm font-medium text-white/90">Welcome, Admin</div>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold border-2 border-blue-400/30">
              SA
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1e1245]" />
          </div>
          <button className="text-white/50 hover:text-white transition">
            <ChevronDown size={20} />
          </button>
        </div>
      </header>

      {/* Activity Logs Content */}
      <div className="flex-1 overflow-auto p-8">
        {/* Filters Bar */}
        <div className="flex items-center gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <Input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Date Range */}
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 h-11 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 transition"
              onClick={() => setDateOpen((prev) => !prev)}
            >
              <Calendar size={16} />
              <span className="text-sm">{dateRange}</span>
              <ChevronDown size={16} />
            </button>
            {dateOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0c0926]/95 border border-white/10 rounded-lg shadow-lg z-10">
                {Object.keys(dateRanges).map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setDateRange(range as keyof typeof dateRanges)
                      setCurrentPage(1)
                      setDateOpen(false)
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg transition"
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add Activity Log Button */}
          <Button
            className="flex items-center gap-2 px-6 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg shadow-blue-600/30"
            onClick={handleAddLog}
          >
            <Plus size={18} />
            Activity Log
          </Button>
        </div>

        {/* Activity Logs Table */}
        <div className="bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 overflow-hidden">
          {/* Table Header */}
          <div className="px-8 py-3 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Activity Logs
            </h3>
          </div>

          {/* Column Headers */}
          <div className="bg-white/5 px-8 py-3 border-b border-white/5">
            <div className="flex items-center text-sm font-medium text-white/50">
              <div className="w-[20%]">Activity</div>
              <div className="w-[25%]">Details</div>
              <div className="w-[25%]">Details</div>
              <div className="w-[15%]">Result</div>
              <div className="w-[15%] text-right">Timestamp</div>
            </div>
          </div>

          {/* Table Body */}
          <div>
            {paginatedLogs.map((log) => (
              <div
                key={log.id}
                className="px-8 py-4 flex items-center border-b border-white/5 hover:bg-white/5 transition group"
              >
                {/* Activity */}
                <div className="w-[20%] flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${log.user.color} flex items-center justify-center text-xs font-bold`}>
                    {log.user.initials}
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-medium text-white/90">{log.user.name}</div>
                  </div>
                </div>

                {/* Activity Description */}
                <div className="w-[25%] text-sm text-white/80">{log.activity}</div>

                {/* Details */}
                <div className="w-[25%] text-sm text-white/60">{log.details}</div>

                {/* Result */}
                <div className="w-[15%]">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30 px-3 py-1">
                    {log.result}
                  </Badge>
                </div>

                {/* Timestamp */}
                <div className="w-[15%] text-sm text-white/50 text-right">
                  {new Date(log.date).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-8 py-4 border-t border-white/5 flex items-center justify-between gap-4 text-sm text-white/60">
            <span>
              Showing {filteredLogs.length ? startIndex + 1 : 0} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredLogs.length)} of {filteredLogs.length} results
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={14} className="rotate-180" />
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((p) => (p < totalPages ? p + 1 : p))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
