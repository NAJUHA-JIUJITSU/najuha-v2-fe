import { useEffect, useState } from 'react';

export function useAuthCode() {
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
