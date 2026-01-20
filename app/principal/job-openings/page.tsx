"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { User, Search, Settings, Bell, Plus, X, ChevronLeft, ChevronRight, Briefcase } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import PrincipalSidebar from "@/components/principal-sidebar"

interface JobOpening {
  id: number
  company: string
  position: string
  department: string
  salary: string
  deadline: string
  applicants: number
  status: "Open" | "Closing Soon" | "Closed"
}

export default function JobOpenings() {
  const router = useRouter()
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)

  const [jobData, setJobData] = useState<JobOpening[]>([
    { id: 1, company: "Google", position: "SDE-1", department: "CSE", salary: "₹15 LPA", deadline: "30 Apr 2026", applicants: 145, status: "Open" },
    { id: 2, company: "Microsoft", position: "Software Engineer", department: "IT", salary: "₹14 LPA", deadline: "25 Apr 2026", applicants: 98, status: "Closing Soon" },
    { id: 3, company: "Amazon", position: "SDE", department: "CSE", salary: "₹13.5 LPA", deadline: "20 Apr 2026", applicants: 156, status: "Open" },
    { id: 4, company: "Adobe", position: "Intern", department: "AI", salary: "₹12 LPA", deadline: "15 Apr 2026", applicants: 67, status: "Closing Soon" },
    { id: 5, company: "TCS", position: "Associate", department: "All", salary: "₹8.5 LPA", deadline: "30 May 2026", applicants: 342, status: "Open" },
    { id: 6, company: "Infosys", position: "Trainee", department: "All", salary: "₹7.5 LPA", deadline: "25 May 2026", applicants: 298, status: "Open" },
    { id: 7, company: "Accenture", position: "Analyst", department: "All", salary: "₹9 LPA", deadline: "10 Apr 2026", applicants: 45, status: "Closed" },
    { id: 8, company: "Cognizant", position: "Developer", department: "CSE", salary: "₹8.2 LPA", deadline: "05 Apr 2026", applicants: 0, status: "Closed" },
  ])

  const filteredJobs = jobData.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" || job.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-500/20 text-green-200"
      case "Closing Soon":
        return "bg-yellow-500/20 text-yellow-200"
      case "Closed":
        return "bg-red-500/20 text-red-200"
      default:
        return "bg-blue-500/20 text-blue-200"
    }
  }

  const stats = [
    { label: "Total Openings", value: String(jobData.filter(j => j.status === "Open").length), icon: <Briefcase className="w-6 h-6" /> },
    { label: "Total Applications", value: String(jobData.reduce((sum, job) => sum + job.applicants, 0)), icon: "📋" },
    { label: "Average Package", value: "₹10.5 LPA", icon: "💰" },
  ]

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <PrincipalSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Job Openings</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Settings className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="text-right">
                <p className="text-white text-sm font-medium">{session?.user?.name}</p>
                <p className="text-white/60 text-xs">Principal</p>
              </div>
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">{stat.label}</p>
                    <p className="text-white text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className="text-4xl">
                    {typeof stat.icon === 'string' ? stat.icon : <div className="text-blue-400">{stat.icon}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters and Actions */}
          <div className="mb-8 flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-3 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Search by company or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Closing Soon">Closing Soon</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Opening
            </Button>
          </div>

          {/* Job Openings Table */}
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Company</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Position</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Department</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Salary</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Deadline</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Applicants</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobs.map((job) => (
                    <tr key={job.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-white font-medium">{job.company}</td>
                      <td className="px-6 py-4 text-white/80">{job.position}</td>
                      <td className="px-6 py-4 text-white/80">{job.department}</td>
                      <td className="px-6 py-4 text-white/80">{job.salary}</td>
                      <td className="px-6 py-4 text-white/80 text-sm">{job.deadline}</td>
                      <td className="px-6 py-4 text-white/80 font-medium">{job.applicants}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {paginatedJobs.length === 0 && (
              <div className="p-8 text-center text-white/60">
                No job openings found
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-white/60 text-sm">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add Opening Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-lg p-6 w-96 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold">Add Job Opening</h2>
              <button onClick={() => setShowAddModal(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <input type="text" placeholder="Company Name" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40" />
              <input type="text" placeholder="Position" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40" />
              <input type="text" placeholder="Department" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40" />
              <input type="text" placeholder="Salary (e.g., ₹10 LPA)" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40" />
              <input type="date" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40" />
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={() => setShowAddModal(false)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Add</Button>
              <Button onClick={() => setShowAddModal(false)} className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
