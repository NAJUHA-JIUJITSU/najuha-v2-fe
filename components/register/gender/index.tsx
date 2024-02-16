'use client';
import styles from './index.module.scss';
import RadioButtonLabel from '@/components/common/radioButtonLabel';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '@/recoil/userAtom';
import { patchTemporaryUser } from '@/api/register';
import { accessTokenAtom } from '@/recoil/accessTokenAtom';

interface Props {
  onNext: () => void;
}

const radioContents = [
  {
    msg: '남성',
    value: 'MALE',
  },
  {
    msg: '여성',
    value: 'FEMALE',
  },
];

const Gender = ({ onNext }: Props) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const handleNext = () => {
    if (user.gender) {
      onNext();
      patchTemporaryUser(accessToken, { gender: user.gender });
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.info}>성별을 선택해 주세요</div>
        {radioContents.map((content) => (
          <RadioButtonLabel
            key={content.value}
            msg={content.msg}
            isChecked={user.gender === content.value}
            changeCheck={() =>
              setUser((user) => ({
                ...user,
                gender: content.value,
              }))
            }
          />
        ))}
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color="blue"
          width="full"
          size="large"
          disabled={user.gender === '' ? true : false}
          onClick={handleNext}
        />
      </div>
    </>
  );
};

export default Gender;
