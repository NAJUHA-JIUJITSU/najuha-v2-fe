import { useQuery } from '@tanstack/react-query';
import { queries } from '@/queries/index';

export const useTemporaryUserInfo = () => {
  return useQuery(queries.register.me());
};

//일단 사용안함
export const useCheckDuplicatedNickname = (nickname: string) => {
  return useQuery(queries.register.nickname(nickname));
};

// export const useUserData = () => {
//   return useQuery({ queryKey: ['userData'], queryFn: () => getTemporaryUserInfo() });
// };
