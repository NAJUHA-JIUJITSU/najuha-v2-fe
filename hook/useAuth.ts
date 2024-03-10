import { useQuery } from '@tanstack/react-query';
import { queries } from '@/queries/index';
import { authApi } from '@/api/authApi';

const useSnsLogin = (snsAuthProvider: string, snsAuthCode: string) => {
  return useQuery({
    queryKey: queries.auth.snsLogin(snsAuthProvider, snsAuthCode).queryKey,
    queryFn: () => authApi.postSnsLogin(snsAuthProvider, snsAuthCode),
  });
};

export { useSnsLogin };
