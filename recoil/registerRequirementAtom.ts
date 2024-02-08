import { atom } from 'recoil';

export interface Requirements extends Record<string, boolean> {
  all: boolean;
  use: boolean;
  privacy: boolean;
  refund: boolean;
  ad: boolean;
}

export const registerRequirementAtom = atom<Requirements>({
  key: 'registerRequirementAtomFamily',
  default: {
    all: false,
    use: false,
    privacy: false,
    refund: false,
    ad: false,
  },
});
