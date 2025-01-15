import React from "react";
import { FaClock, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const ContactForm: React.FC = () => {
    return (
        <div className="min-h-screen bg-white gap-10 flex flex-col items-center justify-center sm:p-4">


            <div className="sm:w-[500px] px-3 sm:px-0 text-center">
                <h2 className="text-2xl font-bold">Get In Touch With Us</h2>
                <p className="text-sm text-[#9F9F9F]">
                    For more information about our products & services, feel free to
                    drop us an email. Our staff will always be there to help you out. Do
                    not hesitate!
                </p>
            </div>

            <div className="max-w-4xl  rounded-lg p-3 sm:p-8 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
                {/* Left Section */}
                <div className="flex-1 space-y-10 ">

                    <div className="flex gap-6">
                        <div className="mt-1">
                            <FaLocationDot />
                        </div>
                        <div>
                            <p className="font-medium">Address:</p>
                            <p>236 5th SE Avenue, New York NY10000, United States</p>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="mt-1">
                            <FaPhone />
                        </div>
                        <div>
                            <p className="font-medium">Phone:</p>
                            <p>Mobile: (+84) 546-6789</p>
                            <p>Hotline: (+84) 456-6789</p>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="mt-1">
                            <FaClock />
                        </div>
                        <div>
                            <p className="font-medium">Working Time:</p>
                            <p>Monday-Friday: 9:00 - 22:00</p>
                            <p>Saturday-Sunday: 9:00 - 21:00</p>
                        </div>
                    </div>

                </div>

                {/* Right Section */}
                <div className="flex-1">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Your name
                            </label>
                            <input
                                type="text"
                                placeholder="Abc"
                                className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="Abc@def.com"
                                className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Subject
                            </label>
                            <input
                                type="text"
                                placeholder="This is an optional"
                                className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                placeholder="Hi! I'd like to ask about ..."
                                className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows={4}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="px-8 bg-[#029FAE] w-fit text-white py-2 rounded-md outline-none focus:ring-2  focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
