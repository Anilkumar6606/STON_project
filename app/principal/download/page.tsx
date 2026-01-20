"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Search, Download as DownloadIcon, User, FileText, ChevronLeft, ChevronRight, Eye, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import PrincipalSidebar from "@/components/principal-sidebar"

interface DownloadItem {
  id: number
  title: string
  fileType: "CSV" | "Excel" | "PDF"
  downloadedDate: string
}

export default function DownloadPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewModal, setViewModal] = useState<DownloadItem | null>(null)
  const itemsPerPage = 9

  const allDownloads: DownloadItem[] = [
    { id: 1, title: "Student Records List as CSV", fileType: "CSV", downloadedDate: "16 Apr 2026" },
    { id: 2, title: "Student Records List as Excel", fileType: "Excel", downloadedDate: "15 Apr 2026" },
    { id: 3, title: "Department-wise Resume Reports", fileType: "PDF", downloadedDate: "20 Mar 2026" },
    { id: 4, title: "AI-Ready Candidates List", fileType: "PDF", downloadedDate: "03 Feb 2026" },
    { id: 5, title: "IT Placed Students", fileType: "PDF", downloadedDate: "23 Jan 2026" },
    { id: 6, title: "Mech Resume Ready List", fileType: "Excel", downloadedDate: "18 Dec 2025" },
    { id: 7, title: "L&T Placements Detailed Report", fileType: "PDF", downloadedDate: "06 Oct 2025" },
    { id: 8, title: "Civil Engineering Candidates", fileType: "PDF", downloadedDate: "16 Aug 2025" },
    { id: 9, title: "Civil Engineering Candidates", fileType: "CSV", downloadedDate: "18 Sep 2025" },
    { id: 10, title: "CSE Placement Statistics", fileType: "Excel", downloadedDate: "12 Jul 2025" },
    { id: 11, title: "ECE Department Analysis", fileType: "PDF", downloadedDate: "25 Jun 2025" },
    { id: 12, title: "Annual Placement Report", fileType: "PDF", downloadedDate: "10 May 2025" },
  ]

  const filteredDownloads = allDownloads.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredDownloads.length / itemsPerPage)
  const paginatedDownloads = filteredDownloads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleDownload = (item: DownloadItem) => {
    // Simulate file download with proper MIME type handling
    let mimeType = "text/plain"
    if (item.fileType === "CSV") mimeType = "text/csv"
    else if (item.fileType === "Excel") mimeType = "application/vnd.ms-excel"
    else if (item.fileType === "PDF") mimeType = "application/pdf"

    const mockData = `${item.title} - Generated on ${new Date().toLocaleDateString()}\n\nThis is a sample file download.`
    const blob = new Blob([mockData], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const element = document.createElement("a")
    element.setAttribute("href", url)
    element.setAttribute("download", `${item.title.replace(/\s+/g, "-")}.${item.fileType.toLowerCase()}`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    window.URL.revokeObjectURL(url)
    alert(`Downloaded: ${item.title}`)
  }

  const handlePreview = (item: DownloadItem) => {
    alert(`Preview: ${item.title}\n\nFile Type: ${item.fileType}\nDownloaded: ${item.downloadedDate}`)
  }

  const getFileIcon = (fileType: string) => {
    const iconClass = "w-12 h-12"
    switch (fileType) {
      case "CSV":
        return <FileText className={`${iconClass} text-green-400`} />
      case "Excel":
        return <FileText className={`${iconClass} text-green-500`} />
      case "PDF":
        return <FileText className={`${iconClass} text-red-500`} />
      default:
        return <FileText className={`${iconClass} text-white`} />
    }
  }

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

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      <PrincipalSidebar />

      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-white">Downloads</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <User className="w-5 h-5 text-white" />
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
                  {getFileIcon(item.fileType)}
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

          {paginatedDownloads.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">No downloads found</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-white/60 text-sm">
                Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredDownloads.length)} of {filteredDownloads.length}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1
                    return (
                      <Button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={pageNum === currentPage ? "bg-blue-600 text-white" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

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

      {/* View Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-lg p-6 w-96 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold">File Details</h2>
              <button onClick={() => setViewModal(null)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                {getFileIcon(viewModal.fileType)}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFileTypeColor(viewModal.fileType)}`}>
                  {viewModal.fileType}
                </span>
              </div>

              <div>
                <p className="text-white/70 text-sm font-medium">Title</p>
                <p className="text-white">{viewModal.title}</p>
              </div>

              <div>
                <p className="text-white/70 text-sm font-medium">Downloaded Date</p>
                <p className="text-white">{viewModal.downloadedDate}</p>
              </div>

              <div>
                <p className="text-white/70 text-sm font-medium">File Type</p>
                <p className="text-white">{viewModal.fileType} Format</p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                onClick={() => {
                  handleDownload(viewModal)
                  setViewModal(null)
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 justify-center"
              >
                <DownloadIcon className="w-4 h-4" />
                Download
              </Button>
              <Button
                onClick={() => setViewModal(null)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      {viewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-lg p-6 w-96 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold">File Details</h2>
              <button onClick={() => setViewModal(null)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                {getFileIcon(viewModal.fileType)}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFileTypeColor(viewModal.fileType)}`}>
                  {viewModal.fileType}
                </span>
              </div>

              <div>
                <p className="text-white/70 text-sm font-medium">Title</p>
                <p className="text-white">{viewModal.title}</p>
              </div>

              <div>
                <p className="text-white/70 text-sm font-medium">Downloaded Date</p>
                <p className="text-white">{viewModal.downloadedDate}</p>
              </div>

              <div>
                <p className="text-white/70 text-sm font-medium">File Type</p>
                <p className="text-white">{viewModal.fileType} Format</p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                onClick={() => {
                  handleDownload(viewModal)
                  setViewModal(null)
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 justify-center"
              >
                <DownloadIcon className="w-4 h-4" />
                Download
              </Button>
              <Button
                onClick={() => setViewModal(null)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
