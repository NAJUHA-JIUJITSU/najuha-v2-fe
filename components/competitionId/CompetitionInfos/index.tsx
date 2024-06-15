import styles from './index.module.scss';
import { formatDateYMDWeekday } from '@/utils/dateUtils/dateFormat';
import CopyText from '@/components/copyText';
import { ICompetition } from '@/node_modules/najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';
import { IEarlybirdDiscountSnapshot } from 'najuha-v2-api/lib/modules/competitions/domain/interface/earlybird-discount-snapshot.interface';

type CompetitionInfosProps = Pick<
  ICompetition,
  | 'title'
  | 'competitionDate'
  | 'address'
  | 'registrationEndDate'
  | 'registrationListOpenDate'
  | 'bracketOpenDate'
> & {
  earlybirdEndDate: Pick<IEarlybirdDiscountSnapshot, 'earlybirdEndDate'>['earlybirdEndDate'];
};

export default function CompetitionInfos(props: CompetitionInfosProps) {
  const infoItems = [
    {
      label: '일정',
      value: props.competitionDate ? formatDateYMDWeekday(props.competitionDate.toString()) : 'N/A',
    },
    { label: '주소', value: props.address, isCopyable: true },
    { label: '참가비', value: '하단 부문표 참고' },
    {
      label: '얼리버드 마감',
      value: props.earlybirdEndDate
        ? formatDateYMDWeekday(props.earlybirdEndDate.toString())
        : 'N/A',
    },
    {
      label: '참가신청 마감',
      value: props.registrationEndDate
        ? formatDateYMDWeekday(props.registrationEndDate.toString())
        : 'N/A',
    },
    {
      label: '참가자 공개',
      value: props.registrationListOpenDate
        ? formatDateYMDWeekday(props.registrationListOpenDate.toString())
        : 'N/A',
    },
    {
      label: '대진표 공개',
      value: props.bracketOpenDate ? formatDateYMDWeekday(props.bracketOpenDate.toString()) : 'N/A',
    },
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
