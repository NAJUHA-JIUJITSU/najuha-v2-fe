'use client';
import Select from '@/components/common/select';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { beltState } from '@/recoil/atoms/registerState';
import { useRegister } from '@/hook/register';

const options = ['화이트', '블루', '퍼플', '브라운', '블랙'];

export default function Belt() {
  const [belt, setBelt] = useRecoilState(beltState);
  const { mutate, isPending } = useRegister();

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
          color={isPending ? 'disabled' : 'blue'}
          width="full"
          size="large"
          disabled={isPending}
          onClick={mutate}
        />
      </div>
    </>
  );
}
