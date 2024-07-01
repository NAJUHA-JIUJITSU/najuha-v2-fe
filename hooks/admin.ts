import { useMutation, useQuery } from '@tanstack/react-query';
import { adminCompetitionsApi } from '@/api/nestia/admin/competitionsApi';

export const useCreateCompetition = () => {
  return useMutation({
    mutationFn: adminCompetitionsApi.createCompetitionApi,
    onError: (error) => {
      console.error('Error creating competition:', error);
    },
  });
};

export const useCreateDivision = () => {
  return useMutation({
    mutationFn: adminCompetitionsApi.createCompetitionDivisionApi,
    onError: (error) => {
      console.error('Error creating division:', error);
    },
  });
};
