"use client"

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
  Building2
} from "lucide-react"

import { useMemo, useState } from "react"

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

export default function PrincipalsPage() {
  const [principals, setPrincipals] = useState(initialPrincipals)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    status: "Active" as "Active" | "Inactive",
  })

  const filteredPrincipals = useMemo(() => {
    return principals.filter((p) => {
      const matchesSearch = `${p.name} ${p.email} ${p.college} ${p.phone}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim())
      const matchesStatus = statusFilter === "All" ? true : p.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [principals, searchTerm, statusFilter])

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", college: "", status: "Active" })
    setEditingId(null)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.college.trim()) return

    if (editingId) {
      setPrincipals((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                college: form.college.trim(),
                status: form.status,
              }
            : p
        )
      )
    } else {
      const nextId = principals.length ? Math.max(...principals.map((p) => p.id)) + 1 : 1
      const initials = form.name
        .trim()
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

      const colors = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-amber-500", "bg-green-500"]
      const color = colors[nextId % colors.length]

      const newPrincipal = {
        id: nextId,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        college: form.college.trim(),
        status: form.status,
        joinedAt: new Date().toISOString().slice(0, 10),
        avatar: initials || "PR",
        color,
      }
      setPrincipals((prev) => [...prev, newPrincipal])
    }

    resetForm()
    setShowForm(false)
  }

  const startEdit = (id: number) => {
    const principal = principals.find((p) => p.id === id)
    if (!principal) return
    setEditingId(id)
    setForm({
      name: principal.name,
      email: principal.email,
      phone: principal.phone,
      college: principal.college,
      status: principal.status as "Active" | "Inactive",
    })
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    setPrincipals((prev) => prev.filter((p) => p.id !== id))
    if (editingId === id) resetForm()
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
              if (showForm && !editingId) {
                setShowForm(false)
                resetForm()
              } else {
                resetForm()
                setShowForm(true)
              }
            }}
          >
            <Plus size={18} />
            {showForm && !editingId ? "Close" : editingId ? "Editing" : "Add Principal"}
          </button>
        </div>

        {showForm && (
          <div className="mb-6 bg-[#1a163f]/60 border border-white/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              placeholder="Full name"
              className="bg-[#110c2c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
            <input
              placeholder="Email"
              className="bg-[#110c2c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            />
            <input
              placeholder="Phone"
              className="bg-[#110c2c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            />
            <input
              placeholder="College"
              className="bg-[#110c2c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              value={form.college}
              onChange={(e) => setForm((prev) => ({ ...prev, college: e.target.value }))}
            />
            <select
              className="bg-[#110c2c] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as typeof form.status }))}
            >
              <option className="bg-[#110c2c]" value="Active">Active</option>
              <option className="bg-[#110c2c]" value="Inactive">Inactive</option>
            </select>
            <div className="flex items-center gap-3 md:col-span-5">
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium text-white"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-4 py-2 border border-white/20 rounded-lg text-sm text-white/70 hover:text-white"
                onClick={() => {
                  resetForm()
                  setShowForm(false)
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

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
            {filteredPrincipals.map((principal) => (
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
                  <button
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition"
                    onClick={() => startEdit(principal.id)}
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition"
                    onClick={() => handleDelete(principal.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-white/5 flex items-center justify-end gap-4 text-sm text-white/50">
            <span>
              Showing {filteredPrincipals.length ? 1 : 0} to {filteredPrincipals.length} of {filteredPrincipals.length} results
            </span>
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
