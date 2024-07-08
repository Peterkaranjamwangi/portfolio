import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react"



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
          <h3 className="text-2xl font-semibold mb-4 text-primary">UI/UX Designer, Front-End Developer & Academic Writer</h3>
          <p className="italic mb-6 text-gray-300">
            Versatile professional with expertise in UI/UX design, front-end development, and academic writing. 
                      Passionate about creating responsive, user-centric web applications and impactful digital experiences.

          </p>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ul className="space-y-2">
              <li className="flex items-center">
<ChevronRight className="mr-2 text-green-500"/>
                <strong className="mr-2">Website:</strong>
               <span>www.example.com</span>
              </li>
              <li className="flex items-center">
<ChevronRight className="mr-2 text-green-500"/>
                <strong className="mr-2">Phone:</strong>
                <span>(Your phone number)</span>
              </li>
                            <li className="flex items-center">
<ChevronRight className="mr-2 text-green-500"/>
                <strong className="mr-2">Freelance:</strong>
                <span>Available</span>
              </li>
            </ul>
            
            <ul className="space-y-2">
              <li className="flex items-center">
<ChevronRight className="mr-2 text-green-500"/>                
                <strong className="mr-2">Email:</strong>
                <span>annahirpeters@gmail.com</span>
              </li>
              <li className="flex items-center">
<ChevronRight className="mr-2 text-green-500"/>
                <strong className="mr-2">City:</strong>
                <span>Nairobi</span>
              </li>
            </ul>
          </div>
          
          <p className="text-gray-300">
  As a self-taught front-end developer since 2019, I specialize in React, Next.js, TypeScript, and Tailwind CSS. My expertise extends to Bootstrap, responsive design, and UI/UX principles. I'm proficient in creating user-centered web applications, from concept to deployment. Additionally, I have skills in academic writing, logo design, and no-code solutions, allowing me to offer versatile digital services.
</p>
        </div>
      </div>
    </div>
  );
};
