import { withAuth } from '@/api/nestia/common';
import { competition } from '@/queries/competition';
import api from 'najuha-v2-api/lib/api';
import { ICompetitionCreateDto } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';
import { IEarlybirdDiscountSnapshot } from 'najuha-v2-api/lib/modules/competitions/domain/interface/earlybird-discount-snapshot.interface';
import { IEarlybirdDiscountSnapshotCreateDto } from 'najuha-v2-api/lib/modules/competitions/domain/interface/earlybird-discount-snapshot.interface';
import { Primitive } from '@nestia/fetcher';
// a-5-1 createCompetitionApi
async function createCompetitionApi(data: Primitive<ICompetitionCreateDto>) {
  const response = await withAuth((connection) =>
    api.functional.admin.competitions.createCompetition(connection, data),
  );
  return response.result;
}

// a-5-6 createCompetitionDivisionApi
async function createCompetitionDivisionApi(competitionId: string, data: any) {
  const response = await withAuth((connection) =>
    api.functional.admin.competitions.divisions.createCompetitionDivisions(
      connection,
      competitionId,
      data,
    ),
  );
  return response.result;
}
// a-5-7 createCompetitionEarlyBirdDiscountSnapshotApi
async function createCompetitionEarlyBirdDiscountSnapshotApi(
  competitionId: string,
  data: Primitive<Omit<IEarlybirdDiscountSnapshotCreateDto, 'competitionId'>>,
) {
  const response = await withAuth((connection) =>
    api.functional.admin.competitions.earlybird_discount_snapshots.createCompetitionEarlybirdDiscountSnapshot(
      connection,
      competitionId,
      data,
    ),
  );
  return response.result;
}
