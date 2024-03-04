'use client';
import styles from './index.module.scss';
import RadioButtonLabel from '@/components/common/radioButtonLabel';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { genderState, GenderType } from '@/recoil/atoms/registerState';

export default function Gender({ onNext }: any) {
  const [gender, setGender] = useRecoilState(genderState);
  const [localGender, setLocalGender] = useState<GenderType>(gender);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.info}>성별을 선택해 주세요</div>
        <RadioButtonLabel
          msg={'남성'}
          isChecked={localGender === 'MALE'}
          changeCheck={() => setLocalGender('MALE')}
        />
        <RadioButtonLabel
          msg={'여성'}
          isChecked={localGender === 'FEMALE'}
          changeCheck={() => setLocalGender('FEMALE')}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color="blue"
          width="full"
          size="large"
          onClick={() => {
            setGender(localGender);
            onNext();
          }}
        />
      </div>
    </>
  );
}
