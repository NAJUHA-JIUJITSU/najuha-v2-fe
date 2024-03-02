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
    const refreshToken = Cookies.get('najuha-refreshToken');
    const response = await withoutToken.post('user/auth/token', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    Cookies.set('najuha-accessToken', accessToken, { expires: 1, path: '/' });
    Cookies.set('najuha-refreshToken', newRefreshToken, { expires: 7, path: '/' });

    return accessToken;
  } catch (error) {
    console.error('Error refreshing tokens:', error);
    window.location.href = 'http://localhost:3000/login';
    return null;
  }
};

// 인터셉터 추가
withToken.interceptors.request.use((config) => {
  const accessToken = Cookies.get('najuha-accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

withToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 || error.response.data.code === 1000) {
      console.log('Token expired. Refreshing token...');
      const accessToken = await refreshTokenLogic();
      if (accessToken) {
        error.config.headers['Authorization'] = `Bearer ${accessToken}`;
        return withToken(error.config);
      }
    }
    return Promise.reject(error);
  },
);
