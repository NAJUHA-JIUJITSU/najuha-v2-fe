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
  const inputClassName = clsx(styles.input, {
    [styles.error]: !!errMsg && successMsg === '',
    [styles.success]: successMsg !== '',
  });

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input
        className={inputClassName}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled} //todo: isLoading중일때도 비활성화 되게 하기
      />
      {successMsg === '' && <div className={styles.errorMsg}>{errMsg}</div>}
      {successMsg !== '' && <div className={styles.successMsg}>{successMsg}</div>}
    </div>
  );
};

export default Input;
