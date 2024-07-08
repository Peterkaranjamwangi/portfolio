import React from "react";
import InnerLayout from "@/components/InnerLayout";
import PageTitle from "@/components/PageTitle";
import { projects } from "@/constants/consants";
import { FaRepeat } from "react-icons/fa6";
import { CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            <div className="rounded-lg h-80 overflow-hidden">
              <img
                alt={project.name}
                className="object-cover object-center h-full w-full"
                src={project.image}
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

                  <p className="leading-relaxed text-start text-lg mb-4">
                    {project.shortDescription}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    className="text-indigo-500 inline-flex items-center"
                  >
                    <Button variant="outline">View Project</Button>
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
