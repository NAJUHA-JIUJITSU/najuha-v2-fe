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

enum EValidState {
  EMPTY,
  TOO_SHORT_OR_LONG,
  INVALID_CHARS,
  VALID,
}

const errorMsgMap = {
  [EValidState.EMPTY]: null,
  [EValidState.TOO_SHORT_OR_LONG]: `닉네임은 ${NICKNAME_MIN}자 이상 ${NICKNAME_MAX}자 이하로 입력해주세요.`,
  [EValidState.INVALID_CHARS]: '닉네임은 한글, 영문, 숫자만 입력 가능합니다.',
  [EValidState.VALID]: null,
};

const rules = {
  isEmpty: (nickname: string) => nickname.length === 0,
  isTooShortOrLong: (nickname: string) =>
    nickname.length < NICKNAME_MIN || nickname.length > NICKNAME_MAX,
  hasInvalidChars: (nickname: string) => !NICKNAME_REGIX.test(nickname),
};

const validateNickname = (nickname: string): EValidState => {
  if (rules.isEmpty(nickname)) return EValidState.EMPTY;
  if (rules.isTooShortOrLong(nickname)) return EValidState.TOO_SHORT_OR_LONG;
  if (rules.hasInvalidChars(nickname)) return EValidState.INVALID_CHARS;
  return EValidState.VALID;
};

// TODO: 닉네임 중복확인 로직 추가
// TODO: 부적절한 닉네임일 확인
export default function Nickname({ onNext }: Props) {
  const [user, setUser] = useRecoilState(userAtom);
  const [nickname, setNickname] = useState<string>(user.nickname || '');
  const [validState, setValidState] = useState(EValidState.EMPTY);

  useEffect(() => {
    setValidState(validateNickname(nickname));
    if (validState === EValidState.VALID) {
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
            disabled={validState !== EValidState.VALID}
            onClick={() => {}}
          />
        </div>
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="약관전체 동의"
          color="blue"
          width="full"
          size="large"
          disabled={validState !== EValidState.VALID}
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

// interface Props {
//   onNext: () => void;
// }

// export default function Nickname({ onNext }: Props) {
//   const [nickname, setNickname] = useState<string>('');
//   const [nicknameErrMsg, setNicknameErrMsg] = useState<string | null>('에러 메시지');

//   //validateNickname 함수
//   const validateNickname = (nickname: string) => {
//     if (nickname.length === 0) {
//       setNicknameErrMsg(null);
//       return true;
//     } else if (nickname.length < 2 || nickname.length > 8) {
//       setNicknameErrMsg('닉네임은 2자 이상 8자 이하로 입력해주세요.');
//       return false;
//     } else if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/.test(nickname)) {
//       setNicknameErrMsg('닉네임은 한글, 영문, 숫자만 입력 가능합니다.');
//       return false;
//     } else {
//       setNicknameErrMsg(null);
//       return true;
//     }
//   };

//   useEffect(() => {
//     validateNickname(nickname);
//   }, [nickname]);

//   return (
//     <>
//       <div className={stlyes.wrapper}>
//         <Input
//           label="원하시는 닉네임을 입력해주세요"
//           placeholder="닉네임을 입력해주세요"
//           value={nickname}
//           onChange={(e) => setNickname(e.target.value)}
//           errMsg={nicknameErrMsg}
//         />
//         <div className={stlyes.check}>
//           <ButtonOnClick
//             type="filled"
//             text="중복확인"
//             color="disabled"
//             width="normal"
//             size="small"
//             onClick={() => {}}
//           />
//         </div>
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
