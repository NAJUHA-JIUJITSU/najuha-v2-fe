'use client';
import { useState, useEffect } from 'react';
import Input from '@/components/common/input';
import stlyes from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

export default function Nickname({ onNext }: any) {
  const [nickname, setNickname] = useState<string>('');
  const [nicknameErrMsg, setNicknameErrMsg] = useState<string | null>('에러 메시지');

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
    validateNickname(nickname);
  }, [nickname]);

  return (
    <>
      <div className={stlyes.wrapper}>
        <Input
          label="원하시는 닉네임을 입력해주세요"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          errMsg={nicknameErrMsg}
        />
        <div className={stlyes.check}>
          <ButtonOnClick
            type="filled"
            text="중복확인"
            color="disabled"
            width="normal"
            size="small"
            onClick={() => {}}
          />
        </div>
      </div>

      <div className={stlyes.submit}>
        <ButtonOnClick
          type="filled"
          text="약관전체 동의"
          color="blue"
          width="full"
          size="large"
          onClick={onNext}
        />
      </div>
    </>
  );
}
