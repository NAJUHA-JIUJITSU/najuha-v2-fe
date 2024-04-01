export interface replyComment {
  id: number;
  nickname: string;
  date: Date;
  likeCnt: number;
  content: string;
  profile: string;
  changed: boolean;
}

export interface comment extends replyComment {
  best: boolean;
  commentCnt: number; // Optional로 변경
  replyComment: replyComment[];
}
