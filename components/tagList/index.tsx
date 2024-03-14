import styles from './index.module.scss';
import Tag from '@/components/tag';

interface TagListProps {
  info: {
    registrationStartDate: Date;
    registrationEndDate: Date;
    easyPayAvailable: boolean;
  };
}

export default function TagList({ info }: TagListProps) {
  const today = new Date();
  const registrationStartDate = new Date(info.registrationStartDate);
  const registrationEndDate = new Date(info.registrationEndDate);

  // 현재 날짜와 대회 신청 시작 및 마감 날짜 비교
  const startDiff = registrationStartDate.getTime() - today.getTime();
  const endDiff = registrationEndDate.getTime() - today.getTime();

  // 시작 및 마감 날짜까지 남은 일수 계산
  const startDayDiff = Math.ceil(startDiff / (1000 * 3600 * 24));
  const endDayDiff = Math.ceil(endDiff / (1000 * 3600 * 24));

  const tags = [];

  // 간편결제 유무에 따른 태그 추가
  if (info.easyPayAvailable) {
    tags.push(<Tag type="easyPay" content="간편결제" />);
  }

  // 대회 신청 D-Day 계산 및 태그 추가
  if (startDayDiff <= 0 && endDayDiff > 0) {
    // 대회 신청 시작일이 지났고 마감일이 남았을 경우
    tags.push(<Tag type="apply" content={`신청마감 D-${endDayDiff}`} />);
  } else if (endDayDiff === 0) {
    // 대회 신청 마감일이 바로 오늘일 경우
    tags.push(<Tag type="apply" content="신청마감 D-Day" />);
  } else if (endDayDiff < 0) {
    // 대회 신청 마감일이 지났을 경우
    tags.push(<Tag type="deadline" content="신청마감" />);
  }

  return <div className={styles.tagListWrapper}>{tags}</div>;
}
