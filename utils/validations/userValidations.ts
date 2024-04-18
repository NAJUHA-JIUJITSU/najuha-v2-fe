interface ValidateFunction {
  (
    value: string,
    setErrMsg: (errMsg: string) => void,
    setSuccessMsg?: (successMsg: string) => void,
    setValue?: (value: string) => void,
  ): boolean;
}

export const validateBirthdate: ValidateFunction = (inputBirth, setErrMsg, setValue) => {
  const numericValue = inputBirth.replace(/[^0-9]/g, '');
  const formattedBirth = `${numericValue.slice(0, 4)}${
    numericValue.length > 4 ? '/' + numericValue.slice(4, 6) : ''
  }${numericValue.length > 6 ? '/' + numericValue.slice(6, 8) : ''}`;

  if (inputBirth !== formattedBirth && setValue) {
    setValue(formattedBirth); // 형식화된 값을 입력 값으로 업데이트
  }

  if (formattedBirth.length === 10) {
    const parts = formattedBirth.split('/');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 월은 0부터 시작하는 JavaScript의 Date 객체에 맞게 조정
    const day = parseInt(parts[2], 10);

    const birthDate = new Date(year, month, day);
    const isValidDate =
      birthDate.getFullYear() === year &&
      birthDate.getMonth() === month &&
      birthDate.getDate() === day;

    // 정확하게 날짜인지 체크
    if (isValidDate) {
      setErrMsg('');
      return true;
    }
  }

  setErrMsg('유효한 날짜를 입력해주세요.');
  return false;
};

export const validateNickname: ValidateFunction = (
  nickname,
  setErrMsg,
  setValue,
  setSuccessMsg,
) => {
  // 벨류가 바뀌면 성공 메시지 초기화
  if (setSuccessMsg) setSuccessMsg('');

  // 자음, 모음, 영문, 숫자만 허용
  const formattedNickname = nickname.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]/g, '');
  if (nickname !== formattedNickname) {
    if (setValue) setValue(formattedNickname);
  }

  // 닉네임 길이가 2자 미만인 경우
  if (nickname.length < 2) {
    setErrMsg('닉네임은 2자 이상 입력해주세요.');
    return false;
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
  // 6자리까지만 입력되도록 숫자만 추출

  const numericValue = verificationNumber.replace(/[^0-9]/g, '').slice(0, 6);

  if (numericValue !== verificationNumber) {
    if (setValue) setValue(numericValue);
  }

  if (numericValue.length !== 6) {
    setErrMsg('인증번호 4자리를 입력해주세요.');
    return false;
  }
  setErrMsg('');
  return true;
};

// make validategeder function
// only allow '남성' or '여성'
export const validateGender: ValidateFunction = (gender, setErrMsg, setValue) => {
  if (gender === '남성' || gender === '여성') {
    setErrMsg('');
    return true;
  }
  setErrMsg('남성 혹은 여성을 입력해주세요.');
  return false;
};

export const validateTrue: ValidateFunction = (email, setErrMsg, setValue) => {
  return true;
};
