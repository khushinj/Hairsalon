import React from 'react';
import Sidebar from '../sidebar';
import { FaPlus } from "react-icons/fa6";
import member1 from '../../../public/img1.png'; // This is the static image for now, replace with dynamic if needed
import Image from 'next/image';

export default function page() {

    const data = [
        { mem: 'member1', heading: 'Jenny Wilson', description: 'Master Hairstylists' },
        { mem: 'member1', heading: 'Jenny Wilson1', description: 'Master Hairstylists' },
        { mem: 'member1', heading: 'Jenny Wilson2', description: 'Master Hairstylists' },
        { mem: 'member1', heading: 'Jenny Wilson3', description: 'Master Hairstylists' },
        { mem: 'member1', heading: 'Jenny Wilson4', description: 'Master Hairstylists' },
        { mem: 'member1', heading: 'Jenny Wilson5', description: 'Master Hairstylists' },
        { mem: 'member1', heading: 'Jenny Wilson6', description: 'Master Hairstylists' },
        { mem: 'member1', heading: 'Jenny Wilson7', description: 'Master Hairstylists' },
    ];

    return (
        <div className='h-max grid grid-cols-6   bg-white text-black'>
            <Sidebar selected='Hairstylists' />
            <div className='col-span-5'>
                <div className="header">
                    <h1 className='mt-6 ms-5 text-4xl'>Hairstylists</h1>
                    <button className='flex items-center place-self-end me-10 border rounded-lg p-3 bg-orange-700 text-white'>
                        <FaPlus className='mr-2' /> Add new member
                    </button>
                </div>

                <div className="members grid grid-cols-4 gap-3 mt-6 mx-5">
                    {/* Mapping over the data */}
                    {data.map((item, index) => {
                        return (
                            <div key={index} className="relative">
                                <Image
                                    src={member1} // You can replace this with dynamic images for each member
                                    alt={item.heading}
                                    className="w-full h-80 object-cover rounded-lg" // Maintain image aspect ratio
                                />
                                <div className="absolute bottom-5 left-0 right-0 bg-slate-50 mx-4 text-center text-lg px-10 py-2 rounded-lg">
                                    <h1>{item.heading}</h1>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
