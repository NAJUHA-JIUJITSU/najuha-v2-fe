import React from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import Post from '@/components/post';
import Comment from '@/components/comment';
import { ThinDivider } from '@/components/divider';
import { comment, replyComment } from '@/interfaces/comment';
import BaseLayout from '@/components/layout/baseLayout';

const data = {
  id: 1,
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
};
const commentInfo: comment[] = [
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
    replyComment: [
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
    replyComment: [],
  },
];

export default function post({ params }: { params: { id: string } }) {
  // 댓글 렌더링 함수
  function renderComment(comment: comment[]) {
    return comment.map((comment) => {
      const writer = comment.nickname === data.nickname;
      return (
        <>
          <Comment key={comment.id} commentInfo={comment} type="comment" writer={writer} />
          <ThinDivider key={`divider-${comment.id}`} />

          <>
            {comment.replyComment?.map((reply: replyComment) => {
              const replyWriter = reply.nickname === data.nickname;
              // 대댓글에 대한 고유 key 값으로 reply.id를 사용
              // 또한, 각 ThinDivider에도 고유한 key를 제공하기 위해 댓글 ID와 대댓글 ID를 조합하여 key를 생성
              return (
                <React.Fragment key={reply.id}>
                  <Comment commentInfo={reply} type="reply" writer={replyWriter} />
                  <ThinDivider key={`divider-reply-${comment.id}-${reply.id}`} />
                </React.Fragment>
              );
            })}
          </>
        </>
      );
    });
  }

  return (
    <BaseLayout>
      <Header leftIcon={<ButtonIconNavigateBefore />} title="글페이지" />
      <Post postId={params.id} />
      <ThinDivider />
      {renderComment(commentInfo)}
    </BaseLayout>
  );
}
