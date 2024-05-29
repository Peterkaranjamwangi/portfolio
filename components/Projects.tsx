import { projects } from "@/constants/consants.index";
import Image from "next/image";
import React from "react";
import { CgWebsite } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Projects = () => {
  return (
    <div>
      <section>
        {projects.map((project, index) => (
          <div
            key={index}
            className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8"
          >
            <div className="grid grid-cols-1 lg:h-1/2screen lg:grid-cols-2 rounded-br-2xl  border-b-2 border-green-500">
              <div className="relative z-20 mt-2 bg-gray-900 border-r-2 border-green-500 rounded-tr-2xl lg:border-none">
                <Carousel
                  showThumbs={false}
                  infiniteLoop={true}
                  autoPlay={true}
                  autoFocus={true}
                >
                  {project.images.map((image, idx) => (
                    <div key={idx}>
                      <img
                        alt="project-img"
                        src={image}
                        className="w-full h-full object-cover rounded-t lg:rounded "
                      />
                    </div>
                  ))}
                </Carousel>
              </div>

              <div className="relative flex items-stretch z-10 bg-gray-900 rounded-br-lg">
                <div className="flex flex-col p-8 sm:p-2 lg:p-12 border-green-500 border-r-2 rounded-br-lg">
                  <a
                    href={project.link}
                    target="_blank"
                    className="cursor-pointer "
                  >
                    <span className="text-2xl font-bold text-blue-700 underline">
                      {project.name}
                    </span>
                  </a>
                  <p className="mt-4 text-gray-300">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap mt-4 gap-1 ">
                    {project.stack.map((stack, idx) => (
                      <span
                        key={idx}
                        className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm text-purple-700 ${
                          idx % 2 === 0 ? "bg-blue-100" : "bg-purple-300"
                        }`}
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4 self-center justify-center items-center">
                    <a
                      href={project.github}
                      target="_blank"
                      className="cursor text-white bg-blue-700 hover:bg-gray-800 text-center inline-flex items-center me-2 font-medium rounded-lg text-xs md:text-sm px-4 md:px-5 py-2 md:py-2.5 "
                    >
                      <span className="me-2">
                        <FaGithub />
                      </span>
                      Github
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      className="text-white bg-blue-700 hover:bg-gray-800 text-center inline-flex items-center me-2 font-medium rounded-lg text-xs md:text-sm px-4 md:px-5 py-2 md:py-2.5 "
                    >
                      <span className="me-2">
                        <CgWebsite />
                      </span>
                      View Project
                    </a>
                  </div>
                </div>

                {/*  */}
                <div className="absolute bottom-0 right-1">
                  <strong
                    className={`-mb-0 -me-[2px] inline-flex items-center gap-1 rounded-ee-lg rounded-ss-lg px-3 py-1.5 text-white ${
                      project.status === "completed"
                        ? "bg-green-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {project.status === "completed" ? (
                      <IoCheckmarkDoneSharp />
                    ) : (
                      <FaRepeat />
                    )}
                    <span className="text-[10px] font-medium sm:text-xs text-nowrap">
                      {project.status === "completed" ? "Completed" : "Ongoing"}
                    </span>
                  </strong>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Projects;
