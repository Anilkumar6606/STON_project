// ============================================
// BACKUP FILE - DO NOT USE
// ============================================
// This file is kept for reference/archive purposes
// All content below is commented out for safety
// The ACTIVE file is located at: /app/principal/dashboard/page.tsx
// ============================================

// ORIGINAL CONTENT - ALL COMMENTED FOR SAFETY:
// "use client"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// ... (all original imports and code commented out)

export default function BackupDashboard() {
  return (
    <div style={{ padding: "20px", color: "white", textAlign: "center" }}>
      <h1>🔒 Backup File</h1>
      <p>This is a backup file - all content is commented out for safety</p>
      <p>Active page location: /app/principal/dashboard/page.tsx</p>
    </div>
  )
}
    access: "Full Access",
    status: "Active",
  }

  const handleGrantAccess = () => {
    // Validation
    if (!selectedRole) {
      setErrorMessage("Please select a role")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    if (!selectedEmail) {
      setErrorMessage("Please select an email")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    if (!selectedDepartment) {
      setErrorMessage("Please select a department")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    if (!selectedAccessLevel) {
      setErrorMessage("Please select an access level")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }

    // Check if access already granted to this email
    if (grantedAccessList.some(item => item.email === selectedEmail)) {
      setErrorMessage("Access already granted to this email")
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }

    // Get role display name
    const roleNames = {
      placement: "Placement officer",
      hod: "HOD",
      faculty: "Faculty"
    }

    // Get access level display name
    const accessNames = {
      full: "Full Access",
      read: "Read Only",
      limited: "Limited Access"
    }

    // Add new granted access
    const newAccess = {
      id: grantedAccessList.length + 1,
      email: selectedEmail,
      role: roleNames[selectedRole as keyof typeof roleNames] || selectedRole,
      department: selectedDepartment,
      access: accessNames[selectedAccessLevel as keyof typeof accessNames] || selectedAccessLevel,
      status: "Active"
    }

    setGrantedAccessList([...grantedAccessList, newAccess])
    setSuccessMessage("✅ Access granted successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)

    // Reset form
    setSelectedRole("")
    setSelectedEmail("")
    setSelectedDepartment("")
    setSelectedAccessLevel("")
  }

  const handleRevokeAccess = (id: number) => {
    setGrantedAccessList(grantedAccessList.filter(item => item.id !== id))
    setSuccessMessage("Access revoked successfully")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(135deg, #1a1a3e 0%, #2d2d7f 50%, #4040bf 100%)"
    }}>
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 backdrop-blur-sm border-r border-white/10 flex flex-col">
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
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/principal/dashboard"
            className="block px-4 py-3 text-white bg-white/20 rounded-lg transition text-sm font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/principal/department-status"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Department Status
          </Link>
          <Link
            href="/principal/granted-access"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Granted access
          </Link>
          <Link
            href="/principal/message"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Message
          </Link>
          <Link
            href="/principal/student-records"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Student Records
          </Link>
          <Link
            href="/principal/download"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Download
          </Link>
          <Link
            href="/principal/profile"
            className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition text-sm"
          >
            Profile
          </Link>
        </nav>

        {/* Bottom Logout Bar */}
        <div className="p-4 border-t border-white/10 bg-blue-900/40">
          <button 
            onClick={() => router.push("/login")}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Principle Dashboard</h1>
          <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full">
            <User className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-medium">Ashish Kumar</span>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
              >
                <div className="text-white/70 text-sm mb-2">{stat.label}</div>
                <div className="text-white text-4xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Department Chart - Takes 2 columns */}
            <div className="col-span-2 bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white text-lg font-semibold mb-6">Department wise Resume Completion</h2>
              
              {/* Chart Container */}
              <div className="w-full h-80 bg-black/20 rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    {/* Grid Background */}
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    
                    {/* X Axis - Department Names */}
                    <XAxis
                      dataKey="dept"
                      tick={{ fill: "#ffffff", opacity: 0.8, fontSize: 12 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                      tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
                    />
                    
                    {/* Y Axis - Percentage Scale */}
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: "#ffffff", opacity: 0.8, fontSize: 12 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                      tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
                      label={{ value: "Completion %", angle: -90, position: "insideLeft", fill: "#ffffff", offset: 10 }}
                    />
                    
                    {/* Tooltip on Hover */}
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                      }}
                      labelStyle={{ color: "#ffffff" }}
                      itemStyle={{ color: "#ffffff" }}
                      formatter={(value) => `${value}%`}
                      cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                    />
                    
                    {/* Legend */}
                    <Legend
                      wrapperStyle={{
                        paddingTop: "20px",
                      }}
                      iconType="circle"
                      formatter={(value) => <span style={{ color: "#ffffff", opacity: 0.8 }}>{value}</span>}
                    />
                    
                    {/* Past Year Bar - Blue */}
                    <Bar
                      dataKey="pastYear"
                      name="Past Year"
                      fill="#3B82F6"
                      radius={[8, 8, 0, 0]}
                      barSize={35}
                      isAnimationActive={true}
                      animationDuration={1000}
                    />
                    
                    {/* Current Year Bar - White/Cyan */}
                    <Bar
                      dataKey="currentYear"
                      name="Current Year"
                      fill="#00D9FF"
                      radius={[8, 8, 0, 0]}
                      barSize={35}
                      isAnimationActive={true}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Grant Access Panel */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white text-lg font-semibold mb-6">Grant and Manage Access</h2>
              
              <div className="space-y-4 mb-6">
                {/* Role */}
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Role :</label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-full bg-white text-black border-0">
                      <SelectValue placeholder="Placement officer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="placement">Placement officer</SelectItem>
                      <SelectItem value="hod">HOD</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Official Mail */}
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Official mail :</label>
                  <Select value={selectedEmail} onValueChange={setSelectedEmail}>
                    <SelectTrigger className="w-full bg-white text-black border-0">
                      <SelectValue placeholder="placement@gmail.com" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="placement@gmail.com">placement@gmail.com</SelectItem>
                      <SelectItem value="hod@gmail.com">hod@gmail.com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Department */}
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Department :</label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-full bg-white text-black border-0">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      <div className="px-2 py-1 text-xs font-semibold text-gray-500">Core Engineering</div>
                      <SelectItem value="CSE: Computer Science and Engineering">CSE: Computer Science and Engineering</SelectItem>
                      <SelectItem value="MECH: Mechanical Engineering">MECH: Mechanical Engineering</SelectItem>
                      <SelectItem value="CIVIL: Civil Engineering">CIVIL: Civil Engineering</SelectItem>
                      <SelectItem value="EEE: Electrical and Electronics Engineering">EEE: Electrical and Electronics Engineering</SelectItem>
                      <SelectItem value="ECE: Electronics and Communication Engineering">ECE: Electronics and Communication Engineering</SelectItem>
                      <SelectItem value="CHEM: Chemical Engineering">CHEM: Chemical Engineering</SelectItem>
                      <SelectItem value="AERO: Aerospace/Aeronautical Engineering">AERO: Aerospace/Aeronautical Engineering</SelectItem>
                      
                      <div className="px-2 py-1 mt-2 text-xs font-semibold text-gray-500">AI & Advanced Data</div>
                      <SelectItem value="AI: Artificial Intelligence">AI: Artificial Intelligence</SelectItem>
                      <SelectItem value="AI & ML: Artificial Intelligence and Machine Learning">AI & ML: AI and Machine Learning</SelectItem>
                      <SelectItem value="AIDS: Artificial Intelligence and Data Science">AIDS: AI and Data Science</SelectItem>
                      <SelectItem value="CSD: CSE - Data Science">CSD: CSE - Data Science</SelectItem>
                      <SelectItem value="CSB: Computer Science and Business Systems">CSB: CS and Business Systems</SelectItem>
                      <SelectItem value="CSG: Computer Science and Design">CSG: Computer Science and Design</SelectItem>
                      
                      <div className="px-2 py-1 mt-2 text-xs font-semibold text-gray-500">Emerging Tech</div>
                      <SelectItem value="IT: Information Technology">IT: Information Technology</SelectItem>
                      <SelectItem value="CYBER: Cybersecurity Engineering">CYBER: Cybersecurity Engineering</SelectItem>
                      <SelectItem value="ROBO: Robotics and Automation">ROBO: Robotics and Automation</SelectItem>
                      <SelectItem value="IOT: Internet of Things">IOT: Internet of Things</SelectItem>
                      <SelectItem value="MET: Metallurgical Engineering">MET: Metallurgical Engineering</SelectItem>
                      <SelectItem value="BIOTECH: Biotechnology Engineering">BIOTECH: Biotechnology Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Access Level */}
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Access level :</label>
                  <Select value={selectedAccessLevel} onValueChange={setSelectedAccessLevel}>
                    <SelectTrigger className="w-full bg-white text-black border-0">
                      <SelectValue placeholder="Full Access" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Access</SelectItem>
                      <SelectItem value="read">Read Only</SelectItem>
                      <SelectItem value="limited">Limited Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Grant Access Button */}
                <Button
                  onClick={handleGrantAccess}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white border-0 font-medium"
                >
                  Grant Access
                </Button>
              </div>

              {/* Granted Access Section */}
              <div className="border-t border-white/20 pt-6 max-h-96 overflow-y-auto">
                <h3 className="text-white font-semibold mb-4">Granted Access ({grantedAccessList.length}):</h3>
                {grantedAccessList.length === 0 ? (
                  <div className="text-white/50 text-sm text-center py-4">No access granted yet</div>
                ) : (
                  <div className="space-y-4">
                    {grantedAccessList.map((access) => (
                      <div key={access.id} className="bg-white/5 rounded-lg p-4 space-y-2 text-sm border border-white/10">
                        <div className="flex justify-between">
                          <span className="text-white/70">E-mail:</span>
                          <span className="text-white">{access.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Role:</span>
                          <span className="text-white">{access.role}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Department:</span>
                          <span className="text-white text-xs">{access.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Access:</span>
                          <span className="text-white">{access.access}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Status:</span>
                          <span className="text-green-400">{access.status}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-white/10">

