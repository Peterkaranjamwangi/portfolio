import { CONNECT_DATA } from '@/constants/consants.index';
import React from 'react';
import { FaPhone } from 'react-icons/fa';

const Connect = () => {
    return (
        <div>
            <section className="bg-gray-100">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                    <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                        <div className="flex flex-wrap">
                            {CONNECT_DATA.map((item, index) => (
                                <div key={index} className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                                <div className="flex items-start">
                                    <div className="shrink-0">
                                    <div className="inline-block rounded-md bg-sky-200 p-4 text-primary">
                                        {React.createElement(item.icon, { className: "w-6 h-6" })}
                                    </div>
                                    </div>
                                    <div className="ml-6 grow">
                                    <p className="mb-2 font-bold">{item.name}</p>
                                    <a href={item.info}target="_blank" className="text-sm text-neutral-500">visit</a>
                                    </div>
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <form action="#" className="space-y-4">
                        <div>
                            <label className="sr-only" htmlFor="name">Name</label>
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

                        <div className="mt-4 flex flex-1 justify-center">
                            <button
                            type="submit"
                            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                            > 
                            Send Message
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </section>
        </div>
    );
};

export default Connect;
