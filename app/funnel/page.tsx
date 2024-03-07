'use client';
import styles from './index.module.scss';
import { useEffect } from 'react';
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
import useFunnel from '@/hook/useFunnel';
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

const titleName = {
  약관동의: '회원가입',
  성별: '',
  생년월일: '',
  전화번호: '',
  전화번호인증: '',
  닉네임: '',
  벨트: '',
  가입성공: '가입성공',
};

interface UserResponseData {
  belt: null | string;
  createdAt: string;
  email: string;
  gender: 'MALE' | 'FEMALE';
  id: number;
  name: string;
  nickname: null | string;
  phoneNumber: string;
  birth: string;
  profileImageUrlKey: null | string;
  role: string;
  snsAuthProvider: string;
  snsId: string;
  status: string;
  updatedAt: string;
  weight: null | number;
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

// 국가 코드("+82")를 "0"으로 변환하고, 문자열의 모든 공백과 하이픈을 제거하는 함수
function convertPhoneNumber(phoneNumber: string): string {
  const formattedNumber = phoneNumber.replace('+82', '0').replace(/\s|-/g, '');

  return formattedNumber;
}

//모바일 화면 높이를 1vh 단위로 설정하는 함수
function setScreenSize() {
  let vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

export default function funnel() {
  const {
    currentStep,
    gotoSaveNextStep,
    gotoPreviousStep,
    funnelData,
    setFunnelData,
    setCurrentStepIndex,
  } = useFunnel(steps, initialFunnelData);
  const { data: user } = useTemporaryUserInfo();
  const { mutate: register, isPending } = useRegister();
  const router = useRouter();

  console.log('funnelData: ', funnelData);

  //사용자 정보 가져와서 user상태변경하는 함수
  async function setUserInfo() {
    if (user) {
      setFunnelData((prev) => ({
        ...prev,
        ...(user.gender ? { 성별: user.gender } : {}),
        ...(user.phoneNumber ? { 전화번호: convertPhoneNumber(user.phoneNumber) } : {}),
        ...(user.nickname ? { 닉네임: user.nickname } : {}),
        ...(user.birth ? { 생년월일: user.birth } : {}),
      }));
    }
  }

  useEffect(() => {
    setCurrentStepIndex(0); // 원하는 단계로 바로 이동하고 싶을 때 사용
    setScreenSize(); // 화면 크기 설정
  }, []);

  useEffect(() => {
    console.log('user: ', user);
    setUserInfo(); //사용자 정보 채우기
  }, [user]);

  //currentStep이 '가입성공'일 때 회원가입 완료 후 메인페이지로 이동
  useEffect(() => {
    if (currentStep === '가입성공') {
      const registerUser = {
        user: {
          gender: funnelData.성별,
          birth: funnelData.생년월일.replace(/\//g, ''),
          nickname: funnelData.닉네임,
          belt: funnelData.벨트,
        },
        consentPolicyTypes: Object.entries(funnelData.약관동의)
          .filter(([_key, value]) => value)
          .map(([key, _value]) => key),
      };
      console.log('최종 registerUser: ', registerUser);

      register(registerUser); //회원가입 요청

      //회원가입 완료 후, 메인페이지로 이동
      router.push('/');
    }
  }, [currentStep]);

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIcon icon={<IconNavigateBefore />} onClick={gotoPreviousStep} />}
        title={titleName[currentStep as keyof typeof titleName]}
      />

      {currentStep === '약관동의' && (
        <AgreePage data={funnelData[currentStep]} onNext={gotoSaveNextStep} />
      )}
      {currentStep === '성별' && (
        <GenderPage data={funnelData[currentStep]} onNext={gotoSaveNextStep} />
      )}
      {currentStep === '생년월일' && (
        <BirthPage data={funnelData[currentStep]} onNext={gotoSaveNextStep} />
      )}
      {currentStep === '전화번호' && (
        <PhoneNumberPage data={funnelData[currentStep]} onNext={gotoSaveNextStep} />
      )}
      {currentStep === '전화번호인증' && (
        <PhoneNumberCheckPage data={funnelData['전화번호']} onNext={gotoSaveNextStep} />
      )}
      {currentStep === '닉네임' && (
        <NicknamePage data={funnelData[currentStep]} onNext={gotoSaveNextStep} />
      )}
      {currentStep === '벨트' && (
        <BeltPage data={funnelData[currentStep]} onNext={gotoSaveNextStep} />
      )}

      {isPending && <div style={{ lineHeight: 1 }}>회원가입 중...</div>}
    </div>
  );
}
