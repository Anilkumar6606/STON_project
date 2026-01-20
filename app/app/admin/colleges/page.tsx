"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import {
  Search,
  Filter,
  Plus,
  Pencil,
  Calendar,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Users,
  X,
  AlertCircle,
} from "lucide-react"

// Initial Dummy Data for Colleges
const initialColleges = [
  {
    id: 1,
    name: "Headley University",
    code: "HU001",
    status: "Active",
    createdAt: "2024-01-15",
    color: "text-blue-400",
  },
  {
    id: 2,
    name: "Oakwood College",
    code: "OC002",
    status: "Active",
    createdAt: "2024-02-05",
    color: "text-blue-400",
  },
  {
    id: 3,
    name: "Crestwood Institute",
    code: "CI003",
    status: "Inactive",
    createdAt: "2024-01-20",
    color: "text-red-400",
  },
  {
    id: 4,
    name: "Westlake College",
    code: "WC004",
    status: "Active",
    createdAt: "2024-03-12",
    color: "text-blue-400",
  },
  {
    id: 5,
    name: "Northfield Academy",
    code: "NA005",
    status: "Inactive",
    createdAt: "2024-01-25",
    color: "text-red-400",
  },
  {
    id: 6,
    name: "Greenfield College",
    code: "GC006",
    status: "Active",
    createdAt: "2024-04-10",
    color: "text-blue-400",
  },
  {
    id: 7,
    name: "Riverside Institute",
    code: "RI007",
    status: "Active",
    createdAt: "2024-05-03",
    color: "text-blue-400",
  },
  {
    id: 8,
    name: "Mountain Academy",
    code: "MA008",
    status: "Inactive",
    createdAt: "2024-02-18",
    color: "text-red-400",
  },
  {
    id: 9,
    name: "Lakeside University",
    code: "LU009",
    status: "Active",
    createdAt: "2024-03-25",
    color: "text-blue-400",
  },
  {
    id: 10,
    name: "Skyline College",
    code: "SC010",
    status: "Active",
    createdAt: "2024-04-12",
    color: "text-blue-400",
  },
  {
    id: 11,
    name: "Valley Institute",
    code: "VI011",
    status: "Inactive",
    createdAt: "2024-01-30",
    color: "text-red-400",
  },
  {
    id: 12,
    name: "Summit College",
    code: "SC012",
    status: "Active",
    createdAt: "2024-05-08",
    color: "text-blue-400",
  },
]

const ITEMS_PER_PAGE = 6

type College = (typeof initialColleges)[0]

