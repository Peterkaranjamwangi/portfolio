import PageTitle from "@/components/PageTitle";
import { TechnicalskillsData, SoftskillsData } from "@/constants/constants";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  label: string;
  Icon: React.ElementType;
}

const MobileSkillItem = ({ label, Icon }: Props) => (
  <div
    className="flex items-center gap-4 bg-gray-800/75 transition-all duration-300 hover:scale-105 p-3 hover:bg-gray-700"
    data-aos="fade-up"
    data-aos-delay={label}
    data-aos-offset="200"
    data-aos-duration="1000"
  >
    <Icon className="text-primary text-xl" />
    <span className="font-medium text-white text-xs  text-nowrap">{label}</span>
  </div>
);

const ViewAllButton = () => {
  return (
    <div className="my-2 sm:flex sm:items-end sm:justify-end">
      <a
        href="/about#all-skills"
        className="block border-gray-50 border px-5 py-2 text-center text-xs font-bold uppercase text-white transition-all duration-300 hover:bg-primary hover:text-white"
      >
        View All
      </a>
    </div>
  );
};

export default function MobileSkills() {
  return (
    <div className="flex flex-wrap px-4">
      <PageTitle title="Skills" />
      <div className="w-full mb-8">
        <h3 className="text-2xl font-semibold mb-6 text-white">
          Technical Skills
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TechnicalskillsData.slice(0, 5).map((skill, index) => (
            <MobileSkillItem
              key={index}
              label={skill.label}
              Icon={skill.icon}
            />
          ))}
        </div>
        <ViewAllButton />
      </div>
      <div className="w-full mb-8">
        <h3 className="text-2xl font-semibold mb-6 text-white">Soft Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SoftskillsData.slice(0, 5).map((skill, index) => (
            <MobileSkillItem
              key={index}
              label={skill.label}
              Icon={skill.icon}
            />
          ))}
        </div>
        <ViewAllButton />
      </div>
    </div>
  );
}
