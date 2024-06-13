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
} from '@/interfaces/competitionApply';
import { useGetCompetitionId } from '@/hooks/competition';
// import { useSubmitApplication } from '@/hooks/applications';
import { useSubmitApplication } from '@/api/nestia/hooks/applications';
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
  // 2. 데이터값 안바꾸고 그대로 유지 ui에서 보여주는 부분만 바꾸기 => input validation도 다 바꿔야함
  // 이거에 대한 고민을 많이해봄 다시 문제 해결방법을 생각하면 2가지케이스중 선택하느거임
  // 특정 데이터에 대해 ui표현과 백엔드 데이터가 다를때
  // 첫번쨰, 프론트와 백엔드 데이터를 일치시키고, ui를 표현할때 formatForUI(data) 이런식으로 변환해서 표현 그리고 ui에 입력받을떄 parseFromUI(data) 이런식으로 변환해서 백엔드에 보내기 => 회의때 이거를 하자고해씀
  // 두번째, 프론트와 ui를 일치시키고, api호출할때 변환해서 보내기
  // 첫번째의 장점은 프론트와 백엔드 데이터가 일치하기때문에 api호출할때 변환하는 로직이 필요없음
  // 첫번쨰의 단점은 input에 입력받을때마다 벨리데이션함수에서 parseFromUI(data)를 해줘야함
  // 두번째의 장점은 input에 입력받을때 변환함수가 필요없음
  // 두번째의 단점은 api호출할때 변환함수가 필요함
  // 두번쨰로 선택함 아무래도 인풋마다 변환함수를 넣는게 더 번거로울것같음 오히려 api호출할때 변환함수가 더 편할것같음 => 왜냐하면 변환함수 호출 빈도가 더 적을것같음 => 그리고 변화함수 갯수도 더 적을것같음
  // 3. 가격조회 api호출 => 이거 getApplicaitonInfo에 담아서 주면 될듯함
  // 4. 타입정의 및 분리 필요 => 금요일날 하기로함.
  // 5. 두번째로 선택하면, api post get 할떄 변환하는 함수 잘 만들어야함. => 그리고 변환함수를 따로 빼서 관리해야함
  // 6. 전체적인 변수명 점검 => 변수명 명확히하기
  //todo: 결제 api 호출

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
