import { useMutation } from '@tanstack/react-query';
import { withToken } from '@/utils/axios/axiosInstances';

export function useVerify() {
  const { mutate, isPending } = useMutation({
    mutationFn: (verificationNumber: string) => {
      console.log(verificationNumber);
      // verficationNumber를 params로 요청해야함
      return withToken.post(`/user/register/phone-number/auth-code/${verificationNumber}/confirm`);
    },
  });
  return { mutate, isPending };
}
