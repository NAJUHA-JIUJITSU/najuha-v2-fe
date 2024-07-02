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

export const useCreateEarlyBirdDiscount = () => {
  return useMutation({
    mutationFn: adminCompetitionsApi.createCompetitionEarlyBirdDiscountSnapshotApi,
    onError: (error) => {
      console.error('Error creating early bird discount:', error);
    },
  });
};

export const useCreateCombinationDiscount = () => {
  return useMutation({
    mutationFn: adminCompetitionsApi.createCompetitionCombinationDiscountSnapshotApi,
    onError: (error) => {
      console.error('Error creating combination discount:', error);
    },
  });
};

export const useCreateRequiredAdditionalInfo = () => {
  return useMutation({
    mutationFn: adminCompetitionsApi.createCompetitionRequiredAdditionalInfoApi,
    onError: (error) => {
      console.error('Error creating required additional info:', error);
    },
  });
};
