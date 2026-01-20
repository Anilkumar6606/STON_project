"use client"

import { useState } from "react"
import { ChevronDown, Download, Eye, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import StudentSidebar from "@/components/student-sidebar"

export default function ResumeEditorPage() {
  const [fullName, setFullName] = useState("Anil Kumar")
  const [email, setEmail] = useState("anil@example.com")
  const [phone, setPhone] = useState("+1 234-567-8900")
  const [location, setLocation] = useState("New York, NY")
  const [summary, setSummary] = useState(
    "Experienced professional with a strong background in software development and project management."
  )
  const [experience, setExperience] = useState([
    { company: "Tech Corp", position: "Senior Developer", duration: "2021 - Present", description: "Led development of key features" }
  ])
  const [education, setEducation] = useState([
    { school: "University of Technology", degree: "B.S. Computer Science", year: "2021" }
  ])
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js", "MongoDB", "AWS"])
  const [showPreview, setShowPreview] = useState(false)

  const addExperience = () => {
    setExperience([...experience, { company: "", position: "", duration: "", description: "" }])
  }

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index))
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = [...experience]
    updated[index] = { ...updated[index], [field]: value }
    setExperience(updated)
  }

  const addEducation = () => {
    setEducation([...education, { school: "", degree: "", year: "" }])
  }

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...education]
    updated[index] = { ...updated[index], [field]: value }
    setEducation(updated)
  }

  const downloadPDF = () => {
    const element = document.getElementById("resume-preview")
    if (!element) return
    window.print()
  }

  const downloadDOCX = () => {
    alert("DOCX download will be available soon!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a18] via-[#0f1238] to-[#1a1a4d]">
      <StudentSidebar />
      <div className="ml-64 flex flex-col h-screen">
        <>
          {/* Header */}
          <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#16103a]/30 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Resume Editor</h1>
          <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 text-xs font-medium">
            {fullName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 h-11 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 transition"
          >
            <Eye size={18} />
            {showPreview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 px-6 h-11 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-lg shadow-green-600/30"
          >
            <Download size={18} />
            Download PDF
          </button>
          <button
            onClick={downloadDOCX}
            className="flex items-center gap-2 px-6 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg shadow-blue-600/30"
          >
            <Download size={18} />
            Download DOCX
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="flex h-full gap-6 p-8 overflow-hidden">
          {/* Editor Panel */}
          {!showPreview && (
            <div className="flex-1 overflow-y-auto space-y-8 pr-4">
              {/* Personal Info */}
              <section className="bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-blue-500"
                  />
                </div>
              </section>

              {/* Summary */}
              <section className="bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Professional Summary</h2>
                <textarea
                  placeholder="Enter your professional summary..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-blue-500 min-h-24 resize-none"
                />
              </section>

              {/* Experience */}
              <section className="bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Work Experience</h2>
                  <button
                    onClick={addExperience}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-4">
                  {experience.map((exp, idx) => (
                    <div key={idx} className="space-y-3 p-4 bg-white/5 rounded-lg border border-white/5">
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => updateExperience(idx, "company", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/40 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => updateExperience(idx, "position", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/40 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., 2021 - Present)"
                        value={exp.duration}
                        onChange={(e) => updateExperience(idx, "duration", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/40 text-sm"
                      />
                      <textarea
                        placeholder="Job description"
                        value={exp.description}
                        onChange={(e) => updateExperience(idx, "description", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/40 text-sm min-h-16 resize-none"
                      />
                      <button
                        onClick={() => removeExperience(idx)}
                        className="px-3 py-1 bg-red-600/20 text-red-400 rounded text-sm font-medium hover:bg-red-600/30"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section className="bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Education</h2>
                  <button
                    onClick={addEducation}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div key={idx} className="space-y-3 p-4 bg-white/5 rounded-lg border border-white/5">
                      <input
                        type="text"
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) => updateEducation(idx, "school", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/40 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateEducation(idx, "degree", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/40 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => updateEducation(idx, "year", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder:text-white/40 text-sm"
                      />
                      <button
                        onClick={() => removeEducation(idx)}
                        className="px-3 py-1 bg-red-600/20 text-red-400 rounded text-sm font-medium hover:bg-red-600/30"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section className="bg-[#1a163f]/60 backdrop-blur rounded-2xl border border-white/5 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => setSkills(skills.filter((_, i) => i !== idx))}
                        className="hover:text-red-400"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add skill and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      setSkills([...skills, e.currentTarget.value.trim()])
                      e.currentTarget.value = ""
                    }
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-blue-500"
                />
              </section>
            </div>
          )}

          {/* Preview Panel */}
          {showPreview && (
            <div className="flex-1 overflow-y-auto">
              <div id="resume-preview" className="bg-white text-gray-900 rounded-lg shadow-2xl p-12 mx-auto w-full max-w-4xl min-h-full">
                {/* Header */}
                <div className="text-center mb-8 pb-8 border-b-2 border-gray-300">
                  <h1 className="text-4xl font-bold text-gray-900">{fullName}</h1>
                  <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
                    <span>{email}</span>
                    <span>•</span>
                    <span>{phone}</span>
                    <span>•</span>
                    <span>{location}</span>
                  </div>
                </div>

                {/* Summary */}
                {summary && (
                  <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Professional Summary</h2>
                    <p className="text-gray-700 text-sm">{summary}</p>
                  </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                  <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Work Experience</h2>
                    <div className="space-y-4">
                      {experience.map((exp, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-gray-900">{exp.position}</h3>
                              <p className="text-gray-600 text-sm">{exp.company}</p>
                            </div>
                            <p className="text-gray-600 text-sm">{exp.duration}</p>
                          </div>
                          <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                  <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Education</h2>
                    <div className="space-y-3">
                      {education.map((edu, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                              <p className="text-gray-600 text-sm">{edu.school}</p>
                            </div>
                            <p className="text-gray-600 text-sm">{edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                  <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
        </>
      </div>
    </div>
  )
}
