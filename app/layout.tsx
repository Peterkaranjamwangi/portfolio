import type { Metadata } from "next";
// import { Inter } from "next/font/google";  // Temporarily disabled due to network issues
import "./globals.css";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";
import { Analytics } from "@vercel/analytics/react";
import AdminSideBar from "./admin/components/AdminOverlay";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
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
    </ClerkProvider>
  );
}
