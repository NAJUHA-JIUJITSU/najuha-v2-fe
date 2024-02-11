'use client';
import styles from '../button.module.scss';

type ButtonType = 'filled' | 'outlined' | 'text' | 'underlined' | 'caption';
type ButtonSize = 'small' | 'medium' | 'large' | 'xLarge';
type ButtonColor = 'blue' | 'lightblue' | 'black' | 'gray' | 'disabled';
type Width = 'full' | 'normal';

interface BaseButtonProps {
  type: ButtonType;
  width?: Width;
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
  width = 'normal',
}: BaseButtonProps) {
  const typeColor = `${type}-${color}`;

  const handleClick = () => {
    if (color !== 'disabled') {
      onClick();
    }
  };

  return (
    <button
      className={`${styles.wrapper} ${styles[typeColor]} ${styles[size]} ${styles[width]}`}
      onClick={handleClick}
    >
      {iconLeft && <div className={styles.svg}>{iconLeft}</div>}
      <div>{text}</div>
      {iconRight && <div className={styles.svg}>{iconRight}</div>}
    </button>
  );
}
