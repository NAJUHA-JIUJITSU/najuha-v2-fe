'use client';
import React, { useEffect } from 'react';
import styles from './index.module.scss';
import PostReaction from '@/components/common/reactionButton/postReaction';
import { useGetPost, useIncrementPostViewCount } from '@/hooks/post';
import { getPastTime } from '@/utils/dateUtils/dateCheck';
import { useQueryClient } from '@tanstack/react-query';
import { TId } from 'najuha-v2-api/lib/common/common-types';

interface postProps {
  postId: TId;
  handleCommentButtonClick: () => void;
  isCommentingOnPost: boolean;
}

export default function Post({ postId, handleCommentButtonClick, isCommentingOnPost }: postProps) {
  const { data, isLoading, isError } = useGetPost(postId);
  const { mutate: incrementViewCount } = useIncrementPostViewCount(postId);
  const queryClient = useQueryClient();

  // 게시글 조회수 증가
  useEffect(() => {
    if (postId) {
      incrementViewCount(void 0, {
        onSuccess: () => {
          console.log('게시글 조회수 증가 성공');
          queryClient.invalidateQueries({
            queryKey: ['post', postId],
          });
        },
        onError: () => {
          console.log('게시글 조회수 증가 실패');
        },
      });
    }
  }, [postId, incrementViewCount, queryClient]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!data) return null;

  const post = data.post;
  const lastPostSnapshotsIndex = (post.postSnapshots.length && post.postSnapshots.length - 1) || 0;
  const lastPostSnapshot = post.postSnapshots[lastPostSnapshotsIndex];

  const sortedImages = lastPostSnapshot.postSnapshotImages
    .slice() // 원본 배열을 변경하지 않기 위해 slice로 복사본을 만듭니다.
    .sort((a, b) => a.sequence - b.sequence); // sequence 값에 따라 정렬합니다.

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>
          <img
            className={styles.profile}
            src={`http://localhost:9000/najuha-v2-bucket/${post.user.profileImages[0].image.path}/${post.user.profileImages[0].image.id}`}
            alt="profile"
          />
          <div className={styles.info}>
            <div className={styles.name}>{post.user?.nickname}</div>
            <div className={styles.date}>
              {getPastTime(post.createdAt)}
              {post.postSnapshots.length > 1 ? '(수정됨)' : ''}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.caption}>조회 {post.viewCount}</div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.title}>{lastPostSnapshot.title}</div>
        <div className={styles.body}>{lastPostSnapshot.body}</div>
        {sortedImages.length > 0 && (
          <div className={styles.imageWrapper}>
            {sortedImages.map((image) => (
              <img
                key={image.id}
                src={`http://localhost:9000/najuha-v2-bucket/${image.image.path}/${image.image.id}`}
                alt="이미지"
              />
            ))}
          </div>
        )}
      </div>
      <PostReaction
        postId={postId}
        userLiked={post.userLiked}
        likeCnt={post.likeCount}
        commentCnt={post.commentCount}
        handleCommentButtonClick={handleCommentButtonClick}
        isCommentingOnPost={isCommentingOnPost}
      />
    </div>
  );
}
