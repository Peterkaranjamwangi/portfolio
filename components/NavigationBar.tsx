"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { LINKS } from "@/constants/constants";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-black backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-primary transition-colors duration-300"
        >
          Peter Mwangi
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium relative pb-1 transition-colors duration-300
                ${
                  pathname === link.href
                    ? "text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-0.5 after:bg-primary"
                    : "text-[#b6b6b6] hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-1/2"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <a target="_blank" href="https://wa.link/1sqigc">
            <Button className="transition-all duration-300 hover:bg-primary-dark">
              Hire Me
            </Button>
          </a>
        </nav>
      </div>
    </header>
  );
}
