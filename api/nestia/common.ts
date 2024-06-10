import Cookies from 'js-cookie';
import { IConnection } from '@nestia/fetcher';
import { postRefreshToken } from '@/api/authApi';

export const createConnection = (): IConnection => {
  const token = Cookies.get('accessToken');
  return {
    host: 'http://localhost:3001',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
};

export const handleRefreshToken = async () => {
  try {
    const newAccessToken = await postRefreshToken();
    if (newAccessToken) {
      Cookies.set('accessToken', newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    window.location.href = '/login';
  }
  return null;
};

export const withAuth = async <T>(apiCall: (connection: IConnection) => Promise<T>): Promise<T> => {
  const connection: IConnection = createConnection();
  try {
    return await apiCall(connection);
  } catch (error) {
    // eslint 경고를 제거할지 안할지 모르겠음.. 해당 타입에러가 이해가 안간다.
    // error분기 의도된에러 의도되지않은에러로 나누는게 좋을듯
    // 그거를 어떻게 나눌지
    // 만약 의도된 에러면 에러핸들함수에 보내주면되고, 보내주고 받을때 너가 만들어준 타입을 받아서 처리하면 될듯.
    if (error.response?.data?.code === 1000 || error.response?.data?.code === 1001) {
      const newAccessToken = await handleRefreshToken();
      if (newAccessToken) {
        connection.headers = connection.headers || {};
        connection.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return await apiCall(connection);
      }
    }
    throw error; // (1000, 1001코드를 제외한 모든 에러를 관리)
  }
};
