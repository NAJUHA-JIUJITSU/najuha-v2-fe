import { IImageCreateDto } from 'najuha-v2-api/lib/modules/images/domain/interface/image.interface';
import { useMutation, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { postApi } from '@/api/nestia/postApi';
import { imageApi } from '@/api/nestia/imageApi';
import {
  CreatePostReqBody,
  FindPostsReqQuery,
  UpdatePostReqBody,
} from 'najuha-v2-api/lib/modules/posts/presentation/posts.controller.dto';
import { TId } from 'najuha-v2-api/lib/common/common-types';

// 공통 이미지 업로드 함수
const uploadImages = async (files: File[], path: IImageCreateDto['path']) => {
  return await Promise.all(
    files.map(async (file) => {
      const format = file.type as IImageCreateDto['format'];
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(format)) {
        throw new Error(`Unsupported file format: ${format}`);
      }
      const imageData = {
        format,
        path,
      };
      const response = await imageApi.postCreateImage({ data: imageData, file });
      return response.image.id;
    }),
  );
};

// 이미지와 함께 게시글을 작성하는 훅
const useCreatePostWithImages = (path: IImageCreateDto['path']) => {
  return useMutation({
    mutationFn: async ({ data, files }: { data: CreatePostReqBody; files: File[] }) => {
      const imageIds = await uploadImages(files, path);
      const postData = {
        ...data,
        imageIds,
      };
      return postApi.postCreatePost(postData);
    },
  });
};

// 이미지와 함께 특정 게시글을 수정하는 훅
const useUpdatePostWithImages = (path: IImageCreateDto['path'], postId: string) => {
  return useMutation({
    mutationFn: async ({ data, files }: { data: UpdatePostReqBody; files: File[] }) => {
      const imageIds = await uploadImages(files, path);
      const postData = {
        ...data,
        imageIds,
      };
      return postApi.postUpdatePost(postId, postData);
    },
  });
};

// 게시글을 삭제하는 훅
const useDeletePost = () => {
  return useMutation({
    mutationFn: postApi.postDeletePost,
  });
};

// 필터 및 정렬된 게시글 목록을 조회하는 훅 - 무한 스크롤
const useFindPosts = (data: FindPostsReqQuery) => {
  if (data.categoryFilters === undefined) delete data.categoryFilters;
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
const useCreatePostLike = () => {
  return useMutation({
    mutationFn: postApi.postCreatePostLike,
  });
};

// 게시글 좋아요를 삭제하는 훅
const useDeletePostLike = () => {
  return useMutation({
    mutationFn: postApi.postDeletePostLike,
  });
};

// 게시글 조회수를 증가시키는 훅
const useIncrementPostViewCount = () => {
  return useMutation({
    mutationFn: postApi.postIncrementPostViewCount,
  });
};

// 게시글을 신고하는 훅
const useCreatePostReport = () => {
  return useMutation({
    mutationFn: postApi.postCreatePostReport,
  });
};

// 게시글의 댓글을 조회하는 훅 - 무한 스크롤
const useFindComments = (postId: TId) => {
  return useInfiniteQuery({
    queryKey: ['comments', postId],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await postApi.postFindComments(postId, { page: pageParam });
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

// 게시글의 댓글의 답글을 조회하는 훅 - 무한 스크롤
const useFindReplies = (postId: TId, commentId: TId) => {
  return useInfiniteQuery({
    queryKey: ['replies', commentId],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await postApi.postFindCommentReplies(postId, commentId, { page: pageParam });
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

// 게시글의 댓글을 삭제하는 훅
const useDeleteComment = () => {
  return useMutation({
    mutationFn: postApi.postDeleteComment,
  });
};

// 게시글의 댓글에 좋아요를 추가하는 훅
const useCreateCommentLike = () => {
  return useMutation({
    mutationFn: postApi.postCreateCommentLike,
  });
};

// 게시글의 댓글에 좋아요를 삭제하는 훅
const useDeleteCommentLike = () => {
  return useMutation({
    mutationFn: postApi.postDeleteCommentLike,
  });
};

// 게시글의 댓글을 신고하는 훅
const useCreateCommentReport = () => {
  return useMutation({
    mutationFn: postApi.postCreateCommentReport,
  });
};

// 게시글에 댓글을 작성하는 훅
const useCreateComment = () => {
  return useMutation({
    mutationFn: postApi.postCreateComment,
  });
};

// 게시글의 댓글에 답글을 작성하는 훅
const useCreateCommentReply = () => {
  return useMutation({
    mutationFn: postApi.postCreateCommentReply,
  });
};

// 게시글의 댓글 및 답글을 수정하는 훅
const useUpdateComment = () => {
  return useMutation({
    mutationFn: postApi.postUpdateComment,
  });
};

// 게시글의 베스트 댓글을 가져오는 훅
const useFindBestComments = (postId: TId) => {
  return useQuery({
    queryKey: ['bestComments', postId],
    queryFn: () => postApi.postFindBestComments(postId),
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
  useFindComments,
  useFindReplies,
  useDeleteComment,
  useCreateCommentLike,
  useDeleteCommentLike,
  useCreateCommentReport,
  useCreateComment,
  useCreateCommentReply,
  useUpdateComment,
  useFindBestComments,
};
