import { withAuth } from '@/api/nestia/common';
import api from 'najuha-v2-api/lib/api';
import { TId } from 'najuha-v2-api/lib/common/common-types';
import {
  CreateCommentReportReqBody,
  CreatePostReportReqBody,
  CreatePostReqBody,
  FindCommentsReqQuery,
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

// u-7-12 findComments.
// 게시글의 댓글 목록을 조회합니다.
const postFindComments = async (postId: TId, query: FindCommentsReqQuery) => {
  const response = await withAuth((connection) =>
    api.functional.user.posts.comments.findComments(connection, postId, query),
  );
  return response.result;
};

// u-7-13 findCommentReplies.
// 게시글의 댓글의 답글 목록을 조회합니다.
const postFindCommentReplies = async (postId: TId, commentId: TId, query: FindCommentsReqQuery) => {
  const response = await withAuth((connection) =>
    api.functional.user.posts.comments.replies.findCommentReplies(
      connection,
      postId,
      commentId,
      query,
    ),
  );
  return response.result;
};

// u-7-15 deleteComment.
// 게시글의 댓글을 삭제합니다.
const postDeleteComment = async (commentId: TId) => {
  await withAuth((connection) =>
    api.functional.user.posts.comments.deletePostComment(connection, commentId),
  );
};

// u-7-16 createCommentLike.
// 게시글의 댓글에 좋아요를 추가합니다.
const postCreateCommentLike = async (commentId: TId) => {
  await withAuth((connection) =>
    api.functional.user.posts.comments.like.createPostCommentLike(connection, commentId),
  );
};

// u-7-17 deleteCommentLike.
// 게시글의 댓글에 좋아요를 삭제합니다.
const postDeleteCommentLike = async (commentId: TId) => {
  await withAuth((connection) =>
    api.functional.user.posts.comments.like.deletePostCommentLike(connection, commentId),
  );
};

// u-7-18 createCommentReport.
// 게시글의 댓글을 신고합니다.
const postCreateCommentReport = async (commentId: TId, body: CreateCommentReportReqBody) => {
  await withAuth((connection) =>
    api.functional.user.posts.comments.report.createPostCommentReport(connection, commentId, body),
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
  postFindComments,
  postFindCommentReplies,
  postDeleteComment,
  postCreateCommentLike,
  postDeleteCommentLike,
  postCreateCommentReport,
  postIncrementPostViewCount,
};
