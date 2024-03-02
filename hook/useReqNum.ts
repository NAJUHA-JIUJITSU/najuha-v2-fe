import { useMutation } from '@tanstack/react-query';
import { withToken } from '@/utils/axios/axiosInstances';

export function useReqNum() {
  const { mutate, isPending } = useMutation({
    mutationFn: (phoneNumber: string) => {
      console.log(phoneNumber);
      const parsedPhoneNumber = phoneNumber.replace(/-/g, '');
      console.log(parsedPhoneNumber);
      return withToken.post('/user/register/phone-number/auth-code', {
        phoneNumber: parsedPhoneNumber,
      });
    },
  });

  return { mutate, isPending };
}
