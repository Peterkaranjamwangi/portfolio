"use client";
import { MenuIcon, MenuSquareIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { AdminLINKS } from "@/constants/constants";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function AdminOverlay() {
  const pathname = usePathname();

  return (
    <div className="min-h-20 z-20 absolute top-0 m-4 mr-8 left-0 bg-transparent">
      <Sheet>
        <SheetTrigger asChild className="bg-white">
          <div className="md:hidden transition-transform duration-300 hover:scale-110">
            <MenuSquareIcon className="h-6 w-6 text-black cursor-pointer" />
            <span className="sr-only">Toggle navigation</span>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="bg-black text-white">
          <div className="flex flex-col gap-4 p-4 my-4 mx-2 border h-[95%]">
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
