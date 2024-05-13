import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

export default function CheckApplyInfoPage({
  onNext,
  applyInfo,
}: {
  onNext: () => void;
  applyInfo: any;
}) {
  const playerInfo = applyInfo.playerInfo;
  const teamInfo = applyInfo.teamInfo;
  const selectedDivision = applyInfo.selectedDivision;
  const selectedDicisionId = applyInfo.selectedDicisionId;

  // 가격조회 호출 api 필요

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <div className={styles.title}>신청인</div>
          <div className={styles.row}>
            <div className={styles.subtitle}>이름</div>
            <div className={styles.content}>{playerInfo.name}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.subtitle}>전화번호</div>
            <div className={styles.content}>{playerInfo.phoneNumber}</div>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.title}>소속</div>
          <div className={styles.row}>
            <div className={styles.subtitle}>소속 네트워크</div>
            <div className={styles.content}>{teamInfo.network}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.subtitle}>소속 팀</div>
            <div className={styles.content}>{teamInfo.team}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.subtitle}>관장님 성함</div>
            <div className={styles.content}>{teamInfo.master}</div>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.title}>참가선수</div>
          <div className={styles.selectedDivision}>
            <div className={styles.player}>
              {playerInfo.name} {playerInfo.gender} {playerInfo.birth} {playerInfo.belt}
            </div>

            <div className={styles.divisions}>
              {selectedDivision.map((division: any, index: any) => (
                <div key={index} className={styles.division}>
                  <div className={styles.category}>{division.uniform}</div>
                  <div className={styles.category}>{division.belt}</div>
                  <div className={styles.category}>{division.category}</div>
                  <div className={styles.category}>{division.weight}</div>
                </div>
              ))}
            </div>
            <div className={styles.price}>50,000원</div>
          </div>
        </div>
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="저장하기"
          color="disabled"
          width="full"
          size="large"
          onClick={onNext}
        />
        <ButtonOnClick
          type="filled"
          text="결제하기"
          color="blue"
          width="full"
          size="large"
          onClick={onNext}
        />
      </div>
    </>
  );
}
