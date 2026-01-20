"use client"

import {
  Search,
  Filter,
  Plus,
  Pencil,
  Calendar,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Users
} from "lucide-react"

import { useMemo, useState } from "react"

// Dummy Data for Colleges
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
]

export default function CollegesPage() {
  const [colleges, setColleges] = useState(initialColleges)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCollege, setNewCollege] = useState({ name: "", code: "" })
  const [editingId, setEditingId] = useState<number | null>(null)

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const matchesSearch = `${college.name} ${college.code}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim())
      const matchesStatus =
        statusFilter === "All" ? true : college.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [colleges, searchTerm, statusFilter])

  const toggleStatus = (id: number) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.id === id
          ? {
              ...college,
              status: college.status === "Active" ? "Inactive" : "Active",
            }
          : college
      )
    )
  }

  const startEdit = (collegeId: number) => {
    const college = colleges.find((c) => c.id === collegeId)
    if (!college) return
    setEditingId(collegeId)
    setNewCollege({ name: college.name, code: college.code })
    setShowAddForm(true)
  }

  const saveCollege = () => {
    if (!newCollege.name.trim() || !newCollege.code.trim()) return

    if (editingId) {
      setColleges((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, name: newCollege.name.trim(), code: newCollege.code.trim() }
            : c
        )
      )
    } else {
      const nextId = colleges.length ? Math.max(...colleges.map((c) => c.id)) + 1 : 1
      const next = {
        id: nextId,
        name: newCollege.name.trim(),
        code: newCollege.code.trim(),
        status: "Active" as const,
        createdAt: new Date().toISOString().slice(0, 10),
        color: "text-blue-400",
      }
      setColleges((prev) => [...prev, next])
    }

    setNewCollege({ name: "", code: "" })
    setEditingId(null)
    setShowAddForm(false)
  }

  const openAddForm = () => {
    setEditingId(null)
    setNewCollege({ name: "", code: "" })
    setShowAddForm(true)
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
                className="w-full bg-[#1a163f]/60 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a163f]/60 border border-white/10 rounded-lg text-sm font-medium text-white/70">
              <Filter size={18} />
              <select
                className="bg-transparent focus:outline-none text-white/80"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              >
                <option className="bg-[#1a163f]" value="All">All Status</option>
                <option className="bg-[#1a163f]" value="Active">Active</option>
                <option className="bg-[#1a163f]" value="Inactive">Inactive</option>
              </select>
              <ChevronDown size={16} className="ml-1" />
            </div>
          </div>
          
          <button
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-blue-600/20"
            onClick={() => {
              if (showAddForm && !editingId) {
                setShowAddForm(false)
                setNewCollege({ name: "", code: "" })
              } else {
                openAddForm()
              }
            }}
          >
            <Plus size={18} />
            {showAddForm && !editingId ? "Close" : editingId ? "Editing" : "Add College"}
          </button>
        </div>

        {showAddForm && (
          <div className="mb-6 bg-[#1a163f]/60 border border-white/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="College name"
              className="bg-[#110c2c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              value={newCollege.name}
              onChange={(e) => setNewCollege((prev) => ({ ...prev, name: e.target.value }))}
            />
            <input
              placeholder="College code"
              className="bg-[#110c2c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              value={newCollege.code}
              onChange={(e) => setNewCollege((prev) => ({ ...prev, code: e.target.value }))}
            />
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium text-white"
                onClick={saveCollege}
              >
                Save
              </button>
              <button
                className="px-4 py-2 border border-white/20 rounded-lg text-sm text-white/70 hover:text-white"
                onClick={() => {
                  setShowAddForm(false)
                  setNewCollege({ name: "", code: "" })
                  setEditingId(null)
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

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
            {filteredColleges.map((college) => (
              <div
                key={college.id}
                className="px-6 py-4 flex items-center hover:bg-white/5 transition group"
              >
                {/* Name */}
                <div className="w-[30%] flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center`}>
                    <GraduationCap size={16} className={college.status === "Active" ? "text-blue-400" : "text-red-400"} />
                  </div>
                  <span className="text-sm font-medium text-white/90">{college.name}</span>
                </div>

                {/* Code */}
                <div className="w-[15%] text-sm text-white/60">{college.code}</div>

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
                  <button
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition"
                    onClick={() => startEdit(college.id)}
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  
                  {college.status === "Active" ? (
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition"
                      onClick={() => toggleStatus(college.id)}
                    >
                      <Calendar size={14} />
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-xs font-medium text-emerald-400 hover:bg-emerald-600/30 transition"
                      onClick={() => toggleStatus(college.id)}
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-white/5 flex items-center justify-end gap-4 text-sm text-white/50">
            <span>Showing 1 to 6 of 6 results</span>
            <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 text-white font-medium">1</button>
                <button className="flex items-center gap-1 hover:text-white transition">
                    Next <ChevronRight size={14} />
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
