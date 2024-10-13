import React from "react";
import NavigationBar from "@/components/NavigationBar";
import SideBar from "./SideBar";

interface Props {
  children: React.ReactNode;
}

export default function InnerLayout({ children }: Props) {
  return (
    <section className="min-h-screen flex flex-col bg-white/20">
      <NavigationBar />
      <SideBar />
      <div className="flex-grow flex justify-center items-start my-24 overflow-hidden">
        <div className="bg-black bg-opacity-90 text-white rounded p-4  w-full sm:w-full md:mx-10">
          {children}
        </div>
      </div>
    </section>
  );
}
