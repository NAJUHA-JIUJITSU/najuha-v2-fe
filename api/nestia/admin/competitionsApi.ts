import { withAuth } from '@/api/nestia/common';
import api from 'najuha-v2-api/lib/api';

async function createCompetitionApi(data: any) {
  const response = await withAuth((connection) =>
    api.functional.admin.competitions.createCompetition(connection, data),
  );
  return response.result;
}
