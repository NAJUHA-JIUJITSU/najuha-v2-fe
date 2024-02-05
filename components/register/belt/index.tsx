'use client';
import { useState, useEffect } from 'react';
import Select from '@/components/common/select';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

const options = ['화이트', '블루', '퍼플', '브라운', '블랙'];

export default function Belt({ onNext }: any) {
  const [belts, setBelts] = useState('');
  return (
    <>
      <div className={stlyes.wrapper}>
        <Select label="주짓수 벨트를 설정해주세요" options={options} setState={setBelts}></Select>
      </div>
      <div className={stlyes.submit}>
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
