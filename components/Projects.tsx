import { projects } from '@/constants/consants.index';
import React from 'react'
import { CgWebsite } from 'react-icons/cg';
import { FaGithub } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const Projects = () => {
    return (
        <div>

            <section>
                {projects.map((project, index) => (
                    <div key={index} className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:h-1/2screen lg:grid-cols-2 ">
                            <div className="relative z-20 lg:py-8 border-r-2 border-green-500 rounded-tr-2xl md:border-none">
                                <Carousel 
                                    showThumbs={false}
                                    infiniteLoop={true}
                                    autoPlay={true}
                                    autoFocus={true}
                                >
                                    {project.images.map((image, idx) => ( 
                                        <div key={idx}>
                                            <img
                                                alt="project-img"
                                                src={image}
                                                className="w-full object-cover rounded-t-2xl border border-green-500 border-b-2 border-r-2"
                                                style={{ height: '250px' }}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>

                            <div className="relative flex items-center z-10 bg-gray-900 rounded-br-lg">
                                <span
                                className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-900  border-green-500 border-b-2 rounded-s-md"
                                ></span>

                                <div className="p-8 sm:p-2 lg:p-12  border-green-500 border-b-2 border-r-2 rounded-br-lg">
                                    <a 
                                        href={project.link} 
                                        target="_blank" 
                                        className="cursor-pointer "
                                    >
                                        <span className="text-2xl font-bold text-blue-700 underline">
                                            {project.name}
                                        </span>
                                    </a>
                                    

                                    <p className="mt-4 text-gray-300">
                                        {project.shortDescription}
                                    </p>

                                    <div className="flex flex-wrap mt-4 gap-1 ">
                                        {project.stack.map((stack, idx) => ( 
                                            <span
                                                key={idx}
                                                className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm text-purple-700 ${
                                                idx % 2 === 0 ? 'bg-blue-100' : 'bg-purple-300'
                                                }`}
                                            >
                                                {stack}
                                            </span>
                                        ))}

                                    </div>

                                    <div className="flex gap-2 mt-4">
                                        <a 
                                            href={project.github} 
                                            target="_blank" 
                                            className="cursor text-white bg-blue-700 hover:bg-gray-800 text-center inline-flex items-center me-2 font-medium rounded-lg text-xs md:text-sm px-4 md:px-5 py-2 md:py-2.5 "
                                        >
                                            <span className="me-2"><FaGithub/></span>
                                            Github
                                        </a>
                                        <a 
                                            href={project.link} 
                                            target="_blank" 
                                            className="text-white bg-blue-700 hover:bg-gray-800 text-center inline-flex items-center me-2 font-medium rounded-lg text-xs md:text-sm px-4 md:px-5 py-2 md:py-2.5 "
                                        >
                                            <span className="me-2"><CgWebsite/></span>
                                            View Project 
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                ))}
                
            </section>



        </div>
    )
}

export default Projects;