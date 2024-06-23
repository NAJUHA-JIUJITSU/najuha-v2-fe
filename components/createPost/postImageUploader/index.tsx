'use client';
import React from 'react';
import styles from './index.module.scss';
import { ThinDivider } from '@/components/divider';
import Camera from '@/public/svgs/camera.svg';

interface PostImageUploaderProps {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PostImageUploader({ handleImageChange }: PostImageUploaderProps) {
  return (
    <div className={styles.stickyWrapper}>
      <ThinDivider />
      <div className={styles.uploader}>
        <label htmlFor="imageUpload" className={styles.fileLabel}>
          <Camera />
          <span>사진</span>
        </label>
        <input
          className={styles.fileInput}
          type="file"
          id="imageUpload"
          onChange={handleImageChange}
          multiple
          accept="image/*"
        />
      </div>
    </div>
  );
}

export default React.memo(PostImageUploader);
