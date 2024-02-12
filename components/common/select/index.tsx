// import React, { useState } from 'react';
// import styles from './index.module.scss';
// import NavigateMore from '@/public/svgs/navigateMore.svg';

// // i wonder type of setState
// // i gonna get setState from parent component
// interface Props {
//   label?: string;
//   options: string[];
//   setState: any;
// }

// const Select = ({ label, options, setState }: Props) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const toggleDropdown = () => setIsOpen(!isOpen);
//   const selectOption = (option: any) => {
//     setState(option);
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

//   return (
//     <div className={styles.wrapper}>
//       <label className={styles.label}>{label}</label>
//       <div className={styles.dropdown}>
//         <div className={styles.trigger} onClick={toggleDropdown}>
//           {selectedOption === null ? (
//             <div className={styles.example}>벨트선택</div>
//           ) : (
//             <div className={styles.selectedOption}>{selectedOption}</div>
//           )}
//           <NavigateMore />
//         </div>
//         {isOpen && (
//           <div className={styles.menu}>
//             {options.map((option: any, index: any) => (
//               <div key={index} className={styles.option} onClick={() => selectOption(option)}>
//                 {option}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Select;

import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import NavigateMore from '@/public/svgs/navigateMore.svg';

interface Props {
  label?: string;
  options: string[];
  value: string | null;
  setState: (value: string) => void; // Clarified type
}

const Select = ({ label, options, value, setState }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(value || null);

  // Effect to update selectedOption if value prop changes
  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option: string) => {
    setState(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.dropdown} onClick={toggleDropdown}>
        <div className={styles.trigger}>
          {selectedOption === null ? (
            <div className={styles.example}>벨트선택</div>
          ) : (
            <div className={styles.selectedOption}>{selectedOption}</div>
          )}
          <NavigateMore />
        </div>
        {isOpen && (
          <div className={styles.menu}>
            {options.map((option, index) => (
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
