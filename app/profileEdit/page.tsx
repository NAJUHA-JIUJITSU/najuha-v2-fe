import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import ButtonLists from '@/components/common/buttonList/buttonLists';
import ProfileImgEdit from '@/components/profile/profileImgEdit';

export default function profileEdit() {
  const myProfileButtonLists = [
    { text: '닉네임', href: '/', info: '내 닉네임은 오칸' },
    { text: '이름', info: '조지훈' },
    { text: '성별', href: '/', info: '남자' },
    { text: '생년월일', href: '/', info: '1998.04.04' },
    { text: '휴대폰 번호', href: '/', info: '01012345678' },
    { text: '벨트', href: '/', info: '블루' },
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
