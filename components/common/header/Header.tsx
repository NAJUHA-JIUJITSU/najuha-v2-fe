import { ReactHTMLElement } from 'react';
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
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div>{leftIcon}</div>
        <div>{title}</div>
        <div>{subtitle}</div>
      </div>
      <div className={styles.right}>
        <div>{rightIcon1}</div>
        <div>{rightIcon2}</div>
      </div>
    </div>
  );
}
