import { useMutation } from '@tanstack/react-query';
import { withToken } from '@/utils/axios/axiosInstances';

export function useReqNum() {
  const { mutate, isPending } = useMutation({
    mutationFn: (phoneNumber: string) => {
      const parsedPhoneNumber = phoneNumber.replace(/-/g, '');
      return withToken.post('/user/register/phone-number/auth-code', {
        phoneNumber: parsedPhoneNumber,
      });
    },
  });

  return { mutate, isPending };
}
