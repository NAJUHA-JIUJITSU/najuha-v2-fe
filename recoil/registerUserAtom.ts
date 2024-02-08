import { atom } from 'recoil';

interface User {
  id: number;
  role: string;
  name: string;
  birth: string;
  gender: string;
  nickname: string;
  phoneNumber: string;
  belt: string;
}

export const registerUserAtom = atom<User>({
  key: 'registerUserAtom',
  default: {
    id: 0,
    role: '',
    name: '',
    birth: '',
    gender: '',
    nickname: '',
    phoneNumber: '',
    belt: '',
  },
});
