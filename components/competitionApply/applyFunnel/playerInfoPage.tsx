import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import Input from '@/components/common/input';
import Select from '@/components/common/select';
import { useInput } from '@/hooks/useInput';
import {
  validateBirthdate,
  validatePhonenumber,
  validateGender,
  validateTrue,
} from '@/utils/validations/userValidations';
import { useState } from 'react';
import { PlayerInfo } from '@/interfaces/competitionApply';

const options = ['화이트', '블루', '퍼플', '브라운', '블랙'];

export default function PlayerInfoPage({
  onNext,
  playerInfo,
  setPlayerInfo,
}: {
  onNext: () => void;
  playerInfo: PlayerInfo;
  setPlayerInfo: (playerInfo: PlayerInfo) => void;
}) {
  const {
    value: name,
    setValue: setName,
    errMsg: nameErrMsg,
    validate: nameValidate,
  } = useInput(playerInfo.name, validateTrue);
  const {
    value: gender,
    setValue: setGender,
    errMsg: genderErrMsg,
    validate: genderValidate,
  } = useInput(playerInfo.gender, validateGender);
  const {
    value: birth,
    setValue: setBirth,
    errMsg: birthErrMsg,
    validate: birthValidate,
  } = useInput(playerInfo.birth, validateBirthdate);
  const {
    value: phoneNumber,
    setValue: setPhoneNumber,
    errMsg: phoneNumberErrMsg,
    validate: phoneNumberValidate,
  } = useInput(playerInfo.phoneNumber, validatePhonenumber);
  const [belt, setBelt] = useState('화이트');

  const validate = nameValidate && genderValidate && birthValidate && phoneNumberValidate;

  const handleNext = () => {
    setPlayerInfo({
      ...playerInfo,
      name,
      gender,
      birth,
      phoneNumber,
      belt,
    });
    onNext();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Input
          label="이름"
          placeholder="홍길동"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus={true}
        />
        <Input
          label="성별"
          placeholder="여성/남성"
          value={gender}
          errMsg={genderErrMsg}
          onChange={(e) => setGender(e.target.value)}
        />
        <Input
          label="생년월일"
          placeholder="YYYY/MM/DD"
          value={birth}
          errMsg={birthErrMsg}
          onChange={(e) => setBirth(e.target.value)}
        />
        <Input
          label="전화번호"
          placeholder="010-1234-5678"
          value={phoneNumber}
          errMsg={phoneNumberErrMsg}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Select
          label="주짓수 벨트를 설정해주세요"
          placeholder="벨트선택"
          value="화이트"
          options={options}
          setState={setBelt}
        ></Select>
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
