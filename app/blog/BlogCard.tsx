import { ArrowRightIcon } from "lucide-react";
import React from "react";

interface Props {
  category: string;
  date: string;
  title: string;
}

export default function BlogDetails() {
  return (
    <div className="py-3 flex flex-wrap md:flex-nowrap ">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="font-semibold title-font text-primary">CATEGORY</span>
        <span className="mt-1 text-secondary text-sm">12 Jun 2019</span>
      </div>
      <div className="md:flex-grow">
        <h2 className="text-2xl font-medium text-white  title-font mb-2">
          Bitters hashtag waistcoat fashion axe chia unicorn
        </h2>
        <p className="leading-relaxed">
          Glossier echo park pug, church-key sartorial biodiesel vexillologist
          pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag
          selfies, poke vaporware kombucha lumbersexual pork belly polaroid
          hoodie portland craft beer.
        </p>
        <a href="#" className="text-indigo-500 inline-flex items-center mt-4">
          Read More
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
}
