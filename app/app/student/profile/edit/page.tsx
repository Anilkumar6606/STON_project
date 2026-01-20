"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bell,
  BookOpen,
  Briefcase,
  Camera,
  Code,
  DownloadCloud,
  FileText,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  MessageSquare,
  Plus,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  User,
  X,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/student", icon: FileText },
  { label: "Profile", href: "/student/profile", icon: User },
  { label: "Education", href: "/student/education", icon: GraduationCap },
  { label: "Projects", href: "/student/projects", icon: Briefcase },
  { label: "Skills", href: "/student/skills", icon: Sparkles },
  { label: "Certifications", href: "/student/certifications", icon: ShieldCheck },
  { label: "Resume Template", href: "/student/templates", icon: FileText },
  { label: "ATS Score", href: "/student/ats", icon: BookOpen },
  { label: "Download", href: "/student/download", icon: DownloadCloud },
]

export default function EditProfilePage() {
  const pathname = usePathname()
  const router = useRouter()
  const [profileImage, setProfileImage] = useState("/image/STON.png")

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Anil Kumar",
    email: "anilkumar@gmail.com",
    phone: "+923004445677",
    dob: "2002-12-02",
    fatherName: "Father Name",
    motherName: "Mother Name",
    address: "56-A Park Lane, GYH Apartments, Noida - 002165",
    languages: "English, Hindi",
  })

  // Social Media Links State
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: "GitHub", url: "https://github.com/anilkumar" },
    { id: 2, platform: "LinkedIn", url: "https://linkedin.com/in/anilkumar" },
    { id: 3, platform: "Personal Website", url: "https://anilkumar.com" },
    { id: 4, platform: "HackerRank", url: "https://hackerrank.com/anilkumar" },
    { id: 5, platform: "CodeChef", url: "https://codechef.com/users/anilkumar" },
    { id: 6, platform: "CodeForces", url: "https://codeforces.com/profile/anilkumar" },
  ])
  const [newSocialPlatform, setNewSocialPlatform] = useState("")
  const [newSocialUrl, setNewSocialUrl] = useState("")

  // Skills State
  const [technicalSkills, setTechnicalSkills] = useState(["Python", "TensorFlow", "Machine Learning", "Java", "AI"])
  const [softSkills, setSoftSkills] = useState(["Communication", "Team Work", "Problem Solving", "Leadership"])
  const [tools, setTools] = useState(["Git", "VS Code", "Docker", "Jupyter Notebook"])
  const [newTechnicalSkill, setNewTechnicalSkill] = useState("")
  const [newSoftSkill, setNewSoftSkill] = useState("")
  const [newTool, setNewTool] = useState("")

  // Academic Details State
  const [academics, setAcademics] = useState([
    {
      id: 1,
      institution: "VIJIT (VIDYA JYOTHI INSTITUTE OF TECHNOLOGY)",
      degree: "B.Tech - 4th Year | 2nd Semester",
      field: "CSE (AI&ML)",
      startDate: "27/07/2023",
      endDate: "27/07/2026",
      address: "Chaitanya Bharathi P.O, Aziz Nagar, Hyderabad - 500075",
    },
    {
      id: 2,
      institution: "Grat Shoal Public School",
      degree: "High School",
      field: "",
      startDate: "27/07/2020",
      endDate: "27/07/2023",
      address: "Chaitanya Bharathi P.O, Aziz Nagar, Hyderabad - 500075",
    },
  ])

  // Projects State
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Research Paper Classifier",
      startDate: "Sept 2023",
      endDate: "Dec 2023",
      description: "Developed a machine learning project using NLP to automatically categorize research papers based content.",
    },
    {
      id: 2,
      title: "Stock Price Predictor",
      startDate: "Jan 2023",
      endDate: "April 2023",
      description: "Built a prediction model with React and financial data API integration to forecast future stock prices.",
    },
  ])

  // Achievements State
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "First Place - National Hackathon",
      date: "Dec 2023",
      description: "Won first place in national level hackathon for developing an AI-powered solution.",
    },
    {
      id: 2,
      title: "Best Research Paper Award",
      date: "Sept 2023",
      description: "Received best research paper award at international conference on machine learning.",
    },
  ])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addSocialLink = () => {
    if (newSocialPlatform.trim() && newSocialUrl.trim()) {
      setSocialLinks([...socialLinks, { id: Date.now(), platform: newSocialPlatform.trim(), url: newSocialUrl.trim() }])
      setNewSocialPlatform("")
      setNewSocialUrl("")
    }
  }

  const removeSocialLink = (id: number) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id))
  }

  const updateSocialLink = (id: number, field: string, value: string) => {
    setSocialLinks(socialLinks.map((link) => (link.id === id ? { ...link, [field]: value } : link)))
  }

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      setTechnicalSkills([...technicalSkills, newTechnicalSkill.trim()])
      setNewTechnicalSkill("")
    }
  }

  const removeTechnicalSkill = (index: number) => {
    setTechnicalSkills(technicalSkills.filter((_, i) => i !== index))
  }

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      setSoftSkills([...softSkills, newSoftSkill.trim()])
      setNewSoftSkill("")
    }
  }

  const removeSoftSkill = (index: number) => {
    setSoftSkills(softSkills.filter((_, i) => i !== index))
  }

  const addTool = () => {
    if (newTool.trim()) {
      setTools([...tools, newTool.trim()])
      setNewTool("")
    }
  }

  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index))
  }

  const addAcademic = () => {
    setAcademics([
      ...academics,
      {
        id: Date.now(),
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        address: "",
      },
    ])
  }

  const removeAcademic = (id: number) => {
    setAcademics(academics.filter((academic) => academic.id !== id))
  }

  const updateAcademic = (id: number, field: string, value: string) => {
    setAcademics(academics.map((academic) => (academic.id === id ? { ...academic, [field]: value } : academic)))
  }

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now(),
        title: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const removeProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const updateProject = (id: number, field: string, value: string) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)))
  }

  const addAchievement = () => {
    setAchievements([
      ...achievements,
      {
        id: Date.now(),
        title: "",
        date: "",
        description: "",
      },
    ])
  }

  const removeAchievement = (id: number) => {
    setAchievements(achievements.filter((achievement) => achievement.id !== id))
  }

  const updateAchievement = (id: number, field: string, value: string) => {
    setAchievements(achievements.map((achievement) => (achievement.id === id ? { ...achievement, [field]: value } : achievement)))
  }

  const handleSave = () => {
    // Here you would typically save to backend/database
    const profileData = {
      personalInfo,
      socialLinks,
      technicalSkills,
      softSkills,
      tools,
      academics,
      projects,
      achievements,
    }
    
    // Save to localStorage for demo
    localStorage.setItem('studentProfile', JSON.stringify(profileData))
    
    console.log("Saving profile data:", profileData)
    router.push("/student/profile")
  }

  const handleCancel = () => {
    router.push("/student/profile")
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #1e2a78 0%, #2d3a8c 25%, #1a1d3e 60%, #0f1238 100%)",
      }}
    >
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="fixed inset-y-0 left-0 w-64 bg-[#0a0a18] border-r border-gray-800 flex flex-col py-8 px-6 gap-6 z-50">
          <div className="flex items-center gap-3 px-1">
            <Image src="/image/STON.png" alt="STON" width={36} height={36} className="h-9 w-9" />
            <div className="leading-tight text-white">
              <div className="text-base font-semibold">STON Technology</div>
              <div className="text-[10px] text-white/60 tracking-wide">Platform</div>
            </div>
          </div>

          <nav className="flex flex-col gap-2 text-sm">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 text-left px-4 py-3 rounded border transition ${
                    isActive
                      ? "bg-white/15 text-white border-white/25"
                      : "border-transparent hover:bg-white/5 text-white/70 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          {/* Header */}
          <header className="bg-gradient-to-r from-[#4c54d2] to-[#5b63d3] px-8 py-5 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3 text-white">
              <User className="w-7 h-7" />
              <h1 className="text-2xl font-bold">Edit Profile</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-white/20 transition">
                <Bell className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/20 transition">
                <MessageSquare className="w-5 h-5 text-white" />
              </button>
            </div>
          </header>

          {/* Action Buttons */}
          <div className="px-8 py-6 flex items-center justify-between">
            <Link
              href="/student/profile"
              className="flex items-center gap-2 text-white hover:text-white/80 transition"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </Link>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>

          {/* Profile Image Section */}
          <div className="px-8 pb-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Profile Picture</h3>
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                    <Image src={profileImage} alt="Profile" width={128} height={128} className="h-full w-full object-cover" />
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Upload a new profile picture</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Two Column Grid */}
          <div className="px-8 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <h3 className="text-xl font-bold text-white px-6 py-4 bg-[#5865f2]">Personal Information</h3>
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={personalInfo.fullName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          value={personalInfo.dob}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Father Name</label>
                        <input
                          type="text"
                          value={personalInfo.fatherName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, fatherName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mother Name</label>
                        <input
                          type="text"
                          value={personalInfo.motherName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, motherName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                      <textarea
                        value={personalInfo.address}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Known Languages</label>
                      <input
                        type="text"
                        value={personalInfo.languages}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, languages: e.target.value })}
                        placeholder="e.g., English, Hindi"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="px-6 py-4 bg-[#5865f2]">
                    <h3 className="text-xl font-bold text-white">Skills</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Technical Skills */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Technical Skills</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {technicalSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200 flex items-center gap-2"
                          >
                            {skill}
                            <button
                              onClick={() => removeTechnicalSkill(index)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTechnicalSkill}
                          onChange={(e) => setNewTechnicalSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill()}
                          placeholder="Add technical skill"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                        <button
                          onClick={addTechnicalSkill}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Soft Skills */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Soft Skills</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {softSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200 flex items-center gap-2"
                          >
                            {skill}
                            <button
                              onClick={() => removeSoftSkill(index)}
                              className="text-green-500 hover:text-green-700"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newSoftSkill}
                          onChange={(e) => setNewSoftSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
                          placeholder="Add soft skill"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                        <button
                          onClick={addSoftSkill}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Tools */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tools</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {tools.map((tool, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium border border-purple-200 flex items-center gap-2"
                          >
                            {tool}
                            <button
                              onClick={() => removeTool(index)}
                              className="text-purple-500 hover:text-purple-700"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTool}
                          onChange={(e) => setNewTool(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addTool()}
                          placeholder="Add tool"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                        <button
                          onClick={addTool}
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 bg-[#5865f2]">
                    <h3 className="text-xl font-bold text-white">Social Media Links</h3>
                    <button
                      onClick={addSocialLink}
                      disabled={!newSocialPlatform.trim() || !newSocialUrl.trim()}
                      className="text-white text-sm font-semibold px-3 py-1 bg-white/20 hover:bg-white/30 rounded transition flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                      Add Link
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* Existing Social Links */}
                    {socialLinks.map((link) => (
                      <div key={link.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <input
                          type="text"
                          value={link.platform}
                          onChange={(e) => updateSocialLink(link.id, "platform", e.target.value)}
                          placeholder="e.g., GitHub, LinkedIn"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        />
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => updateSocialLink(link.id, "url", e.target.value)}
                          placeholder="https://example.com"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        />
                        <button
                          onClick={() => removeSocialLink(link.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* Add New Social Link */}
                    {socialLinks.length > 0 && (
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Add New Social Media Link</p>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={newSocialPlatform}
                            onChange={(e) => setNewSocialPlatform(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addSocialLink()}
                            placeholder="Platform name (e.g., Dribbble, Behance)"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                          <input
                            type="url"
                            value={newSocialUrl}
                            onChange={(e) => setNewSocialUrl(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addSocialLink()}
                            placeholder="https://your-profile-url.com"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                          <button
                            onClick={addSocialLink}
                            disabled={!newSocialPlatform.trim() || !newSocialUrl.trim()}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4" />
                            Add
                          </button>
                        </div>
                      </div>
                    )}

                    {socialLinks.length === 0 && (
                      <div className="text-center py-6">
                        <p className="text-gray-500 text-sm">No social media links added yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Academic Details */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 bg-[#5865f2]">
                    <h3 className="text-xl font-bold text-white">Academic Details</h3>
                    <button
                      onClick={addAcademic}
                      className="text-white text-sm font-semibold px-3 py-1 bg-white/20 hover:bg-white/30 rounded transition flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Education
                    </button>
                  </div>
                  <div className="p-6 space-y-6">
                    {academics.map((academic, index) => (
                      <div key={academic.id} className={`space-y-3 ${index > 0 ? "pt-6 border-t border-gray-200" : ""}`}>
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">Education {index + 1}</h4>
                          {academics.length > 1 && (
                            <button
                              onClick={() => removeAcademic(academic.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={academic.institution}
                          onChange={(e) => updateAcademic(academic.id, "institution", e.target.value)}
                          placeholder="Institution name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={academic.degree}
                            onChange={(e) => updateAcademic(academic.id, "degree", e.target.value)}
                            placeholder="Degree"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                          <input
                            type="text"
                            value={academic.field}
                            onChange={(e) => updateAcademic(academic.id, "field", e.target.value)}
                            placeholder="Field of study"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={academic.startDate}
                            onChange={(e) => updateAcademic(academic.id, "startDate", e.target.value)}
                            placeholder="Start Date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                          <input
                            type="text"
                            value={academic.endDate}
                            onChange={(e) => updateAcademic(academic.id, "endDate", e.target.value)}
                            placeholder="End Date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                        </div>
                        <textarea
                          value={academic.address}
                          onChange={(e) => updateAcademic(academic.id, "address", e.target.value)}
                          placeholder="Address"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 bg-[#5865f2]">
                    <h3 className="text-xl font-bold text-white">Projects</h3>
                    <button
                      onClick={addProject}
                      className="text-white text-sm font-semibold px-3 py-1 bg-white/20 hover:bg-white/30 rounded transition flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>
                  <div className="p-6 space-y-6">
                    {projects.map((project, index) => (
                      <div key={project.id} className={`space-y-3 ${index > 0 ? "pt-6 border-t border-gray-200" : ""}`}>
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">Project {index + 1}</h4>
                          {projects.length > 1 && (
                            <button
                              onClick={() => removeProject(project.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(project.id, "title", e.target.value)}
                          placeholder="Project title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={project.startDate}
                            onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                            placeholder="Start Date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                          <input
                            type="text"
                            value={project.endDate}
                            onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                            placeholder="End Date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                          />
                        </div>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(project.id, "description", e.target.value)}
                          placeholder="Project description"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 bg-[#5865f2]">
                    <h3 className="text-xl font-bold text-white">Achievements</h3>
                    <button
                      onClick={addAchievement}
                      className="text-white text-sm font-semibold px-3 py-1 bg-white/20 hover:bg-white/30 rounded transition flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Achievement
                    </button>
                  </div>
                  <div className="p-6 space-y-6">
                    {achievements.map((achievement, index) => (
                      <div key={achievement.id} className={`space-y-3 ${index > 0 ? "pt-6 border-t border-gray-200" : ""}`}>
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">Achievement {index + 1}</h4>
                          {achievements.length > 1 && (
                            <button
                              onClick={() => removeAchievement(achievement.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={achievement.title}
                          onChange={(e) => updateAchievement(achievement.id, "title", e.target.value)}
                          placeholder="Achievement title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                        <input
                          type="text"
                          value={achievement.date}
                          onChange={(e) => updateAchievement(achievement.id, "date", e.target.value)}
                          placeholder="Date (e.g., Dec 2023)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                        <textarea
                          value={achievement.description}
                          onChange={(e) => updateAchievement(achievement.id, "description", e.target.value)}
                          placeholder="Achievement description"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="px-8 pb-8 flex items-center justify-end gap-4">
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
