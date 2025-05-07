import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useState } from "react";
import DatePicker from "react-datepicker";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleTabChange = (newValue: number) => {
    setValue(newValue);
  }
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Stock details" {...a11yProps(0)} />
          <Tab label="Supplier & pricing" {...a11yProps(1)} />
          <Tab label="Product Information" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="my-3">


          <form action="" method="POST">


            <div className="my-2">
              <label htmlFor="productName" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Product Name</label>
              <input type="text" name="productName" className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="productName" />
            </div>


            <div className="my-2">
              <label htmlFor="category" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Category</label>
              <input type="text" name="category" className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="category" />
            </div>


            <div className="my-2">
              <label htmlFor="description" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Description</label>
              <input type="text" name="description" className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="category" />
            </div>
            <button onClick={() => setValue(1)} className="px-4 py-1 bg-emerald-500 rounded-md text-white text-sm sm:text-lg shadow-md">Save</button>
          </form>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="my-3">

          <form action="" method="POST" className='flex justify-between gap-4'>

            <div className='w-full'>


              <div className="my-2">
                <label htmlFor="InitialStockQuantity" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Initial stock quantity</label>
                <input type="text" name="InitialStockQuantity" className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="InitialStockQuantity" />
              </div>


              <div className="my-2">
                <label htmlFor="reorderLevel" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Reorder Level</label>
                <input type="text" name="reorderLevel" className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="reorderLevel" />
              </div>


              <div className="my-2">
                <label htmlFor="stockLocation " className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Stock Location </label>
                <input type="text" name="stockLocation " className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="stockLocation " />
              </div>
              <div className="my-2">
                <label htmlFor="stockUnitType" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Stock Unit Type</label>
                <input type="text" name="stockUnitType" className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="stockUnitType" />
              </div>

            </div>
            <div className='w-full'>
              <div className="my-2">
                <label htmlFor="supplierName" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Supplier name</label>
                <input type="text" name="supplierName " className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="supplierName " />
              </div>


              <div className="my-2">
                <label htmlFor="supplierContact" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Supplier contact </label>
                <input type="text" name="supplierContact" className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="supplierContact " />
              </div>


              <div className="my-2">
                <label htmlFor="purchasePrice" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Purchase price </label>
                <input type="text" name="purchasePrice" className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="purchasePrice" />
              </div>
              <div className="my-2">
                <label htmlFor="sellingPrice" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Selling price  </label>
                <input type="text" name="sellingPrice" className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="sellingPrice" />
              </div>

              <div className='w-full flex justify-end'><button onClick={() => setValue(2)} className="px-4 py-1  bg-emerald-500 rounded-md text-white text-sm sm:text-lg shadow-md">next</button></div>
            </div>
          </form>

        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="my-3">

          <form action="" method="POST" className='flex justify-between gap-4'>

            <div className='w-full'>


              <div className="my-2">
                <DatePicker

                />
              </div>


              <div className="my-2">
                <label htmlFor="reorderLevel" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Reorder Level</label>
                <input type="text" name="reorderLevel" className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="reorderLevel" />
              </div>


              <div className="my-2">
                <label htmlFor="stockLocation " className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Stock Location </label>
                <input type="text" name="stockLocation " className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="stockLocation " />
              </div>
              <div className="my-2">
                <label htmlFor="stockUnitType" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300">Stock Unit Type</label>
                <input type="fileUpload" name="stockUnitType" className="block w-full border-b-2 focus:outline-0 border-black outline-black px-2 py-2 text-sm sm:text-md  my-2 bg-white  text-black " id="stockUnitType" />
              </div>

            </div>
            <div className='w-full h-full'>
              <div className="">
                <label className="w-full flex justify-center flex-row gap-5 items-center px-4 py-6  text-blue cursor-pointer">

                  <Image src={'/Component 46.png'} width={150} height={150} alt='frame' />

                  <input type='file' className="hidden" />
                </label>
              </div>

              <div className='w-full flex flex-col items-center mt-14 h-full'><button onClick={() => setValue(2)} className="px-4 py-1  bg-emerald-500 rounded-md text-white text-sm sm:text-lg shadow-md">next</button></div>
            </div>
          </form>
        </div>
      </CustomTabPanel>
    </Box>
  );
}
