import { CONNECT_DATA } from '@/constants/consants.index';
import React from 'react'
import Typewriter from 'typewriter-effect';
import SocialMedia from '../SocialMedia';


const Overview = () => {
    return (
        <section className="relative h-[500px] md:min-h-[700px] lg:min-h-[800px] bg-center bg-no-repeat bg-cover z-[1] object-center md:object-cover" style={{ backgroundImage: "url(/bg.jpeg)", backgroundSize: 'cover', backgroundPosition: 'top', padding: '2rem' }}>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-65 text-white p-8">
                <div className="my-2">
                    <h1 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-pink-600 bg-clip-text text-transparent">I am Peter Mwangi. </h1>
                    <span className="text-md text-nowrap md:text-2xl lg:text-4xl mb-4 text-teal-500">
                        <Typewriter
                        options={{
                            strings: ['Freelance Academic Writer', 'UX/UI Designer', 'Web Developer', 'Software Engineer'],
                            autoStart: true,
                            loop: true,
                        }}
                        />
                    </span>
                </div>

                <SocialMedia />

                    <div className="w-full shadow-2xl my-2 py-2 rounded-l-md flex flex-wrap gap-2 justify-center items-center">
                        <a href="#"  className="px-3 py-2 text-xs font-medium text-center text-white text-nowrap bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 ">Download CV</a>
                        <a href="#"  className="px-3 py-2 text-xs font-medium text-center text-white text-nowrap bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 ">Extra small</a>
                        <a href="#"  className="px-3 py-2 text-xs font-medium text-center text-white text-nowrap bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 ">Extra small</a>
                        <a href="#"  className="px-3 py-2 text-xs font-medium text-center text-white text-nowrap bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 ">Extra small</a>
                    </div>

            </div>
        </section>
        
    )
}

export default Overview;