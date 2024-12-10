import React from 'react';
import DataTable from '../DataTable/page';
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegClipboard } from "react-icons/fa";
import { FiScissors } from "react-icons/fi";
import { LuCalendarCheck } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import Sidebar from '../sidebar';

export default function Page() {
    return (
        <div className='grid grid-cols-6 divide-x bg-white text-black h-full'>
            {/* Sidebar */}
            <Sidebar selected='Dashboard' />

            {/* Main Content */}
            <div className="col-span-5 mt-5">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-6">
                    <h2 className='text-2xl md:text-3xl mb-4 md:mb-0'>Admin Reservation Dashboard</h2>
                    <div className='relative w-full md:w-1/3'>
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                            <IoSearchSharp className='text-gray-500 text-lg' />
                        </span>
                        <input
                            type="search"
                            className='bg-gray-200 text-black rounded-lg pl-10 py-2 px-4 w-full'
                            placeholder='Search for customer'
                        />
                    </div>
                </div>

                {/* Data Table */}
                <div className="mt-8">
                    <DataTable />
                </div>
            </div>
        </div>
    );
}
