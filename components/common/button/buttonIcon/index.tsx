'use client';
import React from 'react';
import IconNavigateBefore from '../../../../public/svgs/navigate_before.svg';
import useGoBack from '../../../../hook/useGoBack';

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

export { ButtonIconNavigateBefore };
