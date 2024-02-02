'use client';
import styles from './index.module.scss';
import { useState } from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIcon } from '@/components/common/icon/iconOnClick';
import AgreePage from '@/components/registerFunnel/agreePage';
import BirthPage from '@/components/registerFunnel/birthPage';
import NicknamePage from '@/components/registerFunnel/nicknamePage';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';

export default function funnel() {
  const [registerData, setRegisterData] = useState({
    약관동의: {
      all: false,
      use: false,
      privacy: false,
      refund: false,
      ad: false,
    },
    생년월일: '',
    닉네임: '',
  });

  // 현재 스텝의 인덱스
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // 스텝 배열
  const steps: ('약관동의' | '생년월일' | '닉네임' | '가입성공')[] = [
    '약관동의',
    '생년월일',
    '닉네임',
    '가입성공',
  ];

  // 뒤로가기 버튼 클릭 시 실행되는 함수
  const handleGoBack = () => {
    // 현재 스텝의 인덱스를 이전으로 조정
    setCurrentStepIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // 현재 스텝
  const currentStep = steps[currentStepIndex];

  console.log('currentStep: ', currentStep);
  console.log('registerData: ', registerData);

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIcon icon={<IconNavigateBefore />} onClick={handleGoBack} />}
        title={currentStep}
      />
      {currentStep === '약관동의' && (
        <AgreePage
          onNext={(data) => {
            setRegisterData((prev) => ({ ...prev, 약관동의: data }));
            setCurrentStepIndex((prevIndex) => prevIndex + 1);
          }}
        />
      )}
      {currentStep === '생년월일' && (
        <BirthPage
          data={registerData.생년월일}
          onNext={(data) => {
            setRegisterData((prev) => ({ ...prev, 생년월일: data }));
            setCurrentStepIndex((prevIndex) => prevIndex + 1);
          }}
        />
      )}
      {currentStep === '닉네임' && (
        <NicknamePage
          data={registerData.닉네임}
          onNext={(data) => {
            setRegisterData((prev) => ({ ...prev, 닉네임: data }));
            setCurrentStepIndex((prevIndex) => prevIndex + 1);
          }}
        />
      )}
      {currentStep === '가입성공' && <div>가입성공 페이지</div>}
    </div>
  );
}
