import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function Main() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 mb-8 lg:mb-0" data-aos="fade-right">
          <Image
            src="/peter.png"
            alt="Peter"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="lg:w-2/3 lg:pl-12" data-aos="fade-left">
          <h3 className="text-2xl font-semibold mb-4 text-primary">
            UI/UX Designer | Full-Stack Developer | Graphic Designer
          </h3>
          <p className="italic mb-6 text-gray-300">
            Innovative problem-solver delivering user-centered solutions.
            Versatile professional with expertise in UI/UX design, full-stack
            development, and graphic design. Passionate about creating
            responsive, user-centric web applications and impactful digital
            experiences.
          </p>

          <div className="mb-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <li className="flex items-center">
                <ChevronRight className="mr-2 text-green-500" />
                <strong className="mr-2 text-gray-300">Website:</strong>
                <a
                  href="http://petermwangi.vercel.app"
                  target="_blank"
                  className="text-primary underline "
                >
                  Portfolio
                </a>
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 text-green-500" />
                <strong className="mr-2 text-gray-300">Phone:</strong>
                <span className="text-white">0111968301</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 text-green-500" />
                <strong className="mr-2 text-gray-300">Freelance:</strong>
                <span className="text-white">Available</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 text-green-500" />
                <strong className="mr-2 text-gray-300">Email:</strong>
                <span className="text-white">annahirpeters@gmail.com</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 text-green-500" />
                <strong className="mr-2 text-gray-300">City:</strong>
                <span className="text-white">Nairobi</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-300 hidden md:block">
            With years of freelance experience, I&apos;ve honed my skills in
            creating user-centered designs and developing modern responsive web
            applications. My strength lies in adapting quickly and delivering
            high-quality work across various domains. As a self-taught
            professional with a passion for continuous learning, I stay current
            with industry trends and provide innovative solutions to diverse
            client needs. My expertise spans UI/UX design, full-stack
            development, and graphic design, allowing me to offer comprehensive
            digital services from concept to deployment.
          </p>
        </div>
        <a
          href="/about"
          target="_blank"
          className="flex  md:hidden  max-w-fit rounded-md text-xs self-end border-2 border-indigo-500 px-4 py-2 items-center text-white font-semibold hover:text-indigo-700"
        >
          More about me
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
  );
}
