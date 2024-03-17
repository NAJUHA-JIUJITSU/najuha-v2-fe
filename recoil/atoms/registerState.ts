import { atom } from 'recoil';

export interface CheckboxItem {
  checked: boolean;
  required: boolean;
}

export interface AgreementState {
  [key: string]: CheckboxItem;
}

export const agreementState = atom<AgreementState>({
  key: 'agreementState',
  default: {
    all: { checked: false, required: false }, // 'all'은 전체 동의를 위한 것이므로 필수 여부는 false로 설정
    TERMS_OF_SERVICE: { checked: false, required: true },
    PRIVACY: { checked: false, required: true },
    REFUND: { checked: false, required: true },
    ADVERTISEMENT: { checked: false, required: false },
  },
});

export type GenderType = 'MALE' | 'FEMALE' | null;

// 성별 선택 상태
export const genderState = atom<GenderType>({
  key: 'genderState',
  default: 'MALE',
});

// 생년월일 입력 상태
export const birthDateState = atom<string>({
  key: 'birthDateState',
  default: '',
});

// 휴대폰 번호 입력 상태
export const phoneNumberState = atom<string>({
  key: 'phoneNumberState',
  default: '',
});

// 닉네임 설정 상태
export const nicknameState = atom<string>({
  key: 'nicknameState',
  default: '',
});

// 주짓수 벨트 선택 상태
export const beltState = atom<string>({
  key: 'beltState',
  default: '',
});
