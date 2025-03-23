"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<{ username?: string } | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    // You could fetch user data here using the token
    // For now, we'll just set a placeholder
    setUser({ username: "User" })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  if (!user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col p-8">
      <header className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </header>
      <main className="flex-1 py-8">
        <h2 className="text-xl font-semibold">Welcome, {user.username}!</h2>
        <p className="mt-4">You have successfully logged in to your account.</p>
      </main>
    </div>
  )
}

