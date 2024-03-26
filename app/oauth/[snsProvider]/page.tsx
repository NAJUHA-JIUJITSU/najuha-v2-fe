'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import { useSnsLogin } from '@/hooks/auth';

interface SnsRedirectPageProps {
  params: { snsProvider: string };
  searchParams: { code: string };
}

export default function SnsRedirectPage({ params, searchParams }: SnsRedirectPageProps) {
  const { data: payload, error, isLoading } = useSnsLogin(params.snsProvider, searchParams.code);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.error('SNS 로그인 에러:', error);
      router.push('/login');
      return;
    }
    if (payload) {
      const { userRole } = payload;
      if (userRole === 'TEMPORARY_USER') {
        router.push(`/register`);
      } else {
        // 리프레시 토큰이 만료되어 왔으면 이전페이지로 리다이렉트해야함
        console.log('로그인된 회원입니다');
        router.push('/');
      }
    }
  }, [error, payload]);

  if (isLoading) {
    return <div className={styles.wrapper}>Loading...</div>;
  }

  return <div className={styles.wrapper}>Redirecting...</div>;
}
