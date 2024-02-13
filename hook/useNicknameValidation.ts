import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getUserByNickname } from '@/api/users';
import { accessTokenAtom } from '@/recoil/accessTokenAtom';

const NICKNAME_MIN = 2;
const NICKNAME_MAX = 16;
const NICKNAME_REGEX = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/;

export enum ValidState {
  EMPTY,
  TOO_SHORT_OR_LONG,
  INVALID_CHARS,
  BEFORE_DUPLICATED_CHECK,
  DUPLICATED_NICKNAME,
  VALID,
}

interface ErrorMessageMap {
  [key: number]: string | null;
}

const errorMsgMap: ErrorMessageMap = {
  [ValidState.EMPTY]: null,
  [ValidState.TOO_SHORT_OR_LONG]: `닉네임은 ${NICKNAME_MIN}자 이상 ${NICKNAME_MAX}자 이하로 입력해주세요.`,
  [ValidState.INVALID_CHARS]: '닉네임은 한글, 영문, 숫자만 입력 가능합니다.',
  [ValidState.BEFORE_DUPLICATED_CHECK]: null,
  [ValidState.DUPLICATED_NICKNAME]: '이미 사용중인 닉네임입니다.',
  [ValidState.VALID]: null,
};

const validateNickname = (nickname: string): ValidState => {
  if (nickname.length === 0) return ValidState.EMPTY;
  if (nickname.length < NICKNAME_MIN || nickname.length > NICKNAME_MAX)
    return ValidState.TOO_SHORT_OR_LONG;
  if (!NICKNAME_REGEX.test(nickname)) return ValidState.INVALID_CHARS;
  return ValidState.BEFORE_DUPLICATED_CHECK;
};

export const useNicknameValidation = (initialNickname = '') => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [nickname, setNickname] = useState<string>(initialNickname);
  const [validState, setValidState] = useState<ValidState>(ValidState.EMPTY);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    handleUpdateNickname(nickname);
  }, [nickname]);

  const handleUpdateNickname = (inputNickname: string) => {
    const newValidState = validateNickname(inputNickname);
    setNickname(inputNickname);
    setValidState(newValidState);
    setErrorMsg(errorMsgMap[newValidState]);
  };

  const checkDuplicatedNickname = async (nickname: string) => {
    const data = await getUserByNickname(nickname, accessToken);
    if (data) {
      setValidState(ValidState.DUPLICATED_NICKNAME);
      setErrorMsg(errorMsgMap[ValidState.DUPLICATED_NICKNAME]);
    } else {
      setValidState(ValidState.VALID);
      setErrorMsg(errorMsgMap[ValidState.VALID]);
    }
  };

  return { nickname, setNickname, validState, errorMsg, checkDuplicatedNickname };
};
