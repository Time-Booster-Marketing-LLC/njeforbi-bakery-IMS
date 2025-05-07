'use client'
import React from 'react'
import Header from '../../../../compnents/ui/header'
import Siderbar from '../../../../compnents/ui/siderbar'
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image'
import BasicModal from '../../../../compnents/modals/delete-item-modal'
import ProductModal from '../../../../compnents/modals/product-creation-modal';
import BasicLineChart from '../../../../compnents/ui/sales-chart';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'

export default function salesTracking() {
  const [open, setOpen] = React.useState(false);
  const cardData = [
    { title: 'Total Stock', content: 'This is the first card' },
    { title: 'Pending Orders', content: 'This is the second card' },
    { title: 'Overall Perisdhables', content: 'This is the third card' },
    { title: 'Running Low', content: 'This is the fourth card' },
  ];

  const percentage = 66;
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false) }
  const handleProductOpen = () => { setOpen(true); }
  const handleProductClose = () => { setOpen(false) }
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
          <ProductModal
            open={open}
            onClose={handleProductClose}
            title="Inventory Item Details"
            description="More information about this item."
          />

          <div className='flex items-center mr-20 gap-7'>
            <div className='w-[242px] h-[65ox] bg-white p-5 flex gap-5 items-center rounded-lg mr-100'>
              <Image src={'/Group 38686.png'} width={38} height={38} alt='low' />
              <p>Running low</p>
            </div>
            <button className='bg-white rounded-lg p-3 ' >
              filter
            </button>
            <button onClick={handleProductOpen} className='bg-white  rounded-lg p-3'>
              Add Product
            </button>
          </div>
        </div>
        <div className="w-full flex gap-15 mt-6 justify-center">
          <div className='bg-white w-[800px] rounded-lg'>
            <BasicLineChart />
          </div>
         
          <div className='w-[429px] h-[388px] bg-white rounded-lg flex items-center justify-center flex flex-col'>
            <p className='mb-2 font-bold'>Performance of the month  </p>
            <div className='h-80 w-80'>
          <CircularProgressbarWithChildren value={66} 
           styles={buildStyles({
        
            // Text size
            textSize: '16px',
  

        
            // Colors
            pathColor: '#30A12A',
            textColor: '#f88',
            trailColor: '#d6d6d6',
            backgroundColor: '#30A12A',
          })}
          >
  {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
  <Image src={'/Component 47.png'} height={80} width={80} alt="doge" />
  <div style={{ fontSize: 12, marginTop: -5 }}>
   
  </div>
</CircularProgressbarWithChildren>
          </div>
        </div>
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {item.status}
                      </span>
                      <span className='flex gap-3'>
                        <button onClick={handleOpen}><Image src={'/Bin Icon.png'} width={20} height={20} alt='bin' /></button>
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
