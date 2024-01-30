import React, { useState } from 'react';
import styles from './index.module.scss';

// i wonder type of setState
// i gonna get setState from parent component
interface Props {
  options: string[];
  setState: any;
}

const Select = ({ options, setState }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option: any) => {
    setState(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.trigger} onClick={toggleDropdown}>
        {selectedOption === null ? (
          <div className={styles.example}>벨트선택</div>
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
