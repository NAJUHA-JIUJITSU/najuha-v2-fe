import { useQuery } from '@tanstack/react-query';
import { queries } from '@/app/queries/index';

export const useTemporaryUserInfo = () => {
  return useQuery(queries.register.me());
};

export const useCheckDuplicatedNickname = (nickname: string) => {
  return useQuery(queries.register.nickname(nickname));
};

// export const useUserData = () => {
//   return useQuery({ queryKey: ['userData'], queryFn: () => getTemporaryUserInfo() });
// };
