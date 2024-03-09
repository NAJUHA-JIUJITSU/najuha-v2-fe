import { useQuery, useMutation } from '@tanstack/react-query';
import { registerApi } from '@/api/registerApi';
import { queries } from '@/queries/index';

// 전역 select 함수 정의
const globalSelectFn = (response: any) => {
  return response.data.result;
};

export const useTemporaryUserInfo = () => {
  return useQuery({
    queryKey: queries.register.me().queryKey,
    queryFn: () => registerApi.getTemporaryUserInfo(),
    select: globalSelectFn,
    //추가에러 처리 로직
    meta: {
      alertMsg: '회원정보를 가져오는데 실패했습니다.',
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
