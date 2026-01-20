"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ChevronDown, Download, Eye, LogOut, AlertCircle, TrendingUp, FileText } from "lucide-react"

const metrics = [
  { label: "Total Students", value: "3420" },
  { label: "Placement Ready", value: "2800" },
  { label: "Avg ATS", value: "72%" },
  { label: "Selected", value: "122" },
]

const pieData = [
  { name: "SELECTED", value: 35, color: "#30D9A4" },
  { name: "PLACEMENT READY", value: 45, color: "#2E9BFF" },
  { name: "NOT ELIGIBLE", value: 20, color: "#0D1B3F" },
]

const students = [
  { name: "Rahul Sharma", dept: "CSE", resume: "Completed", placement: "Selected", skills: "Python, Java", cgpa: "8.5", batch: "2024" },
  { name: "Ujwal Sharma", dept: "IT", resume: "Pending", placement: "Eligible", skills: "React, Node.js", cgpa: "7.8", batch: "2024" },
  { name: "Ankit Gawande", dept: "MECH", resume: "Completed", placement: "Selected", skills: "AutoCAD, CATIA", cgpa: "8.2", batch: "2023" },
  { name: "Shruti Belokar", dept: "CSE", resume: "Pending", placement: "Not Eligible", skills: "Python, AI", cgpa: "7.2", batch: "2024" },
]

const filterOptions = {
  department: ["All", "CSE", "IT", "MECH", "ECE", "EEE", "CIVIL"],
  skills: ["All", "Python", "Java", "React", "Node.js", "AutoCAD", "CATIA", "AI", "Machine Learning"],
  cgpa: ["All", "9.0+", "8.0-9.0", "7.0-8.0", "6.0-7.0"],
  batch: ["All", "2024", "2023", "2022", "2021"],
}

