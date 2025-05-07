'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { createUser } from '../../../utils/api/signup'
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
  
    const data = new FormData()
    data.append('fullName', fullName)
    data.append('email', email)
    data.append('role', role)
    data.append('phone', phone)
    data.append('password',password)
    data.append('passwordConfirm', confirmPassword)
    data.append('location', location)
    if (selectedFile) {
      data.append('profile', selectedFile)
    }
  
    try {
      const res = await createUser(data)
      localStorage.setItem("token", res.token);
      localStorage.setItem("email", res.user.email);
      localStorage.setItem("email", res.user.fullName);
      localStorage.setItem("role", res?.role);
      router.push("/dashboard");
      console.log('User created:', res)
      // maybe redirect or show success message
    } catch (error) {
      console.error('Signup failed:', error)
    }
  }

  return (
    <div className='w-full min-h-screen flex'>
        
        <div className='flex w-full ' >
          <div>
            <Image src={'/NBIMS.png'} width={150} height={150} alt='logo'/>
            </div>
            <div className='flex items-center mt-10 px-24'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-7 justify-center'>
                <div className='gap-5  flex flex-col justify-center' >
        <label className="block text-sm font-medium text-white ">Full name</label>
        <input 
          type="fullName" 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-[474px] h-[36px] px-4  border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="enter your full names"
        />
      </div>
                <div className='gap-5  flex flex-col justify-center' >
        <label className="block text-sm font-medium text-white ">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[474px] h-[36px] px-4  border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="enter your email"
        />
      </div>
      <div >
        <label className="block text-sm font-medium text-white mb-1">Role</label>
        <select value={role}  onChange={(e) => setRole(e.target.value)} className='w-[474px] h-[36px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'>
            <option value="" className=' text-black'>Select a role </option>
            <option value="admin" className=' text-black'>admin </option>
            <option value="warehouse-staff" className=' text-black'>warehouse staff</option>
            <option value="manager" className=' text-black'>manager </option>
            
        </select>
      </div>

      <div className='' >
        <label className="block text-sm font-medium text-whit mb-1">phone number</label>
        <input 
          type="phone" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-[474px] h-[36px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="phone number"
        />
      </div>
      <div className="">
    <label className="w-full flex flex-row gap-5 items-center px-4 py-6  text-blue cursor-pointer">
        
        <Image src={'/frame.png'} width={92} height={92} alt='frame'/>
        <span className="mt-2 "><p className='font-bold'>Upload profile</p><p>Supported files (JPEG, SVG, PNG)</p></span>
        
        <button type='button' className='w-[94px] h-[52px] text-black rounded-2xl bg-[#D3D3D3]'>
          Browse
        </button>
        <input onChange={handleFileChange} type='file' className='flex'  />
    </label>
</div>

<div className='' >
        <label className="block text-sm font-medium text-whit mb-1">Password</label>
        <input 
          type="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[474px] h-[36px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          required
        />
        <span>
          <p>Password must contain a minimum of 8 characters</p>
          <p>Password must contain at least one symbol e.g. @, !</p>
        </span>
      </div>
      <div className='' >
        <label className="block text-sm font-medium text-whit mb-1">Password</label>
        <input 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-[474px] h-[36px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="your@email.com"
        />
      </div>

      <div >
        <label className="block text-sm font-medium text-white mb-1">Role</label>
        <select  value={location}
                onChange={(e) => setLocation(e.target.value)} className='w-[474px] h-[36px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'>
            <option value="" className=' text-black'> Choose location </option>
            <option value="mile17" className=' text-black'>mile 17 </option>
            <option value="stClaire" className=' text-black'>st claire</option>
            <option value="clerksQuarter" className=' text-black'>clerks Quarter</option>
            
        </select>
      </div>

<button type='submit' className="w-[400px] h-[48px] bg-[#DB3E36]  text-white font-medium py-2.5 rounded-lg transition-colors">
       login
      </button>



                </form>
            </div>
        </div>

        <div></div>
        <div className='bg-white min-h-screen w-full flex items-center justify-center'>
          <div>
            <Image src={'/NBIMS.png'} width={400} height={400} alt='nbims' />
          </div>
        </div>
    </div>
  )
}
