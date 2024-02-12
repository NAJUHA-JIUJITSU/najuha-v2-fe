import React, { useEffect } from 'react';
import Input from '@/components/common/input';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';
import { useNicknameValidation, ValidState } from '@/hook/useNicknameValidation'; // Adjust the import path as needed

interface Props {
  onNext: () => void;
}

const Nickname: React.FC<Props> = ({ onNext }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const { nickname, setNickname, validState, errorMsg, checkDuplicatedNickname } =
    useNicknameValidation(user.nickname || '');

  useEffect(() => {
    if (validState === ValidState.VALID) {
      setUser((prevUser) => ({
        ...prevUser,
        nickname,
      }));
    }
  }, [nickname, validState, setUser]);

  return (
    <>
      <div className={styles.wrapper}>
        <Input
          label="원하시는 닉네임을 입력해주세요"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          errMsg={errorMsg}
        />
        <div className={styles.check}>
          <ButtonOnClick
            type="filled"
            text="중복확인"
            color="blue"
            width="normal"
            size="small"
            disabled={validState !== ValidState.BEFORE_DUPLICATED_CHECK}
            onClick={() => checkDuplicatedNickname(nickname)}
          />
        </div>
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color="blue"
          width="full"
          size="large"
          disabled={validState !== ValidState.VALID}
          onClick={onNext}
        />
      </div>
    </>
  );
};

export default Nickname;
