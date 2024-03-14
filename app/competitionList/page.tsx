import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import Card from '@/components/card';

const competitionList = [
  {
    id: 1,
    title: '제 1회 대한민국 코딩대회',
    address: '서울특별시 강남구',
    date: new Date('2021-09-01'),
    registrationStartDate: new Date('2024-03-01'),
    registrationEndDate: new Date('2024-03-31'),
    refundDeadlineDate: new Date('2024-03-31'),
    soloRegistrationAdjustmentStartDate: new Date('2024-03-31'),
    soloRegistrationAdjustmentEndDate: new Date('2024-03-31'),
    price: 10000,
    viewCnt: 123,
    posterImg: '/images/samplePoster1.png',
    easyPayAvailable: true,
  },
  {
    id: 2,
    title: '제 2회 대한민국 코딩대회',
    address: '서울특별시 강남구',
    date: new Date('2024-09-01'),
    registrationStartDate: new Date('2024-08-01'),
    registrationEndDate: new Date('2024-08-31'),
    refundDeadlineDate: new Date('2024-08-31'),
    soloRegistrationAdjustmentStartDate: new Date('2024-08-31'),
    soloRegistrationAdjustmentEndDate: new Date('2024-08-31'),
    price: 10000,
    viewCnt: 123,
    posterImg: '/images/samplePoster1.png',
    easyPayAvailable: true,
  },
];

export default function CompetitionList() {
  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={'대회일정'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      <div className={styles.filterWrapper}>
        <h1>날짜 지역 검색</h1>
      </div>
      <div className={styles.sortWrapper}>
        <h1>정렬</h1>
      </div>
      <div className={styles.CompetitionListWrapper}>
        <h1>대회 리스트</h1>
        <Card type="normal" info={competitionList[0]} />
        <Card type="normal" info={competitionList[1]} />
        <Card type="vertical" info={competitionList[0]} />
        <Card type="vertical" info={competitionList[1]} />
      </div>
    </div>
  );
}
