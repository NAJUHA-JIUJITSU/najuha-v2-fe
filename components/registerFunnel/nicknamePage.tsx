'use client';
import Input from '../common/input';
import styles from './index.module.scss';
import ButtonOnClick from '../common/button/buttonOnClick';
import InfoMessage from '../common/infoMessage';
import React from 'react';
import useNicknameValidation from '@/hook/useNicknameValidation';

interface NicknamePageProps {
  onNext: (data: string) => void;
  data: string;
}

const title = '확인해주세요';
const listItems = [
  '나주하 게시판에서 글을 작성하거나, 댓글을 작성할 때 사용되는 닉네임입니다.',
  '2~10자리의 한글 또는 영어로 입력해주세요.',
  '다른 사람에게 불쾌감을 주는 닉네임은 추후 경고조치될 수 있습니다.',
];

export default function nicknamePage({ onNext, data }: NicknamePageProps) {
  const {
    nickname,
    setNickname,
    isValid,
    isLoading,
    errorMessage,
    successMessage,
    checkNicknameDuplication,
    isNicknameChecked,
  } = useNicknameValidation(data);

  const MemoizedInfoMessage = React.memo(InfoMessage); //todo: InfoMessage 컴포넌트에 직접 React.memo를 적용하면 왜 안도는지 모르겠음

  return (
    <div className={styles.wrapper}>
      {/* 닉네임 입력 */}
      <Input
        label="원하시는 닉네임을 설정해주세요"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        errMsg={errorMessage}
        successMsg={successMessage}
        disabled={isLoading} //todo: isLoading true일때 비활성화 되게 하기
      />

      {/* 중복확인 버튼 */}
      <div className={styles.validateButton}>
        <ButtonOnClick
          type="filled"
          text="중복확인"
          color={isValid ? 'lightblue' : 'disabled'}
          width="full"
          size="small"
          onClick={checkNicknameDuplication}
        />
      </div>

      {/* 닉네임관련 정보 메시지 */}
      <MemoizedInfoMessage title={title} listItems={listItems} />

      {/* 다음 버튼 */}
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color={isNicknameChecked ? 'blue' : 'disabled'}
          width="full"
          size="large"
          onClick={() => onNext(nickname)}
        />
      </div>
    </div>
  );
}
