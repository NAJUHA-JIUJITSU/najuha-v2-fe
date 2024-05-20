import Link from 'next/link';
import clsx from 'clsx';
import styles from './index.module.scss';

interface navigationMenuProps {
  href?: string;
  icon: JSX.Element;
  label?: string;
  isButton?: boolean;
  isActive: boolean;
  onClick?: () => void;
}

export default function navigationMenu({
  href,
  icon,
  label,
  isButton = false,
  isActive,
  onClick,
}: navigationMenuProps) {
  const className = clsx(styles.menu, { [styles.active]: isActive });

  if (isButton) {
    return (
      <div className={styles.wrapper}>
        <button className={className} onClick={onClick}>
          {icon}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Link href={href || ''} className={className}>
        {icon}
        <span>{label}</span>
      </Link>
    </div>
  );
}
