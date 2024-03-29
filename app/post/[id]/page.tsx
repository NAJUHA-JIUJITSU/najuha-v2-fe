import React from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';

export default async function post(props: any) {
  return (
    <>
      <Header leftIcon={<ButtonIconNavigateBefore />} title="글페이지" />
      <div>글컴포넌트</div>
      <div>댓글리스트컴포넌트</div>
    </>
  );
}
