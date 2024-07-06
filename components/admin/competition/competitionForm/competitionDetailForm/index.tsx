import React, { useState } from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { ICompetitionCreateDto } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';
import MDEditor from '@uiw/react-md-editor';
import { Primitive } from '@nestia/fetcher';

interface CompetitionDetailFormProps {
  competitionInfo: Primitive<ICompetitionCreateDto>;
  setCompetitionInfo: (data: Primitive<ICompetitionCreateDto>) => void;
  onSave: () => void;
}

export default function CompetitionDetailForm({
  competitionInfo,
  setCompetitionInfo,
  onSave,
}: CompetitionDetailFormProps) {
  const [value, setValue] = useState(competitionInfo.description);

  const handleSaveCompetition = () => {
    const updatedCompetitionInfo = {
      ...competitionInfo,
      description: value,
    };
    setCompetitionInfo(updatedCompetitionInfo);
    onSave();
  };

  return (
    <>
      <div className={styles.wrapper} id="markdown-css">
        <MDEditor value={value} onChange={setValue} />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="저장"
          color={'blue'}
          disabled={false}
          width="full"
          size="large"
          onClick={handleSaveCompetition}
        />
      </div>
    </>
  );
}
