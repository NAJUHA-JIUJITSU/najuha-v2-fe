import {
  TCompetitionLocationFilter,
  TCompetitionSelectFilter,
  TCompetitionSortOption,
} from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';

export interface CompetitionListProps {
  dateFilter: string;
  locationFilter: TCompetitionLocationFilter | '전체';
  selectFilter: TCompetitionSelectFilter[];
  sortOption: TCompetitionSortOption;
  admin?: boolean;
}
