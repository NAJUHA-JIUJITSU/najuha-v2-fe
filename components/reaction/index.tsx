'use client';
import React from 'react';
import styles from './index.module.scss';
import ButtonOnToggle from '@/components/common/button/buttonOnToggle';
import IconThumbUp from '@/public/svgs/thumbUp.svg';
import IconChat from '@/public/svgs/chat.svg';

interface ReactionProps {
  id: number;
  likeCnt: number;
  commentCnt?: number;
}

// todo
// id를 이용해서 좋아요 mutaion을 보내고, 좋아요 수를 증가시키는 함수
export default function Reaction({ id, likeCnt, commentCnt }: ReactionProps) {
  return (
    <div className={styles.wrapper}>
      <ButtonOnToggle
        type="outlined"
        color="pink"
        iconLeft={<IconThumbUp />}
        size="xSmall"
        shape="reaction"
        text={likeCnt.toString()}
        onToggle={() => {
          console.log('like button clicked');
        }}
      />
      {/* commentCnt가 있을 경우에만 댓글 버튼을 노출합니다. */}
      {commentCnt && (
        <ButtonOnToggle
          type="outlined"
          color="infoBlue"
          iconLeft={<IconChat />}
          size="xSmall"
          shape="reaction"
          text={commentCnt.toString()}
          onToggle={() => {
            console.log('comment button clicked');
          }}
        />
      )}
    </div>
  );
}
