import styles from './index.module.scss';
import Tag from '@/components/tag';
import IconThumbUp from '@/public/svgs/thumbUp.svg';
import IconChat from '@/public/svgs/chat.svg';

interface PostInfo {
  id: number;
  title: string;
  type: 'seminar' | 'competition' | 'free';
  date: string;
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
          <div className={styles.title}>
            엄청나게
            계속길어진ㅁ나ㅣ어ㅏㅁㄴ어남어ㅏㅁ니엄니ㅏㅁㅁㅁㅁㅁㅁㅁㅁ나ㅣㅓ욈나ㅓ아ㅣㅁㄴ어ㅏㅣㅁㄴ어ㅣㄴ마어ㅣㅁ나어ㅣㅁ나엄나ㅣ어ㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅓㅇ
          </div>
          <div className={styles.content}>
            엄청나게
            계속길어진ㅁ나ㅣ어ㅏㅁㄴ어남어ㅏㅁ니엄니ㅏㅁㅁㅁㅁㅁㅁㅁㅁ나ㅣㅓ욈나ㅓ아ㅣㅁㄴ어ㅏㅣㅁㄴ어ㅣㄴ마어ㅣㅁ나어ㅣㅁ나엄나ㅣ어ㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅓㅇasdasdasdasdsa
          </div>
        </div>
        {info.image && (
          <div className={styles.right}>
            <img className={styles.image} src={info.image} alt="이미지" />
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <div className={styles.caption}>2일 전</div>
        </div>
        <div className={styles.right}>
          <div className={styles.thumup}>
            <div className={styles.icon}>
              <IconThumbUp />
            </div>
            <span>{info.likeCnt}</span>
          </div>
          <div className={styles.comment}>
            <div className={styles.icon}>
              <IconChat />
            </div>
            <span>{info.commentCnt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
