interface PostInfo {
  id: number;
  title: string;
  type: string;
  date: string;
  likeCnt: number;
  viewCnt: number;
  commentCnt: number;
  content: string;
  image?: string;
}

interface PostCardProps {
  info: PostInfo;
}

export default function PostCard({ info }: PostCardProps) {
  return (
    <div>
      <h1 style={{ lineHeight: 1, fontSize: '20px' }}>
        {info.title}
        {info.type === 'popular' && '🔥'}
        {info.type === 'free' && '🆓'}
        {info.type === 'competition' && '🏆'}
        {info.type === 'seminar&openmat' && '📚'}
        {info.type === 'recruit' && '📢'}
        {info.content}
      </h1>
    </div>
  );
}
