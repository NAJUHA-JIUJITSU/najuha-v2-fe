'use client';
import Input from '@/components/common/input';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { nicknameState } from '@/recoil/atoms/registerState';
import { useInput } from '@/hooks/useInput';
import { validateNickname } from '@/utils/validations/userValidations';
import { useState, useCallback } from 'react';
// import { useCheckNickname } from '@/hooks/register';
import { useCheckDuplicatedNickname } from '@/hooks/register';
import InfoMessage from '@/components/register/infoMessage';

const title = '확인해주세요';
const listItems = [
  '나주하 게시판에서 글을 작성하거나, 댓글을 작성할 때 사용되는 닉네임입니다.',
  '2~10자리의 한글 또는 영어로 입력해주세요.',
  '다른 사람에게 불쾌감을 주는 닉네임은 추후 경고조치될 수 있습니다.',
];

interface NicknameProps {
  onNext: () => void;
  submitText?: string;
}

export default function Nickname({ onNext, submitText = '다음' }: NicknameProps) {
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const { value, setValue, errMsg, setErrMsg, successMsg, setSuccessMsg, validate } = useInput(
    nickname,
    validateNickname,
  );
  const [isDuplicated, setIsDuplicated] = useState(true);
  const { mutate, isPending } = useCheckDuplicatedNickname();

  const handleButtonClick = useCallback(() => {
    setNickname(value);
    onNext();
  }, [value]);

  const handleCheckNickname = useCallback(() => {
    // onSuccess에 따라서 isDuplicated를 변경
    mutate(value, {
      onSuccess: (res) => {
        setIsDuplicated(res.isDuplicated);
        if (res.isDuplicated) {
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
          text={submitText}
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
