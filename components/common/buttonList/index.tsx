import styles from './index.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import NavigateNext from '@/public/svgs/navigateNext.svg';

interface buttonListProps {
  text: string;
  info?: string;
  href?: string;
  isUnderlined?: boolean;
}

export default function ButtonList({ text, info, href, isUnderlined = true }: buttonListProps) {
  const content = (
    <div className={clsx(styles.wrapper, { [styles.isUnderlined]: isUnderlined })}>
      <div className={styles.text}>{text}</div>
      <div className={styles.rightSection}>
        {info && <div className={styles.info}>{info}</div>}
        <div className={styles.rightIcon}>{href && <NavigateNext />}</div>
      </div>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : <>{content}</>;
}
