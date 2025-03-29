"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {usePathname} from "next/navigation";
import Sidebar from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isAdminDashboard = pathname.startsWith("/admindas");

    return (
        <html lang="en">
        <body className="antialiased">
        <div className="flex min-h-screen">
            {isAdminDashboard && <Sidebar />}
            <main className={`flex-1 ${isAdminDashboard ? "p-6 md:ml-64" : ""}`}>
                {children}
            </main>
        </div>
        </body>
        </html>
  );
}
