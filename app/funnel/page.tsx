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
import { useTemporaryUserInfo } from '@/hook/useRegister';

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
    use: false,
    privacy: false,
    refund: false,
    ad: false,
  },
  성별: '',
  전화번호: '',
  전화번호인증: false,
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

  //currentStep이 '가입성공'일 때, userLogin api 호출 후, 쿠키에 저장된 토큰 삭제하고, 회원가입 완료 로직 후 메인페이지로 이동
  useEffect(() => {
    if (currentStep === '가입성공') {
      console.log('최종 funnelData: ', funnelData);
      // handleRegister({
      //   nickname: funnelData.닉네임,
      //   gender: funnelData.성별,
      //   belt: funnelData.벨트,
      //   birth: '19981127',
      // });

      console.log('회원가입 완료');
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

      {currentStep === '가입성공' && <div style={{ lineHeight: 1 }}>가입 성공 안내</div>}
    </div>
  );

  // useFunnel을 사용하지 않고 구현한 코드
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
