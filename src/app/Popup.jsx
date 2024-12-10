import React, { useState } from 'react';

export default function PopupForm({ isOpen, onClose, onSubmit }) {
    const [service, setService] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = () => {
        const newService = { service, time, price };
        onSubmit(newService);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl mb-4">Add New Service</h2>
                        <div className="mb-4">
                            <label className="block mb-2">Service</label>
                            <input
                                type="text"
                                className="w-full border px-3 py-2 rounded-lg"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Time</label>
                            <input
                                type="text"
                                className="w-full border px-3 py-2 rounded-lg"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Price</label>
                            <input
                                type="text"
                                className="w-full border px-3 py-2 rounded-lg"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-md"
                                onClick={onClose} // Close the modal
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                onClick={handleSubmit} // Submit the form data
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
