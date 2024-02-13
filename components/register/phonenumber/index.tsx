import React from 'react';
import Input from '@/components/common/input';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { usePhoneNumberValidation } from '@/hook/usePhoneNumberValidation';
import { ValidState } from '@/hook/usePhoneNumberValidation';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';

interface Props {
  onNext: () => void;
}

const PhoneNumber: React.FC<Props> = ({ onNext }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const { phoneNumber, setPhoneNumber, validState, errorMessage } = usePhoneNumberValidation(
    user.phoneNumber || '',
  );

  const handleNext = () => {
    if (validState === ValidState.VALID) {
      setUser((prevUser) => ({
        ...prevUser,
        phoneNumber: phoneNumber.replace(/-/g, ''),
      }));
      onNext();
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Input
          label="휴대폰 번호를 입력해주세요"
          placeholder="010-1234-5678"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          errMsg={errorMessage}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="전화번호 인증"
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

export default PhoneNumber;
