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

export function CustomCollapsible({ children, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="mt-2 border-2rounded">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between p-1 text-xs self-end border-2 border-indigo-500 px-4 py-2 items-center gap-2 cursor-pointer text-white font-semibold"
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
          className={`flex flex-col  ${
            project.status === "completed" ? "" : "border-blue-600"
          }`}
        >
          <div className="flex flex-col bg-red-500 w-full">
            <Image
              alt={project.name}
              src={project.image || defaultImage}
              className="object-contain w-full h-full "
              width={1000}
              height={1000}
            />

            <div className="p-4">
              <a href={project.link} target="_blank" className="cursor-pointer">
                <h3 className="text-lg font-bold text-blue-500 hover:text-pretty underline underline-offset-4 sm:text-xl">
                  {project.name}
                </h3>
              </a>

              <CustomCollapsible title="Description">
                <p className="mt-2 text-start max-w-sm">
                  {project.shortDescription}
                </p>
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
