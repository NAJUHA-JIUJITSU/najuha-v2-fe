'use client';
import Input from '../common/input';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '../common/button/buttonOnClick';
import InfoMessage from '../common/infoMessage';
import React from 'react';

interface NicknamePageProps {
  onNext: (data: any) => void;
  data: string;
}

const title = '확인해주세요';
const listItems = [
  '나주하 게시판에서 글을 작성하거나, 댓글을 작성할 때 사용되는 닉네임입니다.',
  '2~10자리의 한글 또는 영어로 입력해주세요.',
  '다른 사람에게 불쾌감을 주는 닉네임은 추후 경고조치될 수 있습니다.',
];

const nicknameList = ['중복'];

export default function nicknamePage({ onNext, data }: NicknamePageProps) {
  const [nickname, setNickname] = useState<string>(data);
  const [nicknameErrMsg, setNicknameErrMsg] = useState<string | null>('');
  const [nicknameSuccessMsg, setNicknameSuccessMsg] = useState<string | null>('');
  const [isValidDate, setIsValidDate] = useState<boolean>(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);

  //validateNickname 함수
  const validateNickname = (nickname: string) => {
    setIsNicknameChecked(false);
    setNicknameSuccessMsg(null);
    if (nickname.length === 0) {
      setNicknameErrMsg(null);
      setIsValidDate(false);
      return true;
    } else if (nickname.length < 2 || nickname.length > 8) {
      setNicknameErrMsg('닉네임은 2자 이상 8자 이하로 입력해주세요.');
      setIsValidDate(false);
      return false;
    } else if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/.test(nickname)) {
      setNicknameErrMsg('닉네임은 공백을 제외한 한글, 영문, 숫자만 입력 가능합니다.');
      setIsValidDate(false);
      return false;
    } else {
      setNicknameErrMsg(null);
      setIsValidDate(true);
      return true;
    }
  };

  //닉네임 중복확인
  const checkNickname = (nickname: string) => {
    // todo: 서버에서 중복확인하는 로직으로 수정해야함
    if (nicknameList.includes(nickname)) {
      setNicknameErrMsg('이미 사용중인 닉네임입니다.');
    } else {
      setIsNicknameChecked(true);
      setNicknameSuccessMsg('사용 가능한 닉네임입니다.');
    }
  };

  //실시간 닉네임 검증
  useEffect(() => {
    validateNickname(nickname);
  }, [nickname]);

  const MemoizedInfoMessage = React.memo(InfoMessage); //todo: InfoMessage 컴포넌트에 직접 React.memo를 적용하면 왜 안도는지 모르겠음

  return (
    <div className={styles.wrapper}>
      <Input
        label="원하시는 닉네임을 설정해주세요"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        errMsg={nicknameErrMsg}
        successMsg={nicknameSuccessMsg}
      />
      <div className={styles.validateButton}>
        <ButtonOnClick
          type="filled"
          text="중복확인"
          color={isValidDate ? 'lightblue' : 'disabled'}
          width="full"
          size="small"
          onClick={() => checkNickname(nickname)}
        />
      </div>

      <MemoizedInfoMessage title={title} listItems={listItems} />
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
