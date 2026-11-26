import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { RiCloseLargeLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import { CiCloudMoon } from "react-icons/ci";
import { MdOutlineBrightnessAuto } from "react-icons/md";


export default function Sidebar() {

    const [openClock, setOpenClock] = useState(false);
    const [openStopwatch, setOpenStopwatch] = useState(false);
    const [openTimer, setOpenTimer] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // sidebar expanded state


    return (
        <div
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className={`fixed right-0 top-0  bg-[#0d0d0d] text-white flex flex-col justify-between p-4
                  transition-all duration-300 ${isExpanded ? "w-56 h-dvh" : "w-16 h-16"}`}
        >
            {/* TOP SECTION */}
            <div >

                {/* Menu */}
                <div className="flex justify-end mb-6" >

                    {!isExpanded ? (
                        <CiMenuFries size={32}
                            onClick={() => setIsExpanded(true)}
                            className="text-white cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-gray-300" />
                    ) : (
                        <CiMenuFries size={28}
                            onClick={() => { setIsExpanded(false) }}
                            className="text-white cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-gray-300 " />
                    )}
                    {/* {RiCloseLargeLine} */}
                </div>

                {/* Mid Section */}
                {isExpanded && (
                    <div >
                        {/* Clock Section */}
                        <div className="mb-4 ">
                            <button
                                onClick={() => {
                                    setOpenClock(!openClock);
                                    setOpenStopwatch(false)
                                    setOpenTimer(false);
                                }}
                                className="w-full text-left font-semibold transition-transform duration-200 hover:scale-105 hover:text-yellow-400 transition"
                            >
                                ⏰ Clock
                            </button>
                            {openClock && (
                                <div className="ml-4 mt-2 flex flex-col space-y-1 " >
                                    <NavLink to="/clock" className="hover:text-green-300 transition-transform duration-200 hover:scale-95">Digital</NavLink>
                                    <NavLink to="/clock/card" className="hover:text-green-300 transition-transform duration-200 hover:scale-95" >Card</NavLink>
                                    <NavLink to="/clock/analog" className="hover:text-green-300 transition-transform duration-200 hover:scale-95">Analog</NavLink>
                                </div>
                            )}
                        </div>

                        {/* Stopwatch Section */}
                        <div className="mb-4">
                            <button
                                onClick={() => {
                                    setOpenStopwatch(!openStopwatch)
                                    setOpenClock(false);
                                    setOpenTimer(false);
                                }}
                                className="w-full text-left font-semibold hover:text-yellow-400 transition-transform duration-200 hover:scale-105"
                            >
                                ⏱ Stopwatch
                            </button>
                            {openStopwatch && (
                                <div className="ml-4 mt-2 flex flex-col space-y-1">
                                    <NavLink to="/stopwatch" className="hover:text-green-300 transition-transform duration-200 hover:scale-95">Digital</NavLink>
                                    <NavLink to="/stopwatch/card" className="hover:text-green-300 transition-transform duration-200 hover:scale-95">Card</NavLink>
                                    <NavLink to="/stopwatch/analog" className="hover:text-green-300 transition-transform duration-200 hover:scale-95">Analog</NavLink>
                                </div>
                            )}
                        </div>

                        {/* Timer Section */}
                        <div className="mb-4">
                            <button
                                onClick={() => {
                                    setOpenTimer(!openTimer);
                                    setOpenStopwatch(false)
                                    setOpenClock(false);
                                }}
                                className="w-full text-left font-semibold hover:text-yellow-400 transition-transform duration-200 hover:scale-105"
                            >
                                ⏳ Timer
                            </button>
                            {openTimer && (
                                <div className="ml-4 mt-2 flex flex-col space-y-1">
                                    <NavLink to="/timer" className="hover:text-green-300 transition-transform duration-200 hover:scale-95">Digital</NavLink>
                                    <NavLink to="/timer/card" className="hover:text-green-300 transition-transform duration-200 hover:scale-95">Card</NavLink>
                                    <NavLink to="/timer/analog" className="hover:text-green-300 transition-transform duration-200 hover:scale-95">Analog</NavLink>
                                </div>
                            )}
                        </div>

                    </div>
                )}

            </div>

            {/* BOTTOM THEME TOGGLE */}
            {isExpanded && (
                <div className="flex items-center justify-around border border-gray-400 rounded-full px-auto py-2 ">
                    <div className="flex justify-between w-20 border border-gray-400 rounded-full px-2 py-1">
                        <IoSunnyOutline size={20} className="cursor-pointer text-yellow-400" title="Light" />
                        <CiCloudMoon size={20} className="cursor-pointer text-blue-400" title="Dark" />
                    </div>
                    <MdOutlineBrightnessAuto size={20} className="cursor-pointer text-green-400" title="Auto" />
                </div>
            )}

        </div>
    );
}