import React, { useState, useEffect } from 'react';
import Input from '@/components/common/input';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';

interface Props {
  onNext: () => void;
}

const NICKNAME_MIN = 2;
const NICKNAME_MAX = 16;
const NICKNAME_REGIX = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/;

enum ValidState {
  EMPTY,
  TOO_SHORT_OR_LONG,
  INVALID_CHARS,
  VALID,
}

const errorMsgMap = {
  [ValidState.EMPTY]: null,
  [ValidState.TOO_SHORT_OR_LONG]: `닉네임은 ${NICKNAME_MIN}자 이상 ${NICKNAME_MAX}자 이하로 입력해주세요.`,
  [ValidState.INVALID_CHARS]: '닉네임은 한글, 영문, 숫자만 입력 가능합니다.',
  [ValidState.VALID]: null,
};

const rules = {
  isEmpty: (nickname: string) => nickname.length === 0,
  isTooShortOrLong: (nickname: string) =>
    nickname.length < NICKNAME_MIN || nickname.length > NICKNAME_MAX,
  hasInvalidChars: (nickname: string) => !NICKNAME_REGIX.test(nickname),
};

const validateNickname = (nickname: string): ValidState => {
  if (rules.isEmpty(nickname)) return ValidState.EMPTY;
  if (rules.isTooShortOrLong(nickname)) return ValidState.TOO_SHORT_OR_LONG;
  if (rules.hasInvalidChars(nickname)) return ValidState.INVALID_CHARS;
  return ValidState.VALID;
};

// TODO: 닉네임 중복확인 로직 추가
// TODO: 부적절한 닉네임일 확인
const Nickname = ({ onNext }: Props) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [nickname, setNickname] = useState<string>(user.nickname || '');
  const [validState, setValidState] = useState(ValidState.EMPTY);

  useEffect(() => {
    setValidState(validateNickname(nickname));
    if (validState === ValidState.VALID) {
      setUser((prevUser) => ({
        ...prevUser,
        nickname,
      }));
    }
  }, [nickname]);

  return (
    <>
      <div className={styles.wrapper}>
        <Input
          label="원하시는 닉네임을 입력해주세요"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          errMsg={errorMsgMap[validState]}
        />
        <div className={styles.check}>
          <ButtonOnClick
            type="filled"
            text="중복확인"
            color="blue"
            width="normal"
            size="small"
            disabled={validState !== ValidState.VALID}
            onClick={() => {}}
          />
        </div>
      </div>
      <div className={styles.submit}>
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
};

export default Nickname;
