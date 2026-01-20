"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import {
  Search,
  Filter,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronRight,
  User,
  Mail,
  Phone,
  Building2,
  X,
  AlertCircle,
} from "lucide-react"

// Dummy Data for Principals
const initialPrincipals = [
  {
    id: 1,
    name: "Dr. Robert Smith",
    email: "robert.smith@headley.edu",
    phone: "+1 (555) 123-4567",
    college: "Headley University",
    status: "Active",
    joinedAt: "2024-01-15",
    avatar: "RS",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Prof. Sarah Johnson",
    email: "sarah.j@oakwood.edu",
    phone: "+1 (555) 234-5678",
    college: "Oakwood College",
    status: "Active",
    joinedAt: "2024-02-10",
    avatar: "SJ",
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    email: "j.wilson@crestwood.edu",
    phone: "+1 (555) 345-6789",
    college: "Crestwood Institute",
    status: "Inactive",
    joinedAt: "2024-01-22",
    avatar: "JW",
    color: "bg-amber-500",
  },
  {
    id: 4,
    name: "Dr. Emily Davis",
    email: "emily.d@westlake.edu",
    phone: "+1 (555) 456-7890",
    college: "Westlake College",
    status: "Active",
    joinedAt: "2024-03-15",
    avatar: "ED",
    color: "bg-pink-500",
  },
]

const ITEMS_PER_PAGE = 4

type Principal = (typeof initialPrincipals)[0]

export default function PrincipalsPage() {
  const [principals, setPrincipals] = useState<Principal[]>(initialPrincipals)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
  const [newPrincipal, setNewPrincipal] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
  })
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

  // Filter principals based on search and status
  const filteredPrincipals = useMemo(() => {
    return principals.filter((principal) => {
      const matchesSearch =
        principal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        principal.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        principal.college.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus =
        statusFilter === "All Status" || principal.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [principals, searchTerm, statusFilter])

  // Calculate pagination
  const totalPages = Math.ceil(filteredPrincipals.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedPrincipals = filteredPrincipals.slice(
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
    setIsFilterDropdownOpen(false)
  }

  const handleAddPrincipal = () => {
    setAddError("")
    if (!newPrincipal.name.trim()) {
      setAddError("Principal name is required")
      return
    }
    if (!newPrincipal.email.trim()) {
      setAddError("Email is required")
      return
    }
    if (!newPrincipal.phone.trim()) {
      setAddError("Phone number is required")
      return
    }
    if (!newPrincipal.college.trim()) {
      setAddError("College is required")
      return
    }
    if (principals.some((p) => p.email === newPrincipal.email)) {
      setAddError("Email already exists")
      return
    }

    const getInitials = (name: string) => {
      const words = name.trim().split(" ")
      if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase()
      }
      return name.substring(0, 2).toUpperCase()
    }

    const colors = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-amber-500", "bg-green-500"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const principal: Principal = {
      id: Math.max(...principals.map((p) => p.id), 0) + 1,
      name: newPrincipal.name,
      email: newPrincipal.email,
      phone: newPrincipal.phone,
      college: newPrincipal.college,
      status: "Active",
      joinedAt: new Date().toISOString().split("T")[0],
      avatar: getInitials(newPrincipal.name),
      color: randomColor,
    }

    setPrincipals([...principals, principal])
    setNewPrincipal({ name: "", email: "", phone: "", college: "" })
    setIsAddModalOpen(false)
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
          <h1 className="text-xl font-bold">Principals</h1>
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
                placeholder="Search principals..."
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
                      onClick={() => handleStatusFilter(status)}
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
            Add Principal
          </button>
        </div>

        {/* Principals Table */}
        <div className="bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <User size={20} className="text-white/70" />
            <h3 className="text-lg font-semibold">Principals</h3>
          </div>
          
          {/* Table Header */}
          <div className="bg-white/5 px-6 py-4">
            <div className="flex items-center text-sm font-medium text-white/50">
              <div className="w-[30%]">Name</div>
              <div className="w-[25%]">Contact</div>
              <div className="w-[20%]">College</div>
              <div className="w-[10%]">Status</div>
              <div className="w-[15%]">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {paginatedPrincipals.length > 0 ? (
              paginatedPrincipals.map((principal) => (
              <div
                key={principal.id}
                className="px-6 py-4 flex items-center hover:bg-white/5 transition group"
              >
                {/* Name */}
                <div className="w-[30%] flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${principal.color} flex items-center justify-center text-xs font-bold`}>
                    {principal.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/90">{principal.name}</div>
                    <div className="text-xs text-white/50">{principal.joinedAt}</div>
                  </div>
                </div>

                {/* Contact */}
                <div className="w-[25%]">
                  <div className="flex items-center gap-2 text-sm text-white/70 mb-1">
                    <Mail size={12} className="text-white/40" />
                    {principal.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Phone size={12} className="text-white/40" />
                    {principal.phone}
                  </div>
                </div>

                {/* College */}
                <div className="w-[20%] flex items-center gap-2 text-sm text-white/70">
                  <Building2 size={14} className="text-white/40" />
                  {principal.college}
                </div>

                {/* Status */}
                <div className="w-[10%]">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      principal.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {principal.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="w-[15%] flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition">
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center text-white/60">
                <AlertCircle size={32} className="mx-auto mb-3 opacity-50" />
                <p>No principals found</p>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-white/50">
            <span>
              Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredPrincipals.length)} of{" "}
              {filteredPrincipals.length} results
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

      {/* Add Principal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="bg-[#0c0926] border border-white/10 rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add Principal</h2>
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
                <label className="block text-sm font-medium text-white/70 mb-2">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={newPrincipal.name}
                  onChange={(e) => setNewPrincipal({ ...newPrincipal, name: e.target.value })}
                  className="w-full bg-[#1a163f]/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Email *</label>
                <input
                  type="email"
                  placeholder="principal@college.edu"
                  value={newPrincipal.email}
                  onChange={(e) => setNewPrincipal({ ...newPrincipal, email: e.target.value })}
                  className="w-full bg-[#1a163f]/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Phone *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={newPrincipal.phone}
                  onChange={(e) => setNewPrincipal({ ...newPrincipal, phone: e.target.value })}
                  className="w-full bg-[#1a163f]/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">College *</label>
                <input
                  type="text"
                  placeholder="Enter college name"
                  value={newPrincipal.college}
                  onChange={(e) => setNewPrincipal({ ...newPrincipal, college: e.target.value })}
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
                onClick={handleAddPrincipal}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition"
              >
                Add Principal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
