import { IImageCreateDto } from 'najuha-v2-api/lib/modules/images/domain/interface/image.interface';
import { useMutation, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { postApi } from '@/api/nestia/postApi';
import { imageApi } from '@/api/nestia/imageApi';
import {
  CreatePostReportReqBody,
  CreatePostReqBody,
  FindPostsReqQuery,
  UpdatePostReqBody,
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

// 이미지와 함께 특정 게시글을 수정하는 훅
const useUpdatePostWithImages = (path: IImageCreateDto['path'], postId: string) => {
  return useMutation({
    mutationFn: async ({ data, files }: { data: UpdatePostReqBody; files: File[] }) => {
      console.log('files', files);
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
      return postApi.postUpdatePost(postId, postData);
    },
  });
};

// 게시글을 삭제하는 훅
const useDeletePost = (postId: string) => {
  return useMutation({
    mutationFn: () => postApi.postDeletePost(postId),
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

// 특정 게시글을 조회하는 훅
const useGetPost = (postId: string) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => postApi.postGetPost(postId),
  });
};

// 게시글 좋아요를 추가하는 훅
const useCreatePostLike = (postId: string) => {
  return useMutation({
    mutationFn: () => postApi.postCreatePostLike(postId),
  });
};

// 게시글 좋아요를 삭제하는 훅
const useDeletePostLike = (postId: string) => {
  return useMutation({
    mutationFn: () => postApi.postDeletePostLike(postId),
  });
};

// 게시글 조회수를 증가시키는 훅
const useIncrementPostViewCount = (postId: string) => {
  return useMutation({
    mutationFn: () => postApi.postIncrementPostViewCount(postId),
  });
};

// 게시글을 신고하는 훅
const useCreatePostReport = (postId: string) => {
  return useMutation({
    mutationFn: (body: CreatePostReportReqBody) => postApi.postCreatePostReport(postId, body),
  });
};

export {
  useCreatePostWithImages,
  useUpdatePostWithImages,
  useDeletePost,
  useFindPosts,
  useGetPost,
  useCreatePostLike,
  useDeletePostLike,
  useIncrementPostViewCount,
  useCreatePostReport,
};
