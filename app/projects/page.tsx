import React from "react";
import InnerLayout from "@/components/InnerLayout";
import PageTitle from "@/components/PageTitle";
import { projects } from "@/constants/constants";
import Image from "next/image";
import { CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomCollapsible } from "../page_components/projects";

const defaultImage = "/default.png";
export default function ProjectsPage() {
  return (
    <InnerLayout>
      <PageTitle title="Projects" subtitle="Check out my Work" />
      <section className="flex flex-col gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`container px-5 py-8 mx-auto flex flex-col border-2 border-double rounded ${
              project.status === "completed" ? "" : "border-blue-600"
            }`}
          >
            <div className="relative rounded-lg h-80 overflow-hidden">
              <Image
                alt={project.name}
                src={project.image || defaultImage}
                className="object-contain w-full sm:h-80 lg:h-[80vh]"
                width={1000}
                height={1000}
                sizes="(max-width: 1024px) 100vw, (min-width: 1024px) 80vw"
              />
            </div>
            <div className="lg:w-5/6 mx-auto">
              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="flex flex-col items-start text-center justify-start">
                    <h2 className="font-medium title-font mt-4 text-gray-50 text-lg">
                      Stack used
                    </h2>
                    <div className="w-12 h-1 bg-indigo-500 rounded my-1"></div>
                    {/* Stack tags */}
                    <div className="flex flex-col text-start items-start mt-4 gap-2 text-gray-300 text-sm">
                      {project.stack.map((stack, idx) => (
                        <span key={idx} className="flex">
                          <CircleCheckBig className="mr-2" />
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <a
                    href={project.link}
                    target="_blank"
                    className="cursor-pointer"
                  >
                    <span className="text-2xl font-bold text-blue-700 underline">
                      {project.name}
                    </span>
                  </a>
                  <div className="w-12 h-1 ml-8 bg-indigo-500 rounded my-3"></div>

                  <CustomCollapsible title="Description">
                    <p className="mt-2 max-w-full">
                      {project.shortDescription}
                    </p>
                  </CustomCollapsible>

                  <a
                    href={project.link}
                    target="_blank"
                    className="flex max-w-fit mt-3 rounded-md text-xs self-end border-2 border-indigo-500 px-4 py-2 items-center text-white font-semibold hover:text-indigo-700"
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
            </div>
          </div>
        ))}
      </section>
    </InnerLayout>
  );
}
