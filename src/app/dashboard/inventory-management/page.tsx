'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../../../compnents/ui/header'
import Siderbar from '../../../../compnents/ui/siderbar'
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image'
import BasicModal from '../../../../compnents/modals/delete-item-modal'
import ProductModal from '../../../../compnents/modals/product-creation-modal';
import { getLowProducts, getProducts } from '../../../../utils/api/product';


export default function Dashboard() {

  interface Product {
    name: string;
    category: string;
    quantity: number;
    price: number;
    status: string;
  }
  
  const [products, setProducts] = React.useState<Product[]>([])
  
  const [open, setOpen] = React.useState(false);
  const [low, setLow]= useState<string>()
  const [stockCounts, setStockCounts] = React.useState<number>()
  const perishableCategories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Seafood', 'Beverages']
  const [perishableCount, setPerishableCount] = useState()
  useEffect(()=>{
    const fetchData = async ()=>{
       const response = await getLowProducts();
            const products = response.products[0];
            setLow(products.name) 
            
          
    }

    fetchData()
  }, [])

   React.useEffect(() => {
      const fetchData = async () => {
        const response = await getProducts()
        const products = response.products
        const count = response.total
        setStockCounts(count)
        setProducts(products)
        const perishables = products.filter((p: any) =>
          perishableCategories.includes(p.category)
        );
        setPerishableCount(perishables.length);
       
      }
  
      fetchData()
    }, [])
  

  const cardData = [
    { title: 'Total Stock', content: stockCounts },
    { title: 'Pending Orders', content: 'This is the second card' },
    { title: 'Overall Perisdhables', content: perishableCount},
    { title: 'Running Low', content: low },
  ];

  const percentage = 66;
  const handleOpen = () =>{ setOpen(true);}
  const handleClose = () => {setOpen(false)}
  const handleProductOpen = () =>{ setOpen(true);}
  const handleProductClose = () => {setOpen(false)}
  
  const inventory = products.map((product:any, index: number) => ({
    id: index + 1,
    name: product.name,
    category: product.category,
    stock: product.quantity,
    price: product.price,
    status: product.status,
  }));
  
  

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
  {products.map((item: any, index:number) => (
    <tr key={index} className="border-b">
      <td className="py-2 px-4">{index + 1}</td>
      <td className="py-2 px-4">{item.name}</td>
      <td className="py-2 px-4">{item.category}</td>
      <td className="py-2 px-4">{item.quantity}</td>
      <td className="py-2 px-4">${item.price}</td>
      <td className="py-2 px-4 gap-10 flex">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {item.status}
        </span>
        <span className='flex gap-3'>
          <button onClick={handleOpen}><Image src={'/Bin Icon.png'} width={20} height={20} alt='bin' /></button>
          <button><Image src={'/Pencil Icon.png'} width={20} height={20} alt='edit' /></button>
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
