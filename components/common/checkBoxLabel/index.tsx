import React from 'react';
import styles from './index.module.scss';
import IconCheckboxOff from '@/public/svgs/checkboxOff.svg';
import IconCheckboxOn from '@/public/svgs/checkboxOn.svg';

interface Props {
  msg?: string;
  onClick?: () => void;
  isChecked?: boolean;
  rightIcon?: React.ReactNode;
}

const CheckBoxLabel = React.memo(({ msg, onClick, isChecked = false, rightIcon }: Props) => {
  return (
    <div>
      <div className={styles.checkbox} onClick={onClick}>
        {isChecked ? <IconCheckboxOn /> : <IconCheckboxOff />}
        <div>{msg}</div>
      </div>
      {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
    </div>
  );
});

export default CheckBoxLabel;
