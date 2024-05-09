import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { usersApi } from '@/api/usersApi';
import { userInfoSelector } from '@/recoil/selectors/userSelector';
import {
  nameState,
  birthDateState,
  genderState,
  nicknameState,
  phoneNumberState,
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

  const query = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => usersApi.getUserInfo(),
    select: (response) => {
      return response.data.result;
    },
    meta: {
      alertMsg: '회원정보를 가져오는데 실패했습니다.',
    },
  });

  console.log('userInfo: ', query.data);
  useEffect(() => {
    if (query.data) {
      setName(query.data.user.name);
      setGender(query.data.user.gender);
      setBirthDate(query.data.user.birth);
      setPhoneNumber(query.data.user.phoneNumber);
      setNickname(query.data.user.nickname);
      setSnsProvider(query.data.user.snsAuthProvider);
    }
  }, [query.data]);
};

export const useUserPatch = () => {
  const userInfo = useRecoilValue(userInfoSelector);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => {
      return usersApi.patchUser(userInfo);
    },
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (res) => {
      console.log(res);
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ['userInfo'],
        });
      }
    },
  });
  return { mutate, isPending, isError };
};
