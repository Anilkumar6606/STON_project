"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  BookOpen,
  Briefcase,
  Camera,
  Code,
  DownloadCloud,
  FileText,
  Pencil,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react"
import StudentSidebar from "@/components/student-sidebar"

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

const profileSections = [
  { title: "Academic Details", items: ["Current Education", "Previous Education"], completion: 1 },
  { title: "Experience / Internship", items: [], completion: 0 },
  { title: "Projects", items: ["Technical Skills", "Programming Languages", "Tools / Frameworks"], completion: 0 },
  { title: "Certifications & Achievements", items: [], completion: 0 },
  { title: "Preference / Links", items: [], completion: 0 },
  { title: "Preferences & Career Interests", items: [], completion: 0 },
]

const personalDetails = {
  name: "Anil Kumar",
  title: "B.Tech – CSE (AI & ML)",
  institute: "ABC Institute of Technology: 3rd Year",
  location: "Hyderabad, Telangana, India",
  avatar: "/image/STON.png",
}

export default function StudentProfilePage() {
  const pathname = usePathname()
  const [profileImage, setProfileImage] = useState(personalDetails.avatar)
  const [profileData, setProfileData] = useState<any>(null)
  const [educationData, setEducationData] = useState<any[]>([])

  useEffect(() => {
    // Load profile data from localStorage
    const savedData = localStorage.getItem('studentProfile')
    if (savedData) {
      setProfileData(JSON.parse(savedData))
    }
  }, [])

  useEffect(() => {
    // Load education data from localStorage
    const savedEducation = localStorage.getItem('studentEducation')
    if (savedEducation) {
      setEducationData(JSON.parse(savedEducation))
    }
  }, [])

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

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #1e2a78 0%, #2d3a8c 25%, #1a1d3e 60%, #0f1238 100%)",
      }}
    >
      <div className="flex">
        <StudentSidebar />

        {/* Main Content */}
        <main className="flex-1 ml-64">
          {/* Header */}
          <header className="bg-gradient-to-r from-[#4c54d2] to-[#5b63d3] px-8 py-5 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3 text-white">
              <User className="w-7 h-7" />
              <h1 className="text-2xl font-bold">Student Profile</h1>
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

          {/* Hero Profile Section */}
          <div className="bg-gradient-to-r from-[#5865f2] via-[#5b63d3] to-[#7289da] px-8 py-8 mx-8 mt-6 rounded-xl shadow-2xl">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-6 flex-1">
                {/* Profile Image */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image 
                      src={profileImage} 
                      alt={personalDetails.name} 
                      width={128} 
                      height={128} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>

                {/* Profile Info */}
                <div className="flex flex-col justify-start gap-4 flex-1">
                  <div>
                    <h1 className="text-4xl font-bold text-white">{personalDetails.name}</h1>
                    <p className="text-white/90 text-base mt-1">B.Tech in Artificial Intelligence & Machine Learning (AI & ML) Student</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>anilkumar@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>+923004445677</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Noida, India</span>
                    </div>
                  </div>

                  {/* Social Media Links - Below Contact Info */}
                  <div className="flex items-center gap-2 flex-wrap pt-2">
                    {profileData?.socialLinks && profileData.socialLinks.length > 0 ? (
                      profileData.socialLinks.map((link) => {
                        if (!link.url) return null
                        const getIcon = () => {
                          const iconProps = { className: "w-4 h-4" };
                          switch (link.platform.toLowerCase()) {
                            case "github":
                              return <Github {...iconProps} />;
                            case "linkedin":
                              return <Linkedin {...iconProps} />;
                            case "website":
                              return <Globe {...iconProps} />;
                            case "hackerrank":
                              return <Code {...iconProps} />;
                            case "codechef":
                              return <Code {...iconProps} />;
                            case "codeforces":
                              return <Code {...iconProps} />;
                            default:
                              return <Globe {...iconProps} />;
                          }
                        };

                        return (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-all duration-200 hover:scale-105"
                          >
                            {getIcon()}
                            <span>{link.platform}</span>
                          </a>
                        );
                      })
                    ) : (
                      <span className="text-white/60 text-sm">No social links added</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <Link
                href="/student/profile/edit"
                className="bg-[#4c54d2] hover:bg-[#3a4299] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg h-fit"
              >
                Edit Profile
                <span>›</span>
              </Link>
            </div>
          </div>

          {/* Main Content - Single Unified Container */}
          <div className="px-8 py-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header with Edit Button */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#5865f2]">
                <h3 className="text-2xl font-bold text-white">Student Profile Information</h3>
                <button
                  className="w-8 h-8 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                  aria-label="Edit profile"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Personal Information Section */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">Personal Information</h4>
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2">Full Name</p>
                        <p className="text-base text-gray-900">{personalDetails.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2">Email Address</p>
                        <p className="text-base text-gray-900">anilkumar@gmail.com</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2">Phone Number</p>
                        <p className="text-base text-gray-900">+923004445677</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2">Date of Birth</p>
                        <p className="text-base text-gray-900">02-12-2003</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2">Father Name</p>
                        <p className="text-base text-gray-900">Father Name</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2">Mother Name</p>
                        <p className="text-base text-gray-900">Mother Name</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-2">Address</p>
                      <p className="text-base text-gray-900">56-A Park Lane, GYH Apartments, Noida - 002165</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-2">Known Languages</p>
                      <p className="text-base text-gray-900">English, Hindi</p>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">Skills</h4>
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-sm font-bold text-gray-700 mb-3">Technical Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {(profileData?.technicalSkills || ["Python", "TensorFlow", "Machine Learning", "Java", "AI"]).map((skill: string, index: number) => (
                          <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-bold text-gray-700 mb-3">Soft Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {(profileData?.softSkills || ["Communication", "Team Work", "Problem Solving", "Leadership"]).map((skill: string, index: number) => (
                          <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-bold text-gray-700 mb-3">Tools</h5>
                      <div className="flex flex-wrap gap-2">
                        {(profileData?.tools || ["Git", "VS Code", "Docker", "Jupyter Notebook"]).map((tool: string, index: number) => (
                          <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium border border-purple-200">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Details Section */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">Academic Details</h4>
                  <div className="space-y-4">
                    {educationData.length > 0 ? (
                      educationData.map((edu, index) => (
                        <div key={edu.id} className={index !== educationData.length - 1 ? "pb-4 border-b border-gray-200" : ""}>
                          <div className="flex items-start gap-3 mb-2">
                            <span className="text-2xl">{index === 0 ? "🎓" : "🏫"}</span>
                            <div>
                              <h5 className="font-bold text-gray-900">{edu.school}</h5>
                              <p className="text-sm text-gray-600 mt-1">{edu.title}</p>
                              <p className="text-sm text-gray-600">{edu.board}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-500 ml-11">
                            <div className="flex items-center gap-1">
                              <span>📅</span>
                              <span>{edu.year}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>📊</span>
                              <span>{edu.percentage}%</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No education details added. <Link href="/student/education" className="text-[#5865f2] hover:underline">Add education</Link></p>
                    )}
                  </div>
                </div>

                {/* Projects Section */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">Projects</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-bold text-gray-900">Research Paper Classifier</h5>
                        <p className="text-xs text-gray-500">Sept 2023 - Dec 2023</p>
                      </div>
                      <p className="text-sm text-gray-600">Developed a machine learning project using NLP to automatically categorize research papers based content.</p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-bold text-gray-900">Stock Price Predictor</h5>
                        <p className="text-xs text-gray-500">Jan 2023 - April 2023</p>
                      </div>
                      <p className="text-sm text-gray-600">Built a prediction model with React and financial data API integration to forecast future stock prices.</p>
                    </div>
                  </div>
                </div>

                {/* Achievements Section */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">Achievements</h4>
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-gray-200">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🏆</span>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h5 className="font-bold text-gray-900">First Place - National Hackathon</h5>
                            <p className="text-xs text-gray-500">Dec 2023</p>
                          </div>
                          <p className="text-sm text-gray-600">Won first place in national level hackathon for developing an AI-powered solution.</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🎖️</span>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h5 className="font-bold text-gray-900">Best Research Paper Award</h5>
                            <p className="text-xs text-gray-500">Sept 2023</p>
                          </div>
                          <p className="text-sm text-gray-600">Received best research paper award at international conference on machine learning.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
