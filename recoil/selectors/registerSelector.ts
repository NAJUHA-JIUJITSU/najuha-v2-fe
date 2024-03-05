import { selector } from 'recoil';
import {
  agreementState,
  genderState,
  birthDateState,
  nicknameState,
  beltState,
} from '../atoms/registerState';

export const registrationInfoSelector = selector({
  key: 'registrationInfoSelector',
  get: ({ get }) => {
    // push agreementStates which is checked without 'all'
    const agreement = get(agreementState);
    const agreementKeys = Object.keys(agreement);
    const checkedAgreementKeys = agreementKeys.filter(
      (key) => key !== 'all' && agreement[key].checked,
    );
    // get
    const gender = get(genderState)?.toUpperCase();
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
      consentPolicyTypes: checkedAgreementKeys,
    };
  },
});
