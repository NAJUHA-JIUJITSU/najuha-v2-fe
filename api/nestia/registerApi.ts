import { withAuth } from '@/api/nestia/common';
import api from 'najuha-v2-api/lib/api';

// 임시 사용자 정보를 가져옵니다.
const getTemporaryUserInfo = async () => {
  const response = await withAuth((connection) =>
    api.functional.user.register.users.me.getTemporaryUser(connection),
  );

  return response.result;
};

// 닉네임 중복 확인
const getCheckDuplicatedNickname = async (nickname: string) => {
  const response = await withAuth((connection) =>
    api.functional.user.register.users.is_duplicated.isDuplicateNickname(connection, nickname),
  );

  return response.result;
};

// 전화번호로 인증코드 전송
const postSendAuthCode = async (phoneNumber: string) => {
  const response = await withAuth((connection) =>
    api.functional.user.register.phone_number.auth_code.sendPhoneNumberAuthCode(connection, {
      phoneNumber,
    }),
  );

  return response.result;
};

// 전화번호 인증코드 확인
const postConfirmAuthCode = async (authCode: string) => {
  const response = await withAuth((connection) =>
    api.functional.user.register.phone_number.auth_code.confirm.confirmAuthCode(connection, {
      authCode,
    }),
  );

  return response.result;
};

// 회원가입
const patchRegister = async (data: any) => {
  const response = await withAuth((connection) =>
    api.functional.user.register.registerUser(connection, data),
  );
  return response.result;
};

export const registerApi = {
  getTemporaryUserInfo,
  getCheckDuplicatedNickname,
  postSendAuthCode,
  postConfirmAuthCode,
  patchRegister,
};
