'use client';
import styles from './index.module.scss';
import Reaction from '@/components/reaction';
import { useGetPost } from '@/hooks/post';
import { getPastTime } from '@/utils/dateUtils/dateCheck';

export default function Post({ postId }: { postId: string }) {
  const { data, isLoading, isError } = useGetPost(postId);
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
            src={`http://localhost:9000/najuha-v2-bucket/${post.user?.profileImages[0].image.path}/${post.user?.profileImages[0].image.id}`}
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
        <div className={styles.content}>{lastPostSnapshot.body}</div>
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
      <Reaction
        userLiked={post.userLiked}
        likeCnt={post.likeCount}
        commentCnt={post.commentCount}
      />
    </div>
  );
}
