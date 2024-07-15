import { withAuth, withoutAuth } from '@/api/nestia/common';
import api from 'najuha-v2-api/lib/api';
import { IUser } from '@/node_modules/najuha-v2-api/lib/modules/users/domain/interface/user.interface';
import { CreateUserProfileImageReqBody } from 'najuha-v2-api/lib/modules/users/presentation/users.controller.dto';

// 회원정보 수정
const patchUser = async (data: Partial<IUser>) => {
  console.log('회원정보 수정: ', data);
  const response = await withAuth((connection) =>
    api.functional.user.users.updateUser(connection, data),
  );
  return response.result;
};

// 사용자 정보 가져오기
const getUserInfo = async () => {
  const response = await withAuth((connection) => api.functional.user.users.me.getMe(connection));
  return response.result.user;
};

// u-3-4 createUserProfileImage.
// 프로필 이미지를 등록합니다.
const postCreateUserProfileImage = async (imageId: CreateUserProfileImageReqBody) => {
  const response = await withAuth((connection) =>
    api.functional.user.users.profile_image.createUserProfileImage(connection, imageId),
  );
  return response.result;
};

// u-3-5 deleteUserProfileImage.
// 프로필 이미지를 삭제합니다.
const deleteUserProfileImage = async () => {
  const response = await withAuth((connection) =>
    api.functional.user.users.profile_image.deleteUserProfileImage(connection),
  );
  return response.result;
};

// 사용자 정보 있으면 가져오기
// todo : 로그인 여부 및 사용자 정보가 필요할 때 사용하려고 하는데, 적절한지 확인 필요
const getUserInfoIfExists = async () => {
  try {
    const response = await withoutAuth((connection) =>
      api.functional.user.users.me.getMe(connection),
    );
    return response.result.user;
  } catch (error) {
    return null;
  }
};

export const usersApi = {
  patchUser,
  getUserInfo,
  postCreateUserProfileImage,
  deleteUserProfileImage,
  getUserInfoIfExists,
};
