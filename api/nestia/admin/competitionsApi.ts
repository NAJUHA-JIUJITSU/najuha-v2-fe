import { withAuth } from '@/api/nestia/common';
import { competition } from '@/queries/competition';
import api from 'najuha-v2-api/lib/api';

// a-5-1 createCompetitionApi
async function createCompetitionApi(data: any) {
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
