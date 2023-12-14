'use client';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import CheckBoxLabel from '@/components/common/checkBoxLabel';
import { useCallback, useState } from 'react';

const msg = {
  all: '약관 전체동의',
  use: '이용약관 동의(필수)',
  privacy: '개인정보 수집 및 이용동의(필수)',
  refund: '환불규정 동의(필수)',
  ad: '광고 및 마케팅 알림 수신 동의(선택)',
};

export default function registerForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);

  const change1 = useCallback(() => {
    setIsChecked((pre) => !pre);
  }, []);

  const change2 = useCallback(() => {
    setIsChecked2((pre) => !pre);
  }, []);

  const change3 = useCallback(() => {
    setIsChecked3((pre) => !pre);
  }, []);

  const change4 = useCallback(() => {
    setIsChecked4((pre) => !pre);
  }, []);

  const change5 = useCallback(() => {
    setIsChecked5((pre) => !pre);
  }, []);

  return (
    <div className={styles.form}>
      <CheckBoxLabel msg={msg.all} isChecked={isChecked} onClick={change1} />
      <CheckBoxLabel msg={msg.use} isChecked={isChecked2} onClick={change2} />
      <CheckBoxLabel msg={msg.privacy} isChecked={isChecked3} onClick={change3} />
      <CheckBoxLabel msg={msg.refund} isChecked={isChecked4} onClick={change4} />
      <CheckBoxLabel msg={msg.ad} isChecked={isChecked5} onClick={change5} />
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="약관전체 동의"
          color="blue"
          width="full"
          size="large"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
