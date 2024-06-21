import React, { useState, useRef } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import Input from '@/components/common/input';
import styles from './index.module.scss';

interface PostEditorProps {
  onChange: (newData: { title: string; content: string }) => void;
  formData: { title: string; content: string };
}

function PostEditor({ onChange, formData }: PostEditorProps) {
  const [title, setTitle] = useState(formData.title);
  const [content, setContent] = useState(formData.content);
  const wrapperRef = useRef<HTMLFormElement | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFormChange = () => {
    onChange({ title, content });
  };

  useOutsideClick(wrapperRef, handleFormChange, 'mousedown');

  return (
    <form ref={wrapperRef} className={styles.wrapper}>
      <Input
        placeholder="제목을 입력하세요"
        type="text"
        isUnderline={true}
        autoFocus={true}
        width="full"
        isMsg={false}
        value={title}
        onChange={handleTitleChange}
      />
      <textarea
        className={styles.textareaWrapper}
        placeholder="자유롭게 의견을 공유해보세요!"
        name="content"
        value={content}
        onChange={handleContentChange}
      ></textarea>
    </form>
  );
}

export default PostEditor;
