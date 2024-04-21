import styles from '../button.module.scss';
import Link from 'next/link';
import clsx from 'clsx';

type ButtonType = 'filled' | 'outlined' | 'text' | 'underlined' | 'caption';
type ButtonSize = 'small' | 'medium' | 'large' | 'xLarge';
type ButtonColor = 'blue' | 'lightblue' | 'black' | 'gray' | 'disabled';
type Width = 'full' | 'normal';
type Position = 'fixed' | 'normal';
//todo: disabled 처리하기

interface BaseButtonProps {
  type: ButtonType;
  size: ButtonSize;
  width?: Width;
  position?: Position;
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
  width = 'normal',
  position = 'normal',
  type,
  color,
  href,
}: BaseButtonProps) {
  const typeColor = `${type}-${color}`;
  return (
    <div
      className={clsx({
        [styles.fixed]: position === 'fixed',
      })}
    >
      <Link
        className={`${styles.wrapper} ${styles[typeColor]} ${styles[size]} ${styles[width]}`}
        href={href}
      >
        {iconLeft && <div className={styles.svg}>{iconLeft}</div>}
        <div>{text}</div>
        {iconRight && <div className={styles.svg}>{iconRight}</div>}
      </Link>
    </div>
  );
}
