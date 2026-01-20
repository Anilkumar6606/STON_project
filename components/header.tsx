"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="font-bold text-xl text-primary hover:opacity-80 transition-opacity">
          STON Technology
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link
            href="/placement/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            ATS Score
          </Link>
          <Link
            href="/resume"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Resume
          </Link>
          <Link
            href="/settings"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Settings
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="md:hidden text-foreground">
            Menu
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-sm font-medium text-muted-foreground hover:text-foreground bg-transparent"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
