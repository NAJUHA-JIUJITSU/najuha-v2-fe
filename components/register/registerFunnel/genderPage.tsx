'use client';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import RadioButtonLabel from '../../common/radioButtonLabel';
import { useState } from 'react';

interface GenderPageProps {
  onNext: (data: string) => void;
  data: string;
}

export default function genderPage({ onNext, data }: GenderPageProps) {
  const [gender, setGender] = useState<string>(data);

  return (
    <div className={styles.wrapper}>
      {/* 성별 선택 */}
      <label className={styles.label}>성별을 선택해주세요</label>
      <RadioButtonLabel
        msg={'남성'}
        isChecked={gender === 'MALE'}
        changeCheck={() => setGender('MALE')}
        isUnderlined={true}
      />
      <RadioButtonLabel
        msg={'여성'}
        isChecked={gender === 'FEMALE'}
        changeCheck={() => setGender('FEMALE')}
        isUnderlined={true}
      />

      {/* 다음 버튼 */}
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color={gender ? 'blue' : 'disabled'}
          width="full"
          size="large"
          onClick={() => onNext(gender)}
        />
      </div>
    </div>
  );
}
