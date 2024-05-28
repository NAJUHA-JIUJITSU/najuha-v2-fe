import Link from 'next/link';
import clsx from 'clsx';
import styles from './index.module.scss';

//todo: 옵셔널 최소한으로 사용하도록 수정
interface navigationMenuProps {
  href?: string;
  icon?: JSX.Element;
  label?: string;
  isButton?: boolean;
  isLogo?: boolean;
  isLogin?: boolean;
  isActive: boolean;
  onClick?: () => void;
}

export default function navigationMenu({
  href,
  icon,
  label,
  isButton = false,
  isLogo = false,
  isLogin = false,
  isActive,
  onClick,
}: navigationMenuProps) {
  const className = clsx(
    styles.menu,
    { [styles.active]: isActive },
    { [styles.buttonMenu]: isButton },
  );

  return (
    <div
      className={clsx(
        styles.wrapper,
        { [styles.logoWrapper]: isLogo },
        { [styles.loginWrapper]: isLogin },
      )}
    >
      {isButton ? (
        <button className={className} onClick={onClick}>
          {icon && icon}
          {label && <span>{label}</span>}
        </button>
      ) : (
        <Link href={href || ''} className={className}>
          {icon && icon}
          {label && <span>{label}</span>}
        </Link>
      )}
    </div>
  );
}
