import React from "react";
interface Props {
  title: string;
  subtitle?: string;
}

export default function PageTitle({ title, subtitle }: Props) {
  return (
    <div className="flex justify-center items-start flex-col mt-2 mb-4">
      <div className="flex gap-2 items-center justify-center">
        <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500 ">
          {title}
        </h2>
        <div className="bg-green-500 h-px w-16 pl-20"></div>
      </div>

      <p className="text-3xl font-bold uppercase text-white">{subtitle}</p>
    </div>
  );
}
