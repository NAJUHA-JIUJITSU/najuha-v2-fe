'use client';
import React from 'react';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import useGoBack from '@/hook/useGoBack';

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

function ButtonIconFunnelBefore({ onClick }: any) {
  return <ButtonIcon icon={<IconNavigateBefore />} onClick={onClick}></ButtonIcon>;
}

export { ButtonIconNavigateBefore, ButtonIconFunnelBefore };
