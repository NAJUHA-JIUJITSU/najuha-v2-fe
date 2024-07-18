'use client';
import styles from './index.module.scss';
import RegisterInfo from '@/components/register/registerWelcomeMessage';
import CheckBoxLabel from '@/components/common/checkBoxLabel';
import { IconLink } from '@/components/common/icon/iconLink';
import useCheckboxState from '@/hooks/useCheckbox';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import IconNavigateNext from '@/public/svgs/navigateNext.svg';
import { agreementState } from '@/recoil/atoms/registerState';
import { useRecoilState } from 'recoil';

interface AgreePageProps {
  onNext: () => void;
}

const checkList = [
  {
    id: 'all',
    msg: '약관 전체동의',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/all'} />,
  },
  {
    id: 'TERMS_OF_SERVICE',
    msg: '이용약관 동의(필수)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/use'} />,
  },
  {
    id: 'PRIVACY',
    msg: '개인정보 수집 및 이용동의(필수)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/privacy'} />,
  },
  {
    id: 'REFUND',
    msg: '환불규정 동의(필수)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/refund'} />,
  },
  {
    id: 'ADVERTISEMENT',
    msg: '광고 및 마케팅 알림 수신 동의(선택)',
    link: <IconLink icon={<IconNavigateNext />} redirectUrl={'/ad'} />,
  },
];

export default function AgreePage({ onNext }: AgreePageProps) {
  const [agreement, setAgreement] = useRecoilState(agreementState);
  const {
    state: checkedStates,
    toggleCheckbox: toggleState,
    allRequiredAgreed,
  } = useCheckboxState(agreement);

  const buttontext = allRequiredAgreed ? '다음' : '약관전체 동의';

  const handleButtonClick = () => {
    if (allRequiredAgreed) {
      setAgreement(checkedStates);
      onNext();
    } else {
      toggleState('all'); // 모든 체크박스를 true로 설정
    }
  };

  return (
    <>
      <RegisterInfo />
      <div className={styles.form}>
        {checkList.map((item) => (
          <CheckBoxLabel
            key={item.id}
            msg={item.msg}
            isUnderlined={item.id === 'all'}
            rightIcon={item.id !== 'all' ? item.link : null}
            changeCheck={() => {
              toggleState(item.id);
            }}
            isChecked={checkedStates[item.id]?.checked || false}
          />
        ))}
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text={buttontext}
          color="blue"
          width="full"
          size="large"
          onClick={handleButtonClick}
        />
      </div>
    </>
  );
}
