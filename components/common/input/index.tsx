import React from 'react';
import styles from './index.module.scss';
import { useState } from 'react';

interface Props {
  label?: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errMsg?: string | null;
  disabled?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
  errMsg,
  disabled = false,
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled} //todo: isLoading중일때도 비활성화 되게 하기
      />
      <div className={styles.errorMsg}>{errMsg}</div>
    </div>
  );
};

export default Input;
