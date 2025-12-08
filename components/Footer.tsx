import Link from "next/link";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden md:block w-full p-4 md:text-right text-sm text-white text-center md:p-2 bg-black/80 shrink-0">
      © {currentYear}
      <Link href="#" passHref>
        <span className="px-2 slashed-zero underline-offset-2 text-primary transition-colors duration-300 hover:text-white">
          Peter Mwangi
        </span>
      </Link>
    </footer>
  );
}
