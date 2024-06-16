'use client';
import styles from './index.module.scss';
import ButtonLink from '@/components/common/button/buttonLink';
import { useUserInfo } from '@/hooks/user';
import { useRecoilValue } from 'recoil';
import { userInfoSelector } from '@/recoil/selectors/userSelector';

export default function ProfileInfo() {
  useUserInfo();
  const userInfo = useRecoilValue(userInfoSelector);

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <img className={styles.profileImg} src="/images/sampleProfile.jpg" alt="profile" />
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
