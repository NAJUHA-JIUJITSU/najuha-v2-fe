import React, { useState } from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { IDivisionPack } from 'najuha-v2-api/lib/modules/competitions/domain/interface/division-pack.interface';
import DivisionTable from './divisionTable';
import DivisionController from './divisionController';

interface ICompetitionDivisionFormProps {
  divisionPackInfo: IDivisionPack[];
  setDivisionPackInfo: React.Dispatch<React.SetStateAction<IDivisionPack[]>>;
  competitionId: string | null;
  createDivision: (competitionId: string, data: IDivisionPack[]) => void;
  onNext: () => void;
}

export default function CompetitionDivisionForm({
  divisionPackInfo,
  setDivisionPackInfo,
  competitionId,
  createDivision,
  onNext,
}: ICompetitionDivisionFormProps) {
  const [currentDivisionPack, setCurrentDivisionPack] = useState<IDivisionPack>({
    categories: [],
    uniforms: [],
    genders: [],
    belts: [],
    weights: [],
    birthYearRangeStart: '',
    birthYearRangeEnd: '',
    price: 0,
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(divisionPackInfo);
    const { name, value } = e.target;
    const splitValues = value.split(',');
    setCurrentDivisionPack((prev) => ({
      ...prev,
      [name]: splitValues,
    }));
  };

  const handleSingleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(divisionPackInfo);
    const { name, value } = e.target;
    setCurrentDivisionPack((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseInt(value, 10) : value,
    }));
  };

  const handleEditDivisionPack = (index: number) => {
    setCurrentDivisionPack(divisionPackInfo[index]);
    setEditingIndex(index);
  };

  const handleRemoveDivisionPack = (index: number) => {
    setDivisionPackInfo((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDuplicateDivisionPack = (index: number) => {
    const duplicatePack = { ...divisionPackInfo[index] };
    setDivisionPackInfo((prev) => [...prev, duplicatePack]);
  };

  const handleAddDivisionPack = () => {
    if (editingIndex !== null) {
      setDivisionPackInfo((prev) =>
        prev.map((pack, index) => (index === editingIndex ? currentDivisionPack : pack)),
      );
      setEditingIndex(null);
    } else {
      setDivisionPackInfo((prev) => [...prev, currentDivisionPack]);
    }
    setCurrentDivisionPack({
      categories: [],
      uniforms: [],
      genders: [],
      belts: [],
      weights: [],
      birthYearRangeStart: '',
      birthYearRangeEnd: '',
      price: 0,
    });
  };

  const RegisterDivisionPack = () => {
    if (competitionId === null) return;
    createDivision(competitionId, divisionPackInfo);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <DivisionController
          divisionPack={currentDivisionPack}
          onChange={handleInputChange}
          onSingleChange={handleSingleInputChange}
          onAdd={handleAddDivisionPack}
          editing={editingIndex !== null}
        />
        <DivisionTable
          divisionPacks={divisionPackInfo}
          onEdit={handleEditDivisionPack}
          onRemove={handleRemoveDivisionPack}
          onDuplicate={handleDuplicateDivisionPack}
        />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="부문 추가"
          color="blue"
          disabled={false}
          width="full"
          size="large"
          onClick={RegisterDivisionPack}
        />
        <ButtonOnClick
          type="filled"
          text="다음"
          color="blue"
          disabled={false}
          width="full"
          size="large"
          onClick={onNext}
        />
      </div>
    </>
  );
}
