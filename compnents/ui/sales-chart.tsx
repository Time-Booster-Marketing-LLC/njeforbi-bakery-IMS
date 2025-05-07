'use client'
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { getTrend } from '../../utils/api/sales-order';

export default function BasicLineChart() {
  const [salesData, setSalesData] = React.useState<{ date: string; totalAmount: number }[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTrend();
        
        setSalesData(res);
      } catch (error) {
        console.error('Failed to fetch sales trend:', error);
      }
    };

    fetchData();
  }, []);

  const xLabels = salesData.map(entry => entry.date);
  const seriesData = salesData.map(entry => entry.totalAmount);

  return (
    <LineChart
      xAxis={[{ scaleType: 'band', data: xLabels }]}
      series={[{ data: seriesData, showMark: false }]}
      width={800}
      height={300}
    />
  );
}