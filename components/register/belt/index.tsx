'use client';
import { useState } from 'react';
import Select from '@/components/common/select';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useAccessToken } from '@/hook/useAccesstoken';
import { useRecoilState } from 'recoil';
import { beltState } from '@/recoil/atoms/registerState';

const options = ['화이트', '블루', '퍼플', '브라운', '블랙'];

export default function Belt({ onNext }: any) {
  const [belt, setBelt] = useRecoilState(beltState);
  const { accessToken, updateAccessToken } = useAccessToken();

  return (
    <>
      <div className={stlyes.wrapper}>
        <Select
          label="주짓수 벨트를 설정해주세요"
          placeholder="벨트선택"
          value={belt}
          options={options}
          setState={setBelt}
        ></Select>
      </div>
      <div className={stlyes.submit}>
        <ButtonOnClick
          type="filled"
          text="회원가입 완료"
          color="blue"
          width="full"
          size="large"
          onClick={() => {}}
        />
      </div>
    </>
  );
}
