import { useQuery } from '@tanstack/react-query';
import { queries } from '@/queries/index';
import { authApi } from '@/api/nestia/authApi';
import { IUser } from 'najuha-v2-api/lib/modules/users/domain/interface/user.interface';

const useSnsLogin = (snsAuthProvider: IUser['snsAuthProvider'], snsAuthCode: string) => {
  return useQuery({
    queryKey: queries.auth.snsLogin(snsAuthProvider, snsAuthCode).queryKey,
    queryFn: () => authApi.postSnsLogin(snsAuthProvider, snsAuthCode),
  });
};

export { useSnsLogin };
