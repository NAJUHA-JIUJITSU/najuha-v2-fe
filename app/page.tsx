import styles from './main.module.scss';
import AlarmIcon from '../public/svgs/alarm.svg';

export default function Home() {
  return (
    <>
      <div className={styles.first}>Hello World</div>
      <div className={styles.second}>Hello World</div>
      <div className={styles.third}>Hello World</div>
      <div className={styles.fourth}>Hello World</div>
      <div className={styles.fifth}>Hello World</div>
      <div className={styles.sixth}>Hello World</div>
      <h1>Hello World</h1>
      <h4>Hello World</h4>
      <AlarmIcon />
    </>
  );
}
