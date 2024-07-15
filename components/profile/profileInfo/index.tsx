'use client';
import styles from './index.module.scss';
import ButtonLink from '@/components/common/button/buttonLink';
import { useUserInfo } from '@/hooks/user';
import { useRecoilValue } from 'recoil';
import { userInfoSelector } from '@/recoil/selectors/userSelector';

export default function ProfileInfo() {
  useUserInfo();
  const userInfo = useRecoilValue(userInfoSelector);

  const imageUrl = userInfo.profileImage
    ? `http://localhost:9000/najuha-v2-bucket/${userInfo.profileImage.path}/${userInfo.profileImage.id}`
    : '/images/sampleProfile.jpg';

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <img className={styles.profileImg} src={imageUrl} alt="profile" />
        <div className={styles.nickname}>{userInfo.nickname}</div>
      </div>
      <ButtonLink
        text={'프로필 수정'}
        size={'small'}
        type={'text'}
        color={'gray'}
        href={'/profileEdit'}
      />
    </div>
  );
}
