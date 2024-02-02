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

export default function nicknamePage({ onNext, data }: NicknamePageProps) {
  const [nickname, setNickname] = useState<string>(data);
  const [nicknameErrMsg, setNicknameErrMsg] = useState<string | null>('');

  //validateNickname 함수
  const validateNickname = (nickname: string) => {
    if (nickname.length === 0) {
      setNicknameErrMsg(null);
      return true;
    } else if (nickname.length < 2 || nickname.length > 8) {
      setNicknameErrMsg('닉네임은 2자 이상 8자 이하로 입력해주세요.');
      return false;
    } else if (!/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/.test(nickname)) {
      setNicknameErrMsg('닉네임은 한글, 영문, 숫자만 입력 가능합니다.');
      return false;
    } else {
      setNicknameErrMsg(null);
      return true;
    }
  };

  const title = '확인해주세요';
  const listItems = [
    '나주하 게시판에서 글을 작성하거나, 댓글을 작성할 때 사용되는 닉네임입니다.',
    '2~10자리의 한글 또는 영어로 입력해주세요.',
    '다른 사람에게 불쾌감을 주는 닉네임은 추후 경고조치될 수 있습니다.',
  ];

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
      />
      <MemoizedInfoMessage title={title} listItems={listItems} />
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color="disabled"
          width="full"
          size="large"
          onClick={() => onNext(nickname)}
        />
      </div>
    </div>
  );
}
