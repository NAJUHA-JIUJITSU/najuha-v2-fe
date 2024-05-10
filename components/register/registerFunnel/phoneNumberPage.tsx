'use client';
import { useCallback } from 'react';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { phoneNumberState } from '@/recoil/atoms/registerState';
import { useInput } from '@/hooks/useInput';
import { useSendAuthCode } from '@/hooks/register';
import { validatePhonenumber } from '@/utils/validations/userValidations';

interface PhoneNumberProps {
  onNext: () => void;
}

export default function Phonenumber({ onNext }: PhoneNumberProps) {
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberState);
  const { value, setValue, errMsg, setErrMsg, validate } = useInput(
    phoneNumber,
    validatePhonenumber,
  );
  const { mutate: sendAuthCode, isPending } = useSendAuthCode();

  const handleButtonClick = useCallback(() => {
    sendAuthCode(value, {
      onSuccess: (res) => {
        console.log(res);
        setPhoneNumber(value);
        onNext();
      },
      onError: (error: any) => {
        console.log(error);
        setErrMsg('전화번호 인증 중 오류가 발생했습니다.');
      },
    });
  }, [value]);

  return (
    <>
      <div className={stlyes.wrapper}>
        <Input
          label="휴대폰 번호를 입력해주세요"
          placeholder="010-1234-1234"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          errMsg={errMsg}
          autoFocus={true}
        />
      </div>
      <div className={stlyes.submit}>
        <ButtonOnClick
          type="filled"
          text="인증번호 받기"
          color={validate && !isPending ? 'blue' : 'disabled'}
          width="full"
          size="large"
          disabled={!validate || isPending}
          onClick={handleButtonClick}
        />
      </div>
    </>
  );
}
