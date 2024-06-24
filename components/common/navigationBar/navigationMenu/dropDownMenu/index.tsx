import { useState, useRef } from 'react';
import Link from 'next/link';
import styles from '../index.module.scss';
import useOutsideClick from '@/hooks/useOutsideClick';

interface DropdownMenuProps {
  wrapperClassName: string;
  className: string;
  icon: JSX.Element;
  label: string;
}

export default function DropdownMenu({
  wrapperClassName,
  className,
  icon,
  label,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);
  const dropdownList = [
    { label: '게시글 등록', href: '/community/posts/create' },
    { label: '대회 등록', href: '/competition/create' },
    { label: '세미나 등록', href: '/seminar/create' },
    { label: '오픈매트 등록', href: '/openmat/create' },
  ];

  // 외부 클릭시 isOpen 상태 변경
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className={wrapperClassName}>
      <button ref={dropdownRef} className={className} onClick={() => setIsOpen(!isOpen)}>
        {icon}
        {label && <span>{label}</span>}
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          {dropdownList.map((item) => (
            <li key={label}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
