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

const menuItems = [
  { href: '/', icon: <IconLogo />, label: '로고', isLogo: true },
  { href: '/', icon: <IconHome />, label: '홈' },
  { href: '/community', icon: <IconBook />, label: '게시판' },
  {
    icon: <IconAddCircle />,
    label: '게시글 등록',
    isButton: true,
    onClick: () => alert('등록 모달 창 생성'),
  },
  { href: '/applicationList', icon: <IconCard />, label: '신청내역' },
  { href: '/profile', icon: <IconProfile />, label: '프로필' },
  { href: '/login', label: '로그인', isLogin: true },
];
export default function NavigationBar() {
  const currentPath = usePathname();
  const { isLogin, logout } = useAuth();

  return (
    <div className={styles.wrapper}>
      {menuItems.map((item) => {
        if (item.label === '로그인' && isLogin) {
          return (
            <NavigationMenu
              key="logout"
              label="로그아웃"
              isButton={true}
              isLogin={true}
              onClick={logout}
              isActive={false}
            />
          );
        }

        if (item.label === '로고') {
          return (
            <NavigationMenu
              key={item.label}
              href={item.href}
              icon={item.icon}
              isLogo={item.isLogo}
              isActive={false}
            />
          );
        }

        return (
          <NavigationMenu
            key={item.label}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isButton={item.isButton}
            isLogo={item.isLogo}
            isLogin={item.isLogin}
            isActive={currentPath === item.href}
            onClick={item.onClick}
          />
        );
      })}
    </div>
  );
}
