import { useMutation } from '@tanstack/react-query';
import { withToken } from '@/utils/axios/axiosInstances';
import { useRecoilValue } from 'recoil';
import { registrationInfoSelector } from '@/recoil/selectors/registerSelector';
import Cookies from 'js-cookie';

export function useRegister() {
  const data = useRecoilValue(registrationInfoSelector);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return withToken.patch('/user/register', data);
    },
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (res) => {
      console.log(res);
      if (res.status === 200) {
        Cookies.set('najuha-accessToken', res.data.data.accessToken, { expires: 1, path: '/' });
        Cookies.set('najuha-refreshToken', res.data.data.refreshToken, { expires: 7, path: '/' });
        alert('회원가입이 완료되었습니다.');
      }
    },
  });
  return { mutate, isPending };
}
