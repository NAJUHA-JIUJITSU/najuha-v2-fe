import styles from './index.module.scss';
import { formatDateYMDWeekday } from '@/utils/dateUtils/dateFormat';
import CopyText from '@/components/copyText';

interface CompetitionInfosProps {
  title: string;
  competitionDate: string;
  address: string;
  earlybirdEndDate: string;
  registrationEndDate: string;
  registrationListOpenDate: string;
  bracketOpenDate: string;
}

export default function CompetitionInfos(props: CompetitionInfosProps) {
  const infoItems = [
    { label: '일정', value: formatDateYMDWeekday(props.competitionDate) },
    { label: '주소', value: props.address, isCopyable: true },
    { label: '참가비', value: '하단 부문표 참고' },
    { label: '얼리버드 마감', value: formatDateYMDWeekday(props.earlybirdEndDate) },
    { label: '참가신청 마감', value: formatDateYMDWeekday(props.registrationEndDate) },
    { label: '참가자 공개', value: formatDateYMDWeekday(props.registrationListOpenDate) },
    { label: '대진표 공개', value: formatDateYMDWeekday(props.bracketOpenDate) },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{props.title}</div>
      <ul className={styles.infoList}>
        {infoItems.map((item, index) => (
          <li key={index}>
            <div className={styles.label}>{item.label}</div>
            <div className={styles.value}>
              {item.value}{' '}
              {item.isCopyable && <CopyText copyText={props.address} alertText="주소" />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
