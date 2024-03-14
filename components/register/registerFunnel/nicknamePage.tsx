'use client';
import Input from '@/components/common/input';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { nicknameState } from '@/recoil/atoms/registerState';
import { useInput } from '@/hook/useInput';
import { validateNickname } from '@/utils/validations/userValidations';
import { useState, useCallback } from 'react';
import { useCheckNickname } from '@/hook/useRegister';
import InfoMessage from '../../common/infoMessage';

const title = '확인해주세요';
const listItems = [
  '나주하 게시판에서 글을 작성하거나, 댓글을 작성할 때 사용되는 닉네임입니다.',
  '2~10자리의 한글 또는 영어로 입력해주세요.',
  '다른 사람에게 불쾌감을 주는 닉네임은 추후 경고조치될 수 있습니다.',
];

export default function Nickname({ onNext }: any) {
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const { value, setValue, errMsg, setErrMsg, successMsg, setSuccessMsg, validate } = useInput(
    nickname,
    validateNickname,
  );
  const [isDuplicated, setIsDuplicated] = useState(true);
  const { mutate, isPending } = useCheckNickname();

  const handleButtonClick = useCallback(() => {
    setNickname(value);
    onNext();
  }, [value]);

  const handleCheckNickname = useCallback(() => {
    // onSuccess에 따라서 isDuplicated를 변경
    mutate(value, {
      onSuccess: (res) => {
        setIsDuplicated(res.data.result);
        if (res.data.result) {
          setErrMsg('이미 사용중인 닉네임입니다.');
        } else {
          setSuccessMsg('사용 가능한 닉네임입니다.');
        }
      },
      onError: (error) => {
        console.log(error);
        setErrMsg('닉네임 중복확인에 실패했습니다.');
      },
    });
  }, [value]);

  return (
    <>
      <div className={styles.wrapper}>
        <Input
          label="원하시는 닉네임을 입력해주세요"
          placeholder="닉네임을 입력해주세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          errMsg={errMsg}
          successMsg={successMsg}
        />
        <div className={styles.check}>
          <ButtonOnClick
            type="filled"
            text="중복확인"
            color={validate && !isPending ? 'lightblue' : 'disabled'}
            width="normal"
            size="small"
            disabled={!validate || isPending}
            onClick={handleCheckNickname}
          />
        </div>
        <InfoMessage title={title} listItems={listItems} />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="약관전체 동의"
          color={!isDuplicated ? 'blue' : 'disabled'}
          width="full"
          size="large"
          disabled={isDuplicated}
          onClick={handleButtonClick}
        />
      </div>
    </>
  );
}

// 'use client';
// import Input from '../../common/input';
// import styles from './index.module.scss';
// import ButtonOnClick from '../../common/button/buttonOnClick';
// import InfoMessage from '../../common/infoMessage';
// import React from 'react';
// import useNicknameValidation from '@/hook/useNicknameValidation';

// interface NicknamePageProps {
//   onNext: (data: string) => void;
//   data: string;
// }

// const title = '확인해주세요';
// const listItems = [
//   '나주하 게시판에서 글을 작성하거나, 댓글을 작성할 때 사용되는 닉네임입니다.',
//   '2~10자리의 한글 또는 영어로 입력해주세요.',
//   '다른 사람에게 불쾌감을 주는 닉네임은 추후 경고조치될 수 있습니다.',
// ];

// export default function nicknamePage({ onNext, data }: NicknamePageProps) {
//   const {
//     nickname,
//     setNickname,
//     isValid,
//     isPending,
//     errorMessage,
//     successMessage,
//     checkNicknameDuplication,
//     isNicknameChecked,
//   } = useNicknameValidation(data);

//   const MemoizedInfoMessage = React.memo(InfoMessage); //todo: InfoMessage 컴포넌트에 직접 React.memo를 적용하면 왜 안도는지 모르겠음

//   return (
//     <div className={styles.wrapper}>
//       {/* 닉네임 입력 */}
//       <Input
//         label="원하시는 닉네임을 설정해주세요"
//         placeholder="닉네임을 입력해주세요"
//         value={nickname}
//         onChange={(e) => setNickname(e.target.value)}
//         errMsg={errorMessage}
//         successMsg={successMessage}
//         disabled={isPending} //todo: isLoading true일때 비활성화 되게 하기
//         autoFocus={true}
//       />

//       {/* 중복확인 버튼 */}
//       <div className={styles.validateButton}>
//         <ButtonOnClick
//           type="filled"
//           text="중복확인"
//           color={isValid && !successMessage ? 'lightblue' : 'disabled'}
//           width="full"
//           size="small"
//           onClick={checkNicknameDuplication}
//         />
//       </div>

//       {/* 닉네임관련 정보 메시지 */}
// <MemoizedInfoMessage title={title} listItems={listItems} />

//       {/* 다음 버튼 */}
//       <div className={styles.submit}>
//         <ButtonOnClick
//           type="filled"
//           text="다음"
//           color={isNicknameChecked ? 'blue' : 'disabled'}
//           width="full"
//           size="large"
//           onClick={() => onNext(nickname)}
//         />
//       </div>
//     </div>
//   );
// }
