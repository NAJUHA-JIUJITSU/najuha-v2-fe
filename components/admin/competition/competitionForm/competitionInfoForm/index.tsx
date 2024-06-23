import React from 'react';
import { useInput } from '@/hooks/useInput';
import { validateTrue } from '@/utils/validations/userValidations';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import Input from '@/components/common/input';
import { ICompetitionCreateDto } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';

interface CompetitionInfoFormProps {
  competitionInfo: ICompetitionCreateDto;
  setCompetitionInfo: (data: ICompetitionCreateDto) => void;
  onNext: () => void;
}

export default function CompetitionInfoForm({
  competitionInfo,
  setCompetitionInfo,
  onNext,
}: CompetitionInfoFormProps) {
  const { value: title, setValue: setTitle } = useInput(competitionInfo.title, validateTrue);
  const { value: address, setValue: setAddress } = useInput(competitionInfo.address, validateTrue);
  const { value: competitionDate, setValue: setCompetitionDate } = useInput(
    competitionInfo.competitionDate,
    validateTrue,
  );
  const { value: registrationStartDate, setValue: setRegistrationStartDate } = useInput(
    competitionInfo.registrationStartDate,
    validateTrue,
  );
  const { value: registrationEndDate, setValue: setRegistrationEndDate } = useInput(
    competitionInfo.registrationEndDate,
    validateTrue,
  );
  const { value: refundDeadlineDate, setValue: setRefundDeadlineDate } = useInput(
    competitionInfo.refundDeadlineDate,
    validateTrue,
  );
  const {
    value: soloRegistrationAdjustmentStartDate,
    setValue: setSoloRegistrationAdjustmentStartDate,
  } = useInput(competitionInfo.soloRegistrationAdjustmentStartDate, validateTrue);
  const {
    value: soloRegistrationAdjustmentEndDate,
    setValue: setSoloRegistrationAdjustmentEndDate,
  } = useInput(competitionInfo.soloRegistrationAdjustmentEndDate, validateTrue);
  const { value: registrationListOpenDate, setValue: setRegistrationListOpenDate } = useInput(
    competitionInfo.registrationListOpenDate,
    validateTrue,
  );
  const { value: bracketOpenDate, setValue: setBracketOpenDate } = useInput(
    competitionInfo.bracketOpenDate,
    validateTrue,
  );
  const { value: isPartnership, setValue: setIsPartnership } = useInput(
    competitionInfo.isPartnership,
    validateTrue,
  );

  const handleNext = () => {
    // 함수형 업데이트
    setCompetitionInfo({
      ...competitionInfo,
      title,
      address,
      competitionDate,
      registrationStartDate,
      registrationEndDate,
      refundDeadlineDate,
      soloRegistrationAdjustmentStartDate,
      soloRegistrationAdjustmentEndDate,
      registrationListOpenDate,
      bracketOpenDate,
      isPartnership,
    });
    onNext();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Input
          label="대회명"
          placeholder="제 1회 나주하주짓수대회"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus={true}
        />
        <Input
          label="주소"
          placeholder="서울시 강남구 역삼동 123-45"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          label="대회일"
          placeholder="2022-01-01 00:00:00"
          value={competitionDate}
          onChange={(e) => setCompetitionDate(e.target.value)}
        />
        <Input
          label="등록 시작일"
          placeholder="2022-01-01 00:00:00"
          value={registrationStartDate}
          onChange={(e) => setRegistrationStartDate(e.target.value)}
        />
        <Input
          label="등록 마감일"
          placeholder="2022-01-01 00:00:00"
          value={registrationEndDate}
          onChange={(e) => setRegistrationEndDate(e.target.value)}
        />
        <Input
          label="환불 마감일"
          placeholder="2022-01-01 00:00:00"
          value={refundDeadlineDate}
          onChange={(e) => setRefundDeadlineDate(e.target.value)}
        />
        <Input
          label="단독출전 조정 시작일"
          placeholder="2022-01-01 00:00:00"
          value={soloRegistrationAdjustmentStartDate}
          onChange={(e) => setSoloRegistrationAdjustmentStartDate(e.target.value)}
        />
        <Input
          label="단독출전 조정 마감일"
          placeholder="2022-01-01 00:00:00"
          value={soloRegistrationAdjustmentEndDate}
          onChange={(e) => setSoloRegistrationAdjustmentEndDate(e.target.value)}
        />
        <Input
          label="참가자 공개일"
          placeholder="2022-01-01 00:00:00"
          value={registrationListOpenDate}
          onChange={(e) => setRegistrationListOpenDate(e.target.value)}
        />
        <Input
          label="대진표 공개일"
          placeholder="2022-01-01 00:00:00"
          value={bracketOpenDate}
          onChange={(e) => setBracketOpenDate(e.target.value)}
        />
        <Input
          label="파트너십 여부"
          placeholder="파트너십 여부를 선택해주세요."
          value={isPartnership}
          onChange={(e) => setIsPartnership(e.target.value)}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color={'blue'}
          disabled={false}
          width="full"
          size="large"
          onClick={handleNext}
        />
      </div>
    </>
  );
}
