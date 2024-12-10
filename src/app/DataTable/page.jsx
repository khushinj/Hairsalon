import React from 'react';

const TablePage = () => {
    // Example data
    const tableData = [
        {
            customer: "John Doe",
            status: "Paid",
            hairstylist: "Alex Smith",
            salon: "Luxury Cuts",
            date: "2024-11-28",
            time: "10:00 AM",
        },
        {
            customer: "Jane Roe",
            status: "Partially paid",
            hairstylist: "Mia Johnson",
            salon: "Hair Heaven",
            date: "2024-11-29",
            time: "02:00 PM",
        },
        {
            customer: "Mark Lee",
            status: "Booked",
            hairstylist: "Chris Evans",
            salon: "Style Studio",
            date: "2024-12-01",
            time: "11:30 AM",
        },
        {
            customer: "Emily Brown",
            status: "Cancelled",
            hairstylist: "Sophia Taylor",
            salon: "Urban Chic",
            date: "2024-12-03",
            time: "04:15 PM",
        },
    ];

    const changeColor = (status) => {
        switch (status) {
            case 'Paid':
                return "bg-green-300"
                break;
            case 'Partially paid':
                return "bg-yellow-300";
                break;
            case 'Cancelled':
                return "bg-red-300";
                break;
            case 'Booked':
                return "bg-blue-300";
                break;
            default:
                return "bg-white";
                break;

        }
    }


    return (
        <div className='px-8'>
            <table
                className='mt-32 w-full shadow-lg rounded-3xl'
            >
                <thead>
                    <tr className='border-b'>
                        <th className='pl-10 text-start'>
                            Customer
                        </th>
                        <th className='px-10'>
                            Status
                        </th>
                        <th className='px-10 text-start'>
                            Hairstylist
                        </th>
                        <th className='px-10 text-start'>
                            Salon
                        </th>
                        <th className='px-10'>
                            Date
                        </th>
                        <th className='px-10 '>
                            Time
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index} className='border-b '>
                            <td className='pl-10 py-4'>
                                {row.customer}
                            </td>
                            <td className='text-center  rounded-full' >
                                <button className={` ${changeColor(row.status)} px-3 py-1 rounded-full`}>{row.status}</button>
                            </td>
                            <td className='pl-10'>
                                {row.hairstylist}
                            </td>
                            <td className='px-10'>
                                {row.salon}
                            </td>
                            <td className='text-center px-6'>
                                {row.date}
                            </td>
                            <td className='text-center'>
                                {row.time}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablePage;
