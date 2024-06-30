import React from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import Input from '@/components/common/input';
import { useState } from 'react';

export default function CompetitionInfoAdditionalInfoForm({ onNext }) {
  const [type1, setType1] = useState('ADDRESS');
  const [des1, setDes1] = useState('string');
  const [type2, setType2] = useState('SOCIAL_SECURITY_NUMBER');
  const [des2, setDes2] = useState('string');

  const handleNext = () => {
    onNext();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.flex}>
          <Input
            label="받을정보"
            placeholder="ADDRESS OR SOCIAL_SECURITY_NUMBER"
            value={type1}
            onChange={(e) => setType1(e.target.value)}
            autoFocus={true}
          />
          <Input
            label="설명"
            placeholder="string"
            value={des1}
            onChange={(e) => setDes1(e.target.value)}
          />
        </div>
        <div className={styles.flex}>
          <Input
            label="받을정보"
            placeholder="ADDRESS OR SOCIAL_SECURITY_NUMBER"
            value={type2}
            onChange={(e) => setType2(e.target.value)}
          />
          <Input
            label="설명"
            placeholder="string"
            value={des2}
            onChange={(e) => setDes2(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color={'blue'}
          disabled={false}
          width="full"
          size="large"
          onClick={handleNext}
        />
      </div>
    </>
  );
}
