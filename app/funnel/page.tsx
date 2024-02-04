'use client';
import styles from './index.module.scss';
import { useEffect } from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIcon } from '@/components/common/icon/iconOnClick';
import AgreePage from '@/components/registerFunnel/agreePage';
import BirthPage from '@/components/registerFunnel/birthPage';
import NicknamePage from '@/components/registerFunnel/nicknamePage';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import useFunnel from '@/hook/useFunnel';

const initialFunnelData = {
  약관동의: {
    all: false,
    use: false,
    privacy: false,
    refund: false,
    ad: false,
  },
  생년월일: '',
  닉네임: '',
};

const steps = ['약관동의', '생년월일', '닉네임', '가입성공'];

export default function funnel() {
  const { currentStep, gotoSaveNextStep, gotoPreviousStep, funnelData, setCurrentStepIndex } =
    useFunnel(steps, initialFunnelData);

  useEffect(() => {
    setCurrentStepIndex(0); // 원하는 단계로 바로 이동하고 싶을 때 사용
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIcon icon={<IconNavigateBefore />} onClick={gotoPreviousStep} />}
        title={currentStep}
      />
      {currentStep === '약관동의' && (
        <AgreePage data={funnelData[currentStep]} onNext={gotoSaveNextStep} />
      )}
      {currentStep === '생년월일' && (
        <BirthPage data={funnelData[currentStep]} onNext={gotoSaveNextStep} />
      )}
      {currentStep === '닉네임' && (
        <NicknamePage data={funnelData[currentStep]} onNext={gotoSaveNextStep} />
      )}
      {currentStep === '가입성공' && <div>가입성공 페이지</div>}
    </div>
  );

  // const [registerData, setRegisterData] = useState({
  //   약관동의: {
  //     all: false,
  //     use: false,
  //     privacy: false,
  //     refund: false,
  //     ad: false,
  //   },
  //   생년월일: '',
  //   닉네임: '',
  // });

  // // 현재 스텝의 인덱스
  // const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // // 스텝 배열
  // const steps: ('약관동의' | '생년월일' | '닉네임' | '가입성공')[] = [
  //   '약관동의',
  //   '생년월일',
  //   '닉네임',
  //   '가입성공',
  // ];

  // // 뒤로가기 버튼 클릭 시 실행되는 함수
  // //todo: 컴포넌트로 분리
  // const handleGoBack = () => {
  //   // 현재 스텝의 인덱스를 이전으로 조정
  //   setCurrentStepIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  // };

  // // 현재 스텝
  // const currentStep = steps[currentStepIndex];

  // //회원가입 데이터 업데이트 하고, 다음 페이지로 넘어가는 함수
  // const handleNext = (stepData: any) => {
  //   setRegisterData((prev) => ({
  //     ...prev,
  //     [currentStep]: stepData,
  //   }));
  //   setCurrentStepIndex((prevIndex) => prevIndex + 1);
  // };

  // console.log('registerData: ', registerData);

  // return (
  //   <div className={styles.wrapper}>
  //     <Header
  //       leftIcon={<ButtonIcon icon={<IconNavigateBefore />} onClick={handleGoBack} />}
  //       title={currentStep}
  //     />
  //     {currentStep === '약관동의' && <AgreePage data={registerData.약관동의} onNext={handleNext} />}
  //     {currentStep === '생년월일' && <BirthPage data={registerData.생년월일} onNext={handleNext} />}
  //     {currentStep === '닉네임' && <NicknamePage data={registerData.닉네임} onNext={handleNext} />}
  //     {currentStep === '가입성공' && <div>가입성공 페이지</div>}
  //   </div>
  // );
}
