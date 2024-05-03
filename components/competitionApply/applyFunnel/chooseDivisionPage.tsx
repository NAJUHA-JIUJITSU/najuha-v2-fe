import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import IconRefresh from '@/public/svgs/refresh.svg';

const playerInfo = {
  name: '홍길동',
  birth: '980404',
  belt: '블루',
  gender: '남성',
};

const chooseDivison = [
  {
    gi: '기',
    division: '초등부123',
    belt: '화이트 유색 통합',
    weight: '-100앱솔',
  },
  {
    gi: '기',
    division: '초등부123',
    belt: '화이트 유색 통합',
    weight: '-100앱솔',
  },
];

export default function ChooseDivisionPage({ onNext }: { onNext: () => void }) {
  return (
    <>
      <div className={styles.wrapper}>
        {/* 컴포넌트로 아래 분리하는게 좋겠나? */}
        <div className={styles.playerInfoList}>
          <div>{playerInfo.name}</div>
          <div>{playerInfo.gender}</div>
          <div>{playerInfo.birth}</div>
          <div>{playerInfo.belt}</div>
        </div>
        <div className={styles.divisionColumn}>
          <div>기/노기</div>
          <div>부문</div>
          <div>벨트</div>
          <div>체급</div>
        </div>
        {chooseDivison.map((division) => (
          <div className={styles.divisionRow}>
            <div>{division.gi || '-'}</div>
            <div>{division.division || '-'}</div>
            <div>{division.belt || '-'}</div>
            <div>{division.weight || '-'}</div>
          </div>
        ))}
        {/* 컴포넌트로 아래 분리할거임 */}
        <div className={styles.chooseDivisonBox}>
          <div className={styles.chooseDivisonBoxHeader}>
            <div className={styles.icon}>
              <IconNavigateBefore />
              <div className={styles.iconComment}>이전</div>
            </div>
            <div className={styles.icon}>
              <IconRefresh />
              <div className={styles.iconComment}>초기화</div>
            </div>
          </div>
          <div className={styles.divisionOptionCardList}>
            <div className={styles.divisionOptionCard}>화이트</div>
            <div className={styles.divisionOptionCard}>화이트</div>
            <div className={styles.divisionOptionCard}>화이트</div>
            <div className={styles.divisionOptionCard}>화이트</div>
            <div className={styles.divisionOptionCard}>화이트</div>
            <div className={styles.divisionOptionCard}>화이트</div>
            <div className={styles.divisionOptionCard}>블루</div>
          </div>
        </div>
      </div>

      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color="blue"
          width="full"
          size="large"
          onClick={onNext}
        />
      </div>
    </>
  );
}
