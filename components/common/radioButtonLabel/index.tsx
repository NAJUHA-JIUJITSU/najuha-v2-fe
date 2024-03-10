import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import IconRadionButtonOn from '@/public/svgs/radioButtonOn.svg';
import IconRadionButtonOff from '@/public/svgs/radioButtonOff.svg';

interface Props {
  msg?: string;
  changeCheck: () => void;
  isChecked?: boolean;
  radioSide?: 'left' | 'right';
  isUnderlined?: boolean;
}

const RadioButtonLabel: React.FC<Props> = ({
  msg,
  isChecked = false,
  radioSide = 'right',
  changeCheck,
  isUnderlined = false,
}) => {
  function renderRadioIcon() {
    return <div>{isChecked ? <IconRadionButtonOn /> : <IconRadionButtonOff />}</div>;
  }

  return (
    <div
      className={clsx(styles.wrapper, { [styles.isUnderlined]: isUnderlined })}
      onClick={changeCheck}
    >
      {radioSide === 'left' && renderRadioIcon()}
      <div className={styles.message}>{msg}</div>
      {radioSide === 'right' && renderRadioIcon()}
    </div>
  );
};

export default RadioButtonLabel;
