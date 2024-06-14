import Link from 'next/link';
import clsx from 'clsx';
import styles from './index.module.scss';

type MenuType = 'button' | 'link' | 'logo' | 'login';

interface BaseNavigationMenuProps {
  menuType: MenuType;
  isActive: boolean;
  icon?: JSX.Element;
  label?: string;
  onClick?: () => void;
  href?: string;
}

export default function NavigationMenu({
  isActive,
  menuType,
  icon,
  label,
  onClick,
  href,
}: BaseNavigationMenuProps) {
  const wrapperClassName = clsx(
    styles.wrapper,
    { [styles.logoWrapper]: menuType === 'logo' },
    { [styles.loginWrapper]: menuType === 'login' },
  );

  const className = clsx(
    styles.menu,
    { [styles.active]: isActive },
    { [styles.buttonMenu]: menuType === 'button' || menuType === 'login' },
    { [styles.linkMenu]: menuType === 'link' || menuType === 'logo' },
  );

  if (menuType === 'button' || menuType === 'login') {
    return (
      <div className={wrapperClassName}>
        <button className={className} onClick={onClick}>
          {icon}
          {label && <span>{label}</span>}
        </button>
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      <Link href={href || ''} className={className}>
        {icon}
        {label && <span>{label}</span>}
      </Link>
    </div>
  );
}
