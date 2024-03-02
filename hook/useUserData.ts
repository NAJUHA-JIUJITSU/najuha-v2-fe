import { useQuery } from '@tanstack/react-query';
import { getTemporaryUserInfo } from '@/api/registerService';

export const useUserData = () => {
  return useQuery({ queryKey: ['userData'], queryFn: () => getTemporaryUserInfo() });
};
