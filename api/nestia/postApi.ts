import { withAuth } from '@/api/nestia/common';
import api from 'najuha-v2-api/lib/api';
import { TId } from 'najuha-v2-api/lib/common/common-types';
import {
  CreatePostReportReqBody,
  CreatePostReqBody,
  FindPostsReqQuery,
  UpdatePostReqBody,
} from 'najuha-v2-api/lib/modules/posts/presentation/posts.controller.dto';

// u-7-1 createPost.
// 새로운 게시글을 작성합니다.
const postCreatePost = async (data: CreatePostReqBody) => {
  const response = await withAuth((connection) =>
    api.functional.user.posts.createPost(connection, data),
  );
  return response.result;
};

// u-7-2 findPosts.
// 게시글 목록을 조회합니다.
const postFindPosts = async (data: FindPostsReqQuery) => {
  const response = await withAuth((connection) =>
    api.functional.user.posts.findPosts(connection, data),
  );

  return response.result;
};

// u-7-3 getPost.
// 특정 게시글을 조회합니다.
const postGetPost = async (postId: TId) => {
  const response = await withAuth((connection) =>
    api.functional.user.posts.getPost(connection, postId),
  );
  return response.result;
};

// u-7-4 updatePost.
// 게시글을 수정합니다.
const postUpdatePost = async (postId: TId, data: UpdatePostReqBody) => {
  const response = await withAuth((connection) =>
    api.functional.user.posts.updatePost(connection, postId, data),
  );
  return response.result;
};

// u-7-5 deletePost.
// 게시글을 삭제합니다.
const postDeletePost = async (postId: TId) => {
  const response = await withAuth((connection) =>
    api.functional.user.posts.deletePost(connection, postId),
  );
  return response.result;
};

// u-7-6 createPostLike.
// 게시글 좋아요를 추가합니다.
const postCreatePostLike = async (postId: TId) => {
  const response = await withAuth((connection) =>
    api.functional.user.posts.like.createPostLike(connection, postId),
  );
  return response.result;
};

// u-7-7 deletePostLike.
// 게시글 좋아요를 삭제합니다.
const postDeletePostLike = async (postId: TId) => {
  const response = await withAuth((connection) =>
    api.functional.user.posts.like.deletePostLike(connection, postId),
  );
  return response.result;
};

// u-7-8 createPostReport.
// 게시글을 신고합니다.
const postCreatePostReport = async (postId: TId, body: CreatePostReportReqBody) => {
  await withAuth((connection) =>
    api.functional.user.posts.report.createPostReport(connection, postId, body),
  );
};

// u-8-1 incrementPostViewCount.
// 게시글 조회수를 증가시킵니다.
const postIncrementPostViewCount = async (postId: TId) => {
  await withAuth((connection) =>
    api.functional.user.view_count.post.incrementPostViewCount(connection, postId),
  );
};

export const postApi = {
  postCreatePost,
  postFindPosts,
  postGetPost,
  postDeletePost,
  postUpdatePost,
  postCreatePostLike,
  postDeletePostLike,
  postCreatePostReport,
  postIncrementPostViewCount,
};
