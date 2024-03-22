'use client';
import styles from './index.module.scss';
import clsx from 'clsx';

// 버튼 타입
type ButtonType = 'tap' | 'tag' | 'reaction';

// 각 버튼 타입에 따른 색상 정의
type TapTagColor = 'black';
type ReactionColor = 'pink' | 'infoBlue';

// 조건부 타입을 사용하여 색상을 버튼 타입에 따라 결정
type ButtonColor<T> = T extends 'reaction' ? ReactionColor : TapTagColor;

interface BaseButtonProps<T extends ButtonType> {
  type: T;
  color?: ButtonColor<T>; // 조건부 타입 사용
  iconLeft?: React.ReactNode;
  text: string;
  isToggled?: boolean;
  onToggle: () => void;
}

export default function ButtonOnToggle<T extends ButtonType>({
  type,
  color = 'black' as ButtonColor<T>,
  iconLeft,
  text,
  isToggled = false,
  onToggle,
}: BaseButtonProps<T>) {
  return (
    <button
      className={clsx(styles.wrapper, styles[type], styles[color], {
        [styles.isNotToggled]: !isToggled,
      })}
      onClick={onToggle}
    >
      {iconLeft && <div className={styles.svg}>{iconLeft}</div>}
      <div>{text}</div>
    </button>
  );
}
