'use client';
import React, { useState, useRef } from 'react';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import IconClear from '@/public/svgs/clear.svg';
import IconMoreVert from '@/public/svgs/moreVert.svg';
import useGoBack from '@/hooks/useGoBack';
import useOutsideClick from '@/hooks/useOutsideClick';
import styles from '../icon.module.scss';
import { useRouter } from 'next/navigation';
import { useDeletePost, useDeleteComment } from '@/hooks/post';
import { useQueryClient } from '@tanstack/react-query';
import { TId } from 'najuha-v2-api/lib/common/common-types';

interface Props {
  icon: React.ReactNode;
  onClick: () => void;
}

function ButtonIcon({ icon, onClick }: Props) {
  return <button onClick={onClick}>{icon}</button>;
}

function ButtonIconNavigateBefore() {
  const goBack = useGoBack();

  return <ButtonIcon icon={<IconNavigateBefore />} onClick={goBack}></ButtonIcon>;
}

// 페이지 벗어나기 전 확인
function ButtonIconNavigateClear() {
  const goBack = useGoBack();
  const handleButtonClick = () => {
    const userConfirmed = window.confirm(
      '페이지를 벗어나면 작성 중인 내용이 모두 사라져요. 그래도 이동하시겠어요?',
    );
    if (userConfirmed) {
      goBack();
    }
  };

  return <ButtonIcon icon={<IconClear />} onClick={handleButtonClick}></ButtonIcon>;
}

// 게시글 메뉴 아이콘
function ButtonIconMoreVertForPost({ postId, isHost }: { postId: string; isHost: boolean }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: deletePost } = useDeletePost(postId);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const hostDropdownList = [
    { label: '수정', onClick: () => router.push(`/community/posts/edit/${postId}`) },
    { label: '삭제', onClick: () => handleDeletePost() },
  ];
  const normalDropdownList = [
    { label: '신고', onClick: () => router.push(`/community/posts/report/post/${postId}`) },
  ];

  const handleDeletePost = () => {
    deletePost(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['posts'],
        });
        router.push('/community');
      },
      onError: () => {
        console.error('게시글 삭제에 실패했습니다.');
      },
    });
  };

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className={styles.wrapper}>
      <ButtonIcon icon={<IconMoreVert />} onClick={handleButtonClick}></ButtonIcon>
      {isOpen && (
        <ul className={styles.dropdown}>
          {isHost
            ? hostDropdownList.map((item, index) => (
                <li key={index} onClick={item.onClick}>
                  {item.label}
                </li>
              ))
            : normalDropdownList.map((item, index) => (
                <li key={index} onClick={item.onClick}>
                  {item.label}
                </li>
              ))}
        </ul>
      )}
    </div>
  );
}

// 댓글 메뉴 아이콘
function ButtonIconMoreVertForComment({
  parentId,
  commentId,
  isHost,
  postId,
  handleEditComment,
}: {
  parentId?: TId;
  commentId: TId;
  postId: TId;
  isHost: boolean;
  handleEditComment: () => void;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: deleteComment } = useDeleteComment(commentId);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const hostDropdownList = [
    {
      label: '수정',
      onClick: () => {
        handleEditComment();
        setIsOpen(false);
      },
    },
    { label: '삭제', onClick: () => handleDeletePost() },
  ];
  const normalDropdownList = [
    { label: '신고', onClick: () => router.push(`/community/posts/report/comment/${commentId}`) },
  ];

  const handleDeletePost = () => {
    deleteComment(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['comments', postId],
        });
        queryClient.invalidateQueries({
          queryKey: ['replies', parentId],
        });
      },
      onError: () => {
        console.error('댓글 삭제에 실패했습니다.');
      },
    });
  };

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className={`${styles.wrapper} ${styles.commentWrapper}`}>
      <ButtonIcon icon={<IconMoreVert />} onClick={handleButtonClick}></ButtonIcon>
      {isOpen && (
        <ul className={styles.dropdown}>
          {isHost
            ? hostDropdownList.map((item, index) => (
                <li key={index} onClick={item.onClick}>
                  {item.label}
                </li>
              ))
            : normalDropdownList.map((item, index) => (
                <li key={index} onClick={item.onClick}>
                  {item.label}
                </li>
              ))}
        </ul>
      )}
    </div>
  );
}

export {
  ButtonIcon,
  ButtonIconNavigateBefore,
  ButtonIconNavigateClear,
  ButtonIconMoreVertForPost,
  ButtonIconMoreVertForComment,
};
