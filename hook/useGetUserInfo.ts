import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  genderState,
  birthDateState,
  phoneNumberState,
  nicknameState,
} from '@/recoil/atoms/registerState';
import { withToken } from '@/utils/axios/axiosInstances';

export function useGetUserInfo() {
  const setGender = useSetRecoilState(genderState);
  const setBirthDate = useSetRecoilState(birthDateState);
  const setPhoneNumber = useSetRecoilState(phoneNumberState);
  const setNickname = useSetRecoilState(nicknameState);

  // useQuery를 사용하여 유저 정보를 가져옴
  const query = useQuery({
    queryKey: ['getUserInfo'],
    queryFn: async () => {
      const response = await withToken.get('/user/register/users/me');
      return response.data;
    },
  });

  // useEffect 내에서 query.data가 있을 경우 Recoil 상태 업데이트
  useEffect(() => {
    if (query.data) {
      console.log(query.data.data);
      setGender(query.data.data.gender);
      setBirthDate(query.data.data.birth);
      setPhoneNumber(query.data.data.phoneNumber);
      setNickname(query.data.data.nickname);
    }
  }, [query.data]);
}
