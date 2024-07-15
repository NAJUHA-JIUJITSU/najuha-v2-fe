'use client';
import styles from './index.module.scss';
import Camera from '@/public/svgs/camera.svg';
import { useUserInfo } from '@/hooks/user';
import { useRecoilValue } from 'recoil';
import { userInfoSelector } from '@/recoil/selectors/userSelector';
import { useCreateUserProfileImage, useDeleteUserProfileImage } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

export default function ProfileImgEdit() {
  useUserInfo();
  const userInfo = useRecoilValue(userInfoSelector);
  const { mutate: createProfileImage, isPending } = useCreateUserProfileImage('user-profile');
  const { mutate: deleteProfileImage, isPending: isPendingDelete } = useDeleteUserProfileImage();
  const queryClient = useQueryClient();

  const imageUrl = userInfo.profileImage
    ? `http://localhost:9000/najuha-v2-bucket/${userInfo.profileImage.path}/${userInfo.profileImage.id}`
    : '/images/sampleProfile.jpg';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    // 1. 파일 형식 검증 (jpeg, png, webp)
    const isValidFormat = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
    if (!isValidFormat) {
      alert(`해당 이미지 파일 포맷은 지원하지 않습니다: ${file.type}`);
      return;
    }

    // 2. 크기 검증 (5MB 이하)
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB 이하
    if (!isValidSize) {
      alert('이미지 파일 크기는 5MB 이하로 업로드해주세요.');
      return;
    }

    createProfileImage(file, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['userInfo'],
        });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const deleteImage = () => {
    deleteProfileImage(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['userInfo'],
        });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  //todo: 이미지 부분에만 로딩 스피너 추가
  if (isPending || isPendingDelete) {
    return <div style={{ lineHeight: 1 }}>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor="imgUpload" className={styles.profile}>
        <img className={styles.profileImg} src={imageUrl} alt="profile" />
        <div className={styles.editButton}>
          <Camera />
        </div>
      </label>
      <input
        type="file"
        id="imgUpload"
        onChange={handleImageChange}
        className={styles.imgUploadHidden}
      ></input>
      {userInfo.profileImage && (
        <ButtonOnClick
          type="text"
          size="small"
          color="gray"
          text="프로필 사진 삭제"
          onClick={deleteImage}
        />
      )}
    </div>
  );
}
