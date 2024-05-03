import { createQueryKeys } from '@lukemorales/query-key-factory';

export const auth = createQueryKeys('auth', {
  snsLogin: (snsAuthProvider: string, snsAuthCode: string) => ({
    queryKey: [snsAuthProvider, snsAuthCode],
  }),
});
