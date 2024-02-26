// import React from 'react'

// const Experience = () => {
//   return (
//     <div className="w-full bg-gray-100 text-gray-900 mx-1 md:mx-2 p-2 md:p-4">


//     </div>
//   )
// }

// export default Experience;

import { projects } from '@/constants/consants.index';
import React from 'react';

const Gallery = () => {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {projects.map((project, index) => (
                <a key={index} href={project.link} target="_blank" className="relative rounded-lg group flex items-center justify-center overflow-hidden">
                    <img 
                        src={project.images[0]} 
                        alt={project.name} 
                        className="w-full h-full object-cover rounded-lg transition duration-300 transform hover:scale-105"
                    />
                    <p className="absolute bottom-0 shadow-2xl my-2 px-5 text-center text-black  bg-white opacity-70 rounded-full lg:hidden group-hover:block transition duration-300 ">{project.name}</p>
                </a>

                


            ))}
        </div>
    );
};

export default Gallery;

