import { useState, useEffect } from 'react';
import { getCheckNicknameDuplication } from '@/api/register';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '@/atom/accessTokenState';

function useNicknameValidation(initialNickname: string) {
  const [nickname, setNickname] = useState(initialNickname);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  // 닉네임 유효성 검사
  const validateNickname = (nickname: string) => {
    setIsNicknameChecked(false); // 유효성 검사 시작 시 기존 검사 상태 초기화(다음 버튼 비활성화)
    setSuccessMessage(null); // 유효성 검사 시작 시 기존 메시지 초기화
    if (nickname.length < 2 || nickname.length > 8) {
      setErrorMessage('닉네임은 2자 이상 8자 이하로 입력해주세요.');
      setIsValid(false);
      return false;
    } else if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/.test(nickname)) {
      setErrorMessage('닉네임은 공백을 제외한 한글, 영문, 숫자만 입력 가능합니다.');
      setIsValid(false);
      return false;
    } else {
      setErrorMessage(null);
      setIsValid(true);
      return true;
    }
  };

  // 중복 체크 API 호출
  const checkNicknameDuplication = async () => {
    setIsLoading(true);

    //todo: 여기에 실제 서버 API 호출 로직 추가
    if (!accessToken) {
      throw new Error('accessToken이 없습니다.');
    }
    const isDuplication = await getCheckNicknameDuplication(nickname, accessToken);
    setIsLoading(false);
    if (isDuplication.data) {
      setErrorMessage('이미 사용중인 닉네임입니다.');
    } else {
      setSuccessMessage('사용 가능한 닉네임입니다.');
      setIsNicknameChecked(true);
    }
  };

  // 닉네임 입력값이 변경될 때마다 유효성 검사
  useEffect(() => {
    if (nickname) {
      validateNickname(nickname);
    }
  }, [nickname]);

  return {
    nickname,
    setNickname,
    isValid,
    isLoading,
    errorMessage,
    successMessage,
    checkNicknameDuplication,
    isNicknameChecked,
  };
}

export default useNicknameValidation;
