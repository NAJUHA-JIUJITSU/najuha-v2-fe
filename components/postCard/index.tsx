import styles from './index.module.scss';
import Tag from '@/components/tag';
import IconThumbUp from '@/public/svgs/thumbUp.svg';
import IconChat from '@/public/svgs/chat.svg';
import { getPastTime } from '@/utils/dateUtils/dateCheck';
import { IPostDetail } from 'najuha-v2-api/lib/modules/posts/domain/interface/post.interface';

interface PostCardProps {
  post: IPostDetail;
}

export default function PostCard({ post }: PostCardProps) {
  // 태그 생성 함수
  function makeTag() {
    const tags = [];

    if (post.likeCount && post.likeCount >= 10) {
      //todo: likeCount 옵셔널 수정될 예정
      tags.push(<Tag key="hot" type="hot" content="인기" />);
    }

    switch (post.category) {
      case 'SEMINAR':
        tags.push(<Tag key="seminar" type="seminar" content="세미나&오픈매트" />);
        break;
      case 'OPEN_MAT':
        tags.push(<Tag key="seminar" type="seminar" content="세미나&오픈매트" />);
        break;
      case 'COMPETITION':
        tags.push(<Tag key="competition" type="competition" content="대회" />);
        break;
      case 'FREE':
        tags.push(<Tag key="free" type="free" content="자유" />);
        break;
      default:
        break;
    }
    return <>{tags}</>;
  }
  const lastPostSnapshotsIndex = post.postSnapshots.length - 1; //todo : 마지막 게시글만 보여주기

  // top, middle, bottom으로 나누어서 구조화
  // top: 태그, 조회수
  // middle: 제목, 내용, 이미지
  // bottom: 작성일, 좋아요, 댓글
  // 이미지가 있을 경우에만 이미지 노출
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>{makeTag()}</div>
        <div className={styles.right}>
          <div className={styles.caption}>조회 {post.viewCount}</div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.left}>
          <div className={styles.title}>{post.postSnapshots[lastPostSnapshotsIndex].title}</div>
          <div className={styles.content}>{post.postSnapshots[lastPostSnapshotsIndex].body}</div>
        </div>
        {post.postSnapshots[lastPostSnapshotsIndex].postSnapshotImages[0] && (
          <div className={styles.right}>
            <img
              className={styles.image}
              src={`http://localhost:9000/najuha-v2-bucket/${post.postSnapshots[lastPostSnapshotsIndex].postSnapshotImages[0].image.path}/${post.postSnapshots[lastPostSnapshotsIndex].postSnapshotImages[0].image.id}`}
              alt="이미지"
            />
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <div className={styles.caption}>{getPastTime(post.createdAt)}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.thumup}>
            <IconThumbUp />
            <span>{post.likeCount}</span>
          </div>
          <div className={styles.comment}>
            <IconChat />
            <span>{post.commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
