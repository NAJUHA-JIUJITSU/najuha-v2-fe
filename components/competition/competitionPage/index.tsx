'use client';
import styles from './index.module.scss';
import { useState } from 'react';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import IconSort from '@/public/svgs/sort.svg';
import { Divider } from '@/components/divider';
import { useURLParams } from '@/hooks/useURLParams';
import Select from '@/components/common/select';
import CompetitionList from '@/components/competition/competitionList';
import {
  TCompetitionLocationFilter,
  TCompetitionSelectFilter,
  TCompetitionSortOption,
} from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';

const locationOptions: (TCompetitionLocationFilter | '전체')[] = [
  '전체',
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
  '전체',
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
const selectOptions: TCompetitionSelectFilter[] = [
  '간편결제',
  '얼리버드',
  '신청가능',
  '단독출전조정',
];
const sortOptions: TCompetitionSortOption[] = ['일자순', '조회순', '마감임박순'];

export default function CompetitionPage() {
  const { params, updateParams } = useURLParams();

  const [dateFilterState, setDateFilterState] = useState<string>(params.date as string);
  const [locationFilterState, setLocationFilterState] = useState<TCompetitionLocationFilter>(
    (params.location as TCompetitionLocationFilter) || '전체',
  );
  const [sortOptionState, setSortOptionState] = useState<TCompetitionSortOption>(
    (params.sort as TCompetitionSortOption) || sortOptions[0],
  );

  // select 매개변수는 배열로 처리
  const [selectOptionsState, setSelectOptionsState] = useState<TCompetitionSelectFilter[]>(
    params.select
      ? Array.isArray(params.select)
        ? (params.select as TCompetitionSelectFilter[])
        : [params.select as TCompetitionSelectFilter]
      : [],
  );

  const handleDateFilterChange = (newDate: string) => {
    setDateFilterState(newDate);
    updateParams({ date: newDate });
  };

  const handleLocationFilterChange = (newLocation: TCompetitionLocationFilter) => {
    setLocationFilterState(newLocation);
    updateParams({ location: newLocation });
  };

  const handleSortOptionChange = (sortOption: TCompetitionSortOption) => {
    let newSortOption = sortOptions[sortOptions.indexOf(sortOption) + 1];
    if (!newSortOption) newSortOption = sortOptions[0];
    setSortOptionState(newSortOption);
    updateParams({ sort: newSortOption });
  };

  const handleSelectnFilterChange = (optionId: TCompetitionSelectFilter) => {
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
            key={option}
            type="tag"
            text={option}
            isToggled={selectOptionsState.includes(option)}
            onToggle={() => handleSelectnFilterChange(option)}
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
          onClick={() => handleSortOptionChange(sortOptionState)} //todo: useSortOption 적용
        />
      </div>
      <CompetitionList
        dateFilter={dateFilterState}
        locationFilter={locationFilterState}
        selectFilter={selectOptionsState}
        sortOption={sortOptionState}
      />
    </div>
  );
}
