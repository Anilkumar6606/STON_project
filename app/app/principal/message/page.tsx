"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, Send, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Message {
  id: string
  text: string
  time: string
  date: string
  isOwn: boolean
}

interface Contact {
  id: string
  name: string
  role: string
  email: string
  avatar: string
  lastMessage: string
  time: string
  unread?: number
  status?: string
  messages: Message[]
}

export default function MessagePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messageInput, setMessageInput] = useState("")

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Priya Sharma",
      role: "CSE Department Coordinator",
      email: "priya.sharma@example.com",
      avatar: "PS",
      lastMessage: "Thank you. I'll share the report with you by Friday afternoon.",
      time: "5 mins ago",
      status: "online",
      messages: [
        {
          id: "1",
          text: "Hello Priya,\nCould you please send me the latest placement report for the CSE department?\nI need it by the end of the day. Thank you.",
          time: "8:52 AM",
          date: "Today",
          isOwn: false
        },
        {
          id: "2",
          text: "Good morning sir.\nI'll prepare the report and send it to you by 2 PM today.",
          time: "8:56 AM",
          date: "Today",
          isOwn: true
        },
        {
          id: "3",
          text: "Thank you. I'll share the report with you by Friday afternoon.",
          time: "8:57 AM",
          date: "Today",
          isOwn: false
        },
        {
          id: "4",
          text: "Sure, I'll ensure everything is ready for you by then.",
          time: "8:57 AM",
          date: "Today",
          isOwn: true
        }
      ]
    },
    {
      id: "2",
      name: "Rajesh Malhotra",
      role: "Placement Officer",
      email: "rajesh.malhotra@example.com",
      avatar: "RM",
      lastMessage: "Can we schedule a meeting tomorrow?",
      time: "12 mins ago",
      unread: 1,
      messages: [
        {
          id: "1",
          text: "Can we schedule a meeting tomorrow?",
          time: "10:30 AM",
          date: "Today",
          isOwn: false
        }
      ]
    },
    {
      id: "3",
      name: "Sarah Verma",
      role: "IT Department Coordinator",
      email: "sarah.verma@example.com",
      avatar: "SV",
      lastMessage: "I have attached the placement report for CSE department. Please review it and let me...",
      time: "15 mins ago",
      messages: [
        {
          id: "1",
          text: "I have attached the placement report for CSE department. Please review it and let me know if you need any changes.",
          time: "10:15 AM",
          date: "Today",
          isOwn: false
        }
      ]
    },
    {
      id: "4",
      name: "Vikram Patel",
      role: "Mechanical Department Coordinator",
      email: "vikram.patel@example.com",
      avatar: "VP",
      lastMessage: "Good evening, sir. I have updated...",
      time: "20 mins ago",
      messages: [
        {
          id: "1",
          text: "Good evening, sir. I have updated the student records.",
          time: "10:10 AM",
          date: "Today",
          isOwn: false
        }
      ]
    },
    {
      id: "5",
      name: "Andrew Singh",
      role: "Placement Officer",
      email: "andrew.singh@example.com",
      avatar: "AS",
      lastMessage: "Could you provide me with the list of c...",
      time: "Today",
      unread: 2,
      messages: [
        {
          id: "1",
          text: "Could you provide me with the list of companies visiting next week?",
          time: "9:45 AM",
          date: "Today",
          isOwn: false
        }
      ]
    },
    {
      id: "6",
      name: "Karan Joshi",
      role: "ECE Department Coordinator",
      email: "karan.joshi@example.com",
      avatar: "KJ",
      lastMessage: "Sure, I'll arrange the session for next...",
      time: "Today",
      messages: [
        {
          id: "1",
          text: "Sure, I'll arrange the session for next week.",
          time: "9:30 AM",
          date: "Today",
          isOwn: false
        }
      ]
    },
    {
      id: "7",
      name: "John Deo",
      role: "Civil Department Coordinator",
      email: "john.deo@example.com",
      avatar: "JD",
      lastMessage: "I have sent the updated resume list to yo...",
      time: "Yesterday",
      messages: [
        {
          id: "1",
          text: "I have sent the updated resume list to you via email.",
          time: "5:30 PM",
          date: "Yesterday",
          isOwn: false
        }
      ]
    }
  ])

  const getAvatarColor = (name: string) => {
    const colors = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-orange-500", "bg-green-500", "bg-indigo-500", "bg-cyan-500"]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedContact) {
      const now = new Date()
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageInput,
        time: time,
        date: "Today",
        isOwn: true
      }
      
      // Update the contact's messages
      const updatedContacts = contacts.map(contact => {
        if (contact.id === selectedContact.id) {
          return {
            ...contact,
            messages: [...contact.messages, newMessage],
            lastMessage: messageInput.length > 50 ? messageInput.substring(0, 50) + "..." : messageInput,
            time: "Just now"
          }
        }
        return contact
      })
      
      setContacts(updatedContacts)
      
      // Update selected contact
      const updatedSelectedContact = updatedContacts.find(c => c.id === selectedContact.id)
      if (updatedSelectedContact) {
        setSelectedContact(updatedSelectedContact)
      }
      
      setMessageInput("")
    }
  }

  const handleSelectContact = (contact: Contact) => {
    // Clear unread count
    const updatedContacts = contacts.map(c => {
      if (c.id === contact.id) {
        return { ...c, unread: 0 }
      }
      return c
    })
    setContacts(updatedContacts)
    
    // Update selected contact
    const updated = updatedContacts.find(c => c.id === contact.id)
    if (updated) {
      setSelectedContact(updated)
    }
  }

  const filteredContacts = contacts.filter(contact => 
    (selectedFilter === "All" || contact.role.includes(selectedFilter)) &&
    (contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Set initial selected contact
  if (!selectedContact && filteredContacts.length > 0) {
    setSelectedContact(filteredContacts[0])
  }

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      {/* Fixed Sidebar */}
      <aside className="w-64 fixed h-screen bg-black/40 backdrop-blur-sm border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image
              src="/image/STON.png"
              alt="STON Technology logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
            <div>
              <div className="text-white font-bold text-sm">STON</div>
              <div className="text-white/70 text-xs">TECHNOLOGY</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            <li>
              <a href="/principal/dashboard" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 rounded-lg transition">
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/principal/department-status" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 rounded-lg transition">
                <span>Department Status</span>
              </a>
            </li>
            <li>
              <a href="/principal/granted-access" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 rounded-lg transition">
                <span>Granted access</span>
              </a>
            </li>
            <li className="bg-white/10 rounded-lg">
              <a href="/principal/message" className="flex items-center gap-3 px-4 py-3 text-white font-medium">
                <span>Message</span>
              </a>
            </li>
            <li>
              <a href="/principal/student-records" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 rounded-lg transition">
                <span>Student Records</span>
              </a>
            </li>
            <li>
              <a href="/principal/download" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 rounded-lg transition">
                <span>Download</span>
              </a>
            </li>
            <li>
              <a href="/principal/profile" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 rounded-lg transition">
                <span>Profile</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10 bg-blue-900/40">
          <button
            onClick={() => router.push("/login")}
            className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content with offset */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Message</h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-medium">Ashish Kumar</span>
          </div>
        </header>

        {/* Message Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-96 bg-black/20 backdrop-blur-sm border-r border-white/10 flex flex-col overflow-hidden">
            <div className="p-4 space-y-4 flex-shrink-0 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-full bg-white/10 text-white border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Placement Officer">Placement Officer</SelectItem>
                  <SelectItem value="Department Coordinator">Department Coordinator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Scrollable Contact List */}
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleSelectContact(contact)}
                  className={`p-4 border-b border-white/10 cursor-pointer hover:bg-white/5 transition ${
                    selectedContact?.id === contact.id ? "bg-white/10" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 ${getAvatarColor(contact.name)} rounded-full flex items-center justify-center flex-shrink-0 relative`}>
                      <span className="text-white font-semibold">{contact.avatar}</span>
                      {contact.status === "online" && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-semibold truncate">{contact.name}</h3>
                        <span className="text-white/50 text-xs flex-shrink-0 ml-2">{contact.time}</span>
                      </div>
                      <p className="text-white/60 text-sm truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread && contact.unread > 0 && (
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">{contact.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${getAvatarColor(selectedContact.name)} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-semibold">{selectedContact.avatar}</span>
                    </div>
                    <div>
                      <h2 className="text-white font-semibold text-lg">{selectedContact.name}</h2>
                      <p className="text-white/60 text-sm">{selectedContact.role}</p>
                      <p className="text-white/50 text-xs">{selectedContact.email}</p>
                    </div>
                  </div>
                </div>

                {/* Scrollable Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {selectedContact.messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-white/50">No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    <>
                      {/* Group messages by date */}
                      {Array.from(
                        selectedContact.messages.reduce((acc, msg) => {
                          if (!acc.has(msg.date)) {
                            acc.set(msg.date, [])
                          }
                          acc.get(msg.date)!.push(msg)
                          return acc
                        }, new Map<string, Message[]>())
                      ).map(([date, messages]) => (
                        <div key={date}>
                          <div className="text-center mb-6">
                            <span className="px-4 py-1 bg-white/10 text-white/70 text-xs rounded-full">{date}</span>
                          </div>
                          <div className="space-y-4">
                            {messages.map((message) => (
                              <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-xl ${message.isOwn ? "bg-blue-600/90" : "bg-purple-600/70"} rounded-2xl p-4 shadow-lg`}>
                                  <p className="text-white whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
                                  <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-white/20">
                                    <span className="text-white/70 text-xs">{message.date}</span>
                                    <span className="text-white/70 text-xs">•</span>
                                    <span className="text-white/80 text-xs font-medium">{message.time}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Message Input */}
                <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 p-4 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition font-medium"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-white/50 text-lg">Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
