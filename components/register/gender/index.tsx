'use client';
import styles from './index.module.scss';
import RadioButtonLabel from '@/components/common/radioButtonLabel';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useState } from 'react';

export default function Gender({ onNext }: any) {
  const [gender, setGender] = useState('male');

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.info}>성별을 선택해 주세요</div>
        <RadioButtonLabel
          msg={'남성'}
          isChecked={gender === 'male'}
          changeCheck={() => setGender('male')}
        />
        <RadioButtonLabel
          msg={'여성'}
          isChecked={gender === 'female'}
          changeCheck={() => setGender('female')}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="약관전체 동의"
          color="blue"
          width="full"
          size="large"
          onClick={onNext}
        />
      </div>
    </>
  );
}
