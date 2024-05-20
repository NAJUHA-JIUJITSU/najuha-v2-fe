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
import ChooseDivisionPage from '@/components/competitionApply/applyFunnel/chooseDivisionPage/chooseDivisionPage';
import TeamInfoPage from '@/components/competitionApply/applyFunnel/teamInfoPage';
import CheckApplyInfoPage from '@/components/competitionApply/applyFunnel/checkApplyInfoPage/checkApplyInfoPage';
import {
  ApplyInfo,
  ExtraInfo,
  PlayerInfo,
  SelectedOptions,
  TeamInfo,
  Division,
} from '@/interfaces/competitionApply';
import { useGetCompetitionId, useSubmitApplication } from '@/hooks/competition';

const steps = [
  '선수정보 확인',
  '추가정보 입력',
  '부문선택',
  '소속 입력',
  '신청정보 확인',
  '결제하기',
];

export default function CompetitionApply({ params }: { params: { competitionId: number } }) {
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
      masterName: '',
    },
    selectedDivision: [{ uniform: '', category: '', belt: '', weight: '' }],
    selectedDicisionId: [],
  });
  // 대회 조회
  const { data: competition, isLoading, isError } = useGetCompetitionId(params.competitionId);
  let divisions: Division[] = competition?.divisions;
  const { mutate } = useSubmitApplication();

  const handleSubmit = (updatedTeamInfo: TeamInfo) => {
    // applyInfo 상태를 업데이트
    setApplyInfo((prevState) => ({
      ...prevState,
      teamInfo: updatedTeamInfo,
    }));

    // 상태 업데이트가 완료된 후 mutate 호출
    mutate(
      {
        applyInfo: {
          ...applyInfo,
          teamInfo: updatedTeamInfo,
        },
        params,
      },
      {
        onSuccess: (data) => {
          console.log('Application submitted successfully:', data);
          gotoNextStep();
        },
        onError: (error) => {
          console.error('Error submitting application:', error);
        },
        onSettled: () => {
          console.log('Mutation has either succeeded or failed');
        },
      },
    );
  };

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
  //todo: 컴포넌트 분리 및 styles 분리 필요 => 완료
  //todo: chooseDivisionPage 변수명 다시 짓기
  // --- dummydata api 생기면 그때 기능 구현 ---
  //todo: 대회신청 api 호출 => 완료
  // ---
  // 1. 팀정보 입력시에 setState동기적으로 일어날 수 있게 그래야 팀정보가 applyInfo에 제대로 들어감 => 완료
  // 2. 대회신청 요청할때 제대로 데이터 들어갈 수 있게 parsing? format? 함수 만들기 복사해서 넣어줘야함
  // 3. CheckApplyInfoPage(신청상세페이지)는 결국 퍼널구조에서 빠져야하고 새로운 url에 노출되어야함
  // 4. 대회신청이후에 applicationId를 받아서 application/[applicationId]로 이동해야함
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
            divisions={divisions}
            selectedDivision={applyInfo.selectedDivision}
            setDivision={setDivision}
            setDivisionId={setDivisionId}
          />
        </Step>
        <Step name="소속 입력">
          <TeamInfoPage
            teamInfo={applyInfo.teamInfo}
            setTeamInfo={setTeamInfo}
            onNext={handleSubmit}
          />
        </Step>
        <Step name="신청정보 확인">
          <CheckApplyInfoPage onNext={gotoNextStep} applyInfo={applyInfo} />
        </Step>
        <Step name="결제하기">
          <BeltPage /> {/* 결제 컴포넌트로 대체 */}
        </Step>
      </Funnel>
    </div>
  );
}
