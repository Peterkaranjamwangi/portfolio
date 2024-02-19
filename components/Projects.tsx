import { projects } from '@/constants/consants.index';
import React from 'react'
import { FaGalacticRepublic, FaGithub } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const Projects = () => {
    return (
        <div>

            <section>
                {projects.map((project, index) => (
                    <div key={index} className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:h-1/2screen lg:grid-cols-2">
                            
                            <div className="relative -z-10 lg:py-8">
                                <Carousel 
                                    showThumbs={false}
                                    infiniteLoop={true}
                                    autoPlay={true}
                                    autoFocus={true}
                                >
                                    {project.images.map((image, idx) => ( 
                                        <div key={idx}>
                                            <img
                                                alt=""
                                                src={image}
                                                className=" w-full object-cover"
                                                style={{ height: '250px' }}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>

                            <div className="relative flex items-center -z-20 bg-gray-300">
                                <span
                                className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-300"
                                ></span>

                                <div className="p-8 sm:p-10 lg:p-12">
                                <h2 className="text-2xl font-bold ">
                                    {project.name}
                                </h2>

                                <p className="mt-4 text-gray-600">
                                    {project.shortDescription}
                                </p>

                                <div className="flex flex-wrap mt-4 gap-1 ">
                                    {project.stack.map((stack, idx) => ( 
                                        <span 
                                            key={idx}
                                            className={`bg-${idx % 2 === 0 ? 'blue' : 'green'}-100 text-${idx % 2 === 0 ? 'blue' : 'green'}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-${idx % 2 === 0 ? 'blue' : 'green'}-900 dark:text-${idx % 2 === 0 ? 'blue' : 'green'}-300`}
                                        >
                                            {stack}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <a href={project.github} target="_blank" className="text-white bg-blue-700 hover:bg-gray-800 text-center inline-flex items-center me-2 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">
                                        <span className="me-2"><FaGithub/></span>
                                        Github
                                    </a>
                                    <a href={project.link} target="_blank" className="text-white bg-blue-700 hover:bg-gray-800 text-center inline-flex items-center me-2 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">
                                        <span className="me-2"><FaGithub/></span>
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