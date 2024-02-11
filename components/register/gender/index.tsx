'use client';
import styles from './index.module.scss';
import RadioButtonLabel from '@/components/common/radioButtonLabel';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';

interface Props {
  onNext: () => void;
}

const genderRadioConfig = [
  {
    msg: '남성',
    value: 'MALE',
  },
  {
    msg: '여성',
    value: 'FEAMLE',
  },
];

const Gender = ({ onNext }: Props) => {
  const [user, setUser] = useRecoilState(userAtom);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.info}>성별을 선택해 주세요</div>
        {genderRadioConfig.map((config) => (
          <RadioButtonLabel
            key={config.value}
            msg={config.msg}
            isChecked={user.gender === config.value}
            changeCheck={() =>
              setUser((user) => ({
                ...user,
                gender: config.value,
              }))
            }
          />
        ))}
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color={user.gender ? 'blue' : 'disabled'}
          width="full"
          size="large"
          onClick={onNext}
        />
      </div>
    </>
  );
};

export default Gender;
