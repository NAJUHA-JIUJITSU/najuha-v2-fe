import styles from './index.module.scss';
import Reaction from '@/components/reaction';

async function getPost(id: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        nickname: '닉네임이다 이짜식아',
        title:
          '제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데 ', // 따로 글자제한이 필요해보임
        type: 'free',
        date: new Date(),
        likeCnt: 1234,
        viewCnt: 4558,
        commentCnt: 27,
        content:
          '게시물 내용은 여기에 한 줄 미리보기로 표시할건데 여기선 전문을 다보여줍니다ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ게시물 내용은 여기에 한 줄 미리보기로 표시할건데 여기선 전문을 다보여줍니다ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ게시물 내용은 여기에 한 줄 미리보기로 표시할건데 여기선 전문을 다보여줍니다ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        hot: true,
        profile: '/images/samplePoster1.png',
      });
    }, 1000);
  });
}

export default async function Post({ id }: { id: number }) {
  const data = await getPost(id);
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>
          <img className={styles.profile} src={data.profile} alt="profile" />
          <div className={styles.info}>
            <div className={styles.name}>{data.nickname}</div>
            <div className={styles.date}>1년 전(수정됨)</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.caption}>조회 {data.viewCnt}</div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.content}>{data.content}</div>
      </div>
      <Reaction id={data.id} likeCnt={data.likeCnt} commentCnt={data.commentCnt} />
    </div>
  );
}
