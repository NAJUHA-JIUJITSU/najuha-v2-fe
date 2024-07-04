'use client';
import { useFindReplies } from '@/hooks/post';
import { TId } from 'najuha-v2-api/lib/common/common-types';
import ReplyComment from '@/components/comments/replyComment';
import { useUserID } from '@/hooks/user';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

interface ReplyCommentListProps {
  postId: TId;
  postUserId: TId;
  commentId: TId;
}

export default function ReplyCommentList({ postId, postUserId, commentId }: ReplyCommentListProps) {
  const {
    data: replies,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFindReplies(postId, commentId);
  const { data: userInfo } = useUserID();

  if (!replies) return null;

  return (
    <div>
      {replies.pages.map((page) =>
        page.comments.map((reply) => (
          <ReplyComment
            parentId={commentId}
            key={reply.id}
            comment={reply}
            postId={postId}
            isWriter={reply.userId === postUserId}
            isHost={reply.userId === userInfo?.id}
          />
        )),
      )}
      {isFetchingNextPage && <div>더 많은 답글을 불러오는 중...</div>}
      {isError && !isFetchingNextPage && <div>답글을 불러오는 과정에서 에러가 발생했습니다.</div>}
      {hasNextPage && !isFetchingNextPage && (
        <ButtonOnClick
          text={`답글 더 불러오기`}
          width="full"
          type="text"
          size="small"
          color="gray"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        />
      )}
    </div>
  );
}
