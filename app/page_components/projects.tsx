"use client";
import React, { useState, useRef, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { projects } from "@/constants/constants";
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

const defaultImage = "/default.png";

interface Props {
  title: string;
  children: React.ReactNode;
}

function CustomCollapsible({ children, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="mt-2 border-2 border-gray-300 rounded">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between rounded p-1 bg-gray-800 items-center gap-2 cursor-pointer text-white font-semibold"
      >
        <div className="flex gap-1 items-center">
          <span>{title}</span>
          {isOpen ? <EyeOff size={18} /> : <Eye size={18} />}
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <div
        ref={contentRef}
        style={{ height }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="m-2 text-gray-100">{children}</div>
      </div>
    </div>
  );
}

export default function MobileProjects() {
  return (
    <section className="flex flex-col gap-4">
      <PageTitle title="Projects" subtitle="Check out my Work" />

      {projects.map((project, index) => (
        <div
          key={index}
          className={`flex flex-col border-2 border-double ${
            project.status === "completed" ? "" : "border-blue-600"
          }`}
        >
          <div className="flex flex-col w-full">
            <Image
              alt={project.name}
              src={project.image || defaultImage}
              className="object-contain w-full sm:h-80 lg:h-[80vh]"
              layout="responsive"
              width={1000}
              height={1000}
              sizes="(max-width: 1024px) 100vw, (min-width: 1024px) 80vw"
            />
            {/* <img
              alt={project.name}
              src={project.image || defaultImage}
              className="h-max w-full object-contain sm:h-80 lg:h-96"
            /> */}
            <div className="p-4">
              <a href={project.link} target="_blank" className="cursor-pointer">
                <h3 className="text-lg font-bold text-blue-500 hover:text-pretty underline underline-offset-4 sm:text-xl">
                  {project.name}
                </h3>
              </a>

              <CustomCollapsible title="Description">
                <p className="mt-2 max-w-sm">{project.shortDescription}</p>
              </CustomCollapsible>
            </div>
            <a
              href={project.link}
              target="_blank"
              className="flex max-w-fit m-2 rounded-md text-xs self-end border-2 border-indigo-500 px-4 py-2 items-center text-white font-semibold hover:text-indigo-700"
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
