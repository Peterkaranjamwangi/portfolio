"use client";
import React from "react";
import Link from "next/link";
import { AdminLINKS } from "@/constants/constants";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex w-[200px]  flex-col gap-4 p-4 mb-4 border h-full">
      <div className="h-12 bg-green-400 w-full">
        <h1 className="text-xl font-bold text-white text-center">Admin</h1>
      </div>
      {AdminLINKS.map((link) => (
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
    </div>
  );
}
