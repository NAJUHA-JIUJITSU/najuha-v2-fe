'use client';
import styles from './index.module.scss';
import ButtonLink from '@/components/common/button/buttonLink';
import { useRecoilState } from 'recoil';
import { nicknameState } from '@/recoil/atoms/registerState';
import { useTemporaryUserInfo } from '@/hooks/register';

export default function profileInfo() {
  useTemporaryUserInfo(); //todo: 임시 유저 정보 받아온 후 닉네임 받아오기
  const [nickname, setNickname] = useRecoilState(nicknameState);

  //todo: 닉네임 정보 받아오기
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <img className={styles.profileImg} src="/images/sampleProfile.jpg" alt="profile" />
        <div className={styles.nickname}>{nickname}</div>
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
