import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

export default function CheckApplyInfoPage({ onNext }: { onNext: () => void }) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <div className={styles.title}>신청인</div>
          <div className={styles.row}>
            <div className={styles.subtitle}>이름</div>
            <div className={styles.content}>홍길동</div>
          </div>
          <div className={styles.row}>
            <div className={styles.subtitle}>전화번호</div>
            <div className={styles.content}>010-1234-1234</div>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.title}>소속</div>
          <div className={styles.row}>
            <div className={styles.subtitle}>소속 네트워크</div>
            <div className={styles.content}>골든라이온</div>
          </div>
          <div className={styles.row}>
            <div className={styles.subtitle}>소속 팀</div>
            <div className={styles.content}>김포골든라이온</div>
          </div>
          <div className={styles.row}>
            <div className={styles.subtitle}>관장님 성함</div>
            <div className={styles.content}>김영태</div>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.title}>참가선수</div>
          <div className={styles.selectedDivision}>
            <div className={styles.player}>1. 홍길동 남자 980404 블루</div>

            <div className={styles.divisions}>
              <div className={styles.division}>
                <div className={styles.category}>노기</div>
                <div className={styles.category}>화이트&유색</div>
                <div className={styles.category}>초등부1-2</div>
                <div className={styles.category}>-76kg</div>
              </div>
              <div className={styles.division}>
                <div className={styles.category}>노기</div>
                <div className={styles.category}>화이트&유색</div>
                <div className={styles.category}>초등부1-2</div>
                <div className={styles.category}>-76kg</div>
              </div>
            </div>
            <div className={styles.price}>50,000원</div>
          </div>
          <div className={styles.selectedDivision}>
            <div className={styles.player}>2. 홍길동 남자 980404 블루</div>
            <div className={styles.divisions}>
              <div className={styles.division}>
                <div className={styles.category}>노기</div>
                <div className={styles.category}>화이트&유색</div>
                <div className={styles.category}>초등부1-2</div>
                <div className={styles.category}>-76kg</div>
              </div>
              <div className={styles.division}>
                <div className={styles.category}>노기</div>
                <div className={styles.category}>화이트&유색</div>
                <div className={styles.category}>초등부1-2</div>
                <div className={styles.category}>-76kg</div>
              </div>
            </div>

            <div className={styles.price}>50,000원</div>
          </div>
          <div className={styles.selectedDivision}>
            <div className={styles.player}>3. 홍길동 남자 980404 블루</div>
            <div className={styles.division}>
              <div className={styles.category}>노기</div>
              <div className={styles.category}>화이트&유색</div>
              <div className={styles.category}>초등부1-2</div>
              <div className={styles.category}>-76kg</div>
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
