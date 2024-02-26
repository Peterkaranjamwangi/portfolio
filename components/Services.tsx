import { SERVICES } from '@/constants/consants.index';
import React from 'react'

const Services = () => {
    return (
        <div>
            <section className="bg-gray-900 text-white">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="mx-auto max-w-lg text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl">Services</h2>

                        <p className="mt-4 text-gray-300">
                            I offer comprehensive academic writing, web design, development, maintenance, and optimization services for diverse needs.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {SERVICES.map((service, index) => (
                            
                            <div
                                key={index}
                                className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                            >
                                {<service.icon size={30}/>}

                                <h2 className="mt-4 text-xl font-bold text-white">{service.name}</h2>

                                <p className="mt-1 text-sm text-gray-300">
                                {service.description}
                                </p>
                        </div>
                        ))}
                        
                    </div>

                    <div className="mt-12 text-center">
                    <a
                        href="#"
                        className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
                    >
                        Get Started Today
                    </a>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Services;