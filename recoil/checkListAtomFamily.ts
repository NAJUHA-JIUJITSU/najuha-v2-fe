import { atomFamily } from 'recoil';

export interface CheckItem {
  name: string;
  checked: boolean;
  mandatory: boolean;
}

export interface CheckList {
  id: string;
  isAllMandatoryChecked: boolean;
  items: CheckItem[];
}

export const checkListAtomFamily = atomFamily<CheckList, string>({
  key: 'checkListAtomFamily',
  default: (id) => ({
    id,
    isAllMandatoryChecked: false,
    items: [],
  }),
});
