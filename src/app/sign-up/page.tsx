'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { createUserApi } from '../../../utils/api/user';

export default function signUp() {
    const [profile, setProfile] = useState<File | null>(null);
    const [password, setPassword] = useState("");
    const hasMinLength = password.length >= 8;
    const hasSpecial = /[!@#$%^&*]/.test(password);
    return (

        <div className='flex flex-row min-h-screen justify'>
            <div className='flex lg:flex-row md:flex-col  w-full'>
                <div className='md:mt-14 lg:mt-5'><Image src={'/nbims.png'} height={100} width={100} alt='logo' /></div>

                <div className='lg:px-8 lg:py-28 md:px-6 md:py-15 '>
                    <h2 className='font-bold'>let's get you started </h2>

                    <form action="POST">
                        <div className='flex flex-col gap-10'>
                            <label htmlFor=""> Full Name
                                <div className='border rounded-sm  h-[40px] sm:w-[280px] md:w-[360px] lg:w-[430px]'>
                                    <input type="text" className=' h-full w-full hover:outline-0 p-1' />
                                </div>
                            </label>
                            <label htmlFor=""> Email
                                <div className='border rounded-sm  h-[40px] sm:w-[280px] md:w-[360px] lg:w-[430px]'>
                                    <input type="text" className=' h-full w-full hover:outline-0 p-1' />
                                </div>
                            </label>
                            <label htmlFor=""> Role
                                <div className='border rounded-sm  h-[40px] sm:w-[280px] md:w-[360px] lg:w-[430px]   '>
                                    <select className=' h-full w-full hover:outline-0'>
                                        <option value="manage" className='text-black'>Manager</option>
                                        <option value="warehouseStaff" className='text-black'>warehouse Staff</option>
                                        <option value="admin" className='text-black'> Admin</option>

                                    </select>
                                </div>
                            </label>
                            <label htmlFor=""> Phone number
                                <div className='border rounded-sm  h-[40px] sm:w-[280px] md:w-[360px] lg:w-[430px]'>
                                    <input type="text" className=' lg:h-full w-full hover:outline-0 p-1' />
                                </div>
                            </label>
                        </div>

                        <label
                            htmlFor="file-upload"
                            className="flex items-center justify-between cursor-pointer mt-5  p-3"
                        >
                            <div className="flex items-center gap-3">
                                <Image
                                    src={'/Frame 3957.png'}
                                    alt="Upload"
                                    width={56}
                                    height={56}
                                />
                                {profile && <p className="text-white mt-2">File selected: {profile.name}</p> || <div className="flex flex-col">
                                    <span className="text-white font-medium">Upload Logo</span>
                                    <span > <p className="text-sm text-white mt-1"> Supported files (DOC, PDF, JPG or MP4)</p></span>

                                </div>}

                            </div>
                            <button className="bg-[#D3D3D3] text-black p-3 rounded-full">
                                Browse
                            </button>

                        </label>

                        <label htmlFor=""> Password
                            <div className='border rounded-sm focus:border-none mt-5 h-[40px] sm:w-[280px] md:w-[360px] p-1 lg:w-[430px]'>
                                <input type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} className=' lg:h-full w-full hover:outline-0' placeholder='please enter password' />
                            </div>
                        </label>
                        <p className={hasMinLength ? "text-green-600" : "text-gray-500"}>password must contain a minimum of 8 characters</p>
                        <p  className={hasSpecial ? "text-green-600" : "text-gray-500"}>password must containat least one symbol e.g. @,!</p>

                        
                                <div className='border rounded-sm  mt-5 h-[40px] sm:w-[280px] md:w-[360px] lg:w-[430px]   '>
                                    <select className=' h-full w-full hover:outline-0'>
                                    <option className='text-black'>Select your branch</option>
                                        <option value="manage" className='text-black'>Mile 17</option>
                                        <option value="st-claire" className='text-black'>St claire</option>
                                        <option value="clerks-quarters" className='text-black'>Clerks Quarters</option>
                                        <option value="campaigne-street" className='text-black'>Campaigne Street</option>
                                    </select>
                                </div>
                           
                    </form>

                    <button className=' mt-5 sm:w-[280px] md:w-[360px] lg:w-[430px] bg-red-700 border p-2 '>
                        Sign Up
                    </button>
                   
                   <p className='flex justify-center mt-8'>Already a user? <Link href={''}>login</Link></p>
                </div>
            </div>
            <div className="bg-white w-full flex justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center">
                    <Image src="/nbims.png" height={230} width={230} alt="logo" />
                </div>
            </div>
                

        </div>
    )
}

