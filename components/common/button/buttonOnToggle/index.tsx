'use client';
import styles from './index.module.scss';
import clsx from 'clsx';

// 기본 버튼 타입 정의
interface BaseButtonProps {
  iconLeft?: React.ReactNode;
  text: string;
  isToggled?: boolean;
  onToggle?: () => void;
  asd?: () => void;
}

// 각 버튼 타입에 따른 타입 정의
interface TagButtonProps extends BaseButtonProps {
  type: 'tag';
  color?: 'black';
}

interface TapButtonProps extends BaseButtonProps {
  type: 'tap';
  color?: 'black';
}

interface ReactionButtonProps extends BaseButtonProps {
  type: 'reaction';
  color: 'pink' | 'infoBlue';
}

// 버튼 타입 정의
type ButtonProps = TagButtonProps | TapButtonProps | ReactionButtonProps;

export default function ButtonOnToggle(props: ButtonProps) {
  const { type, color = 'black', iconLeft, text, isToggled, onToggle } = props;
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
