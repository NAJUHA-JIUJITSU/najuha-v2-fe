'use client';
import styles from './index.module.scss';
import { useState } from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import IconSort from '@/public/svgs/sort.svg';
import Divider from '@/components/divider';
import { useURLParams } from '@/hook/useURLParams';
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

  const dateFilter = getParamValue(params.date as string) || '';
  const locationFilter = getParamValue(params.location as string) || '';
  const sortOption = getParamValue(params.sort as string) || sortOptions[0];
  // select 매개변수는 배열로 처리
  const [selectOptionsState, setSelectOptionsState] = useState<string[]>(
    params.select ? (Array.isArray(params.select) ? params.select : [params.select]) : [],
  );

  const handleDateFilterChange = (newDate: string) => {
    updateParams({ date: newDate });
  };

  const handleLocationFilterChange = (newLocation: string) => {
    updateParams({ location: newLocation });
  };

  const handleSortOptionChange = (sortOption: string) => {
    let newSortOption = sortOptions[sortOptions.indexOf(sortOption) + 1];
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
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={'대회일정'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
      />
      <div className={styles.filterWrapper}>
        {/* todo: pull한 뒤 select 업데이트 후 style 추가 */}
        <Select
          options={dateOptions}
          setState={handleDateFilterChange}
          value={dateFilter}
          placeholder={'날짜'}
        />
        <Select
          options={locationOptions}
          setState={handleLocationFilterChange}
          value={locationFilter}
          placeholder={'지역'}
        />
      </div>
      <div className={styles.selectWrapper}>
        {selectOptions.map((option) => (
          <ButtonOnToggle
            key={option.id}
            type="outlined"
            color="black"
            size="medium"
            shape="tag"
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
          text={sortOption}
          iconLeft={<IconSort />}
          onClick={() => handleSortOptionChange(sortOption)}
        />
      </div>
      <CompetitionList
        dateFilter={dateFilter}
        locationFilter={locationFilter}
        selectOption={selectOptionsState}
        sortOption={sortOption}
      />
    </div>
  );
}
