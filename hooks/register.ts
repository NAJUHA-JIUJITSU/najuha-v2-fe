import { useQuery, useMutation } from '@tanstack/react-query';
// import { registerApi } from '@/api/registerApi';
import { registerApi } from '@/api/nestia/registerApi';
import { queries } from '@/queries/index';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { registrationInfoSelector } from '@/recoil/selectors/registerSelector';
import { saveTokens } from '@/utils/tokenManagement';
import {
  nameState,
  birthDateState,
  genderState,
  phoneNumberState,
} from '@/recoil/atoms/registerState';
import { useEffect } from 'react';

export const useTemporaryUserInfo = () => {
  const setName = useSetRecoilState(nameState);
  const setGender = useSetRecoilState(genderState);
  const setBirthDate = useSetRecoilState(birthDateState);
  const setPhoneNumber = useSetRecoilState(phoneNumberState);

  const query = useQuery({
    queryKey: queries.register.me().queryKey,
    queryFn: () => registerApi.getTemporaryUserInfo(),
    //todo: 추가에러 처리 로직
    meta: {
      alertMsg: '회원정보를 가져오는데 실패했습니다.',
    },
  });

  console.log('처음데이터: ', query.data);
  useEffect(() => {
    if (query.data) {
      {
        query.data.user.name && setName(query.data.user.name);
      }
      {
        query.data.user.gender && setGender(query.data.user.gender);
      }
      {
        query.data.user.birth && setBirthDate(query.data.user.birth);
      }
      {
        query.data.user.phoneNumber && setPhoneNumber(query.data.user.phoneNumber);
      }
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
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (res) => {
      console.log();
      saveTokens(res.authTokens.accessToken, res.authTokens.refreshToken);
      window.location.href = '/profile';
    },
  });
  return { mutate, isPending, isError };
}
