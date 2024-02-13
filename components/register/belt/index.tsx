'use client';

import Select from '@/components/common/select';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';
import { ValidState, useBeltSelection } from '@/hook/useBeltSelection';

interface Props {
  onNext: () => void;
}

const options = ['화이트', '블루', '퍼플', '브라운', '블랙'];

const Belt: React.FC<Props> = ({ onNext }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const { belt, setBelt, validState } = useBeltSelection(user.belt || null);

  const handleNext = () => {
    if (validState === ValidState.VALID && belt) {
      setUser((prev) => ({
        ...prev,
        belt,
      }));
      onNext();
    }
  };

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
          onClick={handleNext}
        />
      </div>
    </>
  );
};

export default Belt;
