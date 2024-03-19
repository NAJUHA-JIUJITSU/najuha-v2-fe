import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { init } from 'next/dist/compiled/webpack/webpack';

// i wonder type of setState
// i gonna get setState from parent component
interface Props {
  options: string[];
  setState: any;
  initialState?: string;
}

const Select = ({ options, setState, initialState }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialState);
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
    <div className={styles.dropdown}>
      <div className={styles.trigger} onClick={toggleDropdown}>
        {selectedOption === null ? (
          <div className={styles.example}>벨트 선택</div>
        ) : (
          <div className={styles.selectedOption}>{selectedOption}</div>
        )}
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
  );
};

export default Select;
