import Link from "next/link";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed right-0 left-0 bottom-0 p-4 md:text-right text-sm text-white z-[999999] text-center md:p-2 bg-black/80">
      © {currentYear}
      <Link href="#" passHref>
        <span className="px-2 slashed-zero underline-offset-2  text-primary transition-colors duration-300 hover:text-white">
          Peter Mwangi
        </span>
      </Link>
    </div>
  );
}
