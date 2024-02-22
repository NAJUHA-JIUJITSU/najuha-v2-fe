import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface MyTokenPayload {
  userId: number;
  userRole: string;
  iat: number;
  exp: number;
}

// 토큰의 만료 시간을 검사 (만료되었으면 true 반환)
export const isTokenExpired = (token: string) => {
  const now = Date.now().valueOf() / 1000;
  const { exp } = jwtDecode<MyTokenPayload>(token);
  return now >= exp;
};

// refreshToken을 쿠키에 저장
export const saveRefreshToken = (refreshToken: string) => {
  const decoded = decodeToken(refreshToken);
  if (!decoded) {
    console.error('토큰 디코드 실패');
    return;
  }

  const expires = new Date(decoded.exp * 1000);
  Cookies.set('refreshToken', refreshToken, { expires, secure: true, sameSite: 'strict' });
};

// 토큰을 디코드한 객체를 반환
export const decodeToken = (token: string): MyTokenPayload | null => {
  try {
    const decoded: MyTokenPayload = jwtDecode(token);

    return decoded;
  } catch (error) {
    console.error('토큰 디코드 실패:', error);
    return null;
  }
};
