import styles from './index.module.scss';
import Tag from '@/components/tag';
import IconThumbUp from '@/public/svgs/thumbUp.svg';
import IconChat from '@/public/svgs/chat.svg';
import { getPastTime } from '@/util/dateCheck';

interface PostInfo {
  id: number;
  title: string;
  type: 'seminar' | 'competition' | 'free';
  date: Date;
  likeCnt: number;
  viewCnt: number;
  commentCnt: number;
  content: string;
  hot: boolean;
  image?: string;
}

interface PostCardProps {
  info: PostInfo;
}

export default function PostCard({ info }: PostCardProps) {
  // 태그 생성 함수
  function makeTag() {
    const tags = [];

    if (info.hot) tags.push(<Tag key="hot" type="hot" content="인기" />);

    switch (info.type) {
      case 'seminar':
        tags.push(<Tag key="seminar" type="seminar" content="세미나&오픈매트" />);
        break;
      case 'competition':
        tags.push(<Tag key="competition" type="competition" content="대회" />);
        break;
      case 'free':
        tags.push(<Tag key="free" type="free" content="자유" />);
        break;
      default:
        break;
    }
    return <>{tags}</>;
  }

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
          <div className={styles.caption}>조회 {info.viewCnt}</div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.left}>
          <div className={styles.title}>{info.title}</div>
          <div className={styles.content}>{info.content}</div>
        </div>
        {info.image && (
          <div className={styles.right}>
            <img className={styles.image} src={info.image} alt="이미지" />
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <div className={styles.caption}>{getPastTime(info.date)}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.thumup}>
            <IconThumbUp />
            <span>{info.likeCnt}</span>
          </div>
          <div className={styles.comment}>
            <IconChat />
            <span>{info.commentCnt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
