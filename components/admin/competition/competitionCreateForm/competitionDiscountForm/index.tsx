import React, { useState } from 'react';
import EarlyBirdDiscountForm from '@/components/admin/competition/competitionCreateForm/competitionDiscountForm/earlyBirdDiscountForm';
import CombinationDiscountForm from '@/components/admin/competition/competitionCreateForm/competitionDiscountForm/combinationDiscountForm';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import { ICombinationDiscountRule } from 'najuha-v2-api/lib/modules/competitions/domain/interface/combination-discount-rule.interface';
import { useCreateCombinationDiscount, useCreateEarlyBirdDiscount } from '@/hooks/admin';
import { useQueryClient } from '@tanstack/react-query';

const dummyCombinationDiscountRules: ICombinationDiscountRule[] = [
  // 2-item combinations
  {
    combination: [
      { uniformType: 'GI', weightType: 'WEIGHT' },
      { uniformType: 'GI', weightType: 'ABSOLUTE' },
    ],
    discountAmount: 10000,
  },
  {
    combination: [
      { uniformType: 'GI', weightType: 'WEIGHT' },
      { uniformType: 'NOGI', weightType: 'WEIGHT' },
    ],
    discountAmount: 10000,
  },
  {
    combination: [
      { uniformType: 'GI', weightType: 'WEIGHT' },
      { uniformType: 'NOGI', weightType: 'ABSOLUTE' },
    ],
    discountAmount: 10000,
  },
  {
    combination: [
      { uniformType: 'GI', weightType: 'ABSOLUTE' },
      { uniformType: 'NOGI', weightType: 'WEIGHT' },
    ],
    discountAmount: 10000,
  },
  {
    combination: [
      { uniformType: 'GI', weightType: 'ABSOLUTE' },
      { uniformType: 'NOGI', weightType: 'ABSOLUTE' },
    ],
    discountAmount: 10000,
  },
  {
    combination: [
      { uniformType: 'NOGI', weightType: 'WEIGHT' },
      { uniformType: 'NOGI', weightType: 'ABSOLUTE' },
    ],
    discountAmount: 10000,
  },

  // 3-item combinations
  {
    combination: [
      { uniformType: 'GI', weightType: 'WEIGHT' },
      { uniformType: 'GI', weightType: 'ABSOLUTE' },
      { uniformType: 'NOGI', weightType: 'WEIGHT' },
    ],
    discountAmount: 20000,
  },
  {
    combination: [
      { uniformType: 'GI', weightType: 'WEIGHT' },
      { uniformType: 'GI', weightType: 'ABSOLUTE' },
      { uniformType: 'NOGI', weightType: 'ABSOLUTE' },
    ],
    discountAmount: 20000,
  },
  {
    combination: [
      { uniformType: 'GI', weightType: 'WEIGHT' },
      { uniformType: 'NOGI', weightType: 'WEIGHT' },
      { uniformType: 'NOGI', weightType: 'ABSOLUTE' },
    ],
    discountAmount: 20000,
  },
  {
    combination: [
      { uniformType: 'GI', weightType: 'ABSOLUTE' },
      { uniformType: 'NOGI', weightType: 'WEIGHT' },
      { uniformType: 'NOGI', weightType: 'ABSOLUTE' },
    ],
    discountAmount: 20000,
  },

  // 4-item combination
  {
    combination: [
      { uniformType: 'GI', weightType: 'WEIGHT' },
      { uniformType: 'GI', weightType: 'ABSOLUTE' },
      { uniformType: 'NOGI', weightType: 'WEIGHT' },
      { uniformType: 'NOGI', weightType: 'ABSOLUTE' },
    ],
    discountAmount: 30000,
  },
];

interface earlyBirdDiscount {
  earlybirdStartDate: string;
  earlybirdEndDate: string;
  discountAmount: number;
}

