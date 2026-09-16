import type { Metadata } from "next";
import { Sora, Fira_Code } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

/**
 * The redesign's type pair, loaded through next/font.
 *
 * next/font fetches these at build time and serves them from this app, so
 * there is still no request to Google when someone visits. It also emits the
 * preloads and the size-adjusted fallback metrics that keep text from
 * shifting as the real face swaps in.
 *
 * Both are variable fonts, so no `weight` is needed — one file spans the
 * whole range the design uses.
 */
const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

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
    <html lang="en" className={`${sora.variable} ${firaCode.variable}`}>
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
