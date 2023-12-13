'use client';
import styles from '../button.module.scss';

type ButtonType = 'filled' | 'outlined' | 'text' | 'underlined' | 'caption';
type ButtonSize = 'small' | 'medium' | 'large' | 'xLarge';
type ButtonColor = 'blue' | 'lightblue' | 'black' | 'gray' | 'disabled';

interface BaseButtonProps {
  type: ButtonType;
  size: ButtonSize;
  color: ButtonColor;
  iconLeft?: React.ReactNode;
  text: string;
  iconRight?: React.ReactNode;
  onClick: () => void;
}

export default function ButtonOnClick({
  iconLeft,
  text,
  iconRight,
  size,
  type,
  color,
  onClick,
}: BaseButtonProps) {
  const typeColor = `${type}-${color}`;
  return (
    <button className={`${styles.wrapper} ${styles[typeColor]} ${styles[size]}`} onClick={onClick}>
      {iconLeft && <div className={styles.svg}>{iconLeft}</div>}
      <div>{text}</div>
      {iconRight && <div className={styles.svg}>{iconRight}</div>}
    </button>
  );
}
