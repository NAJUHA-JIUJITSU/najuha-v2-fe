import styles from './index.module.scss';
import Reaction from '@/components/reaction';

// we get postinfo from parent component as props
// we don't need to fetch postinfo from server
// we can use postInfo directly
// set postInfo type
interface PostInfo {
  id: number;
  nickname: string;
  title: string;
  type: 'free' | 'seminar' | 'competition';
  date: Date;
  likeCnt: number;
  viewCnt: number;
  commentCnt: number;
  content: string;
  hot: boolean;
  profile: string;
}
export default async function Post({ postInfo }: { postInfo: PostInfo }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>
          <img className={styles.profile} src={postInfo.profile} alt="profile" />
          <div className={styles.info}>
            <div className={styles.name}>{postInfo.nickname}</div>
            <div className={styles.date}>1년 전(수정됨)</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.caption}>조회 {postInfo.viewCnt}</div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.title}>{postInfo.title}</div>
        <div className={styles.content}>{postInfo.content}</div>
      </div>
      <Reaction id={postInfo.id} likeCnt={postInfo.likeCnt} commentCnt={postInfo.commentCnt} />
    </div>
  );
}
