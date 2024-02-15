'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useAccessToken } from '@/hook/useAccesstoken';
import Cookies from 'js-cookie';

interface DecodedToken {
  exp: number;
  iat: number;
  userId: number;
  userRole: 'TEMPORARY_USER' | 'USER' | 'ADMIN';
}

interface SnsRedirectPageProps {
  params: { snsProvider: string };
  searchParams: { code: string };
}

export default function Oauth({ params, searchParams }: SnsRedirectPageProps) {
  const { updateAccessToken } = useAccessToken();
  const router = useRouter();
  const snsAuthProvider = params.snsProvider;
  const snsAuthCode = searchParams.code;

  async function fetchAccessToken() {
    if (!snsAuthCode) return; // code가 없으면 함수 실행 중지

    try {
      let response = await fetch('http://localhost:3001/auth/snsLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ snsAuthCode: snsAuthCode, snsAuthProvider: snsAuthProvider }),
      });
      let ret = await response.json();
      updateAccessToken(ret.data.accessToken);
      Cookies.set('refreshToken', ret.data.refreshToken, { expires: 7, path: '/' });
      handleRedirect(ret.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  }

  function handleRedirect(accessToken: any) {
    try {
      const decoded: DecodedToken = jwtDecode(accessToken); // accessToken의 타입을 올바르게 처리
      const userRole = decoded.userRole;

      switch (userRole) {
        case 'TEMPORARY_USER':
          router.push('/register');
          break;
        case 'USER':
          router.push('/');
          break;
        default:
          throw new Error(`Unknown role: ${userRole}`);
      }
    } catch (error) {
      console.error('Decoding token or redirecting failed:', error);
    }
  }

  useEffect(() => {
    fetchAccessToken();
  }, []);

  return (
    <div style={{ lineHeight: 1 }}>
      <h1>로그인 중...</h1>
    </div>
  );
}

// async function checkNicknameAvailability() {
//   if (!nickname) {
//     alert('닉네임을 입력해주세요.');
//     return;
//   }

//   try {
//     const response = await fetch(`http://localhost:3001/users/nickname/${nickname}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const ret = await response.json();
//     console.log(ret);
//     if (ret.data) {
//       alert('사용 가능한 닉네임입니다.');
//       setNicknameAvailable(true);
//     } else {
//       alert('이미 사용 중인 닉네임입니다.');
//       setNicknameAvailable(false);
//     }
//   } catch (error) {
//     console.error('닉네임 중복 검사 중 오류가 발생했습니다:', error);
//     setNicknameAvailable(null);
//   }
// }

// get all user with accesstoken
// async function fetchAllUser() {
//   const response = await fetchWithTokenRetry('http://localhost:3001/users', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await response?.json();
//   console.log(data);
// }

// async function fetchWithTokenRetry(url: string, options: any, retries = 1, token = accesstoken) {
//   try {
//     // Include the access token in the Authorization header
//     // Implement this function to get the access token from wherever you're storing it (e.g., cookie, local storage, etc.)
//     const response = await fetch(url, {
//       ...options,
//       headers: {
//         ...options.headers,
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     // Check if the access token is expired
//     if (response.status === 401 && retries > 0) {
//       // Try to refresh the access token
//       const newAccessToken = await refreshAccessToken(); // Implement this function to use the refresh token to get a new access token from the auth server
//       if (newAccessToken) {
//         // Retry the API call with the new access token
//         return fetchWithTokenRetry(url, options, retries - 1, newAccessToken);
//       } else {
//         throw new Error('Unable to refresh access token');
//       }
//     }

//     return response;
//   } catch (err) {
//     console.error(err);
//   }
// }

// async function refreshAccessToken() {
//   try {
//     const oldrefreshToken = refreshtoken; // Implement this function to get the refresh token from wherever you're storing it (e.g., cookie, local storage, etc.)
//     const response = await fetch('http://localhost:3001/auth/refresh', {
//       // Assuming you have an API route in your Next.js app that handles token refresh
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ refreshtoken: oldrefreshToken }),
//     });

//     // redirect to login page with next way
//     if (response.status !== 200 && response.status !== 201) {
//       alert('로그인이 필요합니다.');
//       router.push('/');
//     }

//     const newtoken = await response.json();
//     console.log('아래새로운토큰 받음');
//     console.log(newtoken.accessToken);

//     // Save the new access token
//     setAccesstoken(newtoken.accessToken);
//     setRefreshtoken(newtoken.refreshToken);

//     return newtoken.accessToken;
//   } catch (err) {
//     console.error(err);
//   }
// }
