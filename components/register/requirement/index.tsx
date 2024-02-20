import RegisterInfo from '../registerInfo';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import IconNavigateNext from '@/public/svgs/navigateNext.svg';
import useCheckboxState from '@/hook/useCheckbox';
import CheckBoxLabel from '@/components/common/checkBoxLabel';
import { IconLink } from '@/components/common/icon/iconLink';
import { useRecoilState } from 'recoil';
import { agreementState } from '@/recoil/atoms/registerState';

interface Props {
  onNext: () => void;
}
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

export default function requirement({ onNext }: Props) {
  const [agreement, setAgreement] = useRecoilState(agreementState);
  const [checkedStates, toggleState] = useCheckboxState(agreement);

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
            changeCheck={toggleState(item.id)}
            isChecked={checkedStates[item.id]}
          />
        ))}
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="약관전체 동의"
          color="blue"
          width="full"
          size="large"
          onClick={() => {
            setAgreement(checkedStates);
            onNext();
          }}
        />
      </div>
    </>
  );
}
