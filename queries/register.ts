import {
  getTemporaryUserInfo,
  getCheckDuplicatedNickname,
  postSendAuthCode,
} from '@/api/registerService';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const register = createQueryKeys('register', {
  me: () => ({
    queryKey: ['user', 'me'],
    queryFn: () => getTemporaryUserInfo(),
  }),
});
