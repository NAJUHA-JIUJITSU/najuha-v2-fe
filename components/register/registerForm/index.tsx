import React, { useEffect } from 'react';
import styles from './index.module.scss';
import CheckBoxLabel from '@/components/common/checkBoxLabel';
import { IconLink } from '@/components/common/icon/iconLink';
import IconNavigateNext from '@/public/svgs/navigateNext.svg';
import { useCheckList } from '@/hook/useCheckList';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { useRecoilState } from 'recoil';
import { registerRequirementAtom } from '@/recoil/registerRequirementAtom';

interface Props {
  onNext: () => void;
}

const checkListConfig = [
  {
    name: 'all',
    msg: '약관 전체동의',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/all'} />,
  },
  {
    name: 'use',
    msg: '이용약관 동의(필수)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/use'} />,
  },
  {
    name: 'privacy',
    msg: '개인정보 수집 및 이용동의(필수)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/privacy'} />,
  },
  {
    name: 'refund',
    msg: '환불규정 동의(필수)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/refund'} />,
  },
  {
    name: 'ad',
    msg: '광고 및 마케팅 알림 수신 동의(선택)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/ad'} />,
  },
];

const RegisterForm = ({ onNext }: Props) => {
  const [registerRequirement, setRegisterRequirement] = useRecoilState(registerRequirementAtom);
  const { checkList, isAllMandatoryChecked, toggleHandler } = useCheckList(registerRequirement);

  useEffect(() => {
    setRegisterRequirement(checkList);
  }, [checkList, setRegisterRequirement]);

  return (
    <div className={styles.form}>
      {checkListConfig.map((configItem) => (
        <CheckBoxLabel
          key={configItem.name}
          msg={configItem.msg}
          isUnderlined={configItem.name === 'all'}
          rightIcon={configItem.name !== 'all' ? configItem.link : null}
          changeCheck={() => {
            toggleHandler(configItem.name);
          }}
          isChecked={checkList[configItem.name].checked}
        />
      ))}
      {!isAllMandatoryChecked && (
        <div className={styles.submit}>
          <ButtonOnClick
            type="filled"
            text="약관전체 동의"
            color="blue"
            width="full"
            size="large"
            onClick={() => toggleHandler('all')}
          />
        </div>
      )}
      {isAllMandatoryChecked && (
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
      )}
    </div>
  );
};

export default RegisterForm;
