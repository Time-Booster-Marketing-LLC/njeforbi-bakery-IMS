'use client'
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {
  return (
    <LineChart
    xAxis={[
        {
          scaleType: 'band',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        },
      ]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          showMark: false
        },
        
      ]}
      
      width={800}
      height={300}
    />
  );
}