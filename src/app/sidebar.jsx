import React from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegClipboard } from "react-icons/fa";
import { FiScissors } from "react-icons/fi";
import { LuCalendarCheck } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import Link from 'next/link';

export default function Page({ selected }) {

    const isSelected = (option) => (
        selected === option ? 'font-bold' : 'font-normal'
    );


    return (
        <div className='grid grid-cols-1 divide-x bg-white text-black h-full'>
            {/* Sidebar */}
            <div className='ps-8 flex flex-col justify-between'>
                <div>
                    <h1 className='text-4xl mt-3'>LOGO</h1>
                    <div className='mt-14 space-y-5 text-lg'>
                        <h5 className={`flex items-center ${isSelected('Dashboard')}`}>
                            <MdOutlineDashboard />
                            <span className='mx-2'> <Link href='/dashboard'>Dashboard</Link>  </span>
                        </h5>
                        <h5 className={`flex items-center ${isSelected('Services')}`}>
                            <FaRegClipboard />
                            <span className='mx-2'> <Link href='/services'>Services</Link> </span>
                        </h5>
                        <h5 className={`flex items-center ${isSelected('Hairstylists')}`}>
                            <FiScissors />
                            <span className='mx-2'> <Link href='/hairstylist'>Hairstylists</Link>  </span>
                        </h5>
                        <h5 className={`flex items-center ${isSelected('Bookings')}`}>
                            <LuCalendarCheck />
                            <span className='mx-2'>Bookings</span>
                        </h5>
                        <h5 className={`flex items-center ${isSelected('User Management')}`}>
                            <LuCalendarCheck />
                            <span className='mx-2'>User Management</span>
                        </h5>
                    </div>
                </div>
                <div className='mb-8 flex items-center space-x-3'>
                    <span><MdLogout /></span>
                    <h5 className='flex items-center text-xl'>Logout</h5>
                </div>
            </div>

            {/* Main Content */}

        </div>
    );
}
