import styles from './index.module.scss';

export default function LoginInfo() {
  return (
    <div className={styles.info}>
      <h1>
        지금 바로 <span>주짓수</span>의 모든 정보를 <span>한눈에</span> 확인해보세요
      </h1>
    </div>
  );
}
