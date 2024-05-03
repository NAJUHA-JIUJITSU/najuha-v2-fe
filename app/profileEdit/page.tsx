'use client';
import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import ButtonLists from '@/components/common/buttonList/buttonLists';
import ProfileImgEdit from '@/components/profile/profileImgEdit';

import { useTemporaryUserInfo } from '@/hooks/register';
import { nicknameState } from '@/recoil/atoms/registerState';
import { useRecoilState } from 'recoil';

export default function profileEdit() {
  useTemporaryUserInfo(); //todo: 임시 유저 정보 받아온 후 닉네임 받아오기
  const [nickname, setNickname] = useRecoilState(nicknameState);

  const myProfileButtonLists = [
    { text: '닉네임', href: '/profileEdit/nickname', info: nickname },
    { text: '이름', info: '조지훈' },
    { text: '성별', href: '/profileEdit/gender', info: '남자' },
    { text: '생년월일', href: '/profileEdit/birth', info: '1998.04.04' },
    { text: '휴대폰 번호', href: '/profileEdit/phoneNumber', info: '01012345678' },
    { text: '벨트', href: '/profileEdit/belt', info: '블루' },
    { text: '연동된 소셜 계정', info: '카카오' },
  ];

  return (
    <div className={styles.wrapper}>
      <Header
        title={'프로필 수정'}
        leftIcon={<ButtonIconNavigateBefore />}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      <div className={styles.topSection}>
        <ProfileImgEdit />
      </div>
      <div className={styles.bottomSection}>
        <ButtonLists buttonLists={myProfileButtonLists} />
      </div>
    </div>
  );
}
