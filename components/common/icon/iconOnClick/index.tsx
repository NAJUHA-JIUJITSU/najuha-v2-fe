'use client';
import React, { useState, useRef } from 'react';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import IconClear from '@/public/svgs/clear.svg';
import IconMoreVert from '@/public/svgs/moreVert.svg';
import useGoBack from '@/hooks/useGoBack';
import useOutsideClick from '@/hooks/useOutsideClick';
import styles from '../icon.module.scss';

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

// 페이지 벗어나기 전 확인
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

// 드롭다운 메뉴 아이콘
interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface ButtonIconMoreVertProps {
  isHost: boolean;
  hostDropdownList: DropdownItem[];
  normalDropdownList: DropdownItem[];
}

function ButtonIconMoreVert({
  isHost,
  hostDropdownList,
  normalDropdownList,
}: ButtonIconMoreVertProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (itemOnClick: () => void) => {
    itemOnClick();
    setIsOpen(false);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className={styles.wrapper}>
      <ButtonIcon icon={<IconMoreVert />} onClick={handleButtonClick}></ButtonIcon>
      {isOpen && (
        <ul className={styles.dropdown}>
          {isHost
            ? hostDropdownList.map((item, index) => (
                <li key={index} onClick={() => handleItemClick(item.onClick)}>
                  {item.label}
                </li>
              ))
            : normalDropdownList.map((item, index) => (
                <li key={index} onClick={() => handleItemClick(item.onClick)}>
                  {item.label}
                </li>
              ))}
        </ul>
      )}
    </div>
  );
}

export { ButtonIcon, ButtonIconNavigateBefore, ButtonIconNavigateClear, ButtonIconMoreVert };
