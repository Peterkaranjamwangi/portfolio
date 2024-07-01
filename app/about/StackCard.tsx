import React from "react";

interface StackItem {
  label: string;
  href: string;
  iframe: string;
}

interface CardProps {
  stack: StackItem;
}

const StackCard: React.FC<CardProps> = ({ stack }) => {
  return (
    <article className="group relative w-[370px] bg-white shadow-md overflow-hidden transition-shadow duration-500 hover:shadow-lg">
      <header className="h-[205px] overflow-hidden bg-black transition-[height] duration-500 group-hover:h-[130px]">
        <a href="#">
          <img
            src={stack.href}
            className="w-full block opacity-100 scale-100 transition-all duration-500 group-hover:opacity-60 group-hover:scale-110"
            alt={`${stack.label} thumbnail`}
          />
        </a>
      </header>
      <div className="relative h-[105px] p-5 transition-[height] duration-500 group-hover:h-[200px]">
        <h2 className="m-0 pb-[10px] text-black text-[22px] font-bold uppercase">
          <a href="#">{stack.label}</a>
        </h2>
        <div className="m-0 pb-[10px] text-[19px] text-coral">
          {stack.label}
        </div>
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: stack.iframe }}
        />
      </div>
    </article>
  );
};

export default StackCard;
