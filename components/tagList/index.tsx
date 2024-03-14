import styles from './index.module.scss';
import Tag from '@/components/tag';
import { isDatePast, isDateToday, calculateDayDiff, areBothDatesPassed } from '@/util/dateCheck';
import { TagType } from '@/components/tag';

interface TagListProps {
  info: {
    registrationStartDate: Date;
    registrationEndDate: Date;
    easyPayAvailable: boolean;
    soloRegistrationAdjustmentStartDate: Date;
    soloRegistrationAdjustmentEndDate: Date;
  };
}

export default function TagList({ info }: TagListProps) {
  const tags = [];

  // 간편결제 유무에 따른 태그 추가
  if (info.easyPayAvailable) {
    tags.push(<Tag type="easyPay" content="간편결제" />);
  }

  // D-Day 계산에 따른 태그 추가를 위한 함수
  const addDdayTagIfNeeded = (
    startDate: Date,
    endDate: Date,
    tagType: TagType,
    tagName: string,
  ) => {
    if (isDateToday(startDate) || isDatePast(startDate)) {
      // 시작 날짜가 오늘이거나 지났을 경우에만 D-Day 계산
      if (isDateToday(endDate)) {
        tags.push(<Tag type={tagType} content={`${tagName} D-Day`} />);
      } else if (!isDatePast(endDate)) {
        const dayDiff = calculateDayDiff(endDate);
        tags.push(<Tag type={tagType} content={`${tagName} D-${dayDiff}`} />);
      }
    }
  };

  // 대회 신청 D-Day 및 마감 태그 추가
  addDdayTagIfNeeded(info.registrationStartDate, info.registrationEndDate, 'apply', '신청마감');

  // 단독출전 조정기간 D-Day 및 마감 태그 추가
  addDdayTagIfNeeded(
    info.soloRegistrationAdjustmentStartDate,
    info.soloRegistrationAdjustmentEndDate,
    'soloApply',
    '단독출전조정 마감',
  );

  // 신청마감 태그 추가 (대회 신청 및 단독출전 조정기간 모두 지났을 경우)
  if (areBothDatesPassed(info.registrationEndDate, info.soloRegistrationAdjustmentEndDate)) {
    tags.push(<Tag type="deadline" content="신청마감" />);
  }

  return <div className={styles.tagListWrapper}>{tags}</div>;
}
