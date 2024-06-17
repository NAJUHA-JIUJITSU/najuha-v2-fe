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
import { ApplyInfo } from '@/interfaces/competitionApply';
import { useGetCompetitionId } from '@/hooks/competition';
import { useSubmitApplication } from '@/hooks/applications';
import { IDivision } from '@/node_modules/najuha-v2-api/lib/modules/competitions/domain/interface/division.interface';

const steps = [
  '선수정보 확인',
  '추가정보 입력',
  '부문선택',
  '소속 입력',
  '신청정보 확인',
  '결제하기',
];

export default function CompetitionApply({ params }: { params: { competitionId: string } }) {
  const { gotoNextStep, gotoPreviousStep, Funnel, Step, currentStep } = useFunnel(steps);
  const [applyInfo, setApplyInfo] = useState<ApplyInfo>({
    playerInfo: {
      name: '',
      gender: 'MALE',
      birth: '',
      phoneNumber: '',
      belt: '화이트',
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
  const { mutate } = useSubmitApplication();
  const [applicationId, setApplicationId] = useState<string>('');

  const handleSubmit = (updatedTeamInfo: ApplyInfo['teamInfo']) => {
    // 상태 업데이트가 완료된 후 mutate 호출
    console.log(applyInfo.playerInfo);
    mutate(
      {
        applyInfo: {
          ...applyInfo,
          teamInfo: updatedTeamInfo,
        },
        competitionId: params.competitionId,
      },
      {
        onSuccess: (data) => {
          console.log('Application submitted successfully:', data);
          console.log('applicationId:', data.application.id);
          setApplicationId(data.application.id);
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
  const setPlayerInfo = (playerInfo: ApplyInfo['playerInfo']) => {
    setApplyInfo((prevState) => ({
      ...prevState,
      playerInfo,
    }));
  };

  // setExtraInfo for props in ExtraInfoPage
  const setExtraInfo = (extraInfo: ApplyInfo['extraInfo']) => {
    setApplyInfo((prevState) => ({
      ...prevState,
      extraInfo,
    }));
  };

  // setTeamInfo for props in TeamInfoPage
  const setTeamInfo = (teamInfo: ApplyInfo['teamInfo']) => {
    setApplyInfo((prevState) => ({
      ...prevState,
      teamInfo,
    }));
  };

  // setDivision for props in ChooseDivisionPage
  const setDivision = (selectedDivision: ApplyInfo['selectedDivision']) => {
    setApplyInfo((prevState) => ({
      ...prevState,
      selectedDivision,
    }));
  };

  // setDivisionId for props in ChooseDivisionPage
  const setDivisionId = (selectedDicisionId: ApplyInfo['selectedDicisionId']) => {
    setApplyInfo((prevState) => ({
      ...prevState,
      selectedDicisionId,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !competition) return <div>대회정보가 없습니다.</div>;
  const divisions: IDivision[] = competition.divisions;

  return (
    <div className={styles.wrapper}>
      <Header
        leftIcon={<ButtonIcon icon={<IconNavigateBefore />} onClick={gotoPreviousStep} />}
        title={currentStep}
      />
      <Funnel>
        {/* 성별선택스텝추가하기 */}
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
