'use client';
import styles from './index.module.scss';
import { useState } from 'react';

import ButtonOnClick from '@/components/common/button/buttonOnClick';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import IconSort from '@/public/svgs/sort.svg';
import Divider from '@/components/divider';
import { useURLParams } from '@/hooks/useURLParams';
import Select from '@/components/common/select';
import CompetitionList from '@/components/competitionList';

const locationOptions = [
  '서울',
  '경기',
  '인천',
  '부산',
  '대구',
  '광주',
  '대전',
  '울산',
  '세종',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
];
const dateOptions = [
  '2024-04',
  '2024-05',
  '2024-06',
  '2024-07',
  '2024-08',
  '2024-09',
  '2024-10',
  '2024-11',
  '2024-12',
];
const selectOptions = [
  {
    id: 'easyPayAvailable',
    msg: '간편결제',
  },
  {
    id: 'earlyBird',
    msg: '얼리버드',
  },
  {
    id: 'registrationAvailable',
    msg: '신청가능',
  },
  {
    id: 'soloRegistrationAdjustment',
    msg: '단독출전조정',
  },
];
const sortOptions = ['일자순', '조회순', '마감임박순'];

export default function CompetitionPage() {
  const { params, getParamValue, updateParams } = useURLParams();

  const [dateFilterState, setDateFilterState] = useState<string>(
    getParamValue(params.date as string) || '',
  );
  const [locationFilterState, setLocationFilterState] = useState<string>(
    getParamValue(params.location as string) || '',
  );
  const [sortOptionState, setSortOptionState] = useState<string>(
    getParamValue(params.sort as string) || sortOptions[0],
  );
  // select 매개변수는 배열로 처리
  const [selectOptionsState, setSelectOptionsState] = useState<string[]>(
    params.select ? (Array.isArray(params.select) ? params.select : [params.select]) : [],
  );

  const handleDateFilterChange = (newDate: string) => {
    setDateFilterState(newDate);
    updateParams({ date: newDate });
  };

  const handleLocationFilterChange = (newLocation: string) => {
    setLocationFilterState(newLocation);
    updateParams({ location: newLocation });
  };

  const handleSortOptionChange = (sortOption: string) => {
    let newSortOption = sortOptions[sortOptions.indexOf(sortOption) + 1];
    if (!newSortOption) newSortOption = sortOptions[0];
    setSortOptionState(newSortOption);
    updateParams({ sort: newSortOption });
  };

  const handleSelectOptionChange = (optionId: string) => {
    const updatedSelectOptions = selectOptionsState.includes(optionId)
      ? selectOptionsState.filter((id) => id !== optionId)
      : [...selectOptionsState, optionId];

    setSelectOptionsState(updatedSelectOptions);
    updateParams({ select: updatedSelectOptions.length > 0 ? updatedSelectOptions : undefined });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <Select
          type="filled"
          options={dateOptions}
          setState={handleDateFilterChange}
          value={dateFilterState}
          placeholder={'날짜'}
        />
        <Select
          type="filled"
          options={locationOptions}
          setState={handleLocationFilterChange}
          value={locationFilterState}
          placeholder={'지역'}
        />
      </div>
      <div className={styles.selectWrapper}>
        {selectOptions.map((option) => (
          <ButtonOnToggle
            key={option.id}
            type="tag"
            text={option.msg}
            isToggled={selectOptionsState.includes(option.id)}
            onToggle={() => handleSelectOptionChange(option.id)}
          />
        ))}
      </div>
      <Divider />
      <div className={styles.sortWrapper}>
        <ButtonOnClick
          type="text"
          size="small"
          color="gray"
          text={sortOptionState}
          iconLeft={<IconSort />}
          onClick={() => handleSortOptionChange(sortOptionState)}
        />
      </div>
      <CompetitionList
        dateFilter={dateFilterState}
        locationFilter={locationFilterState}
        selectOption={selectOptionsState}
        sortOption={sortOptionState}
      />
    </div>
  );
}
