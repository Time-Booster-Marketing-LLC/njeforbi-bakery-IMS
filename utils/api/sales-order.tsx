import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

export const createSale = async (data: {
    customerId: string;
    items: {
      sku: string;
      quantity: number;
    }[];
  } ) => {
  try {
    const response = await api.post('/create-sales-order', data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
