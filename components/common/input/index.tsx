import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

interface Props {
  label?: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errMsg?: string | null;
  successMsg?: string | null;
  disabled?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
  errMsg,
  successMsg,
  disabled = false,
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input
        className={clsx(
          styles.input,
          { [styles.errInput]: errMsg },
          { [styles.successInput]: successMsg },
        )}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <span
        className={clsx(
          styles.msg,
          { [styles.errorMsg]: errMsg },
          { [styles.successMsg]: successMsg },
        )}
      >
        {errMsg}
        {successMsg}
      </span>
    </div>
  );
};

export default Input;
