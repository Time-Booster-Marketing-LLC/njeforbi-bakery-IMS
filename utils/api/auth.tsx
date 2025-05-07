import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

export const login = async (data: { email: string; password: string }) => {
    const response = await api.post('/login', data);
    return response.data;
};
