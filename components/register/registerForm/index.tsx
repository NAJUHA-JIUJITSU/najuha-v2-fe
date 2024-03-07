import React from 'react';
import styles from './index.module.scss';
import CheckBoxLabel from '@/components/common/checkBoxLabel';
import { IconLink } from '@/components/common/icon/iconLink';
import IconNavigateNext from '@/public/svgs/navigateNext.svg';
import useCheckboxState from '@/hook/useCheckbox';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

interface RegisterFormProps {
  onNext: (data: object) => void;
  data: {
    all: boolean;
    TERMS_OF_SERVICE: boolean;
    PRIVACY: boolean;
    REFUND: boolean;
    ADVERTISEMENT: boolean;
  };
}

const checkList = [
  {
    id: 'all',
    msg: '전체 약관 동의',
    isMandatory: false,
  },
  {
    id: 'TERMS_OF_SERVICE',
    msg: '이용약관 동의(필수)',
    isMandatory: true,
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/use'} />,
  },
  {
    id: 'PRIVACY',
    msg: '개인정보 수집 및 이용동의(필수)',
    isMandatory: true,
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/privacy'} />,
  },
  {
    id: 'REFUND',
    msg: '환불규정 동의(필수)',
    isMandatory: true,
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/refund'} />,
  },
  {
    id: 'ADVERTISEMENT',
    msg: '광고 및 마케팅 알림 수신 동의(선택)',
    isMandatory: false,
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/ad'} />,
  },
];

export default function registerForm({ onNext, data }: RegisterFormProps) {
  const [checkedStates, toggleState, setAllTrue] = useCheckboxState(data);

  //약관동의를 하나라도 체크했는지 확인
  const isAtLeastOneTrue = Object.values(checkedStates).some((value) => value);

  // 필수 약관 동적 결정
  const mandatoryAgreements = checkList.filter((item) => item.isMandatory).map((item) => item.id);

  // 필수 동의 여부 확인 로직
  const isAllMandatoryAgreed = mandatoryAgreements.every((agreement) => checkedStates[agreement]);

  // 전체동의 체크 시 모든 약관을 true 또는 false로 설정
  const handleToggleAllAgreements = () => {
    setAllTrue(!checkedStates.all);
  };

  return (
    <div className={styles.form}>
      {/* 각 약관 체크박스들 */}
      {checkList.map((item) => (
        <CheckBoxLabel
          key={item.id}
          msg={item.msg}
          isUnderlined={item.id === 'all'}
          rightIcon={item.id !== 'all' ? item.link : null}
          changeCheck={item.id !== 'all' ? toggleState(item.id) : handleToggleAllAgreements}
          isChecked={checkedStates[item.id]}
        />
      ))}

      {/* '약관전체동의' or '다음' 버튼 */}
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text={isAtLeastOneTrue ? '다음' : '약관전체 동의'}
          color={isAllMandatoryAgreed || !isAtLeastOneTrue ? 'blue' : 'disabled'}
          width="full"
          size="large"
          onClick={() => (isAtLeastOneTrue ? onNext(checkedStates) : handleToggleAllAgreements())}
        />
      </div>
    </div>
  );
}
