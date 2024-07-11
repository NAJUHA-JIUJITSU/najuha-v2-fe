import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { usersApi } from '@/api/nestia/usersApi';
import { userPatchSelector } from '@/recoil/selectors/userSelector';
import {
  nameState,
  birthDateState,
  genderState,
  nicknameState,
  phoneNumberState,
  beltState,
  snsProviderState,
} from '@/recoil/atoms/registerState';
import { useEffect } from 'react';

export const useUserInfo = () => {
  const setName = useSetRecoilState(nameState);
  const setGender = useSetRecoilState(genderState);
  const setBirthDate = useSetRecoilState(birthDateState);
  const setPhoneNumber = useSetRecoilState(phoneNumberState);
  const setNickname = useSetRecoilState(nicknameState);
  const setSnsProvider = useSetRecoilState(snsProviderState);
  const setBelt = useSetRecoilState(beltState);

  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => usersApi.getUserInfo(),
    meta: {
      alertMsg: '회원정보를 가져오는데 실패했습니다.',
    },
  });

  useEffect(() => {
    if (data) {
      console.log('userInfo: ', data);
      setName(data.name);
      setGender(data.gender);
      setBirthDate(data.birth);
      setPhoneNumber(data.phoneNumber);
      setNickname(data.nickname);
      setBelt(data.belt);
      setSnsProvider(data.snsAuthProvider);
    }
  }, [data]);
};

export const useUserPatch = () => {
  const userPatch = useRecoilValue(userPatchSelector);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return usersApi.patchUser(userPatch);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      });
    },
  });
};

export const useUserID = () => {
  return useQuery({
    queryKey: ['userID'],
    queryFn: () => usersApi.getUserInfoIfExists(),
  });
};
