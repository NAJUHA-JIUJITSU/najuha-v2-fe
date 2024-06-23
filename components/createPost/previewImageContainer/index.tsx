import React from 'react';
import styles from './index.module.scss';
import IconClose from '@/public/svgs/closeSmall.svg';

interface previewImageContainerProps {
  handleImageRemove: (index: number) => void;
  index: number;
  url: string;
}

export default function PreviewImageContainer({
  handleImageRemove,
  index,
  url,
}: previewImageContainerProps) {
  return (
    <div className={styles.previewImageContainer}>
      <img src={url} alt={`preview-${index}`} className={styles.previewImage} />
      <button
        type="button"
        onClick={() => handleImageRemove(index)}
        className={styles.removeButton}
      >
        <IconClose />
      </button>
    </div>
  );
}
