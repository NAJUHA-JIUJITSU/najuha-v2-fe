'use client';
import React, { useState } from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import Input from '@/components/common/input';
import { ICompetitionCreateDto } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';
import RadioButtonLabel from '@/components/common/radioButtonLabel';
import { Primitive } from '@nestia/fetcher';

interface CompetitionInfoFormProps {
  competitionInfo: Primitive<ICompetitionCreateDto>;
  setCompetitionInfo: (data: Primitive<ICompetitionCreateDto>) => void;
  onNext: () => void;
}

export default function CompetitionInfoForm({
  competitionInfo,
  setCompetitionInfo,
  onNext,
}: CompetitionInfoFormProps) {
  const [title, setTitle] = useState(competitionInfo.title);
  const [address, setAddress] = useState(competitionInfo.address);
  const [competitionDate, setCompetitionDate] = useState(competitionInfo.competitionDate);
  const [registrationStartDate, setRegistrationStartDate] = useState(
    competitionInfo.registrationStartDate,
  );
  const [registrationEndDate, setRegistrationEndDate] = useState(
    competitionInfo.registrationEndDate,
  );
  const [refundDeadlineDate, setRefundDeadlineDate] = useState(competitionInfo.refundDeadlineDate);
  const [soloRegistrationAdjustmentStartDate, setSoloRegistrationAdjustmentStartDate] = useState(
    competitionInfo.soloRegistrationAdjustmentStartDate,
  );
  const [soloRegistrationAdjustmentEndDate, setSoloRegistrationAdjustmentEndDate] = useState(
    competitionInfo.soloRegistrationAdjustmentEndDate,
  );
  const [registrationListOpenDate, setRegistrationListOpenDate] = useState(
    competitionInfo.registrationListOpenDate,
  );
  const [bracketOpenDate, setBracketOpenDate] = useState(competitionInfo.bracketOpenDate);
  const [isPartnership, setIsPartnership] = useState(competitionInfo.isPartnership);

  const handleNext = () => {
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
          type="datetime-local"
          placeholder="대회일을 선택해주세요."
          value={competitionDate}
          onChange={(e) => setCompetitionDate(e.target.value)}
        />
        <Input
          label="신청 시작일"
          type="datetime-local"
          placeholder="신청 시작일을 선택해주세요."
          value={registrationStartDate}
          onChange={(e) => setRegistrationStartDate(e.target.value)}
        />
        <Input
          label="신청 마감일"
          type="datetime-local"
          placeholder="신청 마감일을 선택해주세요."
          value={registrationEndDate}
          onChange={(e) => setRegistrationEndDate(e.target.value)}
        />
        <Input
          label="환불 마감일"
          type="datetime-local"
          placeholder="환불 마감일을 선택해주세요."
          value={refundDeadlineDate}
          onChange={(e) => setRefundDeadlineDate(e.target.value)}
        />
        <Input
          label="단독출전 조정 시작일"
          type="datetime-local"
          placeholder="단독출전 조정 시작일을 선택해주세요."
          value={soloRegistrationAdjustmentStartDate}
          onChange={(e) => setSoloRegistrationAdjustmentStartDate(e.target.value)}
        />
        <Input
          label="단독출전 조정 마감일"
          type="datetime-local"
          placeholder="단독출전 조정 마감일을 선택해주세요."
          value={soloRegistrationAdjustmentEndDate}
          onChange={(e) => setSoloRegistrationAdjustmentEndDate(e.target.value)}
        />
        <Input
          label="참가자 공개일"
          type="datetime-local"
          placeholder="참가자 공개일을 선택해주세요."
          value={registrationListOpenDate}
          onChange={(e) => setRegistrationListOpenDate(e.target.value)}
        />
        <Input
          label="대진표 공개일"
          type="datetime-local"
          placeholder="대진표 공개일을 선택해주세요."
          value={bracketOpenDate}
          onChange={(e) => setBracketOpenDate(e.target.value)}
        />
        <RadioButtonLabel
          msg={'협약대회'}
          isChecked={isPartnership}
          changeCheck={() => setIsPartnership(true)}
          isUnderlined={true}
        />
        <RadioButtonLabel
          msg={'비협약대회'}
          isChecked={!isPartnership}
          changeCheck={() => setIsPartnership(false)}
          isUnderlined={true}
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
