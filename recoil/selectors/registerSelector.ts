import { selector } from 'recoil';
import {
  agreementState,
  genderState,
  birthDateState,
  nicknameState,
  beltState,
} from '../atoms/registerState';
import { IPolicy } from 'najuha-v2-api/lib/modules/policy/domain/interface/policy.interface';
import { AgreementState } from '../atoms/registerState';

export const registrationInfoSelector = selector({
  key: 'registrationInfoSelector',
  get: ({ get }) => {
    const agreement = get(agreementState);
    const agreementKeys = Object.keys(agreement) as (keyof AgreementState)[];
    const checkedAgreementKeys: IPolicy['type'][] = agreementKeys.filter(
      (key) => key !== 'all' && agreement[key].checked,
    ) as IPolicy['type'][];

    const gender = get(genderState);
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
