'use client';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

interface SnsRedirectPageProps {
  params: { snsProvider: string };
  searchParams: { code: string };
}

interface MyTokenPayload {
  userId: number;
  userRole: string;
  iat: number;
  exp: number;
}

export default function SnsRedirectPage({ params, searchParams }: SnsRedirectPageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // 토큰 디코드를 위한 함수
  function decodeToken(token: string): MyTokenPayload | null {
    try {
      const decoded = jwtDecode<MyTokenPayload>(token);
      console.log(decoded); // 디코드된 페이로드 출력
      return decoded; // 디코드된 객체 반환
    } catch (error) {
      console.error('토큰 디코드 실패:', error);
      return null;
    }
  }

  async function handleSnsLogin(snsAuthProvider: string, snsAuthCode: string) {
    try {
      const response = await fetch('http://localhost:3001/auth/snsLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          snsAuthProvider,
          snsAuthCode,
        }),
      });

      if (!response.ok) {
        throw new Error('SNS 로그인 실패');
      }

      const data = await response.json(); // 서버로부터 응답 받기

      const payload = decodeToken(data.data.accessToken); // 토큰 디코드
      const userId = payload?.userId; // 디코드된 페이로드에서 유저 정보 가져오기

      // 로그인 성공 후, 회원가입 페이지로 userId와 함께 리디렉션
      console.log('로그인 성공 후 리디렉션, userId:  ' + userId);
      router.push('/funnel?userId=' + userId);
    } catch (error) {
      // 로그인 실패 시 로그인 페이지로 이동
      console.error('SNS 로그인 에러:', error);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const snsAuthProvider = params.snsProvider;
    const snsAuthCode = searchParams.code;
    console.log('snsAuthProvider: ', params.snsProvider);
    console.log('snsAuthCode: ', searchParams.code);

    if (!snsAuthProvider || !snsAuthCode) {
      console.error('SNS 로그인 정보가 없습니다.');
      return;
    }

    if (snsAuthProvider && snsAuthCode) {
      handleSnsLogin(snsAuthProvider, snsAuthCode);
    }
  }, [params, searchParams]);

  if (isLoading) {
    return <div className={styles.wrapper}>Loading...</div>; // 로딩 중 UI
  }

  // 로딩 완료 후 UI (필요 시 추가 구현)
  return <div className={styles.wrapper}>Redirecting...</div>;
}
