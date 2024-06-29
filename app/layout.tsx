import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidenav from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";

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
          <main className="flex-grow overflow-auto">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
