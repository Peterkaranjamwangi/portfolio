import PageTitle from "@/components/PageTitle";
import { TechnicalskillsData, SoftskillsData } from "@/constants/constants";
import React from "react";

interface Props {
  label: string;
  Icon: React.ElementType;
}

const SkillItem = ({ label, Icon }: Props) => (
  <div
    className="flex items-center gap-4 mb-2 bg-gray-800/75 transition-all duration-300 hover:scale-105 p-3 hover:bg-gray-700"
    data-aos="fade-up"
    data-aos-delay={label}
    data-aos-offset="200"
    data-aos-duration="1000"
  >
    <Icon className="text-primary text-2xl" />
    <span className="font-medium text-white text-sm  text-nowrap">{label}</span>
  </div>
);

export default function Skills() {
  return (
    <div className="container mx-auto px-4 py-16">
      <PageTitle title="Skills" />
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8">
          <h3 className="text-2xl font-semibold mb-6 text-white">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TechnicalskillsData.map((skill, index) => (
              <SkillItem key={index} label={skill.label} Icon={skill.icon} />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 mb-8">
          <h3 className="text-2xl font-semibold mb-6 text-white">
            Soft Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SoftskillsData.map((skill, index) => (
              <SkillItem key={index} label={skill.label} Icon={skill.icon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
