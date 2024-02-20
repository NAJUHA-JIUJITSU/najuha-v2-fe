import { selector } from 'recoil';
import {
  agreementState,
  genderState,
  birthDateState,
  phoneNumberState,
  verificationState,
  nicknameState,
  beltState,
} from '../atoms/registerState';

export const registrationInfoSelector = selector({
  key: 'registrationInfoSelector',
  get: ({ get }) => {
    return {
      agreement: get(agreementState),
      gender: get(genderState),
      birthDate: get(birthDateState),
      phoneNumber: get(phoneNumberState),
      verification: get(verificationState),
      nickname: get(nicknameState),
      belt: get(beltState),
    };
  },
});
