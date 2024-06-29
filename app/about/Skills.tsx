import PageTitle from "@/components/PageTitle";
import { skillsData } from "@/constants/consants";
import React from "react";

export default function Skills() {
  return (
    <div>
      <PageTitle title="Skills" />
      <div className="flex flex-wrap w-full">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            className="w-full md:w-1/2 p-2 transition-all duration-300 ease-in-out"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="w-full py-2">
              <div className="flex justify-between items-center mb-2">
                <span
                  id={`${skill.label}ProgressLabel`}
                  className="text-white text-xs font-semibold"
                >
                  {skill.label}
                </span>
                <span className="text-white text-xs font-semibold">
                  {skill.value}%
                </span>
              </div>
              <span
                role="progressbar"
                aria-labelledby={`${skill.label}ProgressLabel`}
                aria-valuenow={skill.value}
                className="relative block bg-gray-400"
              >
                <span
                  className="block h-3 bg-primary transition-all duration-1000 ease-out"
                  style={{ width: `${skill.value}%` }}
                >
                  {" "}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
