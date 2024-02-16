'use client';

import Select from '@/components/common/select';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '@/recoil/userAtom';
import { ValidState, useBeltValidation } from '@/hook/useBeltValidation';
import { patchTemporaryUser } from '@/api/register';
import { accessTokenAtom } from '@/recoil/accessTokenAtom';

interface Props {
  onNext: () => void;
}

const options = ['화이트', '블루', '퍼플', '브라운', '블랙'];

const Belt: React.FC<Props> = ({ onNext }) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const { belt, setBelt, validState } = useBeltValidation(user.belt || null);

  const handleNext = () => {
    if (validState === ValidState.VALID && belt) {
      setUser((prev) => ({
        ...prev,
        belt,
      }));
      patchTemporaryUser(accessToken, { belt });
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
