import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});



export const getUsers = async () => {
  try {
    const response = await api.get(
      `/users`
    );
    return response.data;
  } catch (error) {
    console.error(Response.error);
    throw new Error("Could not fetch details");
  }
};


  