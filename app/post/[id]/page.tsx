import React from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import Post from '@/components/post';
import Comment from '@/components/comment';
import stlyes from './index.module.scss';
import { ThinDivider } from '@/components/divider';

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
interface BaseComment {
  id: number;
  nickname: string;
  date: Date;
  likeCnt: number;
  content: string;
  profile: string;
  changed: boolean;
}

interface CommentInfo extends BaseComment {
  best: boolean;
  commentCnt?: number; // Optional로 변경
  extracomment?: BaseComment[];
}

async function getPost(id: number): Promise<PostInfo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        nickname: '바보',
        title:
          '제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데제목이다 이짜식아 제목이길어지면 어쩔껀데 ', // 따로 글자제한이 필요해보임
        type: 'free',
        date: new Date(2024, 2, 26, 12, 30, 0),
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

const commentInfo: CommentInfo[] = [
  {
    id: 5,
    nickname: '오칸',
    date: new Date(2024, 2, 27, 12, 30, 0),
    likeCnt: 13,
    commentCnt: 27,
    content: '게시물 내용은 여기에 한 줄 미리보기로 표시할건데 여기선 전문을 다보여줍니다ㅋㅋㅋㅋ',
    best: true,
    profile: '/images/samplePoster1.png',
    changed: true,
    extracomment: [
      {
        id: 1,
        nickname: '이응',
        date: new Date(2024, 2, 28, 12, 30, 0),
        likeCnt: 6,
        content: '대댓글인데 어쫄어쫄',
        profile: '/images/samplePoster1.png',
        changed: true,
      },
      {
        id: 2,
        nickname: '바보',
        date: new Date(2024, 3, 1, 12, 30, 0),
        likeCnt: 0,
        content: '대댓글인데 이런거 처음보냐?',
        profile: '/images/samplePoster1.png',
        changed: false,
      },
    ],
  },
  {
    id: 6,
    nickname: '이응',
    date: new Date(2024, 3, 1, 16, 0, 0),
    likeCnt: 1234,
    commentCnt: 27,
    content:
      '게시물 내용은 여기에 한 줄 미리보기로 표시할건데 여기선 전문을 다보여줍니다ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ게시물 내용은 여기에 한 줄 미리보기로 표시할건데 여기선 전문을 다보여줍니다ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ게시물 내용은 여기에 한 줄 미리보기로 표시할건데 여기선 전문을 다보여줍니다ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    best: false,
    profile: '/images/samplePoster1.png',
    changed: false,
  },
];

export default async function post(props: any) {
  const data = await getPost(props.params.id);
  // i want show extra comment with each comment
  function renderComment(comment: CommentInfo[]) {
    return comment.map((comment) => {
      const writer = comment.nickname === data.nickname;
      return (
        <>
          <Comment key={comment.id} commentInfo={comment} type="normal" writer={writer} />
          <ThinDivider />
          <>
            {comment.extracomment?.map((extra: BaseComment) => {
              const writer = extra.nickname === data.nickname;
              return (
                <>
                  <Comment key={extra.id} commentInfo={extra} type="extra" writer={writer} />
                  <ThinDivider />
                </>
              );
            })}
          </>
        </>
      );
    });
  }

  return (
    <div className={stlyes.wrapper}>
      <Header leftIcon={<ButtonIconNavigateBefore />} title="글페이지" />
      <Post postInfo={data} />
      <ThinDivider />
      {renderComment(commentInfo)}
    </div>
  );
}
