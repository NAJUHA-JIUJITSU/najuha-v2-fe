import axios, { AxiosInstance } from 'axios';

export const axiosPublic: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
  },
});
