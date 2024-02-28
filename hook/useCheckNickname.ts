import { useMutation } from '@tanstack/react-query';
import { withToken } from '@/utils/axios/axiosInstances';
import { useState } from 'react';

export function useCheckNickname(setErrMsg: (msg: string) => void) {
  const [isDuplicated, setIsDuplicated] = useState<boolean>(true);

  const mutation = useMutation({
    mutationFn: (nickname) => withToken.get(`/user/register/users/${nickname}/is-duplicated`),
    onSuccess: (res) => {
      setIsDuplicated(res.data.data);
      setErrMsg(res.data.data ? '사용 불가능한 닉네임입니다.' : '사용 가능한 닉네임입니다.');
    },
    onError: (err) => {
      console.log(err);
      setErrMsg('닉네임 검사 중 오류가 발생했습니다.');
    },
  });

  return {
    checkNickname: mutation.mutate,
    isDuplicated,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
}
