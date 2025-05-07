'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../../../compnents/ui/header'
import Siderbar from '../../../../compnents/ui/siderbar'
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image'
import BasicModal from '../../../../compnents/modals/delete-item-modal'
import ProductModal from '../../../../compnents/modals/product-creation-modal';
import BasicLineChart from '../../../../compnents/ui/sales-chart';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { getLowProducts, getProducts } from '../../../../utils/api/product';
import { getAllOrders } from '../../../../utils/api/sales-order'
import { updateOrder } from '../../../../utils/api/sales-order';
export default function salesTracking() {
   interface Product {
      name: string;
      category: string;
      quantity: number;
      price: number;
      status: string;
    }

    interface orders{
      id: string;
      name: string;
      category: string;
      quantity: number;
      price: number;
      status: string;
    }
    
    const [products, setProducts] = React.useState<Product[]>([])
    const [orders, setOrders] = useState<orders[]>([])
  const [open, setOpen] = React.useState(false);
    const [stockCounts, setStockCounts] = React.useState<number>()
      const [low, setLow]= useState<string>()
      const [OrderId, setOrderId] = useState<string | null | undefined>(undefined);
      const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [statusMap, setStatusMap] = useState<{ [key: string]: string }>({});
const [performanceRate, setPerformanceRate] = useState<string>("")
  const cardData = [
    { title: 'Total Stock', content: 'This is the first card' },
    { title: 'Pending Orders', content: 'This is the second card' },
    { title: 'Overall Perisdhables', content: 'This is the third card' },
    { title: 'Running Low', content: 'This is the fourth card' },
  ];
   React.useEffect(() => {
      const fetchData = async () => {
        const response = await getProducts()
        const products = response.products
        const count = response.total
        setStockCounts(count)
        setProducts(products)
       const leadRole = localStorage.getItem("role");
      
      }
  
      fetchData()
    }, [])
     useEffect(()=>{
        const fetchData = async ()=>{
           const response = await getLowProducts();
                const products = response.products[0];
                setLow(products.name) 
                const token = localStorage.getItem("token") 
                
              
        }
    
        fetchData()
      }, [])

      useEffect(() => {
        const fetchData = async () => {
          const response = await getAllOrders();
          
          if (!response || !response.orders || !Array.isArray(response.orders)) {
            console.error("Unexpected API Response Format:", response);
            return;
          }
      
          const ordersList = response.orders;
      
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
          // Filter orders for the current month
          const monthlyOrders = ordersList.filter((order: any) => {
            if (!order.createdAt || typeof order.createdAt._seconds !== "number") return false;
            
            const orderDate = new Date(order.createdAt._seconds * 1000); // Convert Firestore timestamp to Date
            return orderDate >= startOfMonth;
          });
      
          // Count total and delivered orders
          const totalOrders = monthlyOrders.length;
          const totalDeliveredOrders = monthlyOrders.filter((o: any) => o.status === "Delivered").length;
      
          // Calculate performance rate
          const performanceRate = totalOrders > 0 
            ? ((totalDeliveredOrders / totalOrders) * 100).toFixed(2) + "%" 
            : "No data";
      
          setOrders(monthlyOrders);
          setPerformanceRate(performanceRate)
          setMessage(`Monthly Performance: ${performanceRate}`);
          console.log("Total Orders:", totalOrders);
console.log("Delivered Orders:", totalDeliveredOrders);
console.log("Calculated Performance Rate:", performanceRate);

        };
      
        fetchData();
      }, []);
      
      
      
      const handleUpdateStatus = async (orderId: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
      
        const selectedStatus = statusMap[orderId];
        if (!selectedStatus) {
          console.warn('No status selected for order:', orderId);
          return;
        }
      
        setLoading(true);
        try {
          const res = await updateOrder(token, orderId, selectedStatus); // Assuming updateOrder(token, orderId, newStatus)
          
          // Update status locally in orders list if needed
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === orderId ? { ...order, status: selectedStatus } : order
            )
          );
      
          // Optional: Provide per-order success message
          setMessage(`Order ${orderId} status updated to ${selectedStatus}`);
        } catch (err) {
          console.error('Error updating order status:', err);
          setMessage('Failed to update order.');
        } finally {
          setLoading(false);
        }
      };
      
      
      
  const percentage = parseFloat(performanceRate);;
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
             <div className='flex flex-col'> <p className='font-bold'>Running low</p>
              <p>{low}</p>
              </div>
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
         
          <div className='w-[429px] h-[388px] bg-white rounded-lg  items-center justify-center flex flex-col'>
            <p className='mb-2 font-bold'>Performance of the month  </p>
            <div className='h-80 w-80'>
          <CircularProgressbarWithChildren value={percentage} 
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
  <p className='text-3xl font-bold'>{performanceRate}</p>
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
                  <th className="py-2 px-4">Price ($)</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item:any, index:number) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{item.items[0].name}</td>
                    <td className="py-2 px-4">{item.items[0].category}</td>
                    <td className="py-2 px-4">${item.totalAmount}</td>
                    <td className="py-2 px-4 gap-10 flex">
                      <span className={`px-2 py-1 flex items-center rounded-full text-xs font-medium ${item.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {item.status}
                      </span>
                      <span className='flex gap-3'>
                      <div className="p-4 border rounded">
                      <select
  className="p-2 border"
  value={statusMap[item.id] || item.status}  // Use specific status per item
  onChange={(e) =>
    setStatusMap((prev) => ({ ...prev, [item.id]: e.target.value }))
  }
>

        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
      </select>
      <button
        className="ml-2 p-2 bg-blue-600 text-white rounded"
        onClick={()=>handleUpdateStatus(item.id)}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Status"}
      </button>
     
    </div>
                    
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
