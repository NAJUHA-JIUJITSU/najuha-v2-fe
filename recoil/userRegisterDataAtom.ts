import { atom } from 'recoil';

interface registerData {
  requirement: {
    termOfUse: boolean;
    privacyPolicy: boolean;
    refundPolicy: boolean;
    advertisingInfo: boolean;
  };
  user: {
    role: string;
    name: string;
    birth: string;
    gender: string;
    nickname: string;
    belt: string;
  };
}

export const UserRegisterDataAtom = atom({
  key: 'userRegisterDataAtom',
  default: {
    requirement: {
      termOfUse: false,
      privacyPolicy: false,
      refundPolicy: false,
      advertisingInfo: false,
    },
    user: {
      role: 'TEMPERARY_USER',
      name: '',
      birth: '',
      gender: '',
      nickname: '',
      belt: '',
    },
  } as registerData,
});
