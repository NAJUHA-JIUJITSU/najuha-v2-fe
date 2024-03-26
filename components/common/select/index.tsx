import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import NavigateMore from '@/public/svgs/navigateMore.svg';
import useOutsideClick from '@/hooks/useOutsideClick';

type SelectType = 'outlined' | 'filled';

interface Props {
  type?: SelectType;
  label?: string;
  options: string[];
  setState: any;
  value: string;
  placeholder: string;
}

const Select = ({ type = 'outlined', label, options, setState, value, placeholder }: Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option: any) => {
    setState(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  // 외부 클릭시 isOpen 상태 변경
  useOutsideClick(wrapperRef, () => setIsOpen(false));

  // 외부 클릭시 isOpen 상태 변경
  //Todo: react에서는 이런식으로 이벤트를 등록하는게 맞는지 확인
  // useEffect(() => {
  //   const handleClickOutside = (e: any) => {
  //     if (e.target.closest(`.${styles.wrapper}`) === null) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener('click', handleClickOutside);
  //   return () => document.removeEventListener('click', handleClickOutside);
  // }, []);

  // initialState가 변경되면 selectedOption 상태도 업데이트
  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  return (
    <div ref={wrapperRef} className={`${styles.wrapper} ${styles[type]}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.dropdown}>
        <div className={styles.trigger} onClick={toggleDropdown}>
          {selectedOption === '' ? (
            <div className={styles.example}>{placeholder}</div>
          ) : (
            <div className={styles.selectedOption}>{selectedOption}</div>
          )}
          <NavigateMore />
        </div>
        {isOpen && (
          <div className={styles.menu}>
            {options.map((option: any, index: any) => (
              <div key={index} className={styles.option} onClick={() => selectOption(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
