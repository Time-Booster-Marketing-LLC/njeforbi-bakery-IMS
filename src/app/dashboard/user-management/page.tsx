'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../../../compnents/ui/header'
import Siderbar from '../../../../compnents/ui/siderbar'
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image'
import BasicModal from '../../../../compnents/modals/delete-item-modal'
import ProductModal from '../../../../compnents/modals/product-creation-modal';
import { getUsers } from '../../../../utils/api/users';
import createUserModal from '../../../../compnents/modals/user-create';
import CreateUserModal from '../../../../compnents/modals/user-create';
import { Plus } from 'lucide-react';

interface users {
    email: string;
    name: string;
    location: string;
    phone: number;
    role: string;
}

export default function salesTracking() {
    const [open, setOpen] = React.useState(false);
    const [openUser, setOpenUser] = React.useState(false);
    const [users, setUsers] = useState<any[]>([])
    const cardData = [
        { title: 'Total Stock', content: 'This is the first card' },
        { title: 'Pending Orders', content: 'This is the second card' },
        { title: 'Overall Perisdhables', content: 'This is the third card' },
        { title: 'Running Low', content: 'This is the fourth card' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUsers();

            if (response && Array.isArray(response.users)) {
                setUsers(response.users);
            } else {
                console.error("Users data is not an array:", response);
                setUsers([]);
            }
        };

        fetchData();
    }, []);



    const percentage = 66;
    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false) }
    const handleUserOpen = () => { setOpenUser(true); }
    const handleUserClose = () => { setOpenUser(false) }
    const inventory = [
        { id: 1, name: 'Laptop', category: 'Electronics', stock: 12, price: 850, status: 'In Stock' },
        { id: 2, name: 'Desk Chair', category: 'Furniture', stock: 0, price: 120, status: 'Out of Stock' },
        { id: 3, name: 'Keyboard', category: 'Electronics', stock: 34, price: 25, status: 'In Stock' },
        { id: 4, name: 'Notebook', category: 'Stationery', stock: 100, price: 3, status: 'In Stock' },
    ];



    return (
        <div className='w-full text-black  bg-[#D3D3D3] flex'>
            <Siderbar />
            <div className=' justify-center  w-full mt-6'>
                <Header pageName={'Sales & tracking '} />
                <div className='flex w-full justify-end mt-4 text-black'>
                    <BasicModal
                        open={open}
                        onClose={handleClose}
                        title="Inventory Item Details"
                        description="More information about this item."
                    />




                    <div className='flex items-center mr-20 gap-7 bg-white'>
                    </div>
                </div>
                <div className='flex w-full justify-center'>
                    <div className="w-[1173px] h-[384px] flex  mt-6 justify-center pa bg-white items-center">
                        <p className='font-bold text-3xl'>Manage users, assign roles,<br /> and control access with secure role-based permissions</p>

                        <div><Image src={'/undraw_accept_terms_re_lj38 1.png'} height={510} width={324} alt='invite' /></div>


                    </div>
                </div>
                <div className='w-full flex justify-end'>
                    <button onClick={handleUserOpen} className='mr-8 mt-5 flex p-2 gap-2 rounded-lg bg-white'><Plus></Plus> <p>Add Users</p></button>
                </div>
                <div className='flex justify-center gap-56 w-full mt-6'>

                    <div className="p-6 w-full">
                        <h2 className="text-xl font-bold mb-4"></h2>
                        <table className="min-w-full bg-white rounded-lg shadow-md">
                            <thead className=' w-full'><tr className='bg-gray-100'><th>User List</th><th></th><th></th><th></th><th></th><th></th></tr></thead>
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="py-2 px-4"></th>
                                    <th className="py-2 px-4">Name</th>
                                    <th className="py-2 px-4">Email</th>
                                    <th className="py-2 px-4">Branch</th>
                                    <th className="py-2 px-4">Role</th>

                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item: any, index: number) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="py-2 px-4">{index + 1}</td>
                                        <td className="py-2 px-4">{item.fullName}</td>
                                        <td className="py-2 px-4">{item.email}</td>
        
                                        <td className="py-2 px-4">{item.location}</td>
                                        <td className="py-2 px-4">{item.role}</td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <CreateUserModal open={openUser} onClose={handleUserClose} />

            </div>



        </div>
    )
}
