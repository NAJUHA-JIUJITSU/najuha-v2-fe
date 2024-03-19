import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import NavigateMore from '@/public/svgs/navigateMore.svg';

// i wonder type of setState
// i gonna get setState from parent component
interface Props {
  label?: string;
  options: string[];
  setState: any;
  value: string;
  placeholder: string;
}

const Select = ({ label, options, setState, value, placeholder }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option: any) => {
    setState(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    // initialState가 변경되면 selectedOption 상태도 업데이트
    setSelectedOption(initialState);
  }, [initialState]); // initialState를 의존성 배열에 추가

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
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
