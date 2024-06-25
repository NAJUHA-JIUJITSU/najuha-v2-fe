import { withAuth } from '@/api/nestia/common';
import api from 'najuha-v2-api/lib/api';
import { CreatePostReqBody } from 'najuha-v2-api/lib/modules/posts/presentation/posts.controller.dto';

// u-7-1 createPost.
// 새로운 게시글을 작성합니다.
const postCreatePost = async (data: CreatePostReqBody) => {
  const response = await withAuth((connection) =>
    api.functional.user.posts.createPost(connection, data),
  );
  return response.result;
};

export const postApi = {
  postCreatePost,
};
