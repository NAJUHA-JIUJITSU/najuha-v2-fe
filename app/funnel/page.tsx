'use client';
import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIcon } from '@/components/common/icon/iconOnClick';
import AgreePage from '@/components/register/registerFunnel/agreePage';
import GenderPage from '@/components/register/registerFunnel/genderPage';
import PhoneNumberPage from '@/components/register/registerFunnel/phoneNumberPage';
import PhoneNumberCheckPage from '@/components/register/registerFunnel/phoneNumberCheckPage';
import BeltPage from '@/components/register/registerFunnel/beltPage';
import BirthPage from '@/components/register/registerFunnel/birthPage';
import NicknamePage from '@/components/register/registerFunnel/nicknamePage';
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

//모바일 화면 높이를 1vh 단위로 설정하는 함수
// function setScreenSize() {
//   let vh = window.innerHeight * 0.01;

//   document.documentElement.style.setProperty('--vh', `${vh}px`);
// }

export default function funnel() {
  const { gotoNextStep, gotoPreviousStep, Funnel, Step, currentStep } = useFunnel(steps);
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
          <AgreePage onNext={gotoNextStep} />
        </Step>
        <Step name="성별">
          <GenderPage onNext={gotoNextStep} />
        </Step>
        <Step name="생년월일">
          <BirthPage onNext={gotoNextStep} />
        </Step>
        <Step name="전화번호">
          <PhoneNumberPage onNext={gotoNextStep} />
        </Step>
        <Step name="전화번호인증">
          <PhoneNumberCheckPage onNext={gotoNextStep} />
        </Step>
        <Step name="닉네임">
          <NicknamePage onNext={gotoNextStep} />
        </Step>
        <Step name="벨트">
          <BeltPage onNext={gotoNextStep} />
        </Step>
      </Funnel>
    </div>
  );
}
