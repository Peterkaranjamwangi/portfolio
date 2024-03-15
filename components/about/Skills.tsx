import React from "react";
import { skillsData } from "@/constants/consants.index";

const Skills = () => {
  return (
    <div className="w-full bg-gray-100 text-gray-900 mx-1 md:mx-2 p-2 md:p-4">
      <div>
        <div className="container">
          <div className="section-title py-4">
            <p className="text-gray-800">
              As a versatile freelance professional, I bring together a unique
              blend of technical prowess and innovative problem-solving. With
              expertise spanning across academic writing, UI/UX design, web
              development, and software engineering, I am adept at delivering
              outstanding solutions that guarantee client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {skillsData.map((skill, index) => (
              <div
                key={index}
                className="col-span-1 aos-init aos-animate"
                data-aos="fade-up"
              >
                <div className="max-w-sm mx-auto">
                  <span
                    id={`${skill.label}ProgressLabel`}
                    className="text-black text-xs font-semibold"
                  >
                    {skill.label}
                  </span>
                  <span
                    role="progressbar"
                    aria-labelledby={`${skill.label}ProgressLabel`}
                    aria-valuenow={skill.value}
                    className="relative block rounded-full bg-gray-400"
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-[10px]/4">
                      <span className="font-bold text-xs text-white">
                        {skill.value}%
                      </span>
                    </span>
                    <span
                      className="block h-3 rounded-full bg-indigo-600 text-center"
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
      </div>
    </div>
  );
};

export default Skills;
