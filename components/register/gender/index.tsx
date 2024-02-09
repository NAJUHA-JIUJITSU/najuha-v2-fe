'use client';
import styles from './index.module.scss';
import RadioButtonLabel from '@/components/common/radioButtonLabel';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/userAtom';

interface Props {
  onNext: () => void;
}

export default function Gender({ onNext }: Props) {
  const [user, setUser] = useRecoilState(userAtom);
  console.log(user);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.info}>성별을 선택해 주세요</div>
        <RadioButtonLabel
          msg={'남성'}
          isChecked={user.gender === 'MALE'}
          changeCheck={() =>
            setUser((user) => ({
              ...user,
              gender: 'MALE',
            }))
          }
        />
        <RadioButtonLabel
          msg={'여성'}
          isChecked={user.gender === 'FEAMLE'}
          changeCheck={() =>
            setUser((user) => ({
              ...user,
              gender: 'FEAMLE',
            }))
          }
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color="blue"
          width="full"
          size="large"
          onClick={onNext}
        />
      </div>
    </>
  );
}
