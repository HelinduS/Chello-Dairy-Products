"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react" // Person icon from lucide-react


import { Mail } from "lucide-react"
import { Truck } from "lucide-react"
// Simple JWT decode function
const decodeJwt = (token: string) => {
    if (!token || typeof token !== "string" || token === "undefined" || !token.includes(".")) {
        console.error("Invalid JWT token:", token)
        return null
    }

    try {
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        )
        const decoded = JSON.parse(jsonPayload)
        console.log("Decoded JWT:", decoded)
        return decoded
    } catch (e) {
        console.error("Failed to decode JWT:", e)
        return null
    }
}

export default function Dashboard() {
    const router = useRouter()
    const [user, setUser] = useState<{ username?: string } | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        console.log("Token from localStorage:", token)

        if (!token || token === "undefined") {
            router.push("/login")
            return
        }

        const decoded = decodeJwt(token)
        const username = decoded?.sub || "User"
        setUser({ username })
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem("token")
        router.push("/login")
    }

    if (!user) {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>
    }

    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header className="flex items-center justify-between border-b p-4">
                <div className="flex items-center space-x-4">
                    <p className="font-bold text-7xl font-caveat">chello.dairy</p>
                </div>
                <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
                    Dashboard
                </h1>
                <Button variant="outline" onClick={handleLogout}>
                    Logout
                </Button>
            </header>

            {/* Main Content Area with Sidebar */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-30 border-r p-4 bg-muted">
                    <nav className="space-y-2">
                        <Link href="/profile" className="flex flex-col items-center space-y-1 text-primary hover:underline">
                            <User className="w-8 h-20" /> {/* Adjusted size */}
                            <span></span>
                        </Link>
                        <Link href="/profile" className="flex flex-col items-center space-y-1 text-primary hover:underline">
                            <Mail className="w-8 h-20" />
                            <span></span>
                        </Link>
                        <Link href="/purchase" className="flex flex-col items-center space-y-1 text-primary hover:underline">
                            <Truck className="w-8 h-20" />
                            <span></span>
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 flex flex-col gap-20">
                    {/* Top Section */}
                    <div className="flex items-center mb-6">
            {/* Left Section */}
            <div className="w-1/2">
                <Card className="w-full max-w-md border-none shadow-none">
                    <CardHeader className="p-0">
                        <CardTitle className="text-3xl font-bold">Welcome, {user.username}!</CardTitle>
                            <p>You have successfully logged in to your account.</p>
                         </CardHeader>
                </Card>
            </div>
            {/* Right Section */}
            <div className="w-1/2 flex justify-center">
                <Button variant="default" className="text-lg px-10 py-6 hover:bg-blue-600">
                    <Link href="/dashboard" className="block w-full h-full flex items-center justify-center">
                    + Purchase
                    </Link>
                </Button>
            </div>
        </div>

                    <div>
                        {/* Bottom Section */}
                        <Card className="w-full max-w-lg p-8 bg-red-300">
                            <CardHeader>
                                <CardTitle>Your Next Delivery</CardTitle>

                            </CardHeader>

                            <CardContent>

                                <p>your next delivery .</p>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}