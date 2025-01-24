"use client";
import { signup } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useRouter()

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    try {
      if (!email || !password ||  !name) {
        toast("Please fill all the fields");
        return;
      }

      const res:any = await dispatch(signup({ email, password, name }));
      console.log(res);
      if (res.meta.requestStatus == "fulfilled") {
        // toast("Signup successful");
        navigate.replace("/login");
      } else {
        toast(res?.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#272343]">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#029FAE]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#029FAE]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#029FAE]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#029FAE] text-white py-2 rounded hover:bg-[#02a0aec9]"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-[#029FAE] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
