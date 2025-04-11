import axios from 'axios';
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
      'Content-Type': 'application/json'
    },
});

export const createUserApi = async (data: { name: string; email: string; password: string; businessId: string }) => {
    try {
      const response = await api.post(`/create-user`, data);
  
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error("Failed to create user");
      }
      return response.data;
    } catch (error: any) {
      console.error("Error creating user:", error.message);
      throw new Error(error.response?.data?.message || "Unexpected error occurred while creating user");
    }
  };