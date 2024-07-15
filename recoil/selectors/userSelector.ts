import { selector } from 'recoil';
import {
  genderState,
  birthDateState,
  nicknameState,
  beltState,
  nameState,
  phoneNumberState,
  snsProviderState,
  profileImageState,
} from '../atoms/registerState';

export const userInfoSelector = selector({
  key: 'userInfoSelector',
  get: ({ get }) => {
    // get
    const gender = get(genderState);
    const birth = get(birthDateState).replace(/\//g, '');
    const nickname = get(nicknameState);
    const belt = get(beltState);
    const name = get(nameState);
    const phoneNumber = get(phoneNumberState);
    const snsProvider = get(snsProviderState);
    const profileImage = get(profileImageState);
    return {
      name,
      gender,
      birth,
      nickname,
      belt,
      phoneNumber,
      snsProvider,
      profileImage,
    };
  },
});

export const userPatchSelector = selector({
  key: 'userPatchSelector',
  get: ({ get }) => {
    const nickname = get(nicknameState);
    const gender = get(genderState);
    const birth = get(birthDateState).replace(/\//g, '');
    const belt = get(beltState);
    return {
      gender,
      nickname,
      birth,
      belt,
    };
  },
});
