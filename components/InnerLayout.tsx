import React from "react";
import NavigationBar from "@/components/NavigationBar";

interface Props {
  children: React.ReactNode;
}

export default function InnerLayout({ children }: Props) {
  return (
    <section className="min-h-screen flex flex-col bg-white/20 overflow-x-hidden">
      <NavigationBar />
      <div className="flex-grow flex justify-center items-start my-24">
        <div className="bg-black bg-opacity-90 text-white rounded-8 p-4 md:p-10 w-full sm:w-full md:mx-10 overflow-x-hidden">
          {children}
        </div>
      </div>
    </section>
  );
}
