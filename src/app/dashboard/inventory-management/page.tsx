'use client'
import React from 'react'
import Header from '../../../../compnents/ui/header'
import Siderbar from '../../../../compnents/ui/siderbar'
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image'
import BasicModal from '../../../../compnents/modals/delete-item-modal'
import ProductModal from '../../../../compnents/modals/product-creation-modal';

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const cardData = [
    { title: 'Total Stock', content: 'This is the first card' },
    { title: 'Pending Orders', content: 'This is the second card' },
    { title: 'Overall Perisdhables', content: 'This is the third card' },
    { title: 'Running Low', content: 'This is the fourth card' },
  ];

  const percentage = 66;
  const handleOpen = () =>{ setOpen(true);}
  const handleClose = () => {setOpen(false)}
  const handleProductOpen = () =>{ setOpen(true);}
  const handleProductClose = () => {setOpen(false)}
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
        <Header pageName={'Inventory Management '} />
        <div className='flex w-full justify-end mt-4 text-black'>
        <BasicModal
        open={open}
        onClose={handleClose}
        title="Inventory Item Details"
        description="More information about this item."
      />
      <ProductModal
      open={open}
      onClose={handleProductClose}
      title="Inventory Item Details"
      description="More information about this item."
      />

        <div className='flex items-center mr-20 gap-7'>
          <button className='bg-white rounded-lg p-3 ' >
            filter
          </button>
          <button onClick={handleProductOpen} className='bg-white  rounded-lg p-3'>
            Add Product
          </button>
        </div>
        </div>
        <div className="w-full justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {cardData.map((card, index) => (
        <div key={index} className=" bg-white shadow-md rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
          <p className="text-gray-600">{card.content}</p>
        </div>
      ))}
    </div>

        <div className='flex justify-center gap-56 w-full mt-6'>

        <div className="p-6 w-full">
      <h2 className="text-xl font-bold mb-4"></h2>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className=' w-full'><tr className='bg-gray-100'><th>Inventory List</th><th></th><th></th><th></th><th></th><th></th></tr></thead>
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Product</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Stock</th>
            <th className="py-2 px-4">Price ($)</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={item.id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.category}</td>
              <td className="py-2 px-4">{item.stock}</td>
              <td className="py-2 px-4">${item.price}</td>
              <td className="py-2 px-4 gap-10 flex">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
                <span className='flex gap-3'>
                  <button  onClick={handleOpen}><Image src={'/Bin Icon.png'} width={20} height={20} alt='bin' /></button>
                  <button><Image src={'/Pencil Icon.png'} width={20} height={20} alt='bin' /></button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
        
      </div>



    </div>
  )
}
