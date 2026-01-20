"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Bell, Settings, Search, Download as DownloadIcon, Eye, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import HODSidebar from "@/components/hod-sidebar"

interface DownloadItem {
  id: number
  title: string
  fileType: "CSV" | "Excel" | "PDF"
  downloadedDate: string
}

export default function HODDownloadPage() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const allDownloads: DownloadItem[] = [
    { id: 1, title: "Student Records - Department", fileType: "CSV", downloadedDate: "16 Apr 2026" },
    { id: 2, title: "Resume Status Report", fileType: "Excel", downloadedDate: "15 Apr 2026" },
    { id: 3, title: "Placement Statistics", fileType: "PDF", downloadedDate: "20 Mar 2026" },
    { id: 4, title: "ATS Score Analysis", fileType: "PDF", downloadedDate: "03 Feb 2026" },
    { id: 5, title: "Yearwise Distribution", fileType: "Excel", downloadedDate: "23 Jan 2026" },
    { id: 6, title: "Skills Matrix", fileType: "PDF", downloadedDate: "18 Dec 2025" },
  ]

  const filteredDownloads = allDownloads.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredDownloads.length / itemsPerPage)
  const paginatedDownloads = filteredDownloads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case "CSV":
        return "bg-green-500/20 text-green-200"
      case "Excel":
        return "bg-green-600/20 text-green-200"
      case "PDF":
        return "bg-red-500/20 text-red-200"
      default:
        return "bg-blue-500/20 text-blue-200"
    }
  }

  function handleDownload(item: DownloadItem) {
    // Generate mock file content based on type
    let content = `${item.title}\n\nGenerated on ${item.downloadedDate}\n\n`
    if (item.fileType === "CSV") {
      content = `rank,name,dept,rollNo,resumeStatus,atsScore,avgPercentage,placement\n1,Ashish Patel,CSE,CS001,Completed,82,84,Placed\n2,Tanya Mehta,IT,IT002,Completed,79,75,Placed\n`
    }

    const blob = new Blob([content], { type: item.fileType === "PDF" ? "application/pdf" : item.fileType === "CSV" ? "text/csv" : "application/vnd.ms-excel" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${item.title.replace(/\s+/g, "-")}.${item.fileType === "CSV" ? "csv" : item.fileType === "Excel" ? "xlsx" : "pdf"}`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    alert(`Downloaded: ${item.title}`)
  }

  function handlePreview(item: DownloadItem) {
    alert(`Preview: ${item.title}\n\nFile Type: ${item.fileType}\nDownloaded: ${item.downloadedDate}`)
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      <HODSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="sticky top-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Downloads</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-white cursor-pointer" />
            <Settings className="w-5 h-5 text-white cursor-pointer" />
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="text-right">
                <p className="text-white text-sm font-medium">{session?.user?.name || "HOD"}</p>
                <p className="text-white/60 text-xs">Head of Department</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-auto">
          {/* Search Bar */}
          <div className="mb-8 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search downloads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
          </div>

          {/* Downloads Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedDownloads.map((item) => (
              <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFileTypeColor(item.fileType)}`}>
                    {item.fileType}
                  </span>
                </div>

                <h3 className="text-white font-semibold mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-white/60 text-sm mb-4">Downloaded on: {item.downloadedDate}</p>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownload(item)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm flex items-center gap-2 justify-center"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    Download
                  </Button>
                  <Button
                    onClick={() => handlePreview(item)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-white/60 text-sm">Page {currentPage} of {totalPages}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
