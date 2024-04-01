import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import CompetitionIdContent from './client/index';

// 대회 더미 데이터
const competition = {
  earlybirdDiscountSnapshots: [
    {
      id: 1,
      createdAt: '2024-03-01',
      earlybirdStartDate: '2024-03-10',
      earlybirdEndDate: '2024-03-20',
      discountAmount: 0,
      competitionId: 0,
    },
  ],
  id: 1,
  status: 'ACTIVE',
  createdAt: '2024-03-01',
  updatedAt: '2024-03-25',
  title: '제 1회 대한민국 개발자 대회',
  address: '서울특별시 강남구 테헤란로',
  competitionDate: '2024-04-15',
  registrationStartDate: '2024-03-10',
  registrationEndDate: '2024-03-31',
  refundDeadlineDate: '2024-04-01',
  soloRegistrationAdjustmentStartDate: '2024-04-02',
  soloRegistrationAdjustmentEndDate: '2024-04-05',
  registrationListOpenDate: '2024-04-01',
  bracketOpenDate: '2024-04-08',
  description:
    '대한민국 개발자들을 위한 대회로, 다양한 분야에서 실력을 겨루는 이벤트입니다. 참가자들은 최신 기술 트렌드와 혁신적인 아이디어를 공유할 수 있는 기회를 가집니다.',
  isPartnership: true,
  viewCount: 1234,
  posterImgUrlKey: '/images/samplePoster1.png',
};

export default function CompetitionId() {
  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={competition.title || '대회 상세페이지'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      <CompetitionIdContent competition={competition}></CompetitionIdContent>
    </div>
  );
}
