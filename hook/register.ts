import { useQuery, useMutation } from '@tanstack/react-query';
import { registerApi } from '@/api/registerApi';
import { queries } from '@/queries/index';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { registrationInfoSelector } from '@/recoil/selectors/registerSelector';
import { saveTokens } from '@/utils/tokenManagement';
import {
  birthDateState,
  genderState,
  nicknameState,
  phoneNumberState,
} from '@/recoil/atoms/registerState';
import { useEffect } from 'react';

// 전역 select 함수 정의
const globalSelectFn = (response: any) => {
  return response.data.result;
};

export const useTemporaryUserInfo = () => {
  const setGender = useSetRecoilState(genderState);
  const setBirthDate = useSetRecoilState(birthDateState);
  const setPhoneNumber = useSetRecoilState(phoneNumberState);
  const setNickname = useSetRecoilState(nicknameState);

  const query = useQuery({
    queryKey: queries.register.me().queryKey,
    queryFn: () => registerApi.getTemporaryUserInfo(),
    select: globalSelectFn,
    //추가에러 처리 로직
    meta: {
      alertMsg: '회원정보를 가져오는데 실패했습니다.',
    },
  });
  useEffect(() => {
    if (query.data) {
      setGender(query.data.gender);
      setBirthDate(query.data.birth);
      setPhoneNumber(query.data.phoneNumber);
      setNickname(query.data.nickname);
    }
  }, [query.data]);
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
        saveTokens(res.data.result.accessToken, res.data.result.refreshToken);
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
