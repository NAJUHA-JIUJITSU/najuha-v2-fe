import React, { useState } from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { ICompetitionCreateDto } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';
import MDEditor from '@uiw/react-md-editor';

interface CompetitionDetailFormProps {
  competitionInfo: ICompetitionCreateDto;
  setCompetitionInfo: (data: ICompetitionCreateDto) => void;
  createCompetition: any;
  setCompetitionId: (id: string) => void;
  onNext: () => void;
}

export default function CompetitionDetailForm({
  competitionInfo,
  setCompetitionInfo,
  createCompetition,
  setCompetitionId,
  onNext,
}: CompetitionDetailFormProps) {
  const [value, setValue] = useState(competitionInfo.description);

  const handleCreateCompetition = () => {
    const updatedCompetitionInfo = {
      ...competitionInfo,
      description: value,
    };
    setCompetitionInfo(updatedCompetitionInfo);
    createCompetition(updatedCompetitionInfo, {
      onSuccess: (res) => {
        console.log(res);
        alert('대회가 등록되었습니다.');
        setCompetitionId(res.competition.id);
      },
      onError: () => {
        alert('대회 등록에 실패했습니다.');
      },
    });
  };
  return (
    <>
      <div className={styles.wrapper} id="markdown-css">
        <MDEditor value={value} onChange={setValue} />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="대회등록하기"
          color={'blue'}
          disabled={false}
          width="full"
          size="large"
          onClick={handleCreateCompetition}
        />
        <ButtonOnClick
          type="filled"
          text="다음"
          color={'blue'}
          disabled={false}
          width="full"
          size="large"
          onClick={onNext}
        />
      </div>
    </>
  );
}
