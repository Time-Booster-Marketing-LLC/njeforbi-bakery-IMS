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

export const getAllOrders = async () => {
    try {
      const response = await api.get(
        `/purchase-orders`
      );
      return response.data;
    } catch (error) {
      console.error(Response.error);
      throw new Error("Could not fetch details");
    }
  };
  export const updateOrder = async (token: string, orderId: string, status: string) => {
    try {
        const res = await api.put(`/update-order-status/${orderId}`, 
        {
            orderId, // Now part of the request body
            status, 
        }, 
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.data) {
            throw new Error('Failed to update order status');
        }

        return res.data;
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
};


export const getTrend = async () => {
  try {
    const response = await api.get(
      `/sales/monthly-trend`
    );
    return response.data;
  } catch (error) {
    console.error(Response.error);
    throw new Error("Could not fetch details");
  }
};


  