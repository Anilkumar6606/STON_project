import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
	title: "STON Technology - Student Placement Management",
	description: "Student placement and resume management system",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-gradient-primary text-white antialiased">
				{children}
			</body>
		</html>
	)
}
