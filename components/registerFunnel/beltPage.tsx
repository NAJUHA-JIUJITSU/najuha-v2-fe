'use client';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import Select from '@/components/common/select';
import { useState } from 'react';

const options = ['벨트 없음', '화이트', '블루', '퍼플', '브라운', '블랙'];

interface BirthPageProps {
  onNext: (data: string) => void;
  data: string;
}

export default function beltPage({ onNext, data }: BirthPageProps) {
  const [belts, setBelts] = useState(data);

  return (
    <div className={styles.wrapper}>
      {/* 벨트 선택 */}
      <label className={styles.label}>주짓수 벨트를 선택해주세요</label>
      <Select options={options} setState={setBelts}></Select>
      {/* 다음 버튼 */}
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="회원가입 완료"
          color={belts ? 'blue' : 'disabled'}
          width="full"
          size="large"
          onClick={() => onNext(belts)}
        />
      </div>
    </div>
  );
}
