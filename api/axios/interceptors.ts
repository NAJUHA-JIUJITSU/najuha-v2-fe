import { axiosPrivate, axiosPublic } from '@/api/axios/axiosInstances.ts';
import { postRefreshToken } from '../authService';
import Cookies from 'js-cookie';

axiosPrivate.interceptors.request.use((config) => {
  //쿠키에서 토큰 가져오기
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    //todo: status가 아니라 code 조건으로 바꿔야함
    if (error.response?.status === 400 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await postRefreshToken();
        console.log('newAccessToken:', newAccessToken);
        if (newAccessToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export { axiosPublic, axiosPrivate };
