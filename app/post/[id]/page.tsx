import React from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import Post from '@/components/post';
import stlyes from './index.module.scss';

export default async function post(props: any) {
  return (
    <div className={stlyes.wrapper}>
      <Header leftIcon={<ButtonIconNavigateBefore />} title="글페이지" />
      <Post id={props.params.id} />
    </div>
  );
}
