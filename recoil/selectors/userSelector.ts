import { selector } from 'recoil';
import {
  genderState,
  birthDateState,
  nicknameState,
  beltState,
  nameState,
  phoneNumberState,
  snsProviderState,
} from '../atoms/registerState';

export const userInfoSelector = selector({
  key: 'userInfoSelector',
  get: ({ get }) => {
    // get
    const gender = get(genderState)?.toUpperCase();
    const birth = get(birthDateState).replace(/\//g, '');
    const nickname = get(nicknameState);
    const belt = get(beltState);
    const name = get(nameState);
    const phoneNumber = get(phoneNumberState);
    const snsProvider = get(snsProviderState);
    return {
      name,
      gender,
      birth,
      nickname,
      belt,
      phoneNumber,
      snsProvider,
    };
  },
});
