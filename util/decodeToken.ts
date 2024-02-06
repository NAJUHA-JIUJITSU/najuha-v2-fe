import { jwtDecode } from 'jwt-decode';

interface MyTokenPayload {
  userId: number;
  userRole: string;
  iat: number;
  exp: number;
}

export const decodeToken = (token: string): MyTokenPayload | null => {
  try {
    const decoded: MyTokenPayload = jwtDecode(token);

    return decoded;
  } catch (error) {
    console.error('토큰 디코드 실패:', error);
    return null;
  }
};
