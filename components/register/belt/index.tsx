'use client';

import { useEffect, useState } from 'react';
import Select from '@/components/common/select';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';

const options = ['화이트', '블루', '퍼플', '브라운', '블랙'];

enum ValidState {
  EMPTY,
  VALID,
}

const validateBelts = (belts: string): ValidState => {
  if (!belts) return ValidState.EMPTY;
  return ValidState.VALID;
};

export default function Belt({ onNext }: { onNext: () => void }) {
  const [user, setUser] = useRecoilState(userAtom);
  const [belt, setBelt] = useState(user.belt || '');
  const [validState, setValidState] = useState<ValidState>(ValidState.EMPTY);

  useEffect(() => {
    const validState = validateBelts(belt);
    setValidState(validState);
    if (validState === ValidState.VALID) {
      console.log('belt', belt);
      console.log('user', user);
      setUser((prev) => ({
        ...prev,
        belt,
      }));
    }
  }, [belt]);

  return (
    <>
      <div className={stlyes.wrapper}>
        <Select
          label="주짓수 벨트를 설정해주세요"
          options={options}
          value={belt}
          setState={setBelt}
        />
      </div>
      <div className={stlyes.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color="blue"
          width="full"
          size="large"
          disabled={validState !== ValidState.VALID}
          onClick={onNext}
        />
      </div>
    </>
  );
}
