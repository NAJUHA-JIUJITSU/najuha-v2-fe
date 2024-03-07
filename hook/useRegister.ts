import { useQuery, useMutation } from '@tanstack/react-query';
import { registerApi } from '@/api/registerApi';
import { queries } from '@/queries/index';

export const useTemporaryUserInfo = () => {
  return useQuery({
    queryKey: queries.register.me().queryKey,
    queryFn: () => registerApi.getTemporaryUserInfo(),
  });
};

export const useCheckDuplicatedNickname = () => {
  return useMutation({
    mutationFn: (nickname: string) => {
      return registerApi.getCheckDuplicatedNickname(nickname);
    },
  });
};

export const useSendAuthCode = () => {
  return useMutation({
    mutationFn: (phoneNumber: string) => {
      const parsedPhoneNumber = phoneNumber.replace(/-/g, '');
      return registerApi.postSendAuthCode(parsedPhoneNumber);
    },
  });
};

export const useConfirmAuthCode = () => {
  return useMutation({
    mutationFn: (authCode: string) => {
      return registerApi.postConfirmAuthCode(authCode);
    },
  });
};
