import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
        className={`bg-center bg-no-repeat   bg-cover z-[1] object-center md:object-cover ${inter.className}`}
        style={{
          backgroundImage: "url(/bg.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "top",
          padding: "2rem",
        }}
      >
        {children}
      </body>
    </html>
  );
}
