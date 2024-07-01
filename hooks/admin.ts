import { useMutation, useQuery } from '@tanstack/react-query';
import { adminCompetitionsApi } from '@/api/nestia/admin/competitionsApi';

export const useCompetitionCreate = () => {
  return useMutation({
    mutationFn: adminCompetitionsApi.createCompetitionApi,
    onError: (error) => {
      console.error('Error creating competition:', error);
    },
  });
};