interface EditingCollege extends College {
  originalName?: string
}

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>(initialColleges)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingData, setEditingData] = useState<EditingCollege | null>(null)
  const [newCollege, setNewCollege] = useState({ name: "", code: "" })
  const [addError, setAddError] = useState("")
  const filterDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false)
      }
    }

    if (isFilterDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isFilterDropdownOpen])

  // Filter colleges based on search and status
  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const matchesSearch =
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.code.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus =
        statusFilter === "All Status" || college.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [colleges, searchTerm, statusFilter])

  // Calculate pagination
  const totalPages = Math.ceil(filteredColleges.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedColleges = filteredColleges.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  // Reset to page 1 when filters change
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  const handleAddCollege = () => {
    setAddError("")
    if (!newCollege.name.trim()) {
      setAddError("College name is required")
      return
    }
    if (!newCollege.code.trim()) {
      setAddError("College code is required")
      return
    }
    if (colleges.some((c) => c.code === newCollege.code)) {
      setAddError("College code already exists")
      return
    }

    const college: College = {
      id: Math.max(...colleges.map((c) => c.id), 0) + 1,
      name: newCollege.name,
      code: newCollege.code,
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
      color: "text-blue-400",
    }

    setColleges([...colleges, college])
    setNewCollege({ name: "", code: "" })
    setIsAddModalOpen(false)
  }

  const handleEditCollege = (college: College) => {
    setEditingId(college.id)
    setEditingData({ ...college, originalName: college.name })
  }

  const handleSaveEdit = (id: number) => {
    if (!editingData) return

    if (!editingData.name.trim()) {
      alert("College name cannot be empty")
      return
    }

    setColleges(
      colleges.map((c) =>
        c.id === id ? { ...editingData, color: editingData.color || "text-blue-400" } : c
      )
    )
    setEditingId(null)
    setEditingData(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingData(null)
  }

  const handleToggleStatus = (id: number) => {
    setColleges(
      colleges.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === "Active" ? "Inactive" : "Active",
              color: c.status === "Active" ? "text-red-400" : "text-blue-400",
            }
          : c
      )
    )
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  return (
    <>
      {/* Header */}
      <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#16103a]/30 backdrop-blur">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Colleges</h1>
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

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-[#1a163f]/60 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 transition"
              />
            </div>
            <div className="relative" ref={filterDropdownRef}>
              <button 
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#1a163f]/60 border border-white/10 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                <Filter size={18} />
                {statusFilter}
                <ChevronDown size={16} className="ml-1" />
              </button>
              {isFilterDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#0c0926]/95 border border-white/10 rounded-lg shadow-lg z-10">
                  {["All Status", "Active", "Inactive"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        handleStatusFilter(status)
                        setIsFilterDropdownOpen(false)
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg transition"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-blue-600/20"
          >
            <Plus size={18} />
            Add College
          </button>
        </div>

        {/* Colleges Table */}
        <div className="bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <Users size={20} className="text-white/70" />
            <h3 className="text-lg font-semibold">Colleges</h3>
          </div>
          
          {/* Table Header */}
          <div className="bg-white/5 px-6 py-4">
            <div className="flex items-center text-sm font-medium text-white/50">
              <div className="w-[30%]">Name</div>
              <div className="w-[15%]">Code</div>
              <div className="w-[15%]">Status</div>
              <div className="w-[15%]">Created At</div>
              <div className="w-[25%]">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {paginatedColleges.length > 0 ? (
              paginatedColleges.map((college) => (
                <div
                  key={college.id}
                  className="px-6 py-4 flex items-center hover:bg-white/5 transition group"
                >
                  {/* Name */}
                  <div className="w-[30%] flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center`}>
                      <GraduationCap
                        size={16}
                        className={college.status === "Active" ? "text-blue-400" : "text-red-400"}
                      />
                    </div>
                    {editingId === college.id ? (
                      <input
                        type="text"
                        value={editingData?.name || ""}
                        onChange={(e) =>
                          setEditingData((prev) =>
                            prev ? { ...prev, name: e.target.value } : null
                          )
                        }
                        className="text-sm font-medium text-white bg-white/10 border border-blue-500/50 rounded px-2 py-1 focus:outline-none"
                      />
                    ) : (
                      <span className="text-sm font-medium text-white/90">{college.name}</span>
                    )}
                  </div>

                  {/* Code */}
                  <div className="w-[15%] text-sm text-white/60">
                    {editingId === college.id ? (
                      <input
                        type="text"
                        value={editingData?.code || ""}
                        onChange={(e) =>
                          setEditingData((prev) =>
                            prev ? { ...prev, code: e.target.value } : null
                          )
                        }
                        className="text-sm text-white bg-white/10 border border-blue-500/50 rounded px-2 py-1 focus:outline-none w-full"
                      />
                    ) : (
                      college.code
                    )}
                  </div>

                  {/* Status */}
                  <div className="w-[15%]">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        college.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {college.status}
                    </span>
                  </div>

                  {/* Created At */}
                  <div className="w-[15%] text-sm text-white/60">{college.createdAt}</div>

                  {/* Actions */}
                  <div className="w-[25%] flex items-center gap-3">
                    {editingId === college.id ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(college.id)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-xs font-medium text-emerald-400 hover:bg-emerald-600/30 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditCollege(college)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>

                        <button
                          onClick={() => handleToggleStatus(college.id)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                            college.status === "Active"
                              ? "border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                              : "bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30"
                          }`}
                        >
                          <Calendar size={14} />
                          {college.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center text-white/60">
                <AlertCircle size={32} className="mx-auto mb-3 opacity-50" />
                <p>No colleges found</p>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-white/50">
            <span>
              Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredColleges.length)} of{" "}
              {filteredColleges.length} results
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={14} className="rotate-180" />
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                onClick={handleNextPage}
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

      {/* Add College Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="bg-[#0c0926] border border-white/10 rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add College</h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false)
                  setAddError("")
                }}
                className="text-white/50 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            {addError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{addError}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">College Name *</label>
                <input
                  type="text"
                  placeholder="Enter college name"
                  value={newCollege.name}
                  onChange={(e) => setNewCollege({ ...newCollege, name: e.target.value })}
                  className="w-full bg-[#1a163f]/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">College Code *</label>
                <input
                  type="text"
                  placeholder="e.g., HU001"
                  value={newCollege.code}
                  onChange={(e) => setNewCollege({ ...newCollege, code: e.target.value })}
                  className="w-full bg-[#1a163f]/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 transition"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={() => {
                  setIsAddModalOpen(false)
                  setAddError("")
                }}
                className="flex-1 px-4 py-2.5 border border-white/10 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCollege}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition"
              >
                Add College
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
