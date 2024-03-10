'use client';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Select from '@/components/common/select/index';

const options = [
  '옵션 1',
  '옵션 2',
  '옵션 3',
  '옵션 4',
  '옵션 5',
  '옵션 6',
  '옵션 7',
  '옵션 8',
  '옵션 9',
  '옵션 10',
];

export default function Belt() {
  const [state, setState] = useState(null);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className={styles.wrapper}>
      <Select options={options} setState={setState} />
    </div>
  );
}
