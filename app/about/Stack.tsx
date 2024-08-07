import React from "react";
import PageTitle from "@/components/PageTitle";
import { stackData } from "@/constants/constants";
import Image from "next/image";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function Stack() {
  return (
    <div className="">
      <PageTitle
        title="Stack"
        subtitle="The Technologies and Tools That Power My Projects"
      />
      <div className="flex flex-wrap -m-4 text-center">
        {stackData.map((stack, index) => (
          <div key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <HoverEffect>
              <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 text-center">
                {stack.href ? (
                  <div className="relative w-16 h-16 mx-auto">
                    <Image
                      src={stack.href}
                      alt={stack.label}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                ) : (
                  <stack.icon className="mx-auto" size={30} />
                )}
                <h2 className="title-font font-medium text-lg mt-4">
                  {stack.label}
                </h2>
              </div>
            </HoverEffect>
          </div>
        ))}
      </div>
    </div>
  );
}
