"use client";

import { LINKS } from "@/constants/constants";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function MenuHomeBar() {
  const pathname = usePathname();

  return (
    <div className="ml-1 mr-2 gap-4 hidden md:flex flex-col bg-gray-800/80 rounded max-w-fit">
      {LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={`text-sm font-medium self-start flex relative pb-1 transition-all duration-300 hover:bg-primary/10 px-3 py-2 rounded
            ${
              pathname === link.href ||
              (link.href === "/blog" && pathname.includes("/blog"))
                ? "text-white after:content-[''] after:absolute after:bottom-0 after:left-3 after:w-1/2 after:h-0.5 after:bg-primary"
                : "text-[#b6b6b6] hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-3 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-1/2"
            }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
