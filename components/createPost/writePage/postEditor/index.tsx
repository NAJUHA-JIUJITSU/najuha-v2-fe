import React, { useState, useRef, useCallback } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import Input from '@/components/common/input';
import styles from './index.module.scss';

interface PostEditorProps {
  onChange: (newData: { title: string; body: string }) => void;
  formData: { title: string; body: string };
}

function PostEditor({ onChange, formData }: PostEditorProps) {
  const [title, setTitle] = useState(formData.title);
  const [body, setBody] = useState(formData.body);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleBodyChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    if (textareaRef.current) {
      // 스크롤 높이에 맞춰 높이를 조절합니다.
      textareaRef.current.style.height = '300px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleFormChange = useCallback(() => {
    onChange({ title, body });
  }, [title, body, onChange]);

  useOutsideClick(divRef, handleFormChange, 'mousedown');

  return (
    <div className={styles.wrapper} ref={divRef}>
      <Input
        placeholder="제목을 입력하세요"
        type="text"
        isUnderline={true}
        width="full"
        isMsg={false}
        value={title}
        onChange={handleTitleChange}
      />
      <textarea
        ref={textareaRef}
        className={styles.textareaWrapper}
        placeholder="자유롭게 의견을 공유해보세요!"
        name="content"
        value={body}
        onChange={handleBodyChange}
      ></textarea>
    </div>
  );
}

export default React.memo(PostEditor);
