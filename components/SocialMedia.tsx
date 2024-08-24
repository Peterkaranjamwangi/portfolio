import { CONNECT_DATA } from "@/constants/constants";
import React from "react";

const SocialMedia = () => {
  return (
    <div>
      <div className="w-full shadow-2xl my-2 rounded-l-md   flex justify-center items-center">
        {CONNECT_DATA.map((item, index) => (
          <div key={index} className="flex mb-2 mr-4">
            <a
              href={item.info}
              target="_blank"
              className="inline-block rounded-md bg-gray-700 hover:bg-primary hover:text-white p-2 text-primary"
            >
              {React.createElement(item.icon, { className: "w-4 h-4" })}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
