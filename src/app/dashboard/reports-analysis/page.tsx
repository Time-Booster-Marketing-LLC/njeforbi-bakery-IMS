'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../../../compnents/ui/header'
import Siderbar from '../../../../compnents/ui/siderbar'
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image'
import BasicModal from '../../../../compnents/modals/delete-item-modal'
import ProductModal from '../../../../compnents/modals/product-creation-modal';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { Line } from 'rc-progress';
import { getProducts } from '../../../../utils/api/product';

export default function reportAndAnalysis() {
  const [open, setOpen] = React.useState(false);
    const [categories, setCategories] = React.useState<any>({});
    const [stockCounts, setStockCounts] = React.useState<number>(0);
    const [notExpiredPercentage, setNotExpiredPercentage] = React.useState<number>(0);
    const [monthlyTotal, setMonthlyTotal] = useState(0);
    const [target, setTarget] = useState(10000); // Set your monthly sales goal
  
  const cardData = [
    { title: 'Total Stock', content: 'This is the first card' },
    { title: 'Pending Orders', content: 'This is the second card' },
    { title: 'Overall Perisdhables', content: 'This is the third card' },
    { title: 'Running Low', content: 'This is the fourth card' },
  ];

  useEffect(() => {
  const fetchMonthlyPerformance = async () => {
    const res = await fetch("/transactions/monthly-performance");
    const data = await res.json();
    setMonthlyTotal(data.total);
    setTarget(data.target); // optional if you want it dynamic
  };

  fetchMonthlyPerformance();
}, []);


  React.useEffect(() => {
      const fetchData = async () => {
        const response = await getProducts();
        const products = response.products;
        const count = response.total;
        setStockCounts(count);
    
        let notExpiredCount = 0;
        const today = new Date();
    
        const groupedByCategory: Record<string, { total: number; inStock: number; outStock: number; notExpired: number }> = {};
    
        products.forEach((product: any) => {
          const category = product.category || 'Uncategorized';
          const stockState = product.stockState || 'IN';
          const expiryDate = product.expiryDate ? new Date(product.expiryDate) : null;
    
          if (!groupedByCategory[category]) {
            groupedByCategory[category] = { total: 0, inStock: 0, outStock: 0, notExpired: 0 };
          }
    
          groupedByCategory[category].total += 1;
          if (stockState === 'IN') {
            groupedByCategory[category].inStock += 1;
    
            if (expiryDate && expiryDate > today) {
              groupedByCategory[category].notExpired += 1;
              notExpiredCount += 1;
            }
          }
        });
    
        setCategories(groupedByCategory);
        setNotExpiredPercentage((notExpiredCount / count) * 100);
      };
    
      fetchData();
    }, []);

  const renderProgressBar = (category: string) => {
      const categoryData = categories[category];
      if (!categoryData) return null;
  
      const { inStock, notExpired } = categoryData;
      const percentInStock = categoryData.total > 0 ? (inStock / categoryData.total) * 100 : 0;
      const percentNotExpired = inStock > 0 ? (notExpired / inStock) * 100 : 0;
  
      return (
        <div key={category} className="mb-4">
          <h4 className="font-bold">{category}</h4>
  
          <ProductModal
            open={open}
            onClose={handleProductClose}
            title="Inventory Item Details"
            description="More information about this item."
          />
  
          {/* In Stock Progress Bar */}
          <Line
            percent={percentInStock}
            strokeWidth={2}
            trailColor="#EDF2F7"
            strokeColor="#30A12A"
            className="mb-2"
          />
          
  

          <p className="text-sm">Not Expired: {percentNotExpired.toFixed(1)}%</p>
        </div>
      );
    };

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
        <Header pageName={'Report & Analysis '} />
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

          <div className='flex justify-center w-full mr-20 gap-7'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {cardData.map((card, index) => (
        <div key={index} className="bg-white shadow-md rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
          <p className="text-gray-600">{card.content}</p>
        </div>
      ))}
    </div>
    </div>

        </div>
        <div className="w-full flex gap-15 mt-6 justify-center">
        <div className='w-[782px] rounded-lg   bg-white flex flex-col'>
        <div className="w-full flex justify-center mt-5">
          <div className="w-[782px] rounded-lg bg-white flex flex-col p-6">
            {[
              'Bakery Products',
              'Beverages',
              'Ice Cream & Desserts',
              'Burgers & Snacks',
              'Packaging & Supplies',
              'Raw Materials & Ingredients',
            ].map(category => renderProgressBar(category))}
          </div>
        </div>
             
           </div>
         
          <div className='w-[429px] h-[388px] bg-white rounded-lg flex items-center justify-center flex-col'>
            <p className='mb-2 font-bold'>Performance of the month  </p>
            <div className='h-80 w-80'>
          <CircularProgressbarWithChildren value={36} 
           styles={buildStyles({
        
            // Text size
            textSize: '16px',
  

        
            // Colors
            pathColor: '#FF0000',
            textColor: '#f88',
            trailColor: '#d6d6d6',
            backgroundColor: '#30A12A',
          })}
          >
  {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
  <Image src={'/Vector.png'} height={80} width={80} alt="doge" />
  <div style={{ fontSize: 12, marginTop: -5 }}>
   
  </div>
</CircularProgressbarWithChildren>
          </div>
        </div>
        </div>

        <div className='flex justify-center gap-56 w-full mt2'>

          <div className="p-6 w-full">
            <h2 className="text-xl font-bold mb-4"></h2>
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className=' w-full'><tr className='bg-gray-100'><th>Inventory List</th><th></th><th></th><th></th><th></th><th></th></tr></thead>
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Stock Before</th>
                  <th className="py-2 px-4">Stock After</th>
                  <th className="py-2 px-4">Adjustment Type</th>
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
                        <button onClick={handleOpen}><Image src={'/lets-icons_view.png'} width={20} height={20} alt='bin' /></button>
                       
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
