'use client';
import React from 'react';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
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

export { ButtonIcon, ButtonIconNavigateBefore };
