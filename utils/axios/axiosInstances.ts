import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:3001/';

export const withToken = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const withoutToken = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshTokenLogic = async () => {
  try {
    const refreshToken = Cookies.get('refreshToken');
    const response = await withoutToken.post('user/auth/token', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error('Error refreshing tokens:', error);
    return null;
  }
};

// 인터셉터 추가
withToken.interceptors.request.use((config) => {
  const accessToken = Cookies.get('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

withToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const accessToken = await refreshTokenLogic();
      if (accessToken) {
        error.config.headers['Authorization'] = `Bearer ${accessToken}`;
        return withToken(error.config);
      }
    }
    return Promise.reject(error);
  },
);
