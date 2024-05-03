import styles from './index.module.scss';
import Tag from '@/components/tag';
import {
  isDatePast,
  isDateToday,
  calculateDayDiff,
  areBothDatesPassed,
} from '@/utils/dateUtils/dateCheck';
import { TagType } from '@/components/tag';

interface TagListProps {
  competiton: {
    registrationStartDate: string;
    registrationEndDate: string;
    isPartnership: boolean;
    soloRegistrationAdjustmentStartDate: string;
    soloRegistrationAdjustmentEndDate: string;
  };
}

export default function TagList({ competiton }: TagListProps) {
  const tags = [];

  // 간편결제 유무에 따른 태그 추가
  if (competiton.isPartnership) {
    tags.push(<Tag key="easyPay" type="easyPay" content="간편결제" />);
  }

  // D-Day 계산에 따른 태그 추가를 위한 함수
  const addDdayTagIfNeeded = (
    startDate: string,
    endDate: string,
    tagType: TagType,
    tagName: string,
  ) => {
    if (isDateToday(startDate) || isDatePast(startDate)) {
      // 시작 날짜가 오늘이거나 지났을 경우에만 D-Day 계산
      if (isDateToday(endDate)) {
        tags.push(<Tag key={tagType} type={tagType} content={`${tagName} D-Day`} />);
      } else if (!isDatePast(endDate)) {
        const dayDiff = calculateDayDiff(endDate);
        tags.push(<Tag key={tagType} type={tagType} content={`${tagName} D-${dayDiff}`} />);
      }
    }
  };

  // 대회 신청 D-Day 및 마감 태그 추가
  addDdayTagIfNeeded(
    competiton.registrationStartDate,
    competiton.registrationEndDate,
    'apply',
    '신청마감',
  );

  // 단독출전 조정기간 D-Day 및 마감 태그 추가
  addDdayTagIfNeeded(
    competiton.soloRegistrationAdjustmentStartDate,
    competiton.soloRegistrationAdjustmentEndDate,
    'soloApply',
    '단독출전조정 마감',
  );

  // 신청마감 태그 추가 (대회 신청 및 단독출전 조정기간 모두 지났을 경우)
  if (
    areBothDatesPassed(competiton.registrationEndDate, competiton.soloRegistrationAdjustmentEndDate)
  ) {
    tags.push(<Tag key="deadline" type="deadline" content="신청마감" />);
  }

  return <div className={styles.tagListWrapper}>{tags}</div>;
}
