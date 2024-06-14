import styles from './header.module.scss';

interface Props {
  title?: React.ReactNode | string;
  leftIcon?: React.ReactNode;
  subtitle?: string;
  rightIcon1?: React.ReactNode;
  rightIcon2?: React.ReactNode;
}

export default function Header({ leftIcon, subtitle, title, rightIcon1, rightIcon2 }: Props) {
  return (
    <div className={styles.stickyWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
          {title && <div className={styles.title}>{title}</div>}
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>
        <div className={styles.right}>
          {rightIcon1 && <div className={styles.rightIcon1}>{rightIcon1}</div>}
          {rightIcon2 && <div className={styles.rightIcon2}>{rightIcon2}</div>}
        </div>
      </div>
    </div>
  );
}
