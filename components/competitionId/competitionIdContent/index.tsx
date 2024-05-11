import styles from './index.module.scss';
import { Competition } from '@/interfaces/CompetitionInfo';
import CompetitionBanner from '@/components/competitionId/CompetitionBanner';
import CompetitionInfos from '@/components/competitionId/CompetitionInfos';
import CompetitionInfoButtonList from '@/components/competitionId/CompetitionInfoButtonList';
import CompetitionDetails from '@/components/competitionId/CompetitionDetails';
import ButtonLink from '@/components/common/button/buttonLink';

interface CompetitionIdContentProps {
  competition: Competition;
}

//todo: 각 컴포넌트에서 직접 데이터를 받아와도 되는지 확인
//리액트 쿼리를 이용하면 각 컴포넌트에서 여러번 api를 호출해도 최초 호출시에만 api를 호출하고 그 이후에는 캐시된 데이터를 사용하니까 괜찮을 것 같습니다.??

export default function CompetitionIdContent({ competition }: CompetitionIdContentProps) {
  // imageURL이 없으면 기본 이미지로 대체
  if (!competition.posterImgUrlKey) {
    competition.posterImgUrlKey = '/images/samplePoster1.png';
  }
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
            earlybirdEndDate={
              competition.earlybirdDiscountSnapshots[
                competition.earlybirdDiscountSnapshots.length - 1
              ]?.earlybirdEndDate || ''
            } //todo: earlybirdDiscountSnapshots 가장 마지막 데이터로 수정
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
          DetailedInfo: [
            {
              title: '시합접수',
              content: '- 시합 접수내용\n - 시합 접수내용',
            },
            {
              title: '대회규정',
              content: '대회 규정내용',
            },
          ],
          DivisionTable: [
            {
              title: '부문표',
              content: '부문표 내용',
            },
            {
              title: '상금표',
              content: '상금표 내용',
            },
          ],
          Timetable: [
            {
              title: '타임테이블',
              content: '타임테이블 내용',
            },
          ],
        }}
      ></CompetitionDetails>

      {/* 참가하기 버튼 */}
      <ButtonLink
        type="filled"
        size="large"
        color="blue"
        width="full"
        text="참가하기"
        position="fixed"
        href="/login"
      />
    </div>
  );
}
