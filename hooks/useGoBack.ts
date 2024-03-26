import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

function useGoBack() {
  const router = useRouter();
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return goBack;
}

export default useGoBack;
