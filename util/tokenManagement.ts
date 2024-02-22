import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface MyTokenPayload {
  userId: number;
  userRole: string;
  iat: number;
  exp: number;
}

// 토큰의 만료 시간을 검사하는 함수입니다.
export const isTokenExpired = (token: string) => {
  const now = Date.now().valueOf() / 1000;
  const { exp } = jwtDecode<MyTokenPayload>(token);
  return now >= exp;
};

// refreshToken을 쿠키에 저장하는 함수입니다.
export const saveRefreshToken = (refreshToken: string) => {
  const decoded: MyTokenPayload = jwtDecode(refreshToken);
  if (decoded === null) {
    // 오류 처리 로직, 예를 들어 상태 업데이트 또는 예외 발생
    throw new Error('Token decoding failed.');
  }

  const expires = new Date(decoded.exp * 1000);
  Cookies.set('refreshToken', refreshToken, { expires, secure: true, sameSite: 'strict' });
};
