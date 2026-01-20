"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
	Bell,
	BookOpen,
	Briefcase,
	CheckCircle2,
	Download,
	DownloadCloud,
	FileText,
	GraduationCap,
	MessageSquare,
	RefreshCw,
	ShieldCheck,
	Sparkles,
	Upload,
	User,
	XCircle,
	AlertCircle,
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

const achievements = [
	"Use relevant keywords",
	"Optimize your formatting",
	"Add measurable achievements",
	"Save resume as PDF or DOCX",
]

const tips = [
	"Use relevant keywords",
	"Optimize your formatting",
	"Add measurable achievements",
	"Save resume as PDF or DOCX",
]

const strengths = {
	matched: ["Python", "Network", "Linux"],
	readability: "Excellent"
}

const improvements = {
	missing: ["Automation", "Deep Learning", "SSL", "Timesi", "Angel (GalIbat)", "Cloud Computing", "DevOps"],
	draft: "Ineffficient"
}

export default function StudentAtsPage() {
	const pathname = usePathname()
	const [uploadedFile, setUploadedFile] = useState<File | null>(null)
	const [isUploading, setIsUploading] = useState(false)
	const score = 82

	const matchMessage = score >= 85
		? "Outstanding match!"
		: score >= 75
		? "Great match!"
		: score >= 60
		? "Good start. Keep refining"
		: "Needs improvement"

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setIsUploading(true)
			setTimeout(() => {
				setUploadedFile(file)
				setIsUploading(false)
			}, 1000)
		}
	}

	return (
		<div className="min-h-screen text-white" style={{
			background: "linear-gradient(135deg, #0a0a18 0%, #0f1238 50%, #2e3cb3 100%)",
		}}>
			<div className="flex">
				<StudentSidebar />

				{/* Content */}
				<main className="flex-1 ml-64 px-6 md:px-10 py-8 space-y-8 max-w-7xl">
					{/* Top bar */}
					<header className="flex items-center justify-between">
						<div>
							<p className="text-sm text-white/70">Student</p>
							<h1 className="text-3xl font-bold">ATS Score</h1>
						</div>
						<div className="flex items-center gap-3 bg-white/10 rounded-full px-3 py-1">
							<button className="p-2 rounded-full hover:bg-white/10 transition" aria-label="notifications">
								<Bell className="w-5 h-5" />
							</button>
							<button className="p-2 rounded-full hover:bg-white/10 transition" aria-label="messages">
								<MessageSquare className="w-5 h-5" />
							</button>
							<div className="w-9 h-9 rounded-full overflow-hidden border border-white/10">
								<Image src="/image/STON.png" alt="avatar" width={36} height={36} className="h-full w-full object-cover" />
							</div>
							<div className="leading-tight text-left">
								<p className="text-sm font-semibold">Anil Kumar</p>
								<p className="text-[11px] text-white/60">Student</p>
							</div>
						</div>
					</header>

					<div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-6">
						{/* Left column */}
						<div className="space-y-6">
							{/* Check Your ATS Score */}
							<div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/15 backdrop-blur rounded-3xl p-8 shadow-2xl">
								<h2 className="text-3xl font-bold text-white mb-2">Check Your ATS Score</h2>
								<p className="text-white/70 mb-8">
									Upload your resume and instantly see how well it matches job descriptions.
								</p>

								<div className="flex flex-col lg:flex-row items-center gap-8">
									{/* Upload Area */}
									<div className="flex-1 w-full">
										<div className="border-2 border-dashed border-white/30 rounded-2xl p-8 bg-white/5 hover:bg-white/10 transition text-center">
											<label htmlFor="resume-upload" className="cursor-pointer block">
												<Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
												<p className="text-white font-medium mb-1">Drag & drop your resume here</p>
												<p className="text-white/60 text-sm mb-4">PDF / DOCX • Max 2MB</p>
												<div className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition">
													<Upload className="w-4 h-4 inline mr-2" />
													Upload Resume
												</div>
												<input
													id="resume-upload"
													type="file"
													accept=".pdf,.docx"
													className="hidden"
													onChange={handleFileUpload}
												/>
											</label>
										</div>
									</div>

									{/* Score Circle */}
									<div className="flex flex-col items-center gap-4">
										<div className="relative w-48 h-48">
											<svg className="w-full h-full transform -rotate-90">
												<circle
													cx="96"
													cy="96"
													r="88"
													fill="none"
													stroke="rgba(255,255,255,0.1)"
													strokeWidth="12"
												/>
												<circle
													cx="96"
													cy="96"
													r="88"
													fill="none"
													stroke="url(#gradient)"
													strokeWidth="12"
													strokeLinecap="round"
													strokeDasharray={`${score * 5.53} 553`}
												/>
												<defs>
													<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
														<stop offset="0%" stopColor="#34D399" />
														<stop offset="100%" stopColor="#10B981" />
													</linearGradient>
												</defs>
											</svg>
											<div className="absolute inset-0 flex flex-col items-center justify-center">
												<span className="text-5xl font-bold text-white">{score}%</span>
												<span className="text-emerald-300 font-semibold mt-1">{matchMessage}</span>
											</div>
										</div>
										<div className="flex items-center gap-4 text-sm">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full bg-white/10"></div>
												<span className="text-white/70">PDF</span>
											</div>
											<div className="flex items-center gap-2">
												<CheckCircle2 className="w-4 h-4 text-emerald-300" />
												<span className="text-white/70">Excellent</span>
											</div>
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full bg-emerald-300"></div>
												<span className="text-white/70">high</span>
											</div>
										</div>
									</div>
								</div>

								<div className="mt-6 flex justify-center">
									<button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-emerald-900/50 transition">
										<Upload className="w-5 h-5" />
										Check ATS Score
									</button>
								</div>
							</div>

							{/* ATS Tips and Strengths/Improvements */}
							<div className="grid lg:grid-cols-2 gap-6">
								{/* ATS Tips */}
								<div className="bg-indigo-900/40 border border-white/15 backdrop-blur rounded-2xl p-6 shadow-xl">
									<h3 className="text-xl font-semibold text-white mb-4">ATS Tips</h3>
									<ul className="space-y-3">
										{tips.map((tip, i) => (
											<li key={i} className="flex items-start gap-3 text-sm text-white/85">
												<CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
												<span>{tip}</span>
											</li>
										))}
									</ul>
								</div>

								{/* Strengths & Improvements */}
								<div className="bg-indigo-900/40 border border-white/15 backdrop-blur rounded-2xl p-6 shadow-xl space-y-6">
									{/* Strengths */}
									<div>
										<h3 className="text-xl font-semibold text-white mb-4">Strengths</h3>
										<div className="space-y-3">
											<div>
												<p className="text-sm text-white/70 mb-2">Matched Keywords:</p>
												<div className="flex flex-wrap gap-2">
													{strengths.matched.map((kw, i) => (
														<span key={i} className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 rounded-full text-xs font-medium">
															{kw}
														</span>
													))}
												</div>
											</div>
											<div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-400/20 rounded-lg">
												<CheckCircle2 className="w-4 h-4 text-emerald-300" />
												<span className="text-sm text-white">{strengths.readability}</span>
												<span className="ml-auto px-2 py-0.5 bg-white/10 rounded text-xs text-white/70">PDF</span>
											</div>
										</div>
									</div>

									{/* Improvements */}
									<div>
										<h3 className="text-xl font-semibold text-white mb-4">Improvements</h3>
										<div className="space-y-3">
											<div>
												<p className="text-sm text-white/70 mb-2">Missing Keywords:</p>
												<div className="flex flex-wrap gap-2">
													{improvements.missing.map((kw, i) => (
														<span key={i} className="px-3 py-1 bg-rose-500/20 border border-rose-400/30 text-rose-200 rounded-full text-xs font-medium">
															{kw}
														</span>
													))}
												</div>
											</div>
											<div className="flex items-center gap-2 px-3 py-2 bg-rose-500/10 border border-rose-400/20 rounded-lg">
												<AlertCircle className="w-4 h-4 text-rose-300" />
												<span className="text-sm text-white">{improvements.draft}</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Re-upload and Download buttons */}
							<div className="grid grid-cols-2 gap-4">
								<button className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg transition">
									<Upload className="w-5 h-5" />
									Re-upload Resume
								</button>
								<button className="px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg transition">
									<Download className="w-5 h-5" />
									Download Optimized Resume
								</button>
							</div>

							{/* Keyword Match Progress */}
							<div className="bg-indigo-900/40 border border-white/15 backdrop-blur rounded-2xl p-6 shadow-xl">
								<div className="flex items-center justify-between mb-3">
									<h3 className="text-lg font-semibold text-white">Keyword Match</h3>
									<span className="text-2xl font-bold text-white">7/10</span>
								</div>
								<div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">
									<div className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 rounded-full" style={{ width: "70%" }} />
								</div>
							</div>
						</div>

						{/* Right column */}
						<div className="space-y-6">
							{/* Resume Preview */}
							<div className="bg-indigo-900/40 border border-white/15 backdrop-blur rounded-3xl p-6 shadow-2xl">
								<h3 className="text-xl font-semibold text-white mb-6">Resume Preview</h3>
								<div className="bg-white rounded-2xl p-4 text-gray-800 shadow-inner">
									<div className="flex items-start gap-3 mb-4">
										<div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 text-white flex items-center justify-center font-semibold">
											AK
										</div>
										<div className="leading-tight">
											<p className="font-semibold">Anil Kumar</p>
											<p className="text-xs text-emerald-600 font-semibold">ATS Checked</p>
											<p className="text-xs text-gray-600 mt-1">Profile Summary • Profile Overview</p>
										</div>
									</div>
									<div className="rounded-xl border border-dashed border-gray-300 p-3 text-xs text-gray-600">
										<p className="font-semibold text-gray-800 mb-2">Resume Snapshot</p>
										<p className="leading-relaxed">
											“Proficient in cloud deployment, containerization, and automation. Experienced with Kubernetes, Docker, CI/CD pipelines, and observability. Led migration projects improving performance and reliability.”
										</p>
									</div>
								</div>

							<div className="mt-6 flex flex-col gap-3">
								<button className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg transition">
									<RefreshCw className="w-5 h-5" />
									Re-upload Resume
								</button>
								<button className="w-full px-6 py-4 bg-white hover:bg-gray-50 text-indigo-900 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg transition">
									<Download className="w-5 h-5" />
									Download Resume
								</button>
							</div>
							</div>

						{/* Date stamp */}
						<div className="bg-indigo-900/40 border border-white/15 backdrop-blur rounded-xl px-6 py-4 text-right">
							<p className="text-white/70 text-sm">03-01-2024</p>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}


