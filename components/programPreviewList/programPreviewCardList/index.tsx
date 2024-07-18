'use client';
import styles from './index.module.scss';
import Card from '@/components/card';
import { useState } from 'react';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import ButtonLink from '@/components/common/button/buttonLink';
import { useGetFilteredCompetitions } from '@/hooks/competition';
import { Fragment } from 'react';
import {
  TCompetitionSelectFilter,
  TCompetitionSortOption,
} from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';

interface ProgramPreviewListProps {
  selectFilter: TCompetitionSelectFilter[];
  sortOption: TCompetitionSortOption;
}

type TagBtnOption = '대회' | '세미나' | '오픈매트';

const tagBtnOptions: TagBtnOption[] = ['대회', '세미나', '오픈매트'];

const programLink: { [key in TagBtnOption]: string } = {
  대회: '/competition',
  세미나: '/seminar',
  오픈매트: '/openmat',
};

export default function ProgramCardList({ selectFilter, sortOption }: ProgramPreviewListProps) {
  const [selectOptionState, setSelectOptionState] = useState<TagBtnOption>('대회');
  const {
    data: ProgramList,
    isLoading, //todo: 로딩 및 에러 처리
    isError,
  } = useGetFilteredCompetitions({
    dateFilter: '전체',
    locationFilter: '전체',
    selectFilter,
    sortOption,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.tagBtnOptions}>
        {tagBtnOptions.map((option) => (
          <ButtonOnToggle
            key={option}
            type="tag"
            text={option}
            isToggled={selectOptionState === option}
            onToggle={() => setSelectOptionState(option)}
          />
        ))}
      </div>
      <div className={styles.programCardList}>
        {isLoading && <h4>로딩중...</h4>}
        {isError && <h4>에러 발생</h4>}
        {ProgramList?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.competitions.map((competition) => (
              <Card key={competition.id} type="vertical" competition={competition} />
            ))}
          </Fragment>
        ))}
      </div>
      <ButtonLink
        text={`${selectOptionState} 전체보기`}
        size="medium"
        type="outlined"
        color="gray"
        href={programLink[selectOptionState]}
        width="full"
      />
    </div>
  );
}
