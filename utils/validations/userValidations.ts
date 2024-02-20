interface ValidateFunction {
  (value: string, setErrMsg: (errMsg: string) => void, setValue?: (value: string) => void): boolean;
}

export const validateBirthdate: ValidateFunction = (inputBirth, setErrMsg, setValue) => {
  const numericValue = inputBirth.replace(/[^0-9]/g, '');
  const formattedBirth = `${numericValue.slice(0, 4)}${
    numericValue.length > 4 ? '/' + numericValue.slice(4, 6) : ''
  }${numericValue.length > 6 ? '/' + numericValue.slice(6, 8) : ''}`;

  // 입력된 값과 포맷된 값이 동일하지 않은 경우에만 업데이트
  if (inputBirth !== formattedBirth) {
    if (setValue) setValue(formattedBirth); // 형식화된 값을 입력 값으로 업데이트
  }

  const isValidDate = !isNaN(Date.parse(formattedBirth.replace(/\//g, '-')));
  if (isValidDate && formattedBirth.length === 10) {
    setErrMsg('');
    return true;
  } else {
    setErrMsg('유효한 날짜를 입력해주세요.');
    return false;
  }
};

export const validateNickname: ValidateFunction = (nickname, setErrMsg, setValue) => {
  // 자음, 모음, 영문, 숫자만 허용
  const formattedNickname = nickname.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]/g, '');
  if (nickname !== formattedNickname) {
    if (setValue) setValue(formattedNickname);
  }

  // 닉네임 길이가 8자를 초과하는 경우
  if (nickname.length > 8) {
    setErrMsg('닉네임은 8자 이하로 입력해주세요.');
    // 8자를 초과하는 부분 제거
    return false;
  }

  // 에러 메시지 초기화
  setErrMsg('');
  return true;
};

export const validatePhonenumber: ValidateFunction = (phoneNumber, setErrMsg, setValue) => {
  const numericValue = phoneNumber.replace(/[^0-9]/g, '');
  const formattedPhoneNumber = `${numericValue.slice(0, 3)}${
    numericValue.length > 3 ? '-' + numericValue.slice(3, 7) : ''
  }${numericValue.length > 7 ? '-' + numericValue.slice(7, 11) : ''}`;

  if (phoneNumber !== formattedPhoneNumber) {
    if (setValue) setValue(formattedPhoneNumber);
  }

  // 형식화된 번호가 원본과 다르고, 조건을 만족하지 않을 때만 업데이트
  if (numericValue.length !== 11) {
    setErrMsg('휴대폰 번호 11자리를 입력해주세요.');
    return false; // 유효성 검사 실패
  }
  setErrMsg(''); // 유효성 검사 통과
  return true;
};

export const validateVerificationNumber: ValidateFunction = (
  verificationNumber,
  setErrMsg,
  setValue,
) => {
  // 4자리까지만 입력되도록 숫자만 추출

  const numericValue = verificationNumber.replace(/[^0-9]/g, '').slice(0, 4);

  if (numericValue !== verificationNumber) {
    if (setValue) setValue(numericValue);
  }

  if (numericValue.length !== 4) {
    setErrMsg('인증번호 4자리를 입력해주세요.');
    return false;
  }
  setErrMsg('');
  return true;
};
