import React, { useState } from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import Input from '@/components/common/input';
import { IDivisionPack } from 'najuha-v2-api/lib/modules/competitions/domain/interface/division-pack.interface';
import DivisionTable from './divisionTable';
import DivisionController from './divisionController';

interface ICompetitionDivisionFormProps {
  divisionPackInfo: IDivisionPack[];
  setDivisionPackInfo: React.Dispatch<React.SetStateAction<IDivisionPack[]>>;
  onNext: () => void;
}

export default function CompetitionDivisionForm({
  divisionPackInfo,
  setDivisionPackInfo,
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
    const { name, value } = e.target;
    const splitValues = value.split(',');
    setCurrentDivisionPack((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseInt(value, 10) : splitValues,
    }));
  };

  const handleSingleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentDivisionPack((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleNext = () => {
    onNext();
  };

  return (
    <>
      <div className={styles.wrapper}>
        {/* <div className={styles.controller}>
          <div className={styles.title}>부문 등록</div>
          <div className={styles.row}>
            <Input
              label="카테고리"
              placeholder="카테고리를 입력하세요"
              value={currentDivisionPack.categories.join(',')}
              onChange={handleInputChange}
              name="categories"
            />
            <Input
              label="유니폼"
              placeholder="유니폼을 입력하세요"
              value={currentDivisionPack.uniforms.join(',')}
              onChange={handleInputChange}
              name="uniforms"
            />
            <Input
              label="성별"
              placeholder="성별을 입력하세요"
              value={currentDivisionPack.genders.join(',')}
              onChange={handleInputChange}
              name="genders"
            />
            <Input
              label="벨트"
              placeholder="벨트를 입력하세요"
              value={currentDivisionPack.belts.join(',')}
              onChange={handleInputChange}
              name="belts"
            />
            <Input
              label="체중"
              placeholder="체중을 입력하세요"
              value={currentDivisionPack.weights.join(',')}
              onChange={handleInputChange}
              name="weights"
            />
          </div>
          <div className={styles.row}>
            <Input
              label="출생연도 시작"
              placeholder="출생연도 시작을 입력하세요"
              value={currentDivisionPack.birthYearRangeStart}
              onChange={handleSingleInputChange}
              name="birthYearRangeStart"
            />
            <Input
              label="출생연도 끝"
              placeholder="출생연도 끝을 입력하세요"
              value={currentDivisionPack.birthYearRangeEnd}
              onChange={handleSingleInputChange}
              name="birthYearRangeEnd"
            />
            <Input
              label="가격"
              placeholder="가격을 입력하세요"
              value={currentDivisionPack.price.toString()}
              onChange={handleSingleInputChange}
              name="price"
            />
            <ButtonOnClick
              type="filled"
              text={editingIndex !== null ? '수정' : '부문 추가'}
              color="blue"
              disabled={false}
              size="xLarge"
              onClick={handleAddDivisionPack}
            />
          </div>
        </div> */}
        <DivisionController
          divisionPack={currentDivisionPack}
          onChange={handleInputChange}
          onSingleChange={handleSingleInputChange}
          onAdd={handleAddDivisionPack}
        />
        <DivisionTable
          divisionPacks={divisionPackInfo}
          onEdit={handleEditDivisionPack}
          onRemove={handleRemoveDivisionPack}
          onDuplicate={handleDuplicateDivisionPack}
        />
        {/* <div className={styles.table}>
          <div className={styles.column}>
            <div className={`${styles.cell} ${styles['cell--narrow']}`}>부문</div>
            <div className={`${styles.cell} ${styles['cell--narrow']}`}>카테고리</div>
            <div className={`${styles.cell} ${styles['cell--narrow']}`}>유니폼</div>
            <div className={`${styles.cell} ${styles['cell--narrow']}`}>성별</div>
            <div className={`${styles.cell} ${styles['cell--wide']}`}>벨트</div>
            <div className={`${styles.cell} ${styles['cell--wide']}`}>체중</div>
            <div className={`${styles.cell} ${styles['cell--medium']}`}>출생연도</div>
            <div className={`${styles.cell} ${styles['cell--medium']}`}>가격</div>
          </div>
          {divisionPackInfo.map((pack, index) => (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={styles.column}>
                <div className={`${styles.cell} ${styles['cell--narrow']}`}>{index + 1}</div>
                <div className={`${styles.cell} ${styles['cell--narrow']}`}>
                  {pack.categories.join(',')}
                </div>
                <div className={`${styles.cell} ${styles['cell--narrow']}`}>
                  {pack.uniforms.join(',')}
                </div>
                <div className={`${styles.cell} ${styles['cell--narrow']}`}>
                  {pack.genders.join(',')}
                </div>
                <div className={`${styles.cell} ${styles['cell--wide']}`}>
                  {pack.belts.join(',')}
                </div>
                <div className={`${styles.cell} ${styles['cell--wide']}`}>
                  {pack.weights.join(',')}
                </div>
                <div className={`${styles.cell} ${styles['cell--medium']}`}>
                  {pack.birthYearRangeStart} - {pack.birthYearRangeEnd}
                </div>
                <div className={`${styles.cell} ${styles['cell--medium']}`}>{pack.price}</div>
                <div className={styles.buttonList}>
                  <ButtonOnClick
                    type="filled"
                    text="수정"
                    color="blue"
                    disabled={false}
                    size="small"
                    onClick={() => handleEditDivisionPack(index)}
                  />
                  <ButtonOnClick
                    type="filled"
                    text="삭제"
                    color="blue"
                    disabled={false}
                    size="small"
                    onClick={() => handleRemoveDivisionPack(index)}
                  />
                  <ButtonOnClick
                    type="filled"
                    text="복사"
                    color="blue"
                    disabled={false}
                    size="small"
                    onClick={() => handleDuplicateDivisionPack(index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>*/}
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color="blue"
          disabled={false}
          width="full"
          size="large"
          onClick={handleNext}
        />
      </div>
    </>
  );
}
