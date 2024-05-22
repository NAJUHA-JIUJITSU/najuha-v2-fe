import { useMutation } from '@tanstack/react-query';
import { applicationsApi } from '@/api/applicationsApi';

//대회 신청하기
export const useSubmitApplication = () => {
  return useMutation({
    mutationFn: applicationsApi.submitApplication,
    onSuccess: (data) => {
      console.log('Application submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Error submitting application:', error);
    },
  });
};
