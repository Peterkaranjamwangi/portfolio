import React, { useState, useEffect } from "react";
import SocialMedia from "@/components/SocialMedia";
import Typewriter from "@/components/Typewriter";
import MenuHomeBar from "@/components/MenuHomeBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CloudDownloadIcon } from "lucide-react";
import DownloadButton from "@/components/DownloadButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center md:items-start justify-center self-center md:self-start md:ml-28 bg-black/30 md:bg-transparent">
      <div className="flex flex-row rounded-md bg-black/70 md:bg-gray-500/10 w-[95%] md:w-auto">
        <MenuHomeBar />
        <div className="flex flex-col items-start gap-2 p-4 w-full">
          <h1 className="text-xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-fuchsia-500 via-blue-500 to-pink-600 bg-clip-text text-transparent animate-ease-in">
            Peter Mwangi.
          </h1>
          <div className="flex flex-col items-stretch">
            <div className="self-start">
              <h1 className="font-bold bg-gradient-to-r from-fuchsia-500 via-blue-500 to-pink-600 bg-clip-text text-transparent animate-ease-in">
                I am passionate
              </h1>
            </div>
            <div className="self-center my-4">
              <div className="h-[24px] w-[300px] font-bold bg-gradient-to-r from-fuchsia-500 via-blue-500 to-pink-600 bg-clip-text text-transparent animate-ease-in overflow-hidden flex justify-center items-center">
                <Typewriter
                  words={[
                    "Graphic Designer",
                    "UI/UX Developer",
                    "Full-Stack Developer",
                    "Software Engineer",
                    "Innovative Problem-Solver",
                    "Freelance Professional",
                  ]}
                />
              </div>
            </div>
            <div className="self-end">
              <h1 className="font-bold bg-gradient-to-r from-fuchsia-500 via-blue-500 to-pink-600 bg-clip-text text-transparent animate-ease-in">
                from Nairobi
              </h1>
            </div>
          </div>
          <div className="mt-8">
            <SocialMedia />
          </div>
          <DownloadButton />
        </div>
      </div>
    </div>
  );
}
