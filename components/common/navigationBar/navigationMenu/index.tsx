import Link from 'next/link';
import clsx from 'clsx';
import styles from './index.module.scss';

interface navigationMenuProps {
  href?: string;
  icon: JSX.Element;
  label?: string;
  isButton?: boolean;
  isLogo?: boolean;
  isActive: boolean;
  onClick?: () => void;
}

export default function navigationMenu({
  href,
  icon,
  label,
  isButton = false,
  isLogo = false,
  isActive,
  onClick,
}: navigationMenuProps) {
  const className = clsx(
    styles.menu,
    { [styles.active]: isActive },
    { [styles.buttonMenu]: isButton },
  );

  if (isButton) {
    return (
      <div className={styles.wrapper}>
        <button className={className} onClick={onClick}>
          {icon}
          {label && <span>{label}</span>}
        </button>
      </div>
    );
  }

  return (
    <div className={clsx(styles.wrapper, { [styles.logoWrapper]: isLogo })}>
      <Link href={href || ''} className={className}>
        {icon}
        {label && <span>{label}</span>}
      </Link>
    </div>
  );
}
