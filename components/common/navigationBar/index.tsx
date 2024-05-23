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

export default function navigationBar() {
  //현재 url 확인 후 해당 메뉴 스타일 변경
  const currentPath = usePathname();
  const logoItem = { href: '/', icon: <IconLogo />, label: '홈' };
  const menuItems = [
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
  ];
  const loginItems = [
    { href: '/login', label: '로그인' },
    { href: '/logout', label: '로그아웃' },
  ];

  //로그인 여부 확인
  const isLogin = false;

  return (
    <div className={styles.wrapper}>
      <NavigationMenu
        key={logoItem.label}
        href={logoItem.href}
        icon={logoItem.icon}
        isActive={false}
        isLogo={true}
      />
      {menuItems.map((item) => (
        <NavigationMenu
          key={item.label}
          href={item.href}
          icon={item.icon}
          label={item.label}
          isButton={item.isButton}
          isActive={currentPath === item.href}
          onClick={item.onClick}
        />
      ))}
      {/* todo: 로그인 여부 확인 후 적절한 버튼 렌더 */}
      <div className={styles.loginWrapper}>
        {isLogin ? (
          <NavigationMenu
            key={loginItems[1].label}
            href={loginItems[1].href}
            label={loginItems[1].label}
            isButton={true}
            isActive={false}
          />
        ) : (
          <NavigationMenu
            key={loginItems[0].label}
            href={loginItems[0].href}
            label={loginItems[0].label}
            isButton={true}
            isActive={false}
          />
        )}
      </div>
    </div>
  );
}
