import { useQuery, useMutation } from '@tanstack/react-query';
import { queries } from '@/queries/index';
import {
  postSendAuthCode,
  getCheckDuplicatedNickname,
  postConfirmAuthCode,
} from '@/api/registerService';

export const useTemporaryUserInfo = () => {
  return useQuery(queries.register.me());
};

export const useCheckDuplicatedNickname = () => {
  return useMutation({
    mutationFn: (nickname: string) => {
      return getCheckDuplicatedNickname(nickname);
    },
  });
};

export const useSendAuthCode = () => {
  return useMutation({
    mutationFn: (phoneNumber: string) => {
      const parsedPhoneNumber = phoneNumber.replace(/-/g, '');
      return postSendAuthCode(parsedPhoneNumber);
    },
  });
};

export const useConfirmAuthCode = () => {
  return useMutation({
    mutationFn: (authCode: string) => {
      return postConfirmAuthCode(authCode);
    },
  });
};

// export const useUserData = () => {
//   return useQuery({ queryKey: ['userData'], queryFn: () => getTemporaryUserInfo() });
// };
