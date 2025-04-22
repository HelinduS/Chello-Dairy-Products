"use client";

import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/ui/sidebar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const caveat = Caveat({
    variable: "--font-caveat",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const isAdminDashboard = pathname.startsWith("/admindas");

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} antialiased`}>
                <div className="flex min-h-screen">
                    {isAdminDashboard && (
                        <div className="hidden md:block md489:w-64">
                            <Sidebar />
                        </div>
                    )}
                    <main
                        className={`flex-1 min-h-screen ${
                            isAdminDashboard ? "md:ml-64 md:p-4 p-4" : "p-4"
                        }`}
                    >
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}