export default function CompetitionDiscountForm({
  onNext,
  competitionId,
}: {
  onNext: () => void;
  competitionId: string | null;
}) {
  const queryClient = useQueryClient();
  const [earlyBirdDiscount, setEarlyBirdDiscount] = useState<earlyBirdDiscount>({
    earlybirdStartDate: '',
    earlybirdEndDate: '',
    discountAmount: 0,
  });
  const [combinationDiscountRules, setCombinationDiscountRules] = useState(
    dummyCombinationDiscountRules,
  );
  const [expandedGroups, setExpandedGroups] = useState({});
  const { mutate: createCombinationDiscount } = useCreateCombinationDiscount();
  const { mutate: createEarlyBirdDiscount } = useCreateEarlyBirdDiscount();

  const handleToggleEarlyBird = (enable: boolean) => {
    setEarlyBirdDiscount(
      enable ? { earlybirdStartDate: '', earlybirdEndDate: '', discountAmount: 0 } : null,
    );
  };

  const handleChangeEarlyBird = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEarlyBirdDiscount((prev) => ({
      ...prev,
      [name]: name === 'discountAmount' ? parseInt(value, 10) : value,
    }));
  };

  const handleToggleGroup = (length: number) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [length]: !prev[length],
    }));
  };

  const handleResetGroup = (length: number) => {
    const resetRules = dummyCombinationDiscountRules.filter(
      (rule) => rule.combination.length === length,
    );
    setCombinationDiscountRules((prev) => [
      ...prev.filter((rule) => rule.combination.length !== length),
      ...resetRules,
    ]);
  };

  const handleUpdateCombination = (index: number, ruleIndex: number, key: any, value: any) => {
    setCombinationDiscountRules((prev) =>
      prev.map((item, idx) => {
        if (idx === index) {
          const updatedCombination = [...item.combination];
          if (key === 'discountAmount') {
            return { ...item, [key]: parseInt(value, 10) };
          } else {
            updatedCombination[ruleIndex] = { ...updatedCombination[ruleIndex], [key]: value };
            return { ...item, combination: updatedCombination };
          }
        }
        return item;
      }),
    );
  };

  const handleRemoveCombination = (index: number) => {
    setCombinationDiscountRules(
      (prev) => prev.filter((_, idx) => idx !== index), // 주어진 index에 해당하지 않는 discount만 유지
    );
  };

  const handleAddCombination = (length: number) => {
    const newCombination: ICombinationDiscountRule = {
      combination: Array.from({ length }, () => ({ uniformType: 'GI', weightType: 'WEIGHT' })),
      discountAmount: 0,
    };
    setCombinationDiscountRules((prev) => [newCombination, ...prev]);
  };

  const handleCreateEarlyBirdDiscount = () => {
    if (!competitionId) return;
    createEarlyBirdDiscount(
      {
        competitionId: competitionId,
        data: {
          ...earlyBirdDiscount,
        },
      },
      {
        onSuccess: (res) => {
          alert('얼리버드 할인이 등록되었습니다.');
          queryClient.invalidateQueries({
            queryKey: ['competition', competitionId],
          });
          console.log(res);
        },
        onError: () => {
          alert('얼리버드 할인 등록에 실패했습니다.');
        },
      },
    );
  };

  const handleCreateCombinationDiscount = () => {
    if (!competitionId) return;
    createCombinationDiscount(
      {
        competitionId: competitionId,
        data: {
          combinationDiscountRules,
        },
      },
      {
        onSuccess: (res) => {
          alert('조합할인이 등록되었습니다.');
          queryClient.invalidateQueries({
            queryKey: ['competition', competitionId],
          });
          console.log(res);
        },
        onError: () => {
          alert('조합할인 등록에 실패했습니다.');
        },
      },
    );
  };

  return (
    <>
      <div className={styles.wrapper}>
        <EarlyBirdDiscountForm
          onToggle={handleToggleEarlyBird}
          discount={earlyBirdDiscount}
          onChange={handleChangeEarlyBird}
        />
        {[2, 3, 4].map((length) => {
          const filteredDiscounts = combinationDiscountRules
            .map((rule, index) => ({ ...rule, globalIndex: index }))
            .filter((rule) => rule.combination.length === length);

          return (
            <CombinationDiscountForm
              key={length}
              length={length}
              discounts={filteredDiscounts}
              expanded={expandedGroups[length] || false}
              onToggle={() => handleToggleGroup(length)}
              onReset={() => handleResetGroup(length)}
              onUpdate={handleUpdateCombination}
              onRemove={handleRemoveCombination}
              onAdd={handleAddCombination}
            />
          );
        })}
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="얼리버드 할인등록"
          color="blue"
          width="full"
          size="large"
          onClick={handleCreateEarlyBirdDiscount}
        />
        <ButtonOnClick
          type="filled"
          text="조합할인 등록"
          color="blue"
          width="full"
          size="large"
          onClick={handleCreateCombinationDiscount}
        />
        <ButtonOnClick
          type="filled"
          text="다음"
          color="blue"
          width="full"
          size="large"
          onClick={onNext}
        />
      </div>
    </>
  );
}
