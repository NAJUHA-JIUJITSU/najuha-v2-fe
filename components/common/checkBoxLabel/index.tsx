import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import IconCheckboxOff from '@/public/svgs/checkboxOff.svg';
import IconCheckboxOn from '@/public/svgs/checkboxOn.svg';

interface Props {
  msg?: string;
  // changeCheck: (value: string) => void;
  changeCheck: () => void;
  // changeCheck: any;
  isChecked?: boolean;
  rightIcon?: React.ReactNode;
  isUnderlined?: boolean;
}

const CheckBoxLabel = React.memo(
  ({ msg, changeCheck, isChecked = false, rightIcon = null, isUnderlined = false }: Props) => {
    return (
      <div className={clsx(styles.wrapper, { [styles.isUnderlined]: isUnderlined })}>
        <div className={styles.checkbox} onClick={changeCheck}>
          {isChecked ? <IconCheckboxOn /> : <IconCheckboxOff />}
          <div>{msg}</div>
        </div>
        {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
      </div>
    );
  },
);

export default CheckBoxLabel;
