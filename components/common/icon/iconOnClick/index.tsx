'use client';
import React from 'react';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import IconClear from '@/public/svgs/clear.svg';
import useGoBack from '@/hooks/useGoBack';

interface Props {
  icon: React.ReactNode;
  onClick: () => void;
}

function ButtonIcon({ icon, onClick }: Props) {
  return <button onClick={onClick}>{icon}</button>;
}

function ButtonIconNavigateBefore() {
  const goBack = useGoBack();

  return <ButtonIcon icon={<IconNavigateBefore />} onClick={goBack}></ButtonIcon>;
}

function ButtonIconNavigateClear() {
  const goBack = useGoBack();
  const handleButtonClick = () => {
    const userConfirmed = window.confirm(
      '페이지를 벗어나면 작성 중인 내용이 모두 사라져요. 그래도 이동하시겠어요?',
    );
    if (userConfirmed) {
      goBack();
    }
  };

  return <ButtonIcon icon={<IconClear />} onClick={handleButtonClick}></ButtonIcon>;
}

export { ButtonIcon, ButtonIconNavigateBefore, ButtonIconNavigateClear };
