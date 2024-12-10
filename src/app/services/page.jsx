"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar";
import { FaPlus } from "react-icons/fa6";

export default function ServicesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceToEdit, setServiceToEdit] = useState(null);

  // Fetch services data from backend
  useEffect(() => {
    setIsLoading(true); // Start loading
    fetch("http://localhost:3000/services")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setServicesData(data);
        setIsLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  const handleNewService = (newService) => {
    // Send new service data to backend
    fetch("http://localhost:3000/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newService),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((createdService) => {
        setServicesData((prevServices) => [...prevServices, createdService]);
        setIsFormOpen(false); // Close form after adding
      })
      .catch((error) => {
        console.error("Error creating service:", error);
        alert("Failed to add service. Please try again.");
      });
  };
  

  const handleUpdateService = (updatedService) => {
    // Send updated service data to backend
    fetch(`http://localhost:3000/services/${updatedService.service_id}`, {
      method: "PATCH", // Use PATCH for updates
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedService),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((updated) => {
        setServicesData((prevServices) =>
          prevServices.map((service) =>
            service.service_id === updated.service_id ? updated : service
          )
        );
        setIsFormOpen(false);
        setServiceToEdit(null); // Reset serviceToEdit after update
      })
      .catch((error) => {
        console.error("Error updating service:", error);
        alert("Failed to update service. Please try again.");
      });
  };

  const openEditForm = (service) => {
    setServiceToEdit(service);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setServiceToEdit(null); // Reset form state for new service
    setIsFormOpen(true); // Open form to add new service
  };

  return (
    <div className="h-full divide-x grid grid-cols-6 bg-white text-black">
      <Sidebar selected="Services" />
      <div className="col-span-5">
        <div>
          <h2 className="text-4xl mt-4 mx-5">Services</h2>
          <button
            className="flex items-center place-self-end mx-8 border rounded-lg py-3 px-4 bg-orange-700 text-white"
            onClick={openAddForm} // Open the form for adding a new service
          >
            <FaPlus className="mr-2" /> Add new service
          </button>
        </div>

        {isLoading ? (
          <p className="text-center mt-10 text-lg">Loading services...</p>
        ) : error ? (
          <p className="text-center mt-10 text-lg text-red-500">{error}</p>
        ) : servicesData.length === 0 ? (
          <p className="text-center mt-10 text-lg">No services available.</p>
        ) : (
          <table className="w-10/12 mx-20 rounded-3xl mt-14 shadow-lg">
            <thead>
              <tr className="text-center">
                <th className="py-4 border-b">Service Name</th>
                <th className="py-4 border-b">Price</th>
                <th className="py-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {servicesData.map((service) => (
                <tr key={service.service_id} className="text-center">
                  <td className="py-4 border-b">{service.service_name}</td>
                  <td className="py-4 border-b">{service.user_id}</td>
                  <td className="px-10 py-4 border-b">{service.price}</td>
                  <td className="px-10 py-4 border-b">
                    <button
                      onClick={() => openEditForm(service)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <PopupForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={serviceToEdit ? handleUpdateService : handleNewService}
          serviceToEdit={serviceToEdit}
        />
      </div>
    </div>
  );
}

// PopupForm Component
const PopupForm = ({ isOpen, onClose, onSubmit, serviceToEdit }) => {
  const [service_name, setServiceName] = useState("");
  const [user_id, setUserId] = useState(""); // user_id for the new service
  const [price, setPrice] = useState("");

  // Set form data for editing if serviceToEdit is provided
  useEffect(() => {
    if (serviceToEdit) {
      setServiceName(serviceToEdit.service_name);
      setUserId(serviceToEdit.user_id ? serviceToEdit.user_id.toString() : ""); // Safe toString
      setPrice(serviceToEdit.price ? serviceToEdit.price.toString() : ""); // Safe toString
    } else {
      setServiceName("");
      setUserId(""); // Reset user_id for new service
      setPrice("");
    }
  }, [serviceToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!service_name || !user_id || !price) {
      alert("All fields are required!");
      return;
    }

    // Send the data to parent component (ServicesPage)
    onSubmit({
      service_id: serviceToEdit?.service_id, // Send service_id for editing
      service_name,
      user_id: Number(user_id),
      price: Number(price),
    });

    // Reset form fields
    setServiceName("");
    setUserId("");
    setPrice("");
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="popup-form bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl mb-4">{serviceToEdit ? "Edit Service" : "Add New Service"}</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Service Name:</label>
          <input
            type="text"
            value={service_name}
            onChange={(e) => setServiceName(e.target.value)}
            required
            className="border p-2 mb-4 w-full"
          />
          <label className="block mb-2">User ID:</label>
          <input
            type="number"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="border p-2 mb-4 w-full"
          />
          <label className="block mb-2">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border p-2 mb-4 w-full"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              {serviceToEdit ? "Update Service" : "Add Service"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
