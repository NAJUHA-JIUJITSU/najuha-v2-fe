import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import Input from '@/components/common/input';
import { useInput } from '@/hook/useInput';
import { validateTrue } from '@/utils/validations/userValidations';
import CheckBoxLabel from '@/components/common/checkBoxLabel';
import { useState } from 'react';

export default function TeamInfoPage({ onNext }: { onNext: () => void }) {
  // network name input
  // team input
  // master name input
  const {
    value: network,
    setValue: setNetwork,
    errMsg: networkErrMsg,
    validate: networkValidate,
  } = useInput('', validateTrue);
  const {
    value: team,
    setValue: setTeam,
    errMsg: teamErrMsg,
    validate: teamValidate,
  } = useInput('', validateTrue);
  const {
    value: master,
    setValue: setMaster,
    errMsg: masterErrMsg,
    validate: masterValidate,
  } = useInput('', validateTrue);
  const [isChecked, setIsChecked] = useState(false);

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
          value={master}
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
          onClick={onNext}
        />
      </div>
    </>
  );
}
