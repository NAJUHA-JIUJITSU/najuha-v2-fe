'use client';
import styles from './index.module.scss';
import RadioButtonLabel from '@/components/common/radioButtonLabel';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { genderState, GenderType } from '@/recoil/atoms/registerState';

interface GenderProps {
  onNext: () => void;
  submitText?: string;
}

export default function Gender({ onNext, submitText = '다음' }: GenderProps) {
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
          isUnderlined={true}
        />
        <RadioButtonLabel
          msg={'여성'}
          isChecked={localGender === 'FEMALE'}
          changeCheck={() => setLocalGender('FEMALE')}
          isUnderlined={true}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text={submitText}
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
