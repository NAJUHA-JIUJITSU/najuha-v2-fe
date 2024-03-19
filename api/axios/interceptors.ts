import { axiosPrivate, axiosPublic } from '@/api/axios/axiosInstances.ts';
import { postRefreshToken } from '../authApi';
import Cookies from 'js-cookie';

axiosPrivate.interceptors.request.use((config) => {
  //쿠키에서 토큰 가져오기
  const token = Cookies.get('accessToken'); //todo: accessToken 이름 변경
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
    if (
      (error.response.data.code === 1000 || error.response.data.code === 1001) &&
      !originalRequest._retry
    ) {
      // _retry로 무한 호출 방지
      originalRequest._retry = true;
      try {
        const newAccessToken = await postRefreshToken();
        console.log('newAccessToken:', newAccessToken);
        if (newAccessToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError); //todo: refreshError발생을 api 로직에서 처리
        // throw refreshError;
        window.location.href = '/login';
      }
    }
    throw error; //(1000, 1001코드를 제외한 모든 에러를 관리)
  },
);

export { axiosPublic, axiosPrivate };
