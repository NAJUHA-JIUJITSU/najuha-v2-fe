import { atom } from 'recoil';

export interface AgreementState {
  [key: string]: boolean;
}

export const agreementState = atom<AgreementState>({
  key: 'agreementState',
  default: {
    all: false,
    use: false,
    privacy: false,
    refund: false,
    ad: false,
  },
});

export type GenderType = 'male' | 'female';

// 성별 선택 상태
export const genderState = atom<GenderType>({
  key: 'genderState',
  default: 'male',
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

// 인증번호 검증 상태
export const verificationState = atom<boolean>({
  key: 'verificationState',
  default: false,
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
