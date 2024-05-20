import styles from './index.module.scss';
import ButtonLink from '@/components/common/button/buttonLink';

export default function LoginFooter() {
  return (
    <div className={styles.footer}>
      <ButtonLink text="문의하기" size="large" type="caption" color="gray" href="/najuhaOfficial" />
      <div className={styles.seperateBar}></div>
      <ButtonLink text="둘러보기" size="large" type="caption" color="gray" href="/" />
    </div>
  );
}
