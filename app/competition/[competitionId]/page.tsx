import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import CompetitionDetail from './client/index';

const competition = {
  id: 1,
  title: '제 1회 대한민국 코딩대회',
  address: '서울특별시 강남구',
  date: new Date('2024-04-01'),
  registrationStartDate: new Date('2024-03-10'),
  registrationEndDate: new Date('2024-03-21'),
  refundDeadlineDate: new Date('2024-03-21'),
  soloRegistrationAdjustmentStartDate: new Date('2024-03-21'),
  soloRegistrationAdjustmentEndDate: new Date('2024-03-24'),
  price: 10000,
  viewCnt: 123,
  posterImg: '/images/samplePoster1.png',
  easyPayAvailable: true,
};

export default function CompetitionInfo() {
  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={competition.title || '대회 상세페이지'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      <CompetitionDetail competition={competition}></CompetitionDetail>
    </div>
  );
}
