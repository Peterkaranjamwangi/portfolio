"use client"

import { useState } from "react";
import Projects from "./Projects";
import Connect from "./Connect";
import About from "./about/About";
import { TABS } from "@/constants/consants.index";
import Services from "./Services";

const Navbar = () => {
    const [activeTab, setActiveTab] = useState("About");

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="h-screen flex flex-col ">
            <div className=" flex-grow">
                <nav className="fixed  z-50 top-0 w-full bg-white justify-center -mb-px px-3 pt-2 flex gap-2 md:gap-6" aria-label="Tabs">
                    {TABS.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => handleTabChange(tab.name)}
                            className={`inline-flex shrink-0 items-center gap-1 md:gap-2 border-b-2 border-transparent px-1 pb-4 text-xs md:text-sm font-medium ${activeTab === tab.name ? "text-sky-600 border-sky-500" : "text-gray-400 hover:text-gray-500"}`}
                            aria-current={activeTab === tab.name ? "page" : undefined}
                        >
                            <tab.icon className="h-4 w-4 md:h-5 md:w-5" />
                            {tab.name}
                        </button>
                    ))}
                </nav>

                <div className="h-full px-2  mt-10 md:mt-10 md:px-10 -z-30 py-2 md:py-4">
                    {activeTab === "About" && <About />}
                    {activeTab === "Projects" && <Projects />}
                    {activeTab === "Services" && <Services />}
                    {activeTab === "Connect" && <Connect />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
