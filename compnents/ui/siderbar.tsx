'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation";

export default function Siderbar() {

  const router = useRouter();

  const handleLogout = () => {
    // Remove the token (assuming you're using localStorage for JWT)
    localStorage.removeItem("token");

    // Optionally clear other session data
    // localStorage.clear();

    // Redirect to login page
    router.push("/login");
  };

  return (
    <div>
      
<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 min-h-screen w-full max-w-[20rem]">
  <div className="mb-2 p-4 flex justify-center ">
  <Image src={'/NBIMS.png'} width={150} height={150} alt='logo'/>
  </div>
  <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
    <div role="button"  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div className="grid place-items-center mr-4">
        
      </div>
      <Link href={'/dashboard'}>
      Dashboard
      </Link>
    </div>
    <div role="button"  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div className="grid place-items-center mr-4">
        
      </div><Link href={'/dashboard/inventory-management'}>
      Inventory Management
      </Link>
    </div>
    <div role="button"  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div className="grid place-items-center mr-4">
        
      </div><Link href={'/dashboard/sales-tracking'}>
      Sales & Tracking
      </Link><div className="grid place-items-center ml-auto justify-self-end">
        
      </div>
    </div>
    <div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div className="grid place-items-center mr-4">
        
      </div><Link href={'/dashboard/reports-analysis'}>
      Reports & Analysis
      </Link>
    </div>
    <div role="button"  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div className="grid place-items-center mr-4">
       
      </div><Link href={'/dashboard/user-management'}>
      User Management
      </Link>
    </div>
    <div role="button"  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
      <div className="grid place-items-center mr-4">
        <button onClick={handleLogout}> Log Out</button>
      </div>
    </div>
  </nav>
</div>

    </div>
  )
}
