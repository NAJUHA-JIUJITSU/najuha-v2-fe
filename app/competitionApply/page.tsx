'use client';
import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIcon } from '@/components/common/icon/iconOnClick';
import BeltPage from '@/components/register/registerFunnel/beltPage';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import { useFunnel } from '@/hooks/useFunnel';
import PlayerInfoPage from '@/components/competitionApply/applyFunnel/playerInfoPage';
import { useState } from 'react';
import ExtraInfoPage from '@/components/competitionApply/applyFunnel/extraInfoPage';
import ChooseDivisionPage from '@/components/competitionApply/applyFunnel/chooseDivisionPage';
import TeamInfoPage from '@/components/competitionApply/applyFunnel/teamInfoPage';
import CheckApplyInfoPage from '@/components/competitionApply/applyFunnel/checkApplyInfoPage/checkApplyInfoPage';
import {
  ApplyInfo,
  ExtraInfo,
  PlayerInfo,
  SelectedOptions,
  TeamInfo,
} from '@/interfaces/competitionApply';

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
  const [applyInfo, setApplyInfo] = useState<ApplyInfo>({
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
      master: '',
    },
    selectedDivision: [{ uniform: '', category: '', belt: '', weight: '' }],
    selectedDicisionId: [],
  });

  // setplayerInfo for props in PlayerInfoPage
  const setPlayerInfo = (playerInfo: PlayerInfo) => {
    setApplyInfo((prevState) => ({
      ...prevState,
      playerInfo,
    }));
  };

  // setExtraInfo for props in ExtraInfoPage
  const setExtraInfo = (extraInfo: ExtraInfo) => {
    setApplyInfo((prevState) => ({
      ...prevState,
      extraInfo,
    }));
  };

  // setTeamInfo for props in TeamInfoPage
  const setTeamInfo = (teamInfo: TeamInfo) => {
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

  //todo: 타입정의 및 분리 필요 => 완료
  //todo: 컴포넌트 분리 및 styles 분리 필요
  //todo: 대회신청 api 호출
  //todo: 가격조회 api 호출
  //todo: 결제 api 호출

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
            playerInfo={applyInfo.playerInfo}
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
          <CheckApplyInfoPage onNext={gotoNextStep} applyInfo={applyInfo} />
        </Step>
        <Step name="결제하기">
          <BeltPage />
        </Step>
      </Funnel>
    </div>
  );
}
