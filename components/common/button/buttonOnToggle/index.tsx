'use client';
import styles from '../button.module.scss';
import clsx from 'clsx';

type ButtonType = 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'black' | 'pink' | 'infoBlue';
type ButtonShape = 'tag' | 'tap' | 'reaction';

interface BaseButtonProps {
  type: ButtonType;
  color: ButtonColor;
  size: ButtonSize;
  shape: ButtonShape;
  iconLeft?: React.ReactNode;
  text: string;
  isToggled?: boolean;
  onToggle?: () => void;
  asd?: () => void;
}

export default function ButtonOnToggle({
  type,
  color,
  size,
  shape,
  iconLeft,
  text,
  isToggled = false,
  onToggle = () => {},
}: BaseButtonProps) {
  const typeColor = `${type}-${color}`;

  return (
    <button
      className={clsx(styles.wrapper, styles[typeColor], styles[size], styles[shape], {
        [styles.isNotToggled]: !isToggled,
      })}
      onClick={onToggle}
    >
      {iconLeft && <div className={styles.svg}>{iconLeft}</div>}
      <div>{text}</div>
    </button>
  );
}
