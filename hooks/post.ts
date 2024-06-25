import { IImageCreateDto } from 'najuha-v2-api/lib/modules/images/domain/interface/image.interface';
import { useMutation } from '@tanstack/react-query';
import { postApi } from '@/api/nestia/postApi';
import { imageApi } from '@/api/nestia/imageApi';
import { CreatePostReqBody } from 'najuha-v2-api/lib/modules/posts/presentation/posts.controller.dto';

//이미지와 함께 게시글을 작성하는 훅
const useCreatePostWithImages = (path: IImageCreateDto['path']) => {
  return useMutation({
    mutationFn: async ({ data, files }: { data: CreatePostReqBody; files: File[] }) => {
      const uploadResults = await Promise.all(
        files.map(async (file) => {
          const format = file.type as IImageCreateDto['format'];
          if (!['image/jpeg', 'image/png', 'image/webp'].includes(format)) {
            throw new Error(`Unsupported file format: ${format}`);
          }
          const imageData = {
            format,
            path,
          };
          const response = await imageApi.postCreateImage(imageData, file);
          return response.result.image.id;
        }),
      );
      const postData = {
        ...data,
        imageIds: uploadResults,
      };
      return postApi.postCreatePost(postData);
    },
  });
};

export { useCreatePostWithImages };
