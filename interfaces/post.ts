export interface postType {
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
