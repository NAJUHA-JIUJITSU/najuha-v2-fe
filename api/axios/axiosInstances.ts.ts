import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

// axiosPublic 인스턴스 생성
export const axiosPublic: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});

// axiosPrivate 인스턴스 생성
export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});
