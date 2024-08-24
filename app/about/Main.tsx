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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ul className="space-y-2">
              <li className="flex items-center">
                <ChevronRight className="mr-2 text-green-500" />
                <strong className="mr-2">Website:</strong>
                <a
                  href="http://petermwangi.vercel.app"
                  target="_blank"
                  className="text-primary underline "
                >
                  petermwangi.vercel.app
                </a>
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 text-green-500" />
                <strong className="mr-2">Phone:</strong>
                <span>0111968301</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 text-green-500" />
                <strong className="mr-2">Freelance:</strong>
                <span>Available</span>
              </li>
            </ul>

            <ul className="space-y-2">
              <li className="flex items-center">
                <ChevronRight className="mr-2 text-green-500" />
                <strong className="mr-2">Email:</strong>
                <span>annahirpeters@gmail.com</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className="mr-2 text-green-500" />
                <strong className="mr-2">City:</strong>
                <span>Nairobi</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-300">
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
      </div>
    </div>
  );
}
