import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import Input from '@/components/common/input';
import { useInput } from '@/hooks/useInput';
import { validateTrue } from '@/utils/validations/userValidations';
import CheckBoxLabel from '@/components/common/checkBoxLabel';
import { useState } from 'react';
import { TeamInfo } from '@/interfaces/competitionApply';

export default function TeamInfoPage({
  onNext,
  teamInfo,
  setTeamInfo,
}: {
  onNext: any;
  teamInfo: TeamInfo;
  setTeamInfo: (teamInfo: TeamInfo) => void;
}) {
  // network name input
  // team input
  // master name input
  const {
    value: network,
    setValue: setNetwork,
    errMsg: networkErrMsg,
    validate: networkValidate,
  } = useInput(teamInfo.network, validateTrue);
  const {
    value: team,
    setValue: setTeam,
    errMsg: teamErrMsg,
    validate: teamValidate,
  } = useInput(teamInfo.team, validateTrue);
  const {
    value: masterName,
    setValue: setMaster,
    errMsg: masterErrMsg,
    validate: masterValidate,
  } = useInput(teamInfo.masterName, validateTrue);

  const [isChecked, setIsChecked] = useState(false);

  const handleNext = () => {
    const updatedTeamInfo = {
      ...teamInfo,
      network,
      team,
      masterName,
    };

    onNext(updatedTeamInfo); // 최신 teamInfo를 handleSubmit로 전달
  };

  const validate = networkValidate && teamValidate && masterValidate;
  return (
    <>
      <div className={styles.wrapper}>
        <Input
          label="소속 네트워크"
          placeholder="골든라이온"
          value={network}
          errMsg={networkErrMsg}
          onChange={(e) => setNetwork(e.target.value)}
          autoFocus={true}
        />
        <Input
          label="소속 팀"
          placeholder="골든 라이온"
          value={team}
          errMsg={teamErrMsg}
          onChange={(e) => setTeam(e.target.value)}
        />
        <Input
          label="관장님 성함"
          placeholder="김영태"
          value={masterName}
          errMsg={masterErrMsg}
          onChange={(e) => setMaster(e.target.value)}
        />
        <CheckBoxLabel
          msg="위 정보를 다음에도 사용하기"
          changeCheck={() => {
            setIsChecked((prev) => !prev);
          }}
          isChecked={isChecked}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color={validate ? 'blue' : 'disabled'}
          disabled={!validate}
          width="full"
          size="large"
          onClick={handleNext}
        />
      </div>
    </>
  );
}
