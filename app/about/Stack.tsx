"use client";

import PageTitle from "@/components/PageTitle";
import { stackData } from "@/constants/consants";

export default function Stack() {
  return (
    <div className="">
      <PageTitle
        title="Stack"
        subtitle="The Technologies and Tools That Power My Projects"
      />
      <div className="flex flex-wrap -m-4 text-center">
        {stackData.map((stack, index) => (
          <div key={index} className="p-4  md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-600 px-4 py-6 rounded-lg  transform transition duration-500 hover:scale-110">
              <stack.icon className="" size={30} />
              <h2 className="title-font font-medium text-lg">{stack.label}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
