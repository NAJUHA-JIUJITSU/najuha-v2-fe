import React from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';
import { useBirthValidation, ValidState } from '@/hook/useBirthValidation';
import Input from '@/components/common/input';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import styles from './index.module.scss';

interface Props {
  onNext: () => void;
}

const Birthday: React.FC<Props> = ({ onNext }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const { birth, setBirth, validationState, errorMessage } = useBirthValidation(user.birth || '');

  const handleNext = () => {
    if (validationState === ValidState.VALID) {
      setUser((prevUser) => ({
        ...prevUser,
        birth: birth.replace(/-/g, ''),
      }));
      onNext();
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Input
          label="생년월일을 입력해주세요"
          placeholder="YYYY-MM-DD"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          errMsg={errorMessage}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color="blue"
          width="full"
          size="large"
          disabled={validationState !== ValidState.VALID}
          onClick={handleNext}
        />
      </div>
    </>
  );
};

export default Birthday;
