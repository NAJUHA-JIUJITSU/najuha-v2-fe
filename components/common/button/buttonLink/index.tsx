import styles from '../button.module.scss';
import Link from 'next/link';

type ButtonType = 'filled' | 'outlined' | 'text' | 'underlined' | 'caption';
type ButtonSize = 'small' | 'medium' | 'large' | 'xLarge';
type ButtonColor = 'blue' | 'lightblue' | 'black' | 'gray' | 'disabled';
//todo: disabled 처리하기

interface BaseButtonProps {
  type: ButtonType;
  size: ButtonSize;
  color: ButtonColor;
  iconLeft?: React.ReactNode;
  text: string;
  iconRight?: React.ReactNode;
  href: string;
}

export default function ButtonLink({
  iconLeft,
  text,
  iconRight,
  size,
  type,
  color,
  href,
}: BaseButtonProps) {
  const typeColor = `${type}-${color}`;
  return (
    <Link className={`${styles.wrapper} ${styles[typeColor]} ${styles[size]}`} href={href}>
      {iconLeft && <div className={styles.svg}>{iconLeft}</div>}
      <div>{text}</div>
      {iconRight && <div className={styles.svg}>{iconRight}</div>}
    </Link>
  );
}
