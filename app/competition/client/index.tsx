'use client';
import styles from './index.module.scss';
import { use, useState, useEffect } from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import IconSort from '@/public/svgs/sort.svg';
import Divider from '@/components/divider';
import { useSortOption } from '@/hook/useSortOption';
import Select from '@/components/common/select';
import { useRouter } from 'next/navigation';
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

export default function Competition() {
  const [dateFilter, setDateFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  //todo: useSortOption 훅에서 초기값을 URL 쿼리에서 가져오도록 수정할 필요가 있음
  const { sortOption, setSortOption, handleSortOption } = useSortOption(sortOptions, '일자순');
  const [selectOption, setSelectOption] = useState(['']);

  const handleSelectOption = (option: string) => {
    if (selectOption.includes(option)) {
      setSelectOption(selectOption.filter((item) => item !== option));
    } else {
      setSelectOption([...selectOption, option]);
    }
    return;
  };

  const router = useRouter();

  // URL 검색 매개변수 업데이트 함수
  const updateURLParams = () => {
    const searchParams = new URLSearchParams();

    // date와 location은 있으면 추가
    if (dateFilter) searchParams.set('date', dateFilter);
    if (locationFilter) searchParams.set('location', locationFilter);

    // selectOption 배열을 개별적으로 'select' 매개변수로 추가
    // URL에서 select=option1&select=option2 형태로 표현됩니다.
    selectOption.forEach((option) => {
      if (option) searchParams.append('select', option);
    });

    // sort는 있으면 추가
    if (sortOption) searchParams.set('sort', sortOption);

    // URL 업데이트
    // router.push(`/competition?${searchParams.toString()}`, undefined, { shallow: true });
    // router.push(`/competition?${searchParams.toString()}`);
    window.history.pushState({}, '', `/competition?${searchParams.toString()}`);
  };

  // 컴포넌트 마운트 시 URL 검색 매개변수를 읽어 상태를 초기화
  useEffect(() => {
    // URLSearchParams 객체를 사용하여 window.location.search에서 검색 매개변수 파싱
    const searchParams = new URLSearchParams(window.location.search);
    const date = searchParams.get('date');
    const location = searchParams.get('location');
    const select = searchParams.getAll('select');
    const sort = searchParams.get('sort');

    console.log(date, location, select, sort);

    if (date) setDateFilter(date);
    if (location) setLocationFilter(location);
    if (select.length > 0) setSelectOption(select);
    if (sort) setSortOption(sort);
  }, []);

  // 검색 매개변수가 변경될 때마다 URL 검색 매개변수 업데이트
  useEffect(() => {
    updateURLParams();
  }, [dateFilter, locationFilter, selectOption, sortOption]);

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
          setState={setDateFilter}
          value={dateFilter}
          placeholder={'날짜'}
        />
        <Select
          options={locationOptions}
          setState={setLocationFilter}
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
            isToggled={selectOption.includes(option.id)}
            onToggle={() => handleSelectOption(option.id)}
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
          onClick={handleSortOption}
        />
      </div>
      <CompetitionList
        dateFilter={dateFilter}
        locationFilter={locationFilter}
        selectOption={selectOption}
        sortOption={sortOption}
      />
    </div>
  );
}
