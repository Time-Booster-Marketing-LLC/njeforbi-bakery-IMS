'use client'
import React from 'react'
import Header from '../../../compnents/ui/dash-header'
import Siderbar from '../../../compnents/ui/siderbar'
import BasicLineChart from '../../../compnents/ui/charts'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Line } from 'rc-progress';
import { getProducts } from '../../../utils/api/product';
import ProductModal from '../../../compnents/modals/product-creation-modal';

export default function StockProgressBars() {
   const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<any>({});
  const handleProductClose = () => {setOpen(false)}
  const [stockCounts, setStockCounts] = React.useState<number>()
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      const products = response.products; // <-- access the correct key
   const count = response.total
   setStockCounts(count)
      // Group products by category
      const groupedByCategory: Record<string, { total: number; inStock: number; outStock: number }> = {};
  
      products.forEach((product: any) => {
        const category = product.category || 'Uncategorized';
        const stockState = product.stockState || 'IN';
        const expiryDate = product.expiryDate ? new Date(product.expiryDate) : null; 

        if (!groupedByCategory[category]) {
          groupedByCategory[category] = { total: 0, inStock: 0, outStock: 0 };
        }
  
        groupedByCategory[category].total += 1;
        if (stockState === 'IN') {
          groupedByCategory[category].inStock += 1;
        } else {
          groupedByCategory[category].outStock += 1;
        }
      });
  
      setCategories(groupedByCategory);
    };
  
    fetchData();
  }, []);
  

  // Function to render progress bar based on category
const renderProgressBar = (category: string) => {
  const categoryData = categories[category];
  if (!categoryData) return null;

  const { inStock, notExpired } = categoryData;
  const percentInStock = categoryData.total > 0 ? (inStock / categoryData.total) * 100 : 0;
  const percentNotExpired = inStock > 0 ? (notExpired / inStock) * 100 : 0;

    // Return the progress bar with color depending on percentage
   

    return (
      <div key={category} className="mb-4">
        <h4>{category}</h4>

          <ProductModal
              open={open}
              onClose={handleProductClose}
              title="Inventory Item Details"
              description="More information about this item."
              />
        <Line
          percent={percentInStock}
          strokeWidth={2}
          trailColor="#EDF2F7"
          trailWidth={50}
          strokeColor="#30A12A"
          className="bg-[#EDF2F7]"
        />
      </div>
    );
  };

  const cardData = [
    { title: 'Total Stock', content: stockCounts },
    { title: 'Card 2', content: 'This is the second card' },
    { title: 'Card 3', content: 'This is the third card' },
    { title: 'Card 4', content: 'This is the fourth card' },
  ];

  const percentage = 66; // This can be dynamic as well

  return (
    <div className="w-full text-black bg-[#D3D3D3] flex">
      <Siderbar />
      <div className="justify-center w-full mt-6">
        <Header />
        <div className="flex w-full justify-between">
          <p className="font-bold px-20 ml-14 mt-10 text-3xl">Overview</p>

          <div className="flex items-center mr-20 gap-7">
            <button className="bg-white rounded-lg p-3">Export Data</button>
            <button className="bg-white rounded-lg p-3">Add Product</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {cardData.map((card, index) => (
            <div key={index} className="bg-white shadow-md rounded-2xl p-4">
              <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.content}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-56 w-full mt-6">
          <div className="w-[800px] rounded-lg bg-white">
            <BasicLineChart />
          </div>

          <div className="w-[350px] rounded-lg bg-white flex justify-center items-center">
            <div style={{ width: 200, height: 200 }}>
              <CircularProgressbar value={percen} text={`${percentage}%`} />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mt-5">
          <div className="w-[782px] rounded-lg bg-white flex flex-col gap-3 p-6">
            {/* Render progress bars for the provided categories */}
            {['Bakery Products', 'Beverages', 'Ice Cream & Desserts', 'Burgers & Snacks', 'Packaging & Supplies', 'Raw Materials & Ingredients'].map(category => renderProgressBar(category))}
          </div>
        </div>
      </div>
    </div>
  );
}
