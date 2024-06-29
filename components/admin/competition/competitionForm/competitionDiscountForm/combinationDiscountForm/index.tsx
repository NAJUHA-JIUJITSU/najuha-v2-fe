import React from 'react';
import Input from '@/components/common/input';
import Select from '@/components/common/select/index';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import styles from './index.module.scss';

const CombinationDiscountForm = ({
  length,
  discounts,
  expanded,
  onToggle,
  onReset,
  onUpdate,
  onRemove,
  onAdd,
}) => {
  return (
    <div className={styles.container}>
      <ButtonOnClick
        type="filled"
        size="xLarge"
        color="lightblue"
        width="normal"
        text={`조합 할인 ${length} - ${expanded ? '접기' : '펼치기'}`}
        onClick={onToggle}
      />
      {expanded && (
        <>
          <div className={styles.controller}>
            <ButtonOnClick
              type="filled"
              size="small"
              color="lightblue"
              width="normal"
              text="초기화"
              onClick={onReset}
            />
            <ButtonOnClick
              type="filled"
              size="small"
              color="lightblue"
              width="normal"
              text="조합추가하기"
              onClick={() => onAdd(length)}
            />
          </div>
          {discounts.map((discount, index) => (
            <div className={styles.discountForm}>
              <div className={styles.index}>{index + 1}</div>
              <div key={index} className={styles.flexRow}>
                {discount.combination.map((rule, ruleIndex) => (
                  <>
                    <div key={ruleIndex} className={styles.flexRow}>
                      <Select
                        type="outlined"
                        options={['GI', 'NOGI']}
                        value={rule.uniformType}
                        setState={(newValue) => onUpdate(index, ruleIndex, 'uniformType', newValue)}
                        placeholder="Select Uniform Type"
                      />
                      <Select
                        type="outlined"
                        options={['WEIGHT', 'ABSOLUTE']}
                        value={rule.weightType}
                        setState={(newValue) => onUpdate(index, ruleIndex, 'weightType', newValue)}
                        placeholder="Select Weight Type"
                      />
                    </div>
                    {ruleIndex !== discount.combination.length - 1 && (
                      <div className={styles.plus}>+</div>
                    )}
                  </>
                ))}
              </div>
              <div className={styles.flexRow}>
                <Input
                  label="할인 금액"
                  placeholder="할인 금액 입력"
                  value={discount.discountAmount.toString()}
                  onChange={(e) => onUpdate(index, 'discountAmount', e.target.value)}
                />
                <ButtonOnClick
                  type="outlined"
                  size="small"
                  color="gray"
                  text="Remove Discount"
                  onClick={() => onRemove(discount.globalIndex)} // 전역 인덱스 사용
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CombinationDiscountForm;
