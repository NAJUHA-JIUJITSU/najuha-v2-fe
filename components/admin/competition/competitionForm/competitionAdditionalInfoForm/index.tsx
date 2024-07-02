import React from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import Input from '@/components/common/input';
import { useState } from 'react';
import { useCreateRequiredAdditionalInfo } from '@/hooks/admin';

export default function CompetitionInfoAdditionalInfoForm({
  onNext,
  competitionId,
}: {
  onNext: () => void;
  competitionId: string | null;
}) {
  const [type, setType] = useState('ADDRESS');
  const [des, setDes] = useState('string');
  const { mutate: createCompetitionRequiredAdditionalInfo } = useCreateRequiredAdditionalInfo();

  const handleNext = () => {
    onNext();
  };

  const handleCreate = () => {
    if (!competitionId) return;
    if (type !== 'ADDRESS' && type !== 'SOCIAL_SECURITY_NUMBER') return;
    createCompetitionRequiredAdditionalInfo(
      {
        competitionId: competitionId as string,
        data: {
          type: type,
          description: des,
        },
      },
      {
        onSuccess: (res) => {
          console.log(res);
          alert('추가정보가 등록되었습니다.');
        },
      },
    );
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Input
          label="받을정보"
          placeholder="ADDRESS OR SOCIAL_SECURITY_NUMBER"
          value={type}
          onChange={(e) => setType(e.target.value)}
          autoFocus={true}
        />
        <Input
          label="설명"
          placeholder="string"
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="추가정보 등록"
          color={'blue'}
          disabled={false}
          width="full"
          size="large"
          onClick={handleCreate}
        />
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
