import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

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
      <body
        className={`${inter.className} h-screen flex flex-col`}
        style={{
          backgroundImage: "url(/bg.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="flex-grow flex overflow-hidden">
          {/* <NavigationBar /> */}
          <SideBar />
          <main className="flex-grow overflow-auto">
            {children}
            <Analytics />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
