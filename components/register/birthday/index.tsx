import React, { useState, useEffect } from 'react';
import Input from '@/components/common/input';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';

interface Props {
  onNext: () => void;
}

enum BirthValidationState {
  EMPTY,
  TOO_SHORT,
  INVALID_DATE,
  VALID,
}

const birthErrMsgMap = {
  [BirthValidationState.EMPTY]: null,
  [BirthValidationState.TOO_SHORT]: 'YYYY-MM-DD 형식으로 입력해주세요.',
  [BirthValidationState.INVALID_DATE]: '유효한 날짜를 입력해주세요.',
  [BirthValidationState.VALID]: null,
};

const formatBirthInput = (inputBirth: string) => {
  const numericValue = inputBirth.replace(/[^0-9]/g, '');
  const formattedBirth =
    numericValue.slice(0, 4) +
    (numericValue.length > 4 ? '-' + numericValue.slice(4, 6) : '') +
    (numericValue.length > 6 ? '-' + numericValue.slice(6, 8) : '');
  return formattedBirth;
};

const validBirthDate = (birthDate: string): BirthValidationState => {
  if (birthDate === '') return BirthValidationState.EMPTY;
  if (birthDate.length < 10) return BirthValidationState.TOO_SHORT;
  if (isNaN(Date.parse(birthDate))) return BirthValidationState.INVALID_DATE;
  return BirthValidationState.VALID;
};

export default function Birthday({ onNext }: Props) {
  const [user, setUser] = useRecoilState(userAtom);
  const [birth, setBirth] = useState<string>('');
  const [birthValidationState, setBirthValidationState] = useState<BirthValidationState>(
    BirthValidationState.EMPTY,
  );

  const birthInputHandler = (inputBirth: string) => {
    const formattedBirth = formatBirthInput(inputBirth);
    const birthBirthValidationState = validBirthDate(formattedBirth);
    setBirth(formattedBirth);
    setBirthValidationState(birthBirthValidationState);
    setUser((user) => ({
      ...user,
      birth: formattedBirth.replace(/-/g, ''),
    }));
  };

  useEffect(() => {
    birthInputHandler(birth);
  }, [birth]);

  return (
    <>
      <div className={styles.wrapper}>
        <Input
          label="생년월일을 입력해주세요"
          placeholder="YYYY-MM-DD"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          errMsg={birthErrMsgMap[birthValidationState]}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color={birthValidationState === BirthValidationState.VALID ? 'blue' : 'disabled'}
          width="full"
          size="large"
          onClick={onNext}
        />
      </div>
    </>
  );
}

// 'use client';
// import { useState, useEffect } from 'react';
// import Input from '@/components/common/input';
// import stlyes from './index.module.scss';
// import ButtonOnClick from '@/components/common/button/buttonOnClick';

// export default function Birthday({ onNext }: any) {
//   const [birth, setBirth] = useState<string>('');
//   const [birthErrMsg, setBirthErrMsg] = useState<string | null>('에러 메시지');

//   //validateBirth 함수
//   const validateBirth = (inputBirth: string) => {
//     // 입력된 값에서 숫자만 추출
//     const numericValue = inputBirth.replace(/[^0-9]/g, '');

//     // 숫자를 'YYYY/MM/DD' 형식으로 변환
//     const formattedBirth =
//       numericValue.slice(0, 4) +
//       (numericValue.length > 4 ? '/' + numericValue.slice(4, 6) : '') +
//       (numericValue.length > 6 ? '/' + numericValue.slice(6, 8) : '');

//     // 실시간으로 형식에 맞게 업데이트
//     setBirth(formattedBirth);

//     // 8자리를 모두 입력한 경우에만 검증
//     if (formattedBirth.length === 10) {
//       const year = formattedBirth.substring(0, 4);
//       const month = formattedBirth.substring(5, 7);
//       const day = formattedBirth.substring(8, 10);

//       // 실제로 존재하는 날짜인지 검증
//       const isValidDate = !isNaN(Date.parse(`${year}-${month}-${day}`));

//       if (!isValidDate) {
//         setBirthErrMsg('유효한 날짜를 입력해주세요.');
//         return false;
//       }
//     }

//     setBirthErrMsg(null);
//     return true;
//   };

//   useEffect(() => {
//     validateBirth(birth);
//     }, [birth]);

//   return (
//     <>
//       <div className={stlyes.wrapper}>
//         <Input
//           label="생년월일을 입력해주세요"
//           placeholder="YYYY/MM/DD"
//           value={birth}
//           onChange={(e) => setBirth(e.target.value)}
//           errMsg={birthErrMsg}
//         />
//       </div>
//       <div className={stlyes.submit}>
//         <ButtonOnClick
//           type="filled"
//           text="약관전체 동의"
//           color="blue"
//           width="full"
//           size="large"
//           onClick={onNext}
//         />
//       </div>
//     </>
//   );
// }
