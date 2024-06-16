'use client';
import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import ButtonLists from '@/components/common/buttonList/buttonLists';
import ProfileImgEdit from '@/components/profile/profileImgEdit';
import { formatBirth, formatGender, formatPhoneNumber } from '@/utils/userFormats';
import { useUserInfo } from '@/hooks/user';
import { useRecoilValue } from 'recoil';
import { userInfoSelector } from '@/recoil/selectors/userSelector';
import BaseLayout from '@/components/layout/baseLayout';

export default function ProfileEdit() {
  useUserInfo();
  const userInfo = useRecoilValue(userInfoSelector);

  const myProfileButtonLists = [
    { text: '닉네임', href: '/profileEdit/nickname', info: userInfo.nickname },
    { text: '이름', info: userInfo.name },
    {
      text: '성별',
      href: '/profileEdit/gender',
      info: formatGender(userInfo.gender),
    },
    { text: '생년월일', href: '/profileEdit/birth', info: formatBirth(userInfo.birth) },
    {
      text: '휴대폰 번호',
      href: '/profileEdit/phoneNumber',
      info: formatPhoneNumber(userInfo.phoneNumber),
    },
    { text: '벨트', href: '/profileEdit/belt', info: userInfo.belt },
    { text: '연동된 소셜 계정', info: userInfo.snsProvider },
  ];

  return (
    <BaseLayout>
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
    </BaseLayout>
  );
}
