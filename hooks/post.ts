import { IImageCreateDto } from 'najuha-v2-api/lib/modules/images/domain/interface/image.interface';
import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { postApi } from '@/api/nestia/postApi';
import { imageApi } from '@/api/nestia/imageApi';
import {
  CreatePostReqBody,
  FindPostsReqQuery,
} from 'najuha-v2-api/lib/modules/posts/presentation/posts.controller.dto';

// 이미지와 함께 게시글을 작성하는 훅
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

// 필터 및 정렬된 게시글 목록을 조회하는 훅
const useFindPosts = (data: FindPostsReqQuery) => {
  return useInfiniteQuery({
    queryKey: ['posts', data],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await postApi.postFindPosts({ ...data, page: pageParam });
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export { useCreatePostWithImages, useFindPosts };
