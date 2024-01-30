'use client';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import Header from '@/components/common/header/Header';
import styles from './index.module.scss';
import RadioButtonLabel from '@/components/common/radioButtonLabel';
import useCheckboxState from '@/hook/useCheckbox';
import { useEffect, useState } from 'react';
import Input from '@/components/common/input';


export default function Gender() {
  const [gender, setGender] = useState<string | null>('male');

  const [birth, setBirth] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [test, setTest] = useState<string>('');

  const [birthErrMsg, setBirthErrMsg] = useState<string | null>('에러 메시지');
  const [nicknameErrMsg, setNicknameErrMsg] = useState<string | null>('에러 메시지');

  //validateBirth 함수
  const validateBirth = (inputBirth: string) => {
    // 입력된 값에서 숫자만 추출
    const numericValue = inputBirth.replace(/[^0-9]/g, '');

    // 숫자를 'YYYY/MM/DD' 형식으로 변환
    const formattedBirth =
      numericValue.slice(0, 4) +
      (numericValue.length > 4 ? '/' + numericValue.slice(4, 6) : '') +
      (numericValue.length > 6 ? '/' + numericValue.slice(6, 8) : '');

    // 실시간으로 형식에 맞게 업데이트
    setBirth(formattedBirth);

    // 8자리를 모두 입력한 경우에만 검증
    if (formattedBirth.length === 10) {
      const year = formattedBirth.substring(0, 4);
      const month = formattedBirth.substring(5, 7);
      const day = formattedBirth.substring(8, 10);

      // 실제로 존재하는 날짜인지 검증
      const isValidDate = !isNaN(Date.parse(`${year}-${month}-${day}`));

      if (!isValidDate) {
        setBirthErrMsg('유효한 날짜를 입력해주세요.');
        return false;
      }
    }

    setBirthErrMsg(null);
    return true;
  };

  //validateNickname 함수
  const validateNickname = (nickname: string) => {
    if (nickname.length === 0) {
      setNicknameErrMsg(null);
      return true;
    } else if (nickname.length < 2 || nickname.length > 8) {
      setNicknameErrMsg('닉네임은 2자 이상 8자 이하로 입력해주세요.');
      return false;
    } else if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/.test(nickname)) {
      setNicknameErrMsg('닉네임은 한글, 영문, 숫자만 입력 가능합니다.');
      return false;
    } else {
      setNicknameErrMsg(null);
      return true;
    }
  };

  useEffect(() => {
    validateBirth(birth);
  }, [birth]);

  useEffect(() => {
    validateNickname(nickname);
  }, [nickname]);

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={'회원가입'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      <RadioButtonLabel
        msg={'남성'}
        isChecked={gender === 'male'}
        changeCheck={() => setGender('male')}
      />
      <RadioButtonLabel
        msg={'여성'}
        isChecked={gender === 'female'}
        changeCheck={() => setGender('female')}
      />
      <Input
        label="생년월일을 입력해주세요"
        placeholder="YYYY/MM/DD"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
        errMsg={birthErrMsg}
      />
      <Input
        label="원하시는 닉네임을 입력해주세요"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        errMsg={nicknameErrMsg}
      />
      <Input
        placeholder="라벨없는 인풋입니다."
        value={test}
        onChange={(e) => setTest(e.target.value)}
      />
    </div>
  );
}
