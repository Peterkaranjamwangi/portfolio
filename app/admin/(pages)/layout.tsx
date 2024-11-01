import { Button } from "@/components/ui/button";
import React from "react";
import AdminSideBar from "../components/AdminOverlay";
import ProfileSection from "../components/ProfileSection";
import AdminSidebar from "../components/AdminSidebar";
import AdminOverlay from "../components/AdminOverlay";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <section className="h-screen flex bg-white/20 overflow-hidden">
      <div className="bg-black hidden md:flex h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-grow flex flex-col overflow-hidden">
        <AdminOverlay />
        <ProfileSection />
        <div className="flex-grow overflow-hidden">
          <div className="bg-black text-white p-4 md:p-10 w-full h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
