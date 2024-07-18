'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useCreateImage } from '@/hooks/images';
import { useCreateCompetitionPosterImage } from '@/hooks/admin';
import ButtonOnClick from '@/components/common/button/buttonOnClick/index';
import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';

export default function CompetitionPosterUpload() {
  const params = useParams();
  const competitionId = params.competitionId;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: createImage, isPending: isCreatingImage } = useCreateImage();
  const { mutate: createCompetitionPosterImage, isPending: isCreatingPoster } =
    useCreateCompetitionPosterImage();

  if (typeof competitionId !== 'string') return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    if (selectedFile.type !== 'image/jpeg' && selectedFile.type !== 'image/png') {
      alert('Unsupported file format. Please upload a jpeg or png file.');
      return;
    }

    createImage(
      { data: { path: 'competition', format: selectedFile.type }, file: selectedFile },
      {
        onSuccess: (data) => {
          const imageId = data.image.id;

          createCompetitionPosterImage(
            { competitionId, data: { imageId } },
            {
              onSuccess: () => {
                alert('Poster image uploaded successfully!');
              },
              onError: (error) => {
                console.error('Error creating competition poster image:', error);
                alert('Failed to create competition poster image.');
              },
            },
          );
        },
        onError: (error) => {
          console.error('Error uploading image:', error);
          alert('Failed to upload image.');
        },
      },
    );
  };

  return (
    <div className={styles.wrapper}>
      <Header leftIcon={<ButtonIconNavigateBefore />} title="포스터 등록" />
      <div className={styles.container}>
        <div className={styles.main}>Upload Competition Poster</div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          size="large"
          color="blue"
          text="Upload"
          width="full"
          onClick={handleUpload}
          disabled={isCreatingImage || isCreatingPoster}
        />
      </div>
    </div>
  );
}
