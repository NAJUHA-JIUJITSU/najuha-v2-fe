import { useQuery, useMutation } from '@tanstack/react-query';
import { registerApi } from '@/api/registerApi';
import { queries } from '@/queries/index';

export const useTemporaryUserInfo = () => {
  return useQuery({
    queryKey: queries.register.me().queryKey,
    queryFn: () => registerApi.getTemporaryUserInfo(),
    // queryFn: () => axiosPrivate.get('/user/register/users/me'),
    meta: {
      errorMsg: '회원정보를 가져오는데 실패했습니다.',
    },
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

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return registerApi.patchRegister(data);
    },
  });
};
