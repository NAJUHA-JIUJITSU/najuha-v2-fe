'use client';
import React from 'react';
import styles from './index.module.scss';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import IconThumbUp from '@/public/svgs/thumbUp.svg';
import IconChat from '@/public/svgs/chat.svg';

interface ReactionProps {
  userLiked?: boolean;
  likeCnt?: number;
  commentCnt?: number;
}

// todo
// id를 이용해서 좋아요 mutaion을 보내고, 좋아요 수를 증가시키는 함수
export default function Reaction({
  userLiked = false,
  likeCnt = 0,
  commentCnt = 0,
}: ReactionProps) {
  return (
    <div className={styles.wrapper}>
      <ButtonOnToggle
        type="reaction"
        color="pink"
        iconLeft={<IconThumbUp />}
        text={likeCnt.toString()}
        isToggled={userLiked}
        onToggle={() => {
          console.log('like button clicked');
        }}
      />
      {
        <ButtonOnToggle
          type="reaction"
          color="infoBlue"
          iconLeft={<IconChat />}
          text={commentCnt.toString()}
          onToggle={() => {
            console.log('comment button clicked');
          }}
        />
      }
    </div>
  );
}
