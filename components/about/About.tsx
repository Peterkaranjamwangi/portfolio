"use client";

import { useState } from "react";
import { SIDE_TABS } from "@/constants/consants.index";
import Gallery from "./Gallery";
import Overview from "./Overview";
import Skills from "./Skills";
import ToolsTechnologies from "./ToolsTechnologies";

const About = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex-col">
      <div className="flex-grow flex">
        <nav className="w-26 h-40 bg-white py-2 flex flex-col flex-shrink-0">
          {SIDE_TABS.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(tab.name)}
              className={`py-2 px-4 flex flex-row text-nowrap gap-1 md:gap-2 text-sm font-medium ${
                activeTab === tab.name
                  ? "text-sky-600 bg-gray-200"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
              }`}
              aria-current={activeTab === tab.name ? "page" : undefined}
              style={{ width: "100%" }}
            >
              <tab.icon className="h-5 w-5" />
              <span className="hidden md:inline text-left">{tab.name}</span>
            </button>
          ))}
        </nav>

        <div className=" flex-grow w-full rounded h-auto p-2">
          {activeTab === "Overview" && <Overview />}
          {activeTab === "Skills" && <Skills />}
          {activeTab === "Gallery" && <Gallery />}
          {activeTab === "Tools & Technologies" && <ToolsTechnologies />}
        </div>
      </div>
    </div>
  );
};

export default About;
