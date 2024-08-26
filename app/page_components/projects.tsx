import React from "react";
import PageTitle from "@/components/PageTitle";
import { projects } from "@/constants/constants";
import Image from "next/image";

const defaultImage = "/default.png";

export default function MobileProjects() {
  return (
    <section className="flex flex-col gap-4">
      <PageTitle title="Projects" subtitle="Check out my Work" />

      {projects.map((project, index) => (
        <div
          key={index}
          className={`flex flex-col border-2 border-double rounded ${
            project.status === "completed" ? "" : "border-blue-600"
          }`}
        >
          <a href={project.link} target="_blank" className="block w-full">
            <div className="h-80 w-full flex items-center justify-center bg-black">
              <img
                alt={project.name}
                src={project.image || defaultImage}
                className="max-h-full w-auto object-contain"
              />
            </div>
          </a>
          <div className="px-3 py-4 text-center sm:text-left">
            <a href={project.link} target="_blank" className="cursor-pointer">
              <span className="text-2xl font-bold text-blue-700 underline">
                {project.name}
              </span>
            </a>
            <div className="w-12 h-1 bg-indigo-500 rounded my-3 mx-auto sm:mx-0"></div>

            <p className="leading-relaxed text-start text-white text-lg mb-4">
              {project.shortDescription.length > 100
                ? `${project.shortDescription.substring(0, 100)}...`
                : project.shortDescription}
            </p>
            <a
              href={project.link}
              target="_blank"
              className="inline-flex items-center text-indigo-500 font-semibold text-lg hover:text-indigo-700"
            >
              View Project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
