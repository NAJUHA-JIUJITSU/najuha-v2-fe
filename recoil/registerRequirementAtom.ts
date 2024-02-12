import { CheckList } from '@/hook/useCheckList';
import { atom } from 'recoil';

export const registerRequirementAtom = atom<CheckList>({
  key: 'registerRequirementAtom',
  default: {
    all: { checked: false, mandatory: false },
    use: { checked: false, mandatory: true },
    privacy: { checked: false, mandatory: true },
    refund: { checked: false, mandatory: true },
    ad: { checked: false, mandatory: false },
  },
});
