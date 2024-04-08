import styles from './index.module.scss';
import { Competition } from '@/interfaces/CompetitionInfo';
import CompetitionBanner from '@/components/competitionId/CompetitionBanner';
import CompetitionInfos from '@/components/competitionId/CompetitionInfos';
import CompetitionInfoButtonList from '@/components/competitionId/CompetitionInfoButtonList';
import CompetitionDetails from '@/components/competitionId/CompetitionDetails';

interface CompetitionIdContentProps {
  competition: Competition;
}

//todo: 각 컴포넌트에서 직접 데이터를 받아와도 되는지 확인
//리액트 쿼리를 이용하면 각 컴포넌트에서 여러번 api를 호출해도 최초 호출시에만 api를 호출하고 그 이후에는 캐시된 데이터를 사용하니까 괜찮을 것 같습니다.??

export default function CompetitionIdContent({ competition }: CompetitionIdContentProps) {
  return (
    <div className={styles.wrapper}>
      {/* 대회 상세페이지 상단 */}
      <div className={styles.topContent}>
        {/* 대회 배너 */}
        <CompetitionBanner
          posterImg={competition.posterImgUrlKey}
          viewCnt={competition.viewCount}
        ></CompetitionBanner>

        {/* 대회 기본 정보 */}
        <div className={styles.CompetitionInfoWrapper}>
          <CompetitionInfos
            title={competition.title}
            competitionDate={competition.competitionDate}
            address={competition.address}
            earlybirdEndDate={competition.earlybirdDiscountSnapshots[0]?.earlybirdEndDate && ''} //todo: earlybirdDiscountSnapshots 가장 마지막 데이터로 수정
            registrationEndDate={competition.registrationEndDate}
            registrationListOpenDate={competition.registrationListOpenDate}
            bracketOpenDate={competition.bracketOpenDate}
          ></CompetitionInfos>
          <CompetitionInfoButtonList
            registrationListOpenDate={competition.registrationListOpenDate}
            bracketOpenDate={competition.bracketOpenDate}
          ></CompetitionInfoButtonList>
        </div>
      </div>

      {/* 게시판 광고 */}
      {/* <Ad></Ad> */}

      {/* 대회 상세 정보 */}
      <CompetitionDetails
        description={{
          DetailedInfo: competition.description,
          PrizeInfo: '부문/상금표',
          Timetable: '타임 테이블',
        }}
      ></CompetitionDetails>
    </div>
  );
}
