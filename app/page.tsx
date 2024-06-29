import React, { useState, useEffect } from "react";
import SocialMedia from "@/components/SocialMedia";
import Typewriter from "@/components/Typewriter";
import MenuHomeBar from "@/components/MenuHomeBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CloudDownloadIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-start justify-center self-start ml-28">
      <h1 className="text-xl md:text-3xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-pink-600 bg-clip-text text-transparent animate-ease-in">
        Peter Mwangi.
      </h1>
      <h1 className="mb-2 bg-gradient-to-r font-bold from-fuchsia-500 via-blue-500 to-pink-600 bg-clip-text text-transparent animate-ease-in">
        I'm a passionate
        <span className="px-2 relative">
          <Typewriter
            words={[
              "Freelance Academic Writer",
              "UX/UI Designer",
              "Web Developer",
              "Frontend Developer",
              "Software Engineer",
            ]}
          />
          <span className="absolute inset-x-2 mt-1 bottom-0 h-[3px] bg-primary"></span>
        </span>
        From Nairobi
      </h1>
      <MenuHomeBar />
      <div className="mt-8">
        <SocialMedia />
      </div>

      <Button className="transition-all duration-300 hover:bg-primary-dark justify-center items-center">
        <Link
          href="#"
          className="text-white flex gap-2 justify-center items-center"
        >
          <CloudDownloadIcon />
          Download CV
        </Link>
      </Button>
    </div>
  );
}
