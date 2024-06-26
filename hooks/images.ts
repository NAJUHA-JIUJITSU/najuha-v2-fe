import { useMutation } from '@tanstack/react-query';
import { imageApi } from '@/api/nestia/imageApi';
import { CreateImageReqBody } from 'najuha-v2-api/lib/modules/images/presentation/images.controller.dto';

const useCreateImage = () => {
  return useMutation({
    mutationFn: ({ data, file }: { data: CreateImageReqBody; file: File }) =>
      imageApi.postCreateImage(data, file),
  });
};

export { useCreateImage };
