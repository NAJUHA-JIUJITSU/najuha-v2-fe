'use client';
import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIcon } from '@/components/common/icon/iconOnClick';
import PhoneNumberCheckPage from '@/components/register/registerFunnel/phoneNumberCheckPage';
import BeltPage from '@/components/register/registerFunnel/beltPage';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import { useFunnel } from '@/hooks/useFunnel';
import PlayerInfoPage from '@/components/competitionApply/applyFunnel/playerInfoPage';
import { useState } from 'react';
import ExtraInfoPage from '@/components/competitionApply/applyFunnel/extraInfoPage';
import ChooseDivisionPage from '@/components/competitionApply/applyFunnel/chooseDivisionPage';
import TeamInfoPage from '@/components/competitionApply/applyFunnel/teamInfoPage';
import CheckApplyInfoPage from '@/components/competitionApply/applyFunnel/checkApplyInfoPage/checkApplyInfoPage';

const steps = [
  '선수정보 확인',
  '추가정보 입력',
  '부문선택',
  '소속 입력',
  '신청정보 확인',
  '결제하기',
];

interface SelectedOptions {
  uniform: string;
  category: string;
  belt: string;
  weight: string;
}

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
    teamInfo: {
      network: '',
      team: '',
      masterName: '',
    },
    selectedDivision: [{ uniform: '', category: '', belt: '', weight: '' }],
    selectedDicisionId: [],
  });
  console.log(applyInfo);
  // setplayerInfo for props in PlayerInfoPage
  const setPlayerInfo = (playerInfo: {
    name: string;
    gender: string;
    birth: string;
    phoneNumber: string;
    belt: string;
  }) => {
    setApplyInfo((prevState) => ({
      ...prevState,
      playerInfo,
    }));
  };

  // setExtraInfo for props in ExtraInfoPage
  const setExtraInfo = (extraInfo: { ssn: string; address: string }) => {
    setApplyInfo((prevState) => ({
      ...prevState,
      extraInfo,
    }));
  };

  // setTeamInfo for props in TeamInfoPage
  const setTeamInfo = (teamInfo: { network: string; masterName: string; team: string }) => {
    setApplyInfo((prevState) => ({
      ...prevState,
      teamInfo,
    }));
  };

  // setDivision for props in ChooseDivisionPage
  const setDivision = (selectedDivision: SelectedOptions[]) => {
    setApplyInfo((prevState) => ({
      ...prevState,
      selectedDivision,
    }));
  };

  // setDivisionId for props in ChooseDivisionPage
  const setDivisionId = (selectedDicisionId: any) => {
    setApplyInfo((prevState) => ({
      ...prevState,
      selectedDicisionId,
    }));
  };

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIcon icon={<IconNavigateBefore />} onClick={gotoPreviousStep} />}
        title={currentStep}
      />
      <Funnel>
        <Step name="선수정보 확인">
          <PlayerInfoPage
            playerInfo={applyInfo.playerInfo}
            setPlayerInfo={setPlayerInfo}
            onNext={gotoNextStep}
          />
        </Step>
        <Step name="추가정보 입력">
          <ExtraInfoPage
            extraInfo={applyInfo.extraInfo}
            setExtraInfo={setExtraInfo}
            onNext={gotoNextStep}
          />
        </Step>
        <Step name="부문선택">
          <ChooseDivisionPage
            onNext={gotoNextStep}
            selectedDivision={applyInfo.selectedDivision}
            setDivision={setDivision}
            setDivisionId={setDivisionId}
          />
        </Step>
        <Step name="소속 입력">
          <TeamInfoPage
            teamInfo={applyInfo.teamInfo}
            setTeamInfo={setTeamInfo}
            onNext={gotoNextStep}
          />
        </Step>
        <Step name="신청정보 확인">
          <CheckApplyInfoPage onNext={gotoNextStep} />
        </Step>
        <Step name="결제하기">
          <BeltPage />
        </Step>
      </Funnel>
    </div>
  );
}
