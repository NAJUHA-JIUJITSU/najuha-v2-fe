import React, { useCallback, useState } from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import CheckBoxLabel from '@/components/common/checkBoxLabel';
import { IconLink } from '@/components/common/icon/iconLink';
import IconNavigateNext from '@/public/svgs/navigateNext.svg';
import useCheckboxState from '@/hook/useCheckbox';

const checkList = [
  {
    id: 'all',
    msg: '약관 전체동의',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/all'} />,
  },
  {
    id: 'use',
    msg: '이용약관 동의(필수)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/use'} />,
  },
  {
    id: 'privacy',
    msg: '개인정보 수집 및 이용동의(필수)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/privacy'} />,
  },
  {
    id: 'refund',
    msg: '환불규정 동의(필수)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/refund'} />,
  },
  {
    id: 'ad',
    msg: '광고 및 마케팅 알림 수신 동의(선택)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/ad'} />,
  },
];

export default function registerForm() {
  const [checkedStates, toggleState] = useCheckboxState({
    all: false,
    use: false,
    privacy: false,
    refund: false,
    ad: false,
  });

  return (
    <div className={styles.form}>
      {checkList.map((item) => (
        <CheckBoxLabel
          key={item.id}
          msg={item.msg}
          rightIcon={item.link}
          changeCheck={toggleState(item.id)}
          isChecked={checkedStates[item.id]}
        />
      ))}
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
