'use client';
import Select from '@/components/common/select';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { beltState } from '@/recoil/atoms/registerState';
import { useRegister } from '@/hooks/register';
import { use } from 'react';

const options = ['화이트', '블루', '퍼플', '브라운', '블랙'];

interface BeltProps {
  onNext: () => void;
  isPending?: boolean;
  submitText?: string;
}

export default function Belt({ onNext, isPending, submitText = '회원가입 완료' }: BeltProps) {
  const [belt, setBelt] = useRecoilState(beltState);

  const handleButtonClick = () => {
    onNext();
  };

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
          text={submitText}
          color={isPending ? 'disabled' : 'blue'}
          width="full"
          size="large"
          disabled={isPending}
          onClick={handleButtonClick}
        />
      </div>
    </>
  );
}
