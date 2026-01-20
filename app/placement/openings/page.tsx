"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import PlacementSidebar from "@/components/placement-sidebar"
import { Bell, Settings, Search, ChevronLeft, ChevronRight, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const jobOpenings = [
  {
    id: 1,
    company: "Google",
    position: "Software Engineer",
    department: "CSE, IT",
    salary: "20-25 LPA",
    applications: 128,
    deadline: "28 Feb 2026",
    status: "Active",
    locations: "Bangalore, Hyderabad"
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Cloud Solutions Architect",
    department: "IT, CSE",
    salary: "18-22 LPA",
    applications: 95,
    deadline: "25 Feb 2026",
    status: "Active",
    locations: "Bangalore"
  },
  {
    id: 3,
    company: "Amazon",
    position: "AWS Developer",
    department: "CSE",
    salary: "16-20 LPA",
    applications: 156,
    deadline: "20 Feb 2026",
    status: "Active",
    locations: "Hyderabad, Bangalore"
  },
  {
    id: 4,
    company: "Infosys",
    position: "Systems Engineer",
    department: "IT, CSE, Mech",
    salary: "8-12 LPA",
    applications: 342,
    deadline: "28 Feb 2026",
    status: "Active",
    locations: "Pan India"
  },
  {
    id: 5,
    company: "TCS",
    position: "IT Analyst",
    department: "IT, CSE",
    salary: "7-10 LPA",
    applications: 289,
    deadline: "25 Feb 2026",
    status: "Closing Soon",
    locations: "Pan India"
  },
  {
    id: 6,
    company: "Accenture",
    position: "Technology Associate",
    department: "CSE, IT, Mech",
    salary: "8-11 LPA",
    applications: 215,
    deadline: "22 Feb 2026",
    status: "Closing Soon",
    locations: "Multiple Cities"
  },
  {
    id: 7,
    company: "Capgemini",
    position: "Software Developer",
    department: "IT, CSE",
    salary: "7-10 LPA",
    applications: 178,
    deadline: "18 Feb 2026",
    status: "Closing",
    locations: "Pune, Bangalore"
  },
  {
    id: 8,
    company: "L&T",
    position: "Graduate Engineer Trainee",
    department: "Mech, Civil, Electrical",
    salary: "7-9 LPA",
    applications: 124,
    deadline: "20 Feb 2026",
    status: "Closed",
    locations: "Pan India"
  },
]

export default function JobOpenings() {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredJobs = jobOpenings.filter(job => {
    const searchMatch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.position.toLowerCase().includes(searchTerm.toLowerCase())
    const statusMatch = filterStatus === "All" || job.status === filterStatus
    return searchMatch && statusMatch
  })

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const paginatedData = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Active": return "bg-green-500/20 text-green-300 border-green-500/30"
      case "Closing Soon": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "Closing": return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "Closed": return "bg-red-500/20 text-red-300 border-red-500/30"
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <PlacementSidebar />

      <main className="flex-1 ml-56 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Job Openings</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-white cursor-pointer hover:text-white/70" />
            <Settings className="w-5 h-5 text-white cursor-pointer hover:text-white/70" />
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="text-right">
                <p className="text-white text-sm font-medium">{session?.user?.name || "Placement Officer"}</p>
                <p className="text-white/60 text-xs">Officer</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
              <div className="text-sm text-white/70">Total Openings</div>
              <div className="text-3xl font-bold text-white mt-2">{jobOpenings.length}</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
              <div className="text-sm text-white/70">Active</div>
              <div className="text-3xl font-bold text-white mt-2">{jobOpenings.filter(j => j.status === "Active").length}</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
              <div className="text-sm text-white/70">Total Applications</div>
              <div className="text-3xl font-bold text-white mt-2">{jobOpenings.reduce((sum, j) => sum + j.applications, 0)}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6">
              <div className="text-sm text-white/70">Avg Applications</div>
              <div className="text-3xl font-bold text-white mt-2">{Math.round(jobOpenings.reduce((sum, j) => sum + j.applications, 0) / jobOpenings.length)}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search by company or position..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
              </div>
              <div className="flex gap-2">
                {["All", "Active", "Closing Soon", "Closing", "Closed"].map(status => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilterStatus(status)
                      setCurrentPage(1)
                    }}
                    className={`px-4 py-2 rounded-lg transition text-xs font-medium ${
                      filterStatus === status
                        ? "bg-blue-600 text-white"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="space-y-4">
            {paginatedData.map(job => (
              <div key={job.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{job.position}</h3>
                      <p className="text-white/70">{job.company}</p>
                      <p className="text-white/50 text-sm mt-1">{job.locations}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(job.status)} border`}>
                    {job.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4 border-t border-white/10">
                  <div>
                    <p className="text-white/70 text-sm">Departments</p>
                    <p className="text-white font-medium">{job.department}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Salary</p>
                    <p className="text-white font-medium">{job.salary}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Applications</p>
                    <p className="text-white font-medium">{job.applications}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Deadline</p>
                    <p className="text-white font-medium">{job.deadline}</p>
                  </div>
                  <div className="flex gap-2 items-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm flex-1">View</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-white/70">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of {filteredJobs.length} openings
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-white/10 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-white/10 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
