import { atom } from 'recoil';

export const accessTokenState = atom({
  key: 'accessTokenState', // 고유한 상태의 키
  default: '', // 초기 상태값 (엑세스 토큰이 없는 경우 빈 문자열)
});
