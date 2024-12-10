"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import regimg from "../../../public/registration.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase_client";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Firebase login
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const idToken = userCredentials._tokenResponse.idToken;
      console.log("Firebase ID Token:", idToken);

      // Send the token to your server for verification
      const response = await axios.post("http://localhost:3000/auth/verify-token", { idToken });

      // Handle server response
      if (response.data && response.data.decodedToken) {
        setMessage("Login successful!");
        localStorage.setItem("userToken", idToken); // Store token in localStorage
        window.location.href = "/dashboard"; // Redirect after successful login
      } else {
        setMessage("Invalid token or error verifying token.");
      }
    } catch (error) {
      console.error("Error during login:", error);

      // Display error message based on the error response
      if (error.response) {
        // Error from backend (e.g., 404 or 400)
        if (error.response.status === 404) {
          setMessage("Backend endpoint not found. Please check your backend route.");
        } else if (error.response.status === 400) {
          setMessage("Invalid token. Please check your credentials and try again.");
        } else {
          setMessage("Error: Unable to login. Please try again.");
        }
      } else {
        setMessage("Network error. Please check your internet connection.");
      }
    }
  };

  return (
    <div className="grid grid-cols-2">
      {/* Left Section with Image */}
      <div>
        <Image src={regimg} className="object-fit max-h-[100vh]" alt="Registration" />
      </div>

      {/* Right Section with Login Form */}
      <div className="bg-white text-black">
        <h1 className="text-5xl text-center mt-24">Login</h1>
        <div className="form mx-52 mt-14">
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div id="email" className="my-6">
              <label htmlFor="email" className="text-slate-700 text-sm">
                Email
              </label>
              <br />
              <input
                type="text"
                id="email"
                className="rounded-md py-2 px-4 w-full border border-slate-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="olivia@untitledui.com"
              />
            </div>

            {/* Password Input */}
            <div id="password" className="my-6">
              <label htmlFor="password" className="text-slate-700 text-sm">
                Password
              </label>
              <br />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-md py-2 px-4 w-full border border-slate-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="py-2 px-32 rounded-lg bg-orange-600 text-white my-3"
            >
              Login
            </button>

            {/* Message Display */}
            {message && <p className="text-red-600 mt-4">{message}</p>}

            {/* Registration Link */}
            <p className="text-sm mt-4">
              Don’t have an account?{" "}
              <Link href="/registration" className="text-blue-600">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
