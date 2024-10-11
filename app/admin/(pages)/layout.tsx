import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function InnerLayout({ children }: Props) {
  return (
    <section className="min-h-screen flex bg-white/20 overflow-hidden">
      <div className="w-[200px] h-full bg-red-300 overflow-y-auto">
        <Button variant={"outline"}>Test</Button>
      </div>
      <div className="flex-grow flex justify-center items-start overflow-y-auto">
        <div className="bg-black bg-opacity-90 text-white rounded-lg p-4 md:p-10 w-full sm:w-full md:mx-10 overflow-y-auto max-h-screen">
          {children}
        </div>
      </div>
    </section>
  );
}
