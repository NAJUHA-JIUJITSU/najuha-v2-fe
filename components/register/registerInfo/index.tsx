import styles from './index.module.scss';

export default function registerInfo() {
  return (
    <div className={styles.info}>
      <h1>
        안녕하세요 <span>홍길동</span>님!
        <br /> 회원가입을 진행해드릴게요
      </h1>
    </div>
  );
}
