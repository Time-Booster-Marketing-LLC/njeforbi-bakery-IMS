import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});


export const getProducts = async () => {
    try {
      const response = await api.get(
        `/products`
      );
      return response.data;
    } catch (error) {
      console.error(Response.error);
      throw new Error("Could not fetch details");
    }
  };

  export const getLowProducts = async () => {
    try {
      const response = await api.get(
        `products/low-stock`
      );
      return response.data;
    } catch (error) {
      console.error(Response.error);
      throw new Error("Could not fetch details");
    }
  };