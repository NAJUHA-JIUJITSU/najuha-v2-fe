import React from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import Post from '@/components/post';
import stlyes from './index.module.scss';

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

export default async function post(props: any) {
  const data = await getPost(props.params.id);
  return (
    <div className={stlyes.wrapper}>
      <Header leftIcon={<ButtonIconNavigateBefore />} title="글페이지" />
      <Post postInfo={data} />
    </div>
  );
}
