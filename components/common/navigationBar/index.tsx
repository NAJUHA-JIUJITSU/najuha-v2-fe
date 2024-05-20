'use client';
import styles from './index.module.scss';
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
  const menuItems = [
    { href: '/', icon: <IconHome />, label: '홈' },
    { href: '/community', icon: <IconBook />, label: '게시판' },
    {
      icon: <IconAddCircle />,
      label: '등록',
      isButton: true,
      onClick: () => alert('등록 모달 창 생성'),
    },
    { href: '/applicationList', icon: <IconCard />, label: '신청내역' },
    { href: '/profile', icon: <IconProfile />, label: '프로필' },
  ];

  return (
    <div className={styles.wrapper}>
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
    </div>
  );
}
