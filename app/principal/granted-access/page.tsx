"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { User, Search, Settings, Bell, Plus, X, Edit2, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import PrincipalSidebar from "@/components/principal-sidebar"

interface AccessUser {
  id: number
  name: string
  role: string
  idNumber: string
  department: string
  email: string
  avatar: string
}

export default function GrantedAccess() {
  const router = useRouter()
  const { data: session } = useSession()
  const [selectedAccessType, setSelectedAccessType] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [showGrantModal, setShowGrantModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    role: "Placement Officer",
    id: "",
    department: "",
    email: ""
  })

  const [accessList, setAccessList] = useState<AccessUser[]>([
    {
      id: 1,
      name: "John Deo",
      role: "Placement Officer",
      idNumber: "STS895433",
      department: "-",
      email: "john.deo@example.com",
      avatar: "JD"
    },
    {
      id: 2,
      name: "Andrew Singh",
      role: "Placement Officer",
      idNumber: "STS784560",
      department: "-",
      email: "andrewsingh@email.com",
      avatar: "AS"
    },
    {
      id: 3,
      name: "Sarah Verma",
      role: "Placement Officer",
      idNumber: "STS552210",
      department: "CSE",
      email: "sarah.verma@email.com",
      avatar: "SV"
    },
    {
      id: 4,
      name: "Priya Sharma",
      role: "Placement Officer",
      idNumber: "EMP123450",
      department: "CSE",
      email: "priya.sharma@example.com",
      avatar: "PS"
    },
    {
      id: 5,
      name: "Vikram Patel",
      role: "Department Coordinator",
      idNumber: "EMP987654",
      department: "IT",
      email: "EMP987654@email.com",
      avatar: "VP"
    },
    {
      id: 6,
      name: "Arpita Desai",
      role: "Department Coordinator",
      idNumber: "EMP678900",
      department: "Mech",
      email: "arpita.desai@example.com",
      avatar: "AD"
    },
  ])

  const stats = [
    { label: "Placement Officers", value: String(accessList.filter(a => a.role === "Placement Officer").length), icon: "👔" },
    { label: "Department Coordinators", value: String(accessList.filter(a => a.role === "Department Coordinator").length), icon: "👥" }
  ]

  const filteredData = selectedAccessType === "All"
    ? accessList
    : accessList.filter(item => item.role === selectedAccessType)

  const handleGrantAccess = () => {
    if (!formData.name || !formData.email || !formData.id) {
      alert("Please fill all required fields")
      return
    }

    if (editingId !== null) {
      setAccessList(accessList.map(item =>
        item.id === editingId
          ? { ...item, name: formData.name, role: formData.role, idNumber: formData.id, department: formData.department || "-", email: formData.email }
          : item
      ))
      setEditingId(null)
      alert("Access updated successfully!")
    } else {
      const newAccess: AccessUser = {
        id: Math.max(...accessList.map(a => a.id), 0) + 1,
        name: formData.name,
        role: formData.role,
        idNumber: formData.id,
        department: formData.department || "-",
        email: formData.email,
        avatar: formData.name.split(" ").map(n => n[0]).join("").toUpperCase()
      }
      setAccessList([...accessList, newAccess])
      alert("Access granted successfully!")
    }

    setFormData({ name: "", role: "Placement Officer", id: "", department: "", email: "" })
    setShowGrantModal(false)
  }

  const handleEdit = (item: AccessUser) => {
    setFormData({
      name: item.name,
      role: item.role,
      id: item.idNumber,
      department: item.department === "-" ? "" : item.department,
      email: item.email
    })
    setEditingId(item.id)
    setShowGrantModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to revoke access?")) {
      setAccessList(accessList.filter(item => item.id !== id))
      alert("Access revoked successfully!")
    }
  }

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <PrincipalSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Granted Access</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">{stat.label}</p>
                    <p className="text-white text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <span className="text-4xl">{stat.icon}</span>
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
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>

            <Select value={selectedAccessType} onValueChange={setSelectedAccessType}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Roles</SelectItem>
                <SelectItem value="Placement Officer">Placement Officer</SelectItem>
                <SelectItem value="Department Coordinator">Department Coordinator</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => {
                setEditingId(null)
                setFormData({ name: "", role: "Placement Officer", id: "", department: "", email: "" })
                setShowGrantModal(true)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Grant Access
            </Button>
          </div>

          {/* Access Table */}
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Role</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">ID</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Department</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-white/80 text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            {item.avatar}
                          </div>
                          <span className="text-white font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200">
                          {item.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/80 text-sm">{item.idNumber}</td>
                      <td className="px-6 py-4 text-white/80 text-sm">{item.department}</td>
                      <td className="px-6 py-4 text-white/80 text-sm">{item.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 hover:bg-white/10 rounded transition text-blue-400"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 hover:bg-white/10 rounded transition text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Grant/Edit Access Modal */}
      {showGrantModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-lg p-6 w-96 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold">{editingId ? "Edit Access" : "Grant Access"}</h2>
              <button onClick={() => setShowGrantModal(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />

              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Placement Officer">Placement Officer</SelectItem>
                  <SelectItem value="Department Coordinator">Department Coordinator</SelectItem>
                  <SelectItem value="HOD">HOD</SelectItem>
                </SelectContent>
              </Select>

              <input
                type="text"
                placeholder="ID Number"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />

              <input
                type="text"
                placeholder="Department (Optional)"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                onClick={handleGrantAccess}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {editingId ? "Update" : "Grant"}
              </Button>
              <Button
                onClick={() => setShowGrantModal(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
