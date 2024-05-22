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
import { useGetCompetitionId } from '@/hooks/competition';
import { useSubmitApplication } from '@/hooks/applications';

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
  console.log('divisions:', divisions);
  const { mutate } = useSubmitApplication();
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const handleSubmit = (updatedTeamInfo: TeamInfo) => {
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
          console.log('applicationId:', data.result.application.id);
          setApplicationId(data.result.application.id);
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

  // ---
  // 1. 부문선택창에 들어갈떄 gender를 바탕으로 division을 필터링해야함 그리고 이전눌렀을때 제대로 동작 안하고있음 => 완료
  // 3. 데이터값 안바꾸고 그대로 유지 ui에서 보여주는 부분만 바꾸기 => input validation도 다 바꿔야함
  // 4. 가격조회 api호출
  // 5. 타입정의 및 분리 필요 => 금요일날 하기로함.
  // 6. 전체적인 변수명 점검 => 변수명 명확히하기
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
          <CheckApplyInfoPage applicationId={applicationId} />
        </Step>
        <Step name="결제하기">
          <BeltPage /> {/* 결제 컴포넌트로 대체 */}
        </Step>
      </Funnel>
    </div>
  );
}
