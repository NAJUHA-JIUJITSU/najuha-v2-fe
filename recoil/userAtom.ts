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
  profileImageUrlKey: string;
  email: string;
  snsAuthProvider: string;
  snsId: string;
  status: string;
  weight: string;
  createdAt: string;
  updatedAt: string;
}

export const userAtom = atom<User>({
  key: 'userAtom',
  default: {
    id: 0,
    role: '',
    name: '',
    birth: '',
    gender: '',
    nickname: '',
    phoneNumber: '',
    belt: '',
    profileImageUrlKey: '',
    email: '',
    snsAuthProvider: '',
    snsId: '',
    status: '',
    weight: '',
    createdAt: '',
    updatedAt: '',
  },
});
