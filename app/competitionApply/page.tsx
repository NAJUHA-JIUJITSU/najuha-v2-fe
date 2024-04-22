'use client';
import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIcon } from '@/components/common/icon/iconOnClick';
import PhoneNumberCheckPage from '@/components/register/registerFunnel/phoneNumberCheckPage';
import BeltPage from '@/components/register/registerFunnel/beltPage';
import NicknamePage from '@/components/register/registerFunnel/nicknamePage';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import { useFunnel } from '@/hook/useFunnel';
import PlayerInfoPage from '@/components/competitionApply/applyFunnel/playerInfoPage';
import { useState } from 'react';
import ExtraInfoPage from '@/components/competitionApply/applyFunnel/extraInfoPage';
import ChooseDivisionPage from '@/components/competitionApply/applyFunnel/chooseDivisionPage';
import TeamInfoPage from '@/components/competitionApply/applyFunnel/teamInfoPage';

const steps = [
  '선수정보 확인',
  '추가정보 입력',
  '부문선택',
  '소속 입력',
  '신청정보 확인',
  '결제하기',
];

//모바일 화면 높이를 1vh 단위로 설정하는 함수
// function setScreenSize() {
//   let vh = window.innerHeight * 0.01;

//   document.documentElement.style.setProperty('--vh', `${vh}px`);
// }

export default function CompetitionApply() {
  const { gotoNextStep, gotoPreviousStep, Funnel, Step, currentStep } = useFunnel(steps);
  const [applyInfo, setApplyInfo] = useState({
    playerInfo: {
      name: '',
      gender: '',
      birth: '',
      phoneNumber: '',
      belt: '',
    },
    extraInfo: {
      ssn: '',
      address: '',
    },
  });

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIcon icon={<IconNavigateBefore />} onClick={gotoPreviousStep} />}
        title={currentStep}
      />
      <Funnel>
        <Step name="선수정보 확인">
          <PlayerInfoPage playerInfo={applyInfo.playerInfo} onNext={gotoNextStep} />
        </Step>
        <Step name="추가정보 입력">
          <ExtraInfoPage extraInfo={applyInfo.extraInfo} onNext={gotoNextStep} />
        </Step>
        <Step name="부문선택">
          <ChooseDivisionPage onNext={gotoNextStep} />
        </Step>
        <Step name="소속 입력">
          <TeamInfoPage onNext={gotoNextStep} />
        </Step>
        <Step name="전화번호인증">
          <PhoneNumberCheckPage onNext={gotoNextStep} />
        </Step>
        <Step name="신청정보 확인">
          <NicknamePage onNext={gotoNextStep} />
        </Step>
        <Step name="결제하기">
          <BeltPage />
        </Step>
      </Funnel>
    </div>
  );
}
