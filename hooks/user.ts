import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { usersApi } from '@/api/nestia/usersApi';
import { userPatchSelector } from '@/recoil/selectors/userSelector';
import {
  nameState,
  birthDateState,
  genderState,
  nicknameState,
  phoneNumberState,
  beltState,
  snsProviderState,
  profileImageState,
} from '@/recoil/atoms/registerState';
import { useEffect } from 'react';
import { imageApi } from '@/api/nestia/imageApi';
import { IImageCreateDto } from 'najuha-v2-api/lib/modules/images/domain/interface/image.interface';

// 사용자 정보 가져오기 + recoil에 저장
export const useUserInfo = () => {
  const setName = useSetRecoilState(nameState);
  const setGender = useSetRecoilState(genderState);
  const setBirthDate = useSetRecoilState(birthDateState);
  const setPhoneNumber = useSetRecoilState(phoneNumberState);
  const setNickname = useSetRecoilState(nicknameState);
  const setSnsProvider = useSetRecoilState(snsProviderState);
  const setBelt = useSetRecoilState(beltState);
  const setImage = useSetRecoilState(profileImageState);

  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => usersApi.getUserInfo(),
    meta: {
      alertMsg: '회원정보를 가져오는데 실패했습니다.',
    },
  });

  useEffect(() => {
    if (data) {
      console.log('userInfo: ', data);
      setName(data.name);
      setGender(data.gender);
      setBirthDate(data.birth);
      setPhoneNumber(data.phoneNumber);
      setNickname(data.nickname);
      setBelt(data.belt);
      setSnsProvider(data.snsAuthProvider);
      setImage(data.profileImages[0]?.image);
    }
  }, [data]);
};

// 사용자 정보 수정
export const useUserPatch = () => {
  const userPatch = useRecoilValue(userPatchSelector);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return usersApi.patchUser(userPatch);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      });
    },
  });
};

// 사용자 프로필 이미지 등록
export const useCreateUserProfileImage = (path: IImageCreateDto['path']) => {
  return useMutation({
    mutationFn: async (file: File) => {
      const imageResponse = await imageApi.postCreateImage({
        data: { path, format: file.type as IImageCreateDto['format'] },
        file,
      });

      return usersApi.postCreateUserProfileImage({ imageId: imageResponse.image.id });
    },
  });
};

// 사용자 프로필 이미지 삭제
export const useDeleteUserProfileImage = () => {
  return useMutation({
    mutationFn: () => usersApi.deleteUserProfileImage(),
  });
};

export const useUserID = () => {
  return useQuery({
    queryKey: ['userID'],
    queryFn: () => usersApi.getUserInfoIfExists(),
  });
};
