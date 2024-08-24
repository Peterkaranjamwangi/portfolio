import React from "react";
import InnerLayout from "@/components/InnerLayout";
import PageTitle from "@/components/PageTitle";
import {
  SoftskillsData,
  TechnicalskillsData,
  resumeData,
} from "@/constants/constants";
import { CircleCheckBig } from "lucide-react";

export default function ResumePage() {
  return (
    <InnerLayout>
      <PageTitle title="Resume" subtitle="Check out my resume" />
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/2 px-4 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Summary</h3>
          <div className="mb-8">
            <h4 className="line-height-18 text-18 font-semibold uppercase text-primary mb-10">
              {resumeData.summary.name}
            </h4>
            <p className="italic mb-4">{resumeData.summary.description}</p>
            <ul className="list-disc list-inside">
              <li>{resumeData.summary.address}</li>
              <li>{resumeData.summary.phone}</li>
              <li>{resumeData.summary.email}</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4 mt-8">Skills</h3>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Technical Skills</h4>
            <div className="flex flex-col flex-wrap gap-2">
              {TechnicalskillsData.map((skill, index) => (
                <span
                  key={index}
                  className="flex gap-2  px-3 py-1 text-sm font-semibold text-gray-300"
                >
                  <CircleCheckBig />
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Soft Skills</h4>
            <div className="flex flex-col flex-wrap gap-2">
              {SoftskillsData.map((skill, index) => (
                <span
                  key={index}
                  className="flex gap-2 px-3 py-1 text-sm font-semibold text-gray-300"
                >
                  <CircleCheckBig />
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 px-4">
          <h3 className="text-2xl font-semibold mb-4">
            Professional Experience
          </h3>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <h4 className="line-height-18 text-18 font-semibold uppercase text-primary mb-10">
                {exp.title}
              </h4>
              <h5 className="text-16 bg-gray-300/20 px-5 py-15 inline-block font-semibold mb-10">
                {exp.date}
              </h5>
              <p className="italic">{exp.company}</p>
              <ul className="list-disc list-inside mt-2">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </InnerLayout>
  );
}
