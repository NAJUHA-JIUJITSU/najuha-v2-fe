import { useQuery } from '@tanstack/react-query';
import { queries } from '@/queries/index';

export const useSnsLogin = (snsAuthProvider: string, snsAuthCode: string) => {
  return useQuery(queries.auth.snsLogin(snsAuthProvider, snsAuthCode));
};
