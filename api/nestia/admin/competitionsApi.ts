import { withAuth } from '@/api/nestia/common';
import api from 'najuha-v2-api/lib/api';
import { ICompetitionCreateDto } from 'najuha-v2-api/lib/modules/competitions/domain/interface/competition.interface';
import { IEarlybirdDiscountSnapshotCreateDto } from 'najuha-v2-api/lib/modules/competitions/domain/interface/earlybird-discount-snapshot.interface';
import { Primitive } from '@nestia/fetcher';
import { IDivision } from 'najuha-v2-api/lib/modules/competitions/domain/interface/division.interface';
import { IDivisionPack } from 'najuha-v2-api/lib/modules/competitions/domain/interface/division-pack.interface';
import {
  CreateCombinationDiscountSnapshotReqBody,
  CreateDivisionsReqBody,
} from 'najuha-v2-api/lib/modules/competitions/presentation/competitions.controller.dto';
// a-5-1 createCompetitionApi
async function createCompetitionApi(data: Primitive<ICompetitionCreateDto>) {
  const response = await withAuth((connection) =>
    api.functional.admin.competitions.createCompetition(connection, data),
  );
  return response.result;
}

// a-5-2 findCompetitionApi
async function findCompetitionApi(data: any) {
  const response = await withAuth((connection) =>
    api.functional.admin.competitions.findCompetitions(connection, data),
  );
  return response.result;
}

// a-5-3 getCompetitionApi
async function getCompetitionApi(competitionId: string) {
  const response = await withAuth((connection) =>
    api.functional.admin.competitions.getCompetition(connection, competitionId),
  );
  return response.result;
}

// a-5-4 updateCompetitionApi
async function updateCompetitionApi(competitionId: string, data: any) {
  const response = await withAuth((connection) =>
    api.functional.admin.competitions.updateCompetition(connection, competitionId, data),
  );
  return response.result;
}

// a-5-5 updateCompetitionStatusApi
async function updateCompetitionStatusApi(competitionId: string, data: any) {
  const response = await withAuth((connection) =>
    api.functional.admin.competitions.status.updateCompetitionStatus(
      connection,
      competitionId,
      data,
    ),
  );
  return response.result;
}

// a-5-6 createCompetitionDivisionApi
async function createCompetitionDivisionApi({
  competitionId,
  data,
}: {
  competitionId: string;
  data: CreateDivisionsReqBody;
}) {
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
async function createCompetitionEarlyBirdDiscountSnapshotApi({
  competitionId,
  data,
}: {
  competitionId: string;
  data: Primitive<Omit<IEarlybirdDiscountSnapshotCreateDto, 'competitionId'>>;
}) {
  const response = await withAuth((connection) =>
    api.functional.admin.competitions.earlybird_discount_snapshots.createCompetitionEarlybirdDiscountSnapshot(
      connection,
      competitionId,
      data,
    ),
  );
  return response.result;
}

// a-5-8 createCompetitionCombinationDiscountSnapshotApi
async function createCompetitionCombinationDiscountSnapshotApi({
  competitionId,
  data,
}: {
  competitionId: string;
  data: CreateCombinationDiscountSnapshotReqBody;
}) {
  const response = await withAuth((connection) =>
    api.functional.admin.competitions.combination_discount_snapshots.createCombinationDiscountSnapshot(
      connection,
      competitionId,
      data,
    ),
  );
  return response.result;
}

// a-5-9 createCompetitionRequiredAdditionalInfoApi
async function createCompetitionRequiredAdditionalInfoApi(competitionId: string, data: any) {
  const response = await withAuth((connection) =>
    api.functional.admin.competitions.required_additional_infos.createCompetitionRequiredAdditionalInfo(
      connection,
      competitionId,
      data,
    ),
  );
  return response.result;
}

// a-5-12 createCompetitionPosterImageApi
async function createCompetitionPosterImageApi(competitionId: string, data: any) {
  const response = await withAuth((connection) =>
    api.functional.admin.competitions.poster_image.createCompetitionPosterImage(
      connection,
      competitionId,
      data,
    ),
  );
  return response.result;
}

export const adminCompetitionsApi = {
  createCompetitionApi,
  findCompetitionApi,
  getCompetitionApi,
  updateCompetitionApi,
  updateCompetitionStatusApi,
  createCompetitionDivisionApi,
  createCompetitionEarlyBirdDiscountSnapshotApi,
  createCompetitionCombinationDiscountSnapshotApi,
  createCompetitionRequiredAdditionalInfoApi,
  createCompetitionPosterImageApi,
};