export default function PlacementDashboard() {
  const router = useRouter()
  const [selectedDept, setSelectedDept] = useState("All")
  const [selectedSkills, setSelectedSkills] = useState("All")
  const [selectedCGPA, setSelectedCGPA] = useState("All")
  const [selectedBatch, setSelectedBatch] = useState("All")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [showSummary, setShowSummary] = useState(false)

  // Filter function
  const getFilteredStudents = () => {
    return students.filter((student) => {
      // Department filter
      if (selectedDept !== "All" && student.dept !== selectedDept) {
        return false
      }

      // Skills filter
      if (selectedSkills !== "All" && !student.skills.includes(selectedSkills)) {
        return false
      }

      // CGPA filter
      if (selectedCGPA !== "All") {
        const studentCGPA = parseFloat(student.cgpa)
        if (selectedCGPA === "9.0+" && studentCGPA < 9.0) return false
        if (selectedCGPA === "8.0-9.0" && (studentCGPA < 8.0 || studentCGPA > 9.0)) return false
        if (selectedCGPA === "7.0-8.0" && (studentCGPA < 7.0 || studentCGPA > 8.0)) return false
        if (selectedCGPA === "6.0-7.0" && (studentCGPA < 6.0 || studentCGPA > 7.0)) return false
      }

      // Batch filter
      if (selectedBatch !== "All" && student.batch !== selectedBatch) {
        return false
      }

      return true
    })
  }

  const filteredStudents = getFilteredStudents()

  const handleLogout = () => {
    // Implement logout functionality
    window.location.href = "/login"
  }

  const handleResumeIncomplete = () => {
    // Navigate to incomplete resumes page or show modal
    alert("Showing 250 students with incomplete resumes. This would navigate to a detailed view.")
  }

  const handleTrackInterviews = () => {
    // Navigate to interviews tracking page
    alert("Opening upcoming interviews tracker. This would navigate to interviews page.")
  }

  const handleExportCSV = () => {
    // Export student data as CSV
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Department,Resume Status,Placement Status,Skills,CGPA,Batch\n"
      + students.map(s => `${s.name},${s.dept},${s.resume},${s.placement},${s.skills},${s.cgpa},${s.batch}`).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "student_records.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportZIP = async () => {
    try {
      // Export student data as ZIP file containing CSV and summary
      const JSZip = (await import('jszip')).default
      const { saveAs } = await import('file-saver')
      
      const zip = new JSZip()
      
      // Add CSV file
      const csvHeaders = "Name,Department,Resume Status,Placement Status,Skills,CGPA,Batch\n"
      const csvRows = students.map(s => 
        `"${s.name}","${s.dept}","${s.resume}","${s.placement}","${s.skills}","${s.cgpa}","${s.batch}"`
      ).join("\n")
      const csvContent = csvHeaders + csvRows
      zip.file("student_records.csv", csvContent)
      
      // Add summary text file
      const summaryContent = `Student Placement Records Summary
Generated on: ${new Date().toLocaleString()}

Metrics:
- Total Students: 3420
- Placement Ready: 2800
- Average ATS: 72%
- Selected: 122

Total Records Exported: ${students.length}
`
      zip.file("summary.txt", summaryContent)
      
      // Generate and download ZIP
      const blob = await zip.generateAsync({ type: "blob" })
      saveAs(blob, "student_placement_records.zip")
      
      alert("ZIP file exported successfully!")
    } catch (error) {
      console.error("Export ZIP error:", error)
      alert("Failed to export ZIP file. Please try again.")
    }
  }

  const handleViewPlacementReport = async () => {
    try {
      // Generate placement report as text file
      const reportContent = `
PLACEMENT STATUS REPORT
Generated on: ${new Date().toLocaleString()}

========================================
PLACEMENT DISTRIBUTION
========================================
Selected: 35% (122 students)
Placement Ready: 45% (1540 students)  
Not Eligible: 20% (1138 students)

========================================
KEY METRICS
========================================
Total Students: 3420
Students Selected: 122
Placement Ready: 2800
Average ATS Score: 72%
Average CGPA: 7.9/10

========================================
RECOMMENDATIONS
========================================
• Focus on completing 250 incomplete resumes
• Increase mock interviews for placement ready students
• Conduct skill development sessions for not eligible students
• Partner with more companies for placements

========================================
DETAILED BREAKDOWN
========================================

Resume Status:
- Completed: 2 students
- Pending: 2 students

Department Distribution:
- CSE: 2 students
- IT: 1 student
- MECH: 1 student

Placement Status:
- Selected: 2 students
- Eligible: 1 student
- Not Eligible: 1 student

========================================
Report End
========================================
`
      
      // Download as text file
      const blob = new Blob([reportContent], { type: 'text/plain' })
      const { saveAs } = await import('file-saver')
      saveAs(blob, 'placement_status_report.txt')
      
      alert("Placement report downloaded successfully!")
    } catch (error) {
      console.error("Report generation error:", error)
      alert("Failed to generate report. Please try again.")
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-[#050616] via-[#0f1a3f] to-[#1a2e66] text-white flex flex-col overflow-hidden">
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/40 backdrop-blur z-50">
        <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <img src="/image/STON.png" alt="STON Logo" className="w-8 h-8 object-contain" />
          STON
        </div>
        <h1 className="text-3xl font-bold">Placement Officer</h1>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold">
            JD
          </div>
          <span className="text-sm font-medium">John Deo</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 border-r border-white/10 bg-black/20 flex flex-col">
          <nav className="flex-1 px-6 py-8 space-y-0.5 text-white/70 text-sm overflow-y-auto">
            <NavItem label="Dashboard" active onClick={() => router.push('/placement/dashboard')} />
            <NavItem label="Placement Overview" onClick={() => router.push('/placement/overview')} />
            <NavItem label="Department" onClick={() => router.push('/placement/department')} />
            <NavItem label="Top Recruiting Companies" onClick={() => router.push('/placement/companies')} />
            <NavItem label="Current Job Openings" onClick={() => router.push('/placement/openings')} />
            <NavItem label="Student Records" onClick={() => router.push('/placement/students')} />
            <NavItem label="Profile" onClick={() => router.push('/placement/profile')} />
          </nav>
          <div className="px-6 pb-6">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 py-3 px-4 rounded-lg border border-red-400/50 transition shadow-lg"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
          <section className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur px-6 py-6 grid grid-cols-4 gap-6">
            {metrics.map((item) => (
              <div key={item.label}>
                <p className="text-sm text-white/60 mb-2">{item.label}</p>
                <p className="text-4xl font-bold text-white">{item.value}</p>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-2 gap-8">
            <section className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6 space-y-5">
              <h2 className="text-lg font-semibold">Action Required :</h2>
              
              <div className="space-y-3">
                <button 
                  onClick={handleResumeIncomplete}
                  className="w-full flex items-center gap-3 bg-white text-[#0f1543] rounded-xl px-4 py-3 font-medium hover:bg-white/90 transition"
                >
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
                  <span className="flex-1 text-left">250 Resume Incomplete</span>
                </button>
                
                <button 
                  onClick={handleTrackInterviews}
                  className="w-full flex items-center gap-3 bg-white text-[#0f1543] rounded-xl px-4 py-3 font-medium hover:bg-white/90 transition"
                >
                  <TrendingUp className="h-5 w-5 flex-shrink-0 text-blue-500" />
                  <span className="flex-1 text-left">Track Upcoming Interviews</span>
                </button>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={handleExportCSV}
                  className="flex-1 bg-white text-[#0f1543] font-semibold py-2.5 rounded-lg hover:bg-white/90 transition"
                >
                  Export CSV
                </button>
                <button 
                  onClick={handleExportZIP}
                  className="flex-1 bg-[#2a2f7a] text-white font-semibold py-2.5 rounded-lg hover:bg-[#3a3f8a] transition"
                >
                  Export ZIP
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Placement Status</h2>
                  <p className="text-xs text-white/50 mt-1">Distribution across stages</p>
                </div>
              </div>

              <div className="flex items-center justify-center h-56 py-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={pieData} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={45} 
                      outerRadius={85} 
                      paddingAngle={3} 
                      startAngle={90} 
                      endAngle={450}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth={2}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs text-white/60">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </div>
                ))}
              </div>

              <button 
                onClick={handleViewPlacementReport}
                className="w-full bg-[#2a2f7a] text-white font-semibold py-2.5 rounded-lg hover:bg-[#3a3f8a] transition"
              >
                View Full Placement Report
              </button>
            </section>
          </div>

          <section className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-6 space-y-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Student Records :</h2>
              <div className="flex gap-2 relative">
                {/* Department Filter */}
                <div className="relative">
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === 'dept' ? null : 'dept')}
                    className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
                  >
                    {selectedDept === "All" ? "Department" : selectedDept}
                    <ChevronDown className="h-4 w-4 text-white/50" />
                  </button>
                  {openDropdown === 'dept' && (
                    <div className="absolute top-full mt-1 right-0 bg-[#1a2e66] border border-white/15 rounded-lg shadow-lg z-50 min-w-[150px]">
                      {filterOptions.department.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSelectedDept(opt)
                            setOpenDropdown(null)
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition first:rounded-t-lg last:rounded-b-lg"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* CGPA Filter */}
                <div className="relative">
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === 'cgpa' ? null : 'cgpa')}
                    className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
                  >
                    {selectedCGPA === "All" ? "CGPA" : selectedCGPA}
                    <ChevronDown className="h-4 w-4 text-white/50" />
                  </button>
                  {openDropdown === 'cgpa' && (
                    <div className="absolute top-full mt-1 right-0 bg-[#1a2e66] border border-white/15 rounded-lg shadow-lg z-50 min-w-[150px]">
                      {filterOptions.cgpa.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSelectedCGPA(opt)
                            setOpenDropdown(null)
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition first:rounded-t-lg last:rounded-b-lg"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Batch Filter */}
                <div className="relative">
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === 'batch' ? null : 'batch')}
                    className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
                  >
                    {selectedBatch === "All" ? "Batch" : selectedBatch}
                    <ChevronDown className="h-4 w-4 text-white/50" />
                  </button>
                  {openDropdown === 'batch' && (
                    <div className="absolute top-full mt-1 right-0 bg-[#1a2e66] border border-white/15 rounded-lg shadow-lg z-50 min-w-[150px]">
                      {filterOptions.batch.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSelectedBatch(opt)
                            setOpenDropdown(null)
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition first:rounded-t-lg last:rounded-b-lg"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/15 bg-black/20">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-black/30">
                    <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Name</th>
                    <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Dept</th>
                    <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Resume Status</th>
                    <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">Placement Status</th>
                    <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-white/50 font-semibold">CGPA</th>
                    <th className="px-5 py-3 text-center text-xs uppercase tracking-wider text-white/50 font-semibold">View</th>
                    <th className="px-5 py-3 text-center text-xs uppercase tracking-wider text-white/50 font-semibold">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="px-5 py-3.5 text-sm font-medium text-white">{student.name}</td>
                        <td className="px-5 py-3.5 text-sm text-white/70">{student.dept}</td>
                        <td className="px-5 py-3.5 text-sm text-white/70">{student.resume}</td>
                        <td className="px-5 py-3.5 text-sm text-white/70">{student.placement}</td>
                        <td className="px-5 py-3.5 text-sm text-white/70">{student.cgpa}</td>
                        <td className="px-5 py-3.5 text-center">
                          <button className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/15 text-white/70 hover:bg-white/20 transition">
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <button className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition">
                            <Download className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-5 py-8 text-center text-white/50">
                        No students found matching the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-center pt-2">
              <button 
                onClick={() => setShowSummary(true)}
                className="bg-white text-[#0f1543] font-semibold px-8 py-2.5 rounded-full hover:bg-white/90 transition"
              >
                View Full Summary
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur z-[100] flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#050616] via-[#0f1a3f] to-[#1a2e66] border border-white/15 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-black/40 backdrop-blur">
              <h2 className="text-2xl font-bold text-white">Student Summary Report</h2>
              <button 
                onClick={() => setShowSummary(false)}
                className="text-white/70 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-8 py-8 space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-white/15 bg-white/5 backdrop-blur p-4">
                  <p className="text-sm text-white/60 mb-2">Total Filtered Students</p>
                  <p className="text-3xl font-bold text-white">{filteredStudents.length}</p>
                </div>
                <div className="rounded-lg border border-white/15 bg-white/5 backdrop-blur p-4">
                  <p className="text-sm text-white/60 mb-2">Selected Students</p>
                  <p className="text-3xl font-bold text-[#30D9A4]">{filteredStudents.filter(s => s.placement === "Selected").length}</p>
                </div>
                <div className="rounded-lg border border-white/15 bg-white/5 backdrop-blur p-4">
                  <p className="text-sm text-white/60 mb-2">Placement Ready</p>
                  <p className="text-3xl font-bold text-[#2E9BFF]">{filteredStudents.filter(s => s.placement === "Eligible").length}</p>
                </div>
                <div className="rounded-lg border border-white/15 bg-white/5 backdrop-blur p-4">
                  <p className="text-sm text-white/60 mb-2">Average CGPA</p>
                  <p className="text-3xl font-bold text-white">
                    {(
                      filteredStudents.reduce((sum, s) => sum + parseFloat(s.cgpa), 0) / filteredStudents.length || 0
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Resume Status Breakdown */}
              <div className="rounded-lg border border-white/15 bg-white/5 backdrop-blur p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Resume Status</h3>
                <div className="space-y-2">
                  {[
                    { status: "Completed", count: filteredStudents.filter(s => s.resume === "Completed").length, color: "#30D9A4" },
                    { status: "Pending", count: filteredStudents.filter(s => s.resume === "Pending").length, color: "#FFA500" },
                  ].map((item) => (
                    <div key={item.status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-white/70">{item.status}</span>
                      </div>
                      <span className="font-semibold text-white">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Breakdown */}
              {filteredStudents.length > 0 && (
                <div className="rounded-lg border border-white/15 bg-white/5 backdrop-blur p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Department Distribution</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(filteredStudents.map(s => s.dept))).map((dept) => (
                      <div key={dept} className="flex items-center justify-between">
                        <span className="text-white/70">{dept}</span>
                        <span className="font-semibold text-white">{filteredStudents.filter(s => s.dept === dept).length}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Batch Breakdown */}
              {filteredStudents.length > 0 && (
                <div className="rounded-lg border border-white/15 bg-white/5 backdrop-blur p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Batch Distribution</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(filteredStudents.map(s => s.batch))).sort().map((batch) => (
                      <div key={batch} className="flex items-center justify-between">
                        <span className="text-white/70">Batch {batch}</span>
                        <span className="font-semibold text-white">{filteredStudents.filter(s => s.batch === batch).length}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex items-center justify-between px-8 py-4 border-t border-white/10 bg-black/40 backdrop-blur gap-3">
              <button 
                onClick={() => setShowSummary(false)}
                className="flex-1 bg-white/10 text-white font-semibold py-2.5 rounded-lg hover:bg-white/20 transition"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  const csvContent = "data:text/csv;charset=utf-8," 
                    + "Name,Department,Resume Status,Placement Status,CGPA,Batch\n"
                    + filteredStudents.map(s => `${s.name},${s.dept},${s.resume},${s.placement},${s.cgpa},${s.batch}`).join("\n")
                  
                  const encodedUri = encodeURI(csvContent)
                  const link = document.createElement("a")
                  link.setAttribute("href", encodedUri)
                  link.setAttribute("download", "student_summary.csv")
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
                className="flex-1 bg-white text-[#0f1543] font-semibold py-2.5 rounded-lg hover:bg-white/90 transition"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function NavItem({ label, active = false, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition ${
        active ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-white" : "bg-white/30"}`} />
      <span>{label}</span>
    </div>
  )
}
