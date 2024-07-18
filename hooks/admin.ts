import { useMutation } from '@tanstack/react-query';
import { adminCompetitionsApi } from '@/api/nestia/admin/competitionsApi';

export const useCreateCompetition = () => {
  return useMutation({
    mutationFn: adminCompetitionsApi.createCompetitionApi,
    onError: (error) => {
      console.error('Error creating competition:', error);
    },
  });
};

export const useUpdateCompetition = () => {
  return useMutation({
    mutationFn: adminCompetitionsApi.updateCompetitionApi,
    onError: (error) => {
      console.error('Error updating competition:', error);
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

// patch competition status
export const useUpdateCompetitionStatus = () => {
  return useMutation({
    mutationFn: adminCompetitionsApi.updateCompetitionStatusApi,
    onError: (error) => {
      console.error('Error updating competition status:', error);
    },
  });
};

export const useCreateCompetitionPosterImage = () => {
  return useMutation({
    mutationFn: adminCompetitionsApi.createCompetitionPosterImageApi,
  });
};
