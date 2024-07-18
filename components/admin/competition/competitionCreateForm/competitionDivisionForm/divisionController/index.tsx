import React from 'react';
import Input from '@/components/common/input';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import styles from './index.module.scss';
import { IDivisionPack } from 'najuha-v2-api/lib/modules/competitions/domain/interface/division-pack.interface';

interface DivisionControllerProps {
  divisionPack: IDivisionPack;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSingleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  editing?: boolean;
}

const DivisionController = ({
  divisionPack,
  onChange,
  onSingleChange,
  onAdd,
  editing,
}: DivisionControllerProps) => (
  <div className={styles.controller}>
    <div className={styles.title}>부문 등록</div>
    <div className={styles.row}>
      {/* Inputs for categories, uniforms, etc. */}
      <Input
        label="카테고리"
        placeholder="카테고리를 입력하세요"
        value={divisionPack.categories.join(',')}
        onChange={onChange}
        name="categories"
      />
      <Input
        label="유니폼"
        placeholder="유니폼을 입력하세요"
        value={divisionPack.uniforms.join(',')}
        onChange={onChange}
        name="uniforms"
      />
      <Input
        label="성별"
        placeholder="성별을 입력하세요"
        value={divisionPack.genders.join(',')}
        onChange={onChange}
        name="genders"
      />
      <Input
        label="벨트"
        placeholder="벨트를 입력하세요"
        value={divisionPack.belts.join(',')}
        onChange={onChange}
        name="belts"
      />
      <Input
        label="체중"
        placeholder="체중을 입력하세요"
        value={divisionPack.weights.join(',')}
        onChange={onChange}
        name="weights"
      />
    </div>
    <div className={styles.row}>
      <Input
        label="출생연도 시작"
        placeholder="출생연도 시작을 입력하세요"
        value={divisionPack.birthYearRangeStart}
        onChange={onSingleChange}
        name="birthYearRangeStart"
      />
      <Input
        label="출생연도 끝"
        placeholder="출생연도 끝을 입력하세요"
        value={divisionPack.birthYearRangeEnd}
        onChange={onSingleChange}
        name="birthYearRangeEnd"
      />
      <Input
        label="가격"
        placeholder="가격을 입력하세요"
        value={divisionPack.price.toString()}
        onChange={onSingleChange}
        name="price"
      />

      <ButtonOnClick
        type="filled"
        text={editing ? '수정' : '부문 추가'}
        color="blue"
        disabled={false}
        size="xLarge"
        onClick={onAdd}
      />
    </div>
  </div>
);

export default DivisionController;
