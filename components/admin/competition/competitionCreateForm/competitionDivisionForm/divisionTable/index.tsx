import React from 'react';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import styles from './index.module.scss';
import { IDivisionPack } from 'najuha-v2-api/lib/modules/competitions/domain/interface/division-pack.interface';

interface DivisionTableProps {
  divisionPacks: IDivisionPack[];
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  onDuplicate: (index: number) => void;
}

const DivisionTable = ({ divisionPacks, onEdit, onRemove, onDuplicate }: DivisionTableProps) => (
  <div className={styles.table}>
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
    {divisionPacks.map((pack, index) => (
      <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={styles.column}>
          <div className={`${styles.cell} ${styles['cell--narrow']}`}>{index + 1}</div>
          <div className={`${styles.cell} ${styles['cell--narrow']}`}>
            {pack.categories.join(',')}
          </div>
          <div className={`${styles.cell} ${styles['cell--narrow']}`}>
            {pack.uniforms.join(',')}
          </div>
          <div className={`${styles.cell} ${styles['cell--narrow']}`}>{pack.genders.join(',')}</div>
          <div className={`${styles.cell} ${styles['cell--wide']}`}>{pack.belts.join(',')}</div>
          <div className={`${styles.cell} ${styles['cell--wide']}`}>{pack.weights.join(',')}</div>
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
              onClick={() => onEdit(index)}
            />
            <ButtonOnClick
              type="filled"
              text="삭제"
              color="blue"
              disabled={false}
              size="small"
              onClick={() => onRemove(index)}
            />
            <ButtonOnClick
              type="filled"
              text="복사"
              color="blue"
              disabled={false}
              size="small"
              onClick={() => onDuplicate(index)}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default DivisionTable;
