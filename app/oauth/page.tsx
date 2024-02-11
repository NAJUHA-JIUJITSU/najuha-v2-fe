'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

// useAuthCode 커스텀 훅
function useAuthCode() {
  const [code, setCode] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      const params = new URL(window.location.href).searchParams;
      setCode(params.get('code')); // 'code' 쿼리 파라미터 추출
      setState(params.get('state')); // 'state' 쿼리 파라미터 추출
    }
  }, []);

  return { code, state };
}

export default function Oauth() {
  const { code, state } = useAuthCode(); // useAuthCode 훅으로 code 가져오기
  const [accesstoken, setAccesstoken] = useState<string | null>(null);
  const [refreshtoken, setRefreshtoken] = useState<string | null>(null);
  const [accessTokenTimeLeft, setAccessTokenTimeLeft] = useState(0);
  const [refreshTokenTimeLeft, setRefreshTokenTimeLeft] = useState(0);
  const [nickname, setNickname] = useState('');
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);

  const router = useRouter();

  async function checkNicknameAvailability() {
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/users/nickname/${nickname}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const ret = await response.json();
      console.log(ret);
      if (ret.data) {
        alert('사용 가능한 닉네임입니다.');
        setNicknameAvailable(true);
      } else {
        alert('이미 사용 중인 닉네임입니다.');
        setNicknameAvailable(false);
      }
    } catch (error) {
      console.error('닉네임 중복 검사 중 오류가 발생했습니다:', error);
      setNicknameAvailable(null);
    }
  }

  function decodeToken(token: any): Number | undefined {
    const decoded = jwtDecode(token);
    return decoded.exp; // 만료 시간 (UNIX Timestamp)
  }

  function calculateTimeLeft(expireTime: any) {
    const now = Date.now() / 1000; // 현재 시간 (UNIX Timestamp)
    const timeLeftInSeconds = expireTime - now;
    return timeLeftInSeconds > 0 ? timeLeftInSeconds : 0;
  }

  function formatTimeLeft(seconds: any) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${hours}시간 ${minutes}분 ${secondsLeft}초`;
  }

  async function fetchAccessToken() {
    if (!code) return; // code가 없으면 함수 실행 중지

    try {
      let response = await fetch('http://localhost:3001/auth/snsLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ snsAuthCode: code, snsAuthProvider: state }),
      });
      let ret = await response.json();
      setAccesstoken(ret.data.accessToken);
      setRefreshtoken(ret.data.refreshToken);
    } catch (error) {
      console.log(error);
    }
  }

  // get all user with accesstoken
  async function fetchAllUser() {
    const response = await fetchWithTokenRetry('http://localhost:3001/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response?.json();
    console.log(data);
  }

  async function fetchWithTokenRetry(url: string, options: any, retries = 1, token = accesstoken) {
    try {
      // Include the access token in the Authorization header
      // Implement this function to get the access token from wherever you're storing it (e.g., cookie, local storage, etc.)
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });
      // Check if the access token is expired
      if (response.status === 401 && retries > 0) {
        // Try to refresh the access token
        const newAccessToken = await refreshAccessToken(); // Implement this function to use the refresh token to get a new access token from the auth server
        if (newAccessToken) {
          // Retry the API call with the new access token
          return fetchWithTokenRetry(url, options, retries - 1, newAccessToken);
        } else {
          throw new Error('Unable to refresh access token');
        }
      }

      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async function refreshAccessToken() {
    try {
      const oldrefreshToken = refreshtoken; // Implement this function to get the refresh token from wherever you're storing it (e.g., cookie, local storage, etc.)
      const response = await fetch('http://localhost:3001/auth/refresh', {
        // Assuming you have an API route in your Next.js app that handles token refresh
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshtoken: oldrefreshToken }),
      });

      // redirect to login page with next way
      if (response.status !== 200 && response.status !== 201) {
        alert('로그인이 필요합니다.');
        router.push('/');
      }

      const newtoken = await response.json();
      console.log('아래새로운토큰 받음');
      console.log(newtoken.accessToken);

      // Save the new access token
      setAccesstoken(newtoken.accessToken);
      setRefreshtoken(newtoken.refreshToken);

      return newtoken.accessToken;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchAccessToken();
  }, [code]); // code 변경 시 fetchAccessToken 실행

  useEffect(() => {
    const interval = setInterval(() => {
      if (accesstoken) {
        const timeLeft = calculateTimeLeft(decodeToken(accesstoken));
        setAccessTokenTimeLeft(timeLeft);
      }
      if (refreshtoken) {
        const timeLeft = calculateTimeLeft(decodeToken(refreshtoken));
        setRefreshTokenTimeLeft(timeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [accesstoken, refreshtoken]);

  return (
    <div style={{ lineHeight: 1 }}>
      <div style={{ lineHeight: 1 }}>accesstoken</div>
      <div style={{ lineHeight: 1 }}>{accesstoken}</div>
      <div style={{ lineHeight: 1 }}>
        AccessToken 만료까지: {formatTimeLeft(accessTokenTimeLeft)}
      </div>
      <div style={{ lineHeight: 1 }}>refreshtoken</div>
      <div style={{ lineHeight: 1 }}>{refreshtoken}</div>
      <div style={{ lineHeight: 1 }}>refreshtoken expire in</div>
      <div style={{ lineHeight: 1 }}>
        RefreshToken 만료까지: {formatTimeLeft(refreshTokenTimeLeft)}
      </div>
      <button onClick={fetchAllUser}>get allUser</button>
      <div style={{ lineHeight: 1 }}>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={{ lineHeight: 1 }}
        />
        <button
          style={{ lineHeight: 1, border: '1px solid red', padding: '5px' }}
          onClick={checkNicknameAvailability}
        >
          닉네임 중복 검사
        </button>
        {nicknameAvailable !== null && (
          <div style={{ lineHeight: 1 }}>
            {nicknameAvailable ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.'}
          </div>
        )}
      </div>
    </div>
  );
}
