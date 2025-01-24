"use client";
import { login } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useRouter()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
        if (!email || !password) {
          toast.error("Please fill all the fields");
          return;
        }
        const res = await dispatch(login({ email, password}));
        console.log(res);
        if (res.meta.requestStatus == "fulfilled") {
        //   toast("Signup successful");
          navigate.replace("/cart")
  
        } 
      } catch (error) {
          console.log(error)
          
      }
    // Handle login logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#272343]">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#029FAE] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
