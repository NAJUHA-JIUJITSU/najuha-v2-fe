'use client';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { isDateFuture } from '@/utils/dateUtils/dateCheck';
import { ICompetition } from '@/node_modules/najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';

type CompetitionInfoButtonListProps = Pick<
  ICompetition,
  'registrationListOpenDate' | 'bracketOpenDate'
>;

export default function CompetitionInfoButtonList({
  registrationListOpenDate,
  bracketOpenDate,
}: CompetitionInfoButtonListProps) {
  //open날짜가 오늘보다 이후면(오지 않았으면) 버튼 비활성화 true
  const isRegistrationListClosed = isDateFuture(registrationListOpenDate);
  const isBracketClosed = isDateFuture(bracketOpenDate);

  const onClickRegistrationList = () => {
    //todo: 참가자 명단 페이지로 이동
    alert('참가자 명단 페이지로 이동');
  };

  const onClickBracket = () => {
    //todo: 대진표 페이지로 이동
    alert('대진표 페이지로 이동');
  };

  return (
    <div className={styles.wrapper}>
      <ButtonOnClick
        type="filled"
        width="full"
        size="medium"
        color="lightblue"
        text="참가자 명단"
        onClick={onClickRegistrationList}
        disabled={isRegistrationListClosed}
      />
      <ButtonOnClick
        type="filled"
        width="full"
        size="medium"
        color="lightblue"
        text="대진표"
        onClick={onClickBracket}
        disabled={isBracketClosed}
      />
    </div>
  );
}
