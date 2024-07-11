'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

interface commentTextAreaProps {
  isEditing?: boolean;
  initialText?: string;
  onSubmit: (text: string) => void;
  onCancel?: () => void;
}

function CommentTextArea({
  isEditing = false,
  initialText = '',
  onSubmit,
  onCancel,
}: commentTextAreaProps) {
  const [text, setText] = useState(initialText);
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!text) setIsFocused(false);
  };

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
    setIsFocused(false);
  };
  const handleCancel = () => {
    setText('');
    setIsFocused(false);
    if (onCancel) onCancel();
  };

  useEffect(() => {
    setText(initialText);
    if (isEditing && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [initialText, isEditing]);

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
            onBlur={handleBlur}
            onChange={handleBodyChange}
          />
        </div>
        {isFocused && (
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
