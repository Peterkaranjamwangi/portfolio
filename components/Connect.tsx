import { CONNECT_DATA } from '@/constants/consants.index';
import React from 'react';
import { FaPhone } from 'react-icons/fa';

const Connect = () => {
    return (
        <div>
            <section className="mx-auto max-w-screen-md bg-gray-900 px-4 rounded-br-3xl rounded-tl-3xl py-8">
                <div className="w-full shadow-2xl mb-2 rounded-l-md flex justify-center items-center">
                    {CONNECT_DATA.map((item, index) => (
                        <div key={index} className="flex mb-2 mr-4">
                            <a href={item.info} target="_blank" className="inline-block rounded-md bg-gray-700 animate-pulse p-2 text-primary">
                                {React.createElement(item.icon, { className: "w-4 h-4" })}
                            </a>
                        </div>
                    ))}
                </div>


                    <div className="grid rounded-2xl bg-gray-800 p-4 lg:col-span-3 lg:p-12">
                        <span className="relative flex justify-center">
                            <div
                                className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                            ></div>

                            <span className="relative z-10 bg-gray-800 px-6">Send me a message</span>
                        </span>


                        <p className="pb-5 justify-self-center text-xl"></p>


                            <form action="#" className="space-y-4 text-black">
                            <div>
                                <label className="sr-only border" htmlFor="name">Name</label>
                                <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Name"
                                type="text"
                                id="name"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                <label className="sr-only" htmlFor="email">Email</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Email address"
                                    type="email"
                                    id="email"
                                />
                                </div>

                                <div>
                                <label className="sr-only" htmlFor="phone">Phone</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Phone Number"
                                    type="tel"
                                    id="phone"
                                />
                                </div>
                            </div>


                            <div>
                                <label className="sr-only" htmlFor="message">Message</label>

                                <textarea
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Message"
                                id="message"
                                ></textarea>
                            </div>

                            <div className="mt-3 flex flex-1 justify-center">
                                <button
                                type="submit"
                                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                > 
                                Send Message
                                </button>
                            </div>
                            </form>
                    </div>
                
            </section>
        </div>
    );
};

export default Connect;
