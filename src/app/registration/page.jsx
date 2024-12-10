'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import regimg from '../../../public/registration.png';
import Link from 'next/link';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const userData = {
      email,
      password,
      role: selectedRole,
      firstName,
      lastName,
    };

    try {
      console.log("regisration/page");
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
      } else {
        setMessage(data.message || "An error occurred.");
      }
    } catch (error) {
      setMessage("Error: Unable to register.");
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div>
        <Image src={regimg} className="object-fit max-h-[100vh]" alt="" />
      </div>
      <div className="bg-white text-black">
        <h1 className="text-5xl text-center mt-14">Create an account</h1>

        <div className="form mx-52 mt-14">
          <div id="email" className="my-6">
            <label htmlFor="" className="text-slate-700 text-sm">Email</label><br />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md py-2 px-4 w-full border border-slate-300"
              placeholder="olivia@untitledui.com"
            />
          </div>

          <div id="password" className="my-6">
            <label htmlFor="" className="text-slate-700 text-sm">Password</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md py-2 px-4 w-full border border-slate-300"
            />
          </div>

          <div id="ConfirmPassword" className="my-6">
            <label htmlFor="" className="text-slate-700 text-sm">Confirm Password</label><br />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-md py-2 px-4 w-full border border-slate-300"
            />
          </div>

          <div id="Role" className="my-6">
            <label htmlFor="" className="text-slate-700 text-sm">What type of account are you creating?</label><br />
            <select
              id="dropdown"
              className="w-full py-2"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Cashier">Cashier</option>
              <option value="Hairstylist">Hairstylist</option>
            </select>
          </div>

          <button
            onClick={handleSignup}
            className="py-2 px-24 rounded-lg bg-orange-600 text-white my-3"
          >
            Create account
          </button>

          {message && <p className="text-sm text-center">{message}</p>}

          <p className="text-sm mx-14 px-5">
            Have an account? <Link href="/login" className="text-blue-600">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
