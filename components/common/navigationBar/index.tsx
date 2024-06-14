'use client';
import styles from './index.module.scss';
import IconLogo from '@/public/svgs/logo.svg';
import IconHome from '@/public/svgs/home.svg';
import IconBook from '@/public/svgs/book.svg';
import IconAddCircle from '@/public/svgs/addCircle.svg';
import IconCard from '@/public/svgs/card.svg';
import IconProfile from '@/public/svgs/profile.svg';
import { usePathname } from 'next/navigation';
import NavigationMenu from './navigationMenu';
import { useAuth } from '@/hooks/useAuth';

type MenuType = 'button' | 'link' | 'logo' | 'login';

interface MenuItem {
  menuType: MenuType;
  href?: string;
  icon?: JSX.Element;
  label?: string;
  onClick?: () => void;
}

export default function NavigationBar() {
  const currentPath = usePathname();
  const { isLogin, login, logout } = useAuth();

  const menuItems: MenuItem[] = [
    { menuType: 'logo', href: '/', icon: <IconLogo /> },
    { menuType: 'link', href: '/', icon: <IconHome />, label: '홈' },
    { menuType: 'link', href: '/community', icon: <IconBook />, label: '게시판' },
    {
      menuType: 'button',
      icon: <IconAddCircle />,
      label: '게시글 등록',
      onClick: () => alert('등록 모달 창 생성'),
    },
    {
      menuType: 'link',
      href: '/applicationList',
      icon: <IconCard />,
      label: '신청내역',
    },
    { menuType: 'link', href: '/profile', icon: <IconProfile />, label: '프로필' },
    isLogin
      ? { menuType: 'login', label: '로그아웃', onClick: logout }
      : { menuType: 'login', label: '로그인', onClick: login },
  ];

  return (
    <div className={styles.wrapper}>
      {menuItems.map((item) => {
        const isActive = currentPath === item.href;
        return (
          <NavigationMenu
            key={`${item.menuType}-${item.href || item.label}`}
            menuType={item.menuType}
            href={item.href}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
}
