import React from 'react';
import PostEditor from '@/components/createPost/writePage/postEditor';
import PostImageUploader from '@/components/createPost/writePage/postImageUploader';
import styles from './index.module.scss';
import PreviewImageContainer from '@/components/createPost/writePage/previewImageContainer';
import CommnuityRules from '@/components/createPost/writePage/communityRules';

interface WritePageProps {
  handleFormChange: (newData: { title: string; body: string }) => void;
  formData: { title: string; body: string };
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: (index: number) => void;
  previewUrls: string[];
}

const WritePage: React.FC<WritePageProps> = ({
  handleFormChange,
  formData,
  handleImageChange,
  handleImageRemove,
  previewUrls,
}: WritePageProps) => {
  return (
    <div className={styles.wrapper}>
      <PostEditor onChange={handleFormChange} formData={formData} />
      <div className={styles.preview}>
        {previewUrls.map((url, index) => (
          <PreviewImageContainer
            key={index}
            handleImageRemove={handleImageRemove}
            index={index}
            url={url}
          />
        ))}
      </div>
      <CommnuityRules />
      <PostImageUploader handleImageChange={handleImageChange} />
    </div>
  );
};

export default React.memo(WritePage);

// const memoizedHandleFormChange = useCallback(handleFormChange, [
//   formData.title,
//   formData.content,
// ]);
// const memoizedHandleImageChange = useCallback(handleImageChange, [images]);
// const memoizedHandleImageRemove = useCallback(handleImageRemove, [images]);
