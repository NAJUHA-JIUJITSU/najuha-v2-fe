import { createQueryKeys } from '@lukemorales/query-key-factory';
import { postSnsLogin } from '@/api/authService';

export const auth = createQueryKeys('auth', {
  snsLogin: (snsAuthProvider: string, snsAuthCode: string) => ({
    queryKey: ['auth', 'snsLogin', snsAuthProvider, snsAuthCode],
    queryFn: () => postSnsLogin(snsAuthProvider, snsAuthCode),
  }),
});
