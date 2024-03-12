'use client';
import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIcon } from '@/components/common/icon/iconOnClick';
import AgreePage from '@/components/registerFunnel/agreePage';
import GenderPage from '@/components/registerFunnel/genderPage';
import PhoneNumberPage from '@/components/registerFunnel/phoneNumberPage';
import PhoneNumberCheckPage from '@/components/registerFunnel/phoneNumberCheckPage';
import BeltPage from '@/components/registerFunnel/beltPage';
import BirthPage from '@/components/registerFunnel/birthPage';
import NicknamePage from '@/components/registerFunnel/nicknamePage';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import { useFunnel } from '@/hook/useFunnel';
import { useTemporaryUserInfo, useRegister } from '@/hook/useRegister';
import { useRouter } from 'next/navigation';

const steps = [
  '약관동의',
  '성별',
  '생년월일',
  '전화번호',
  '전화번호인증',
  '닉네임',
  '벨트',
  '가입성공',
];

interface UserResponseData {
  belt: null | string;
  gender: 'MALE' | 'FEMALE';
  nickname: null | string;
  phoneNumber: string;
  birth: string;
}

const initialFunnelData = {
  약관동의: {
    all: false,
    TERMS_OF_SERVICE: false,
    PRIVACY: false,
    REFUND: false,
    ADVERTISEMENT: false,
  },
  성별: '',
  전화번호: '',
  생년월일: '',
  닉네임: '',
  벨트: '',
};

//모바일 화면 높이를 1vh 단위로 설정하는 함수
// function setScreenSize() {
//   let vh = window.innerHeight * 0.01;

//   document.documentElement.style.setProperty('--vh', `${vh}px`);
// }

export default function funnel() {
  const {
    gotoNextStep, // setStep -> handleNext
    gotoPreviousStep, // handleBack
    Funnel,
    Step,
    currentStep,
  } = useFunnel(steps);
  const { data: user } = useTemporaryUserInfo();
  const { mutate: register, isPending } = useRegister();
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIcon icon={<IconNavigateBefore />} onClick={gotoPreviousStep} />}
        title={currentStep === '약관동의' ? '회원가입' : currentStep}
      />
      <Funnel>
        <Step name="약관동의">
          <AgreePage data={} onNext={gotoNextStep} />
        </Step>
        <Step name="성별">
          <GenderPage data={} onNext={gotoNextStep} />
        </Step>
        <Step name="생년월일">
          <BirthPage data={} onNext={gotoNextStep} />
        </Step>
        <Step name="전화번호">
          <PhoneNumberPage data={} onNext={gotoNextStep} />
        </Step>
        <Step name="전화번호인증">
          <PhoneNumberCheckPage data={} onNext={gotoNextStep} />
        </Step>
        <Step name="닉네임">
          <NicknamePage data={} onNext={gotoNextStep} />
        </Step>
        <Step name="벨트">
          <BeltPage data={} onNext={gotoNextStep} />
        </Step>
      </Funnel>
      {isPending && <div style={{ lineHeight: 1 }}>회원가입 중...</div>}
    </div>
  );
}
