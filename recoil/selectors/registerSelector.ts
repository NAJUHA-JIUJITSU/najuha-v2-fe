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
    const gender = get(genderState).toUpperCase();
    const birth = get(birthDateState).replace(/\//g, '');
    const nickname = get(nicknameState);
    const belt = get(beltState);
    return {
      user: {
        gender,
        birth,
        nickname,
        belt,
      },
      consentPolicyTypes: [],
    };
  },
});
