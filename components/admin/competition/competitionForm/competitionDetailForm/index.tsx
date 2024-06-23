import React, { useState } from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { ICompetitionCreateDto } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';
import MDEditor from '@uiw/react-md-editor';

interface CompetitionDetailFormProps {
  competitionInfo: ICompetitionCreateDto;
  setCompetitionInfo: (data: ICompetitionCreateDto) => void;
  onNext: () => void;
}

export default function CompetitionDetailForm({
  competitionInfo,
  setCompetitionInfo,
  onNext,
}: CompetitionDetailFormProps) {
  const [value, setValue] = useState(competitionInfo.description);

  const handleNext = () => {
    setCompetitionInfo({
      ...competitionInfo,
      description: value,
    });
    onNext();
  };

  return (
    <>
      <div className={styles.wrapper} id="markdown-css">
        <MDEditor value={value} onChange={setValue} />
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
