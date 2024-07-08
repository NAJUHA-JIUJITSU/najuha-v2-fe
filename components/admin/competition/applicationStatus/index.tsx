import { ICompetition } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';
import stlyes from './index.module.scss';

export default function ApplicationStatus({ competition }: { competition: ICompetition }) {
  console.log(competition);
  return (
    <div className={stlyes.box}>
      <div className={stlyes.wrapper}>
        <div className={stlyes.container}>
          <div className={stlyes.item}>파트너쉽 여부</div>
          <div className={stlyes.item}>{`${competition.isPartnership}`}</div>
        </div>
        <div className={stlyes.container}>
          <div className={stlyes.item}>활성화 여부</div>
          <div className={stlyes.item}>{competition.status}</div>
        </div>
        <div className={stlyes.container}>
          <div className={stlyes.item}>참가자 수</div>
          <div className={stlyes.item}>api붙여</div>
        </div>
        <div className={stlyes.container}>
          <div className={stlyes.item}>참가 부문 수</div>
          <div className={stlyes.item}>api붙여</div>
        </div>
        <div className={stlyes.container}>
          <div className={stlyes.item}>결제 금액</div>
          <div className={stlyes.item}>api붙여</div>
        </div>
        <div className={stlyes.container}>
          <div className={stlyes.item}>포스터 이미지 여부</div>
          <div className={stlyes.item}>
            {competition.competitionPosterImages.length > 0 ? '유' : '무'}
          </div>
        </div>
      </div>
      <div className={stlyes.wrapper}>
        <div className={stlyes.container}>
          <div className={stlyes.item}>대진표 여부</div>
          <div className={stlyes.item}>api붙여</div>
        </div>
        <div className={stlyes.container}>
          <div className={stlyes.item}>추가정보 여부</div>
          <div className={stlyes.item}>
            {competition.requiredAdditionalInfos.length > 0
              ? competition.requiredAdditionalInfos.map((x) => {
                  return x.type;
                })
              : '무'}
          </div>
        </div>
        <div className={stlyes.container}>
          <div className={stlyes.item}>할인 여부</div>
          <div className={stlyes.item}>
            {competition.combinationDiscountSnapshots.length > 0 ? '유' : '무'}
          </div>
        </div>
        <div className={stlyes.container}>
          <div className={stlyes.item}>조회수</div>
          <div className={stlyes.item}>{competition.viewCount}</div>
        </div>
        <div className={stlyes.container}>
          <div className={stlyes.item}>등록일</div>
          <div className={stlyes.item}>{competition.createdAt.toLocaleString('ko-KR')}</div>
        </div>
        <div className={stlyes.container}>
          <div className={stlyes.item}>최근업데이트일</div>
          <div className={stlyes.item}>{competition.updatedAt.toLocaleString('ko-KR')}</div>
        </div>
      </div>
    </div>
  );
}
