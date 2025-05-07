'use client'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { login } from '../../../utils/api/auth'
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState<string | null>(null);

const handlePassword = () => {
  setShowPassword(!showPassword);
};

const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  try {
    const response = await login({ email, password });
    // Save the token to localStorage
    localStorage.setItem("token", response.token);
    localStorage.setItem("email", response.email);
    localStorage.setItem("fullName", response.fullName);
    localStorage.setItem("role", response.role);
    // Redirect to dashboard
    router.push("/dashboard");
  } catch (error_: unknown) {
    if (error_ instanceof Error) {
      console.error("Login error:", error_.message);
      setError("Login failed. Please try again.");
    } else {
      console.error("Unexpected error:", error_);
      setError("An unexpected error occurred. Please try again.");
    }
  }
};

  return (
    <div className='w-full min-h-screen bg-white'>
        <div >
            <Image src={'/NBIMS.png'} width={200} height={200} alt='logo'/>
        </div>
        <div className='flex justify-center w-full mt-12'>
            <div className='w-full flex justify-end'>
                <Image src={'/container.png'} width={500} height={500} alt='container'/>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className='' >
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-[474px] h-[36px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-[474px] h-[36px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="••••••••"
          
        />
          <button
                type="button"
                onClick={handlePassword}
                className="absolute right-3 top-3 text-gray-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
      </div>
        <div className='flex gap-5'>
      <button type='button' className="w-[240px] h-[48px] border border-[#DB3E36] text-black font-medium py-2.5 rounded-lg transition-colors">
        forgot password 
      </button>
      <button type='submit' className="w-[240px] h-[48px] bg-[#DB3E36]  text-white font-medium py-2.5 rounded-lg transition-colors">
       login
      </button>
      </div>
    </form>


        </div>

    </div>
  )
}
