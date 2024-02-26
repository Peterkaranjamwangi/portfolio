import React from 'react';
import SocialMedia from './SocialMedia';

const Connect = () => {
    return (
        <div>
            <section className="mx-auto max-w-screen-md bg-gray-900 px-4 rounded-br-full rounded-tl-3xl py-8 border-green-500 border-y-2 border-r-2">
                <SocialMedia />
                    <div className="grid rounded-2xl bg-gradient-to-r from-pink-500 via-gray-500 to-indigo-500 border-r-2 border-b-2 border-green-400 p-4 lg:col-span-3 lg:p-12">
                        <span className="relative flex justify-center">
                            <div
                                className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                            ></div>

                            <span className="relative rounded-md z-10 bg-gray-800 px-3">Send me a message</span>
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
