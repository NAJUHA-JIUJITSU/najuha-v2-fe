'use client';
import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import IconLogo from '@/public/svgs/logo.svg';
import IconHome from '@/public/svgs/home.svg';
import IconBook from '@/public/svgs/book.svg';
import IconAddCircle from '@/public/svgs/addCircle.svg';
import IconCard from '@/public/svgs/card.svg';
import IconProfile from '@/public/svgs/profile.svg';
import { usePathname } from 'next/navigation';
import NavigationMenu from './navigationMenu';
import Cookies from 'js-cookie';

export default function navigationBar() {
  // 로그인 여부 관리
  const [isLogin, setIsLogin] = useState(false);

  // 쿠키에서 토큰 가져오기
  const token = Cookies.get('accessToken');

  // 로그아웃 버튼 클릭 시 쿠키 삭제
  const logout = () => {
    // 확인 대화상자 표시
    const confirmLogout = confirm(
      '작성 중인 정보가 있다면 모두 사라지며 홈으로 돌아가게 됩니다. 정말로 로그아웃 하시겠습니까?',
    );
    if (confirmLogout) {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      setIsLogin(false);
      // 홈으로 이동
      window.location.href = '/'; //todo: 최적화 필요
    }
  };

  //현재 url 확인 후 해당 메뉴 스타일 변경
  const currentPath = usePathname();
  const logoItem = { href: '/', icon: <IconLogo />, label: '로고' };
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
    { label: '로그아웃', isButton: true, onClick: logout },
  ];

  // userInfoSelector에서 가져온 값으로 로그인 여부 확인
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, []);

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
            isButton={loginItems[1].isButton}
            onClick={loginItems[1].onClick}
            isActive={false}
          />
        ) : (
          <NavigationMenu
            key={loginItems[0].label}
            href={loginItems[0].href}
            label={loginItems[0].label}
            isActive={false}
          />
        )}
      </div>
    </div>
  );
}
