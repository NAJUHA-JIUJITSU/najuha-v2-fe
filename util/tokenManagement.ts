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

// accessToken을 쿠키에 저장
export const saveAccessToken = (accessToken: string) => {
  const decoded = decodeToken(accessToken);
  if (!decoded) {
    console.error('엑세스 토큰 디코드 실패');
    return;
  }

  const expires = new Date(decoded.exp * 1000);
  console.log('accessToken?:', accessToken);

  Cookies.set('accessToken', accessToken, {
    expires,
    secure: true,
    sameSite: 'strict',
  });
};

// refreshToken을 쿠키에 저장
export const saveRefreshToken = (refreshToken: string) => {
  const decoded = decodeToken(refreshToken);
  if (!decoded) {
    console.error('리프레시 토큰 디코드 실패');
    return;
  }

  const expires = new Date(decoded.exp * 1000);
  Cookies.set('refreshToken', refreshToken, {
    expires,
    secure: true,
    sameSite: 'strict',
  });
};

// accessToken과 refreshToken을 쿠키에 저장
export const saveTokens = (accessToken: string, refreshToken: string) => {
  saveAccessToken(accessToken);
  saveRefreshToken(refreshToken);

  //cookie에 저장된 토큰 출력
  console.log('accessToken!!:', Cookies.get('accessToken'));
  console.log('refreshToken!!:', Cookies.get('refreshToken'));
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
