
"use client"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

         import React, { useState } from 'react'
         import Image from 'next/image'
         import { createUser } from '../../utils/api/signup'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface createUserModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export default function CreateUserModal({ open, onClose, title, description }: createUserModalProps) {
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
    
        console.log('User created:', res)
        // maybe redirect or show success message
      } catch (error) {
        console.error('Signup failed:', error)
      }
    }
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" >
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2, textDecorationColor:'black' }}>
         
          
             <div className=' flex w-full text-black'>
                
                 <div >
                 <p className='text-3xl'>Add User</p>
                     <div className='flex items-center mt-10 px-24'>
                         <form onSubmit={handleSubmit} className='flex flex-col gap-7 w-full justify-center'>
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
              
         
         <div className='' >
                 <label className="block text-sm font-medium text-whit mb-1">Password</label>
                 <input 
                   type="Password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-[474px] h-[36px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                   required
                 />
                
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
         <div className='flex gap-4'>
         <button type='submit' className="w-[400px] h-[48px] bg-[#30A12A]  text-white font-medium py-2.5 rounded-lg transition-colors">
               add
               </button>
               <button type='button' onClick={onClose} className="w-[400px] h-[48px] bg-[#DB3E36]  text-white font-medium py-2.5 rounded-lg transition-colors">
               cancel
               </button>
         
               </div>
         
                         </form>
                     </div>
                 </div>
             </div>
           
      
         
        </Typography>
      </Box>
    </Modal>
  );
}
