import { useMutation } from '@tanstack/react-query';
import { imageApi } from '@/api/nestia/imageApi';

const useCreateImage = () => {
  return useMutation({
    mutationFn: imageApi.postCreateImage,
  });
};

export { useCreateImage };
