"use client"

import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Download, Edit, Phone, MapPin, Mail, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

function ResumePreviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const template = searchParams.get("template") || "classic-blue"

  // Sample data - in real app, this would come from props or API
  const resumeData = {
    personalInfo: {
      fullName: "JOHN DEO",
      title: "HEAD MANAGER",
      phone: "+123-456-7890",
      address: "123 Anywhere Street, Any City",
      email: "hello@reallygreatsite.com",
    },
    careerObjective:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    education: [
      {
        years: "2020 - 2023",
        degree: "Master of Business Management",
        institution: "Wardiere University",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et arcu sem nec niqu egestas accumsan. In eliam nunc, incididunt ut quam eget, luctus lacifiniabula.",
      },
      {
        years: "2016 - 2020",
        degree: "Bachelor of Business Management",
        institution: "Borcelle University",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et arcu sem nec niqu egestas accumsan. In eliam nunc, incididunt ut quam eget, luctus lacifiniabula.",
      },
    ],
    experience: [
      {
        years: "2023 - NOW",
        position: "Head Manager",
        company: "Borcelle Studio",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et arcu sem nec niqu egestas accumsan. In eliam nunc, incididunt ut quam eget, luctus lacifiniabula.",
      },
      {
        years: "2022 - 2023",
        position: "General Manager",
        company: "Lionnai & Co",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et arcu sem nec niqu egestas accumsan. In eliam nunc, incididunt ut quam eget, luctus lacifiniabula.",
      },
    ],
    skills: [
      ["Leadership", "Digital Marketing", "Communication", "Innovation"],
      ["Analytics", "Teamwork", "Problem Solving", "Collaboration"],
    ],
    references: [
      {
        name: "Aarya Agarwal",
        position: "CEO of Borcelle Company",
        phone: "123-456-7890",
        email: "aarya@gmail.com",
      },
      {
        name: "Sharun Varma",
        position: "HRD of Borcelle Company",
        phone: "123-456-7890",
        email: "dina@gmail.com",
      },
    ],
  }

  const handleDownload = () => {
    router.push(`/student/download?template=${template}`)
  }

  const handleEdit = () => {
    console.log("Editing resume...")
    router.push("/student/resume-editor")
  }

  const accents =
    template === "classic-blue"
      ? { headerFrom: "from-blue-50", headerTo: "to-blue-100", bar: "border-blue-300" }
      : template === "subtle-silver"
      ? { headerFrom: "from-gray-50", headerTo: "to-gray-100", bar: "border-gray-300" }
      : template === "golden-highlight"
      ? { headerFrom: "from-amber-50", headerTo: "to-amber-100", bar: "border-amber-300" }
      : { headerFrom: "from-indigo-50", headerTo: "to-indigo-100", bar: "border-indigo-300" }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a2463] via-[#1e3a8a] to-[#3b82f6]">
      {/* Header */}
      <header className="bg-[#0a2463]/80 backdrop-blur border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/image/STON.png" alt="STON" width={40} height={40} className="h-10 w-10" />
              <div>
                <div className="text-white text-lg font-semibold">STON TECHNOLOGY</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                  JD
                </div>
                <span className="text-white text-sm font-medium">John Deo</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Header */}
      <div className="bg-[#1e40af]/60 backdrop-blur border-b border-white/10 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-white" />
              <h1 className="text-xl font-semibold text-white">Resume Preview</h1>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleDownload}
                className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium"
              >
                Download
              </Button>
              <Button
                onClick={handleEdit}
                className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium"
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className={`bg-gradient-to-r ${accents.headerFrom} ${accents.headerTo} px-12 py-8 text-center border-b-2 border-gray-200`}>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">{resumeData.personalInfo.fullName}</h1>
            <p className="text-sm text-gray-600 tracking-widest uppercase mb-4">{resumeData.personalInfo.title}</p>
            <div className="flex items-center justify-center gap-6 text-xs text-gray-700">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{resumeData.personalInfo.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Resume Body */}
          <div className="px-12 py-8 space-y-6">
            <section>
              <h2 className={`text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 pb-2 border-b ${accents.bar}`}>
                {template === "classic-blue" ? "Summary" : "Career Objective"}
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed">{resumeData.careerObjective}</p>
            </section>

            <section>
              <h2 className={`text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 pb-2 border-b ${accents.bar}`}>
                Education
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="grid grid-cols-[120px_1fr] gap-4">
                    <div className="text-xs text-gray-600 font-semibold">{edu.years}</div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-xs text-gray-700 italic mb-1">{edu.institution}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className={`text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 pb-2 border-b ${accents.bar}`}>
                {template === "classic-blue" ? "Professional Experience" : "Experience"}
              </h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="grid grid-cols-[120px_1fr] gap-4">
                    <div className="text-xs text-gray-600 font-semibold">{exp.years}</div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-xs text-gray-700 italic mb-1">{exp.company}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className={`text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 pb-2 border-b ${accents.bar}`}>
                Skills
              </h2>
              <div className="space-y-2">
                {resumeData.skills.map((row, rowIndex) => (
                  <ul key={rowIndex} className="grid grid-cols-4 gap-4">
                    {row.map((skill, skillIndex) => (
                      <li key={skillIndex} className="text-xs text-gray-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </section>

            <section>
              <h2 className={`text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 pb-2 border-b ${accents.bar}`}>
                References
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {resumeData.references.map((ref, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-bold text-gray-900">{ref.name}</h3>
                    <p className="text-xs text-gray-700 italic mb-2">{ref.position}</p>
                    <div className="space-y-0.5 text-xs text-gray-600">
                      <p>
                        <span className="font-semibold">Phone:</span> {ref.phone}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span> {ref.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ResumePreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-[#0a2463] via-[#1e3a8a] to-[#3b82f6] flex items-center justify-center text-white">Loading...</div>}>
      <ResumePreviewContent />
    </Suspense>
  )
}

