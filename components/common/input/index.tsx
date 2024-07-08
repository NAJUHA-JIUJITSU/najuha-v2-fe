import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

interface Props {
  label?: string;
  placeholder: string;
  value?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errMsg?: string | null;
  successMsg?: string | null;
  disabled?: boolean;
  autoFocus?: boolean;
  width?: 'full' | null;
  type?: 'text' | 'password' | 'datetime-local';
  name?: string;
}

const Input: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
  errMsg,
  successMsg = '',
  disabled = false,
  autoFocus = false,
  width = null,
  type = 'text',
  name,
}) => {
  const inputClassName = clsx(styles.input, {
    [styles.error]: !!errMsg && successMsg === '',
    [styles.success]: successMsg !== '',
  });

  const fullWidthClassName = width === 'full' ? styles.fullWidth : '';
  const safeValue = value === null ? undefined : value;
  return (
    <div className={clsx(styles.wrapper, fullWidthClassName)}>
      <label className={styles.label}>{label}</label>
      <input
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        value={safeValue}
        onChange={onChange}
        disabled={disabled} //todo: isLoading중일때도 비활성화 되게 하기
        autoFocus={autoFocus}
        name={name}
      />
      {successMsg === '' && <div className={styles.errorMsg}>{errMsg}</div>}
      {successMsg !== '' && <div className={styles.successMsg}>{successMsg}</div>}
    </div>
  );
};

export default Input;
