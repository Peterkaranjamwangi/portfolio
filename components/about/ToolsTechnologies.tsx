import { stackData } from "@/constants/consants.index";
import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const ToolsTechnologies = () => {
  return (
    <div className="w-full bg-gray-100 text-gray-900 mx-1 md:mx-2 p-2 md:p-4">
      <div>
        <div className="section-title py-4">
          <p className="text-gray-800 ">
            I specialize in crafting dynamic and efficient solutions using an
            advanced technology stack centered around React and Next.js,
            alongside complementary tools and frameworks. My proficiency
            guarantees smooth development and peak performance for impactful and
            successful projects.
          </p>
        </div>

        <div className="flex flex-wrap">
          {stackData.map((stack, index) => (
            <div key={index} className=" w-1/3 md:w-1/5 lg:w-32 md:p-2 p-1">
              <CircularProgressbarWithChildren
                value={stack.value}
                strokeWidth={8}
                styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: `#8E65F4`,
                  textColor: "#4CAF50",
                  trailColor: "#F38E8E",
                })}
              >
                {/* <div className="flex flex-col items-center justify-center gap-1">
                  <stack.icon className="text-sm md:text-lg" />
                  <p className="md:text-sm text-xs text-gray-700 font-semibold ">
                    {stack.label}
                  </p>
                  <p className="text-xs">{stack.value}%</p>
                </div> */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <stack.icon className="text-sm md:text-lg" />
                  <p className="md:text-sm text-xs text-gray-700 font-semibold text-center">
                    <span className="inline-block max-w-full overflow-hidden">
                      {stack.label}
                    </span>
                  </p>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsTechnologies;
