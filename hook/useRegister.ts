import { useQuery, useMutation } from '@tanstack/react-query';
import { registerApi } from '@/api/registerApi';
import { queries } from '@/queries/index';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { registrationInfoSelector } from '@/recoil/selectors/registerSelector';
import Cookies from 'js-cookie';

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

export function useRegister() {
  const data = useRecoilValue(registrationInfoSelector);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => {
      return registerApi.patchRegister(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (res) => {
      console.log(res);
      if (res.status === 200) {
        Cookies.set('najuha-accessToken', res.data.result.accessToken, { expires: 1, path: '/' });
        Cookies.set('najuha-refreshToken', res.data.result.refreshToken, { expires: 7, path: '/' });
        alert('회원가입이 완료되었습니다.');
      }
    },
  });
  return { mutate, isPending, isError };
}

export const useCheckNickname = () => {
  return useMutation({
    mutationFn: (nickname: string) => {
      return registerApi.getCheckDuplicatedNickname(nickname);
    },
  });
};
