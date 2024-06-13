import Cookies from 'js-cookie';
import { IConnection } from '@nestia/fetcher';
import { postRefreshToken } from '@/api/nestia/authApi';
import { AllErrorTypes } from 'najuha-v2-api/lib/common/response/errorResponse';

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
    let parsedError: any;

    if (error instanceof Error && error.message) {
      try {
        parsedError = JSON.parse(error.message); // 에러 메시지를 파싱하여 객체로 변환
      } catch (e) {
        throw error; // JSON 파싱에 실패하면 원래 에러를 그대로 던짐
      }
    } else {
      throw error; // 에러 객체가 Error 인스턴스가 아니거나 메시지가 없으면 원래 에러를 그대로 던짐
    }

    console.log('parsedError: ', parsedError);
    if (isAllErrorTypes(parsedError)) {
      if (parsedError.code === 1000 || parsedError.code === 1001) {
        const newAccessToken = await handleRefreshToken();
        if (newAccessToken) {
          connection.headers = connection.headers || {};
          connection.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return await apiCall(connection);
        }
      }
    }
    throw parsedError; // (1000, 1001 코드를 제외한 모든 에러를 관리)
  }
};

function isAllErrorTypes(error: any): error is AllErrorTypes {
  return (
    typeof error === 'object' &&
    error !== null &&
    typeof error.isSuccess === 'boolean' &&
    typeof error.status === 'number' &&
    typeof error.code === 'number' &&
    typeof error.type === 'string' &&
    typeof error.result === 'string'
  );
}
