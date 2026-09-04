import type { Metadata } from "next";
// import { Inter } from "next/font/google";  // Temporarily disabled due to network issues
import "./globals.css";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";
import { Analytics } from "@vercel/analytics/react";
import AdminSideBar from "./admin/components/AdminOverlay";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Peter Mwangi - Web Design & Development Portfolio",
  description:
    "Discover Peter Mwangi's innovative approach to web design, development, and SEO services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*
          Sora + Fira Code are the redesign's type pair. They are linked
          rather than pulled through next/font because the build already runs
          in environments where next/font's fetch is unavailable — the same
          reason the Inter import above is commented out.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="h-screen flex flex-col font-sans"
        style={{
          backgroundImage: "url(/bg.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="flex-grow flex overflow-hidden">
          <main className="flex-grow overflow-y-auto">
            {children}
            <Analytics />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
