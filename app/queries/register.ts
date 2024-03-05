import { getTemporaryUserInfo, getCheckDuplicatedNickname } from '@/api/registerService';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const register = createQueryKeys('register', {
  me: () => ({
    queryKey: ['user', 'me'],
    queryFn: () => getTemporaryUserInfo(),
  }),
  nickname: (nickname: string) => ({
    queryKey: ['user', 'nickname', nickname],
    queryFn: () => getCheckDuplicatedNickname(nickname),
  }),
});
