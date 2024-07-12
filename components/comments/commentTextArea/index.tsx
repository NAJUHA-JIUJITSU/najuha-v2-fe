'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

interface commentTextAreaProps {
  isEditing?: boolean;
  initialText?: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
  isFocused: boolean; // 외부에서 포커스 제어
  setFocus: (focused: boolean) => void; // 포커스 상태 변경 함수
}

function CommentTextArea({
  isEditing = false,
  initialText = '',
  onSubmit,
  onCancel,
  isFocused,
  setFocus,
}: commentTextAreaProps) {
  const [text, setText] = useState(initialText);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleFocus = () => setFocus(true);

  const handleBodyChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textAreaRef.current) {
      // 스크롤 높이에 맞춰 높이를 조절합니다.
      textAreaRef.current.style.height = '23px';
      textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 92)}px`;
    }
  }, []);
  const handleSubmit = () => {
    onSubmit(text);
    setText('');
    setFocus(false);
  };
  const handleCancel = () => {
    console.log('handleCancel---------');
    onCancel();
    setText('');
  };

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  useEffect(() => {
    if (isFocused && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className={styles.stickyWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.textareaWrapper}>
          <textarea
            ref={textAreaRef}
            className={styles.textArea}
            placeholder="댓글을 입력해주세요"
            value={text}
            onFocus={handleFocus}
            onChange={handleBodyChange}
          />
        </div>
        {(isEditing || isFocused) && (
          <div className={styles.buttonWrapper}>
            <ButtonOnClick
              text="취소"
              size="small"
              color="lightblue"
              type="filled"
              onClick={handleCancel}
            />
            <ButtonOnClick
              text={isEditing ? '수정' : '등록'}
              size="small"
              color="blue"
              type="filled"
              onClick={handleSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(CommentTextArea);
