'use client'
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs'
import { getProducts } from '../../utils/api/product';

export default function BasicLineChart() {
  const [months, setMonths] = React.useState<string[]>([])
  const [stockInCounts, setStockInCounts] = React.useState<number[]>([])
  const [stockOutCounts, setStockOutCounts] = React.useState<number[]>([])
  

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      const products = response.products;
   
  
      const grouped: Record<string, { IN: number; OUT: number }> = {};
  
      products.forEach((product: any) => {
        const monthKey = dayjs(product.createdAt).format('MMM YYYY'); // e.g., 'Apr 2025'
        const stockState = (product.stockState || 'IN') as 'IN' | 'OUT';
  
        if (!grouped[monthKey]) {
          grouped[monthKey] = { IN: 0, OUT: 0 };
        }
  
        grouped[monthKey][stockState] += 1;
      });
  
      const sortedMonths = Object.keys(grouped).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      );
  
      setMonths(sortedMonths);
      setStockInCounts(sortedMonths.map((month) => grouped[month].IN));
      setStockOutCounts(sortedMonths.map((month) => grouped[month].OUT));
    };
  
    fetchData();
  }, []);
  

  return (
    <LineChart
    xAxis={[{ scaleType: 'band', data: months }]}
        series={[
          { data: stockInCounts, label: 'Stock IN', color: '#4CAF50' },
          { data: stockOutCounts, label: 'Stock OUT', color: '#F44336' },
        ]}
      
      width={800}
      height={300}
    />
  );
}