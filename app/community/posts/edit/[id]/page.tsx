'use client';
import React, { useState, useCallback, useEffect } from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateClear } from '@/components/common/icon/iconOnClick';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import BaseLayout from '@/components/layout/baseLayout';
import WritePage from '@/components/createPost/writePage';
import { useGetPost, useUpdatePostWithImages } from '@/hooks/post';
import { IImageCreateDto } from 'najuha-v2-api/lib/modules/images/domain/interface/image.interface';
import { useRouter } from 'next/navigation';

export default function EditPost({ params }: { params: { id: string } }) {
  const postId = params.id;
  const router = useRouter();
  const { data, isLoading, isError } = useGetPost(postId);
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const path: IImageCreateDto['path'] = 'post';
  const {
    mutate: updatePostWithImages,
    isPending,
    isSuccess,
  } = useUpdatePostWithImages(path, postId);

  useEffect(() => {
    if (data) {
      const postSnapshots = data.post.postSnapshots[data.post.postSnapshots.length - 1];

      setFormData({
        title: postSnapshots.title,
        body: postSnapshots.body,
      });
      // 기존 이미지 URLs 설정
      const existingPreviewUrls = postSnapshots.postSnapshotImages.map(
        (img) => `http://localhost:9000/najuha-v2-bucket/${img.image.path}/${img.image.id}`,
      );
      setPreviewUrls(existingPreviewUrls);
      // 추가적인 로직으로 기존 이미지를 로드하고, 업데이트를 위해 사용
    }
  }, [data]);

  const handleFormChange = useCallback((newData: { title: string; body: string }) => {
    setFormData(newData);
  }, []);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const newFiles: File[] = Array.from(e.target.files);

      // 1. 파일 형식 검증 (jpeg, png, webp)
      // 2. 크기 검증 (5MB 이하)
      const validFiles = newFiles.filter((file) => {
        const isValidFormat = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB 이하
        if (!isValidFormat) {
          alert(`해당 이미지 파일 포맷은 지원하지 않습니다: ${file.type}`);
        }
        if (!isValidSize) {
          alert('이미지 파일 크기는 5MB 이하로 업로드해주세요.');
        }
        return isValidFormat && isValidSize;
      });

      // 3. 중복 제거
      const uniqueFiles = validFiles.filter((newFile) => {
        return images.every(
          (existingFile) =>
            existingFile.name !== newFile.name || existingFile.size !== newFile.size,
        );
      });

      if (uniqueFiles.length + images.length > 5) {
        alert('이미지는 최대 5개까지 업로드할 수 있습니다.');
        return;
      }

      // 4. 이미지 미리보기 URL 생성 후 상태 업데이트
      if (uniqueFiles.length > 0) {
        const newPreviewUrls = uniqueFiles.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...uniqueFiles]);
        setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
      }
    },
    [images],
  );

  const handleImageRemove = useCallback((index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formData.title || !formData.body) {
      alert('제목과 본문을 모두 입력해주세요.');
      return;
    }

    const postData = {
      title: formData.title,
      body: formData.body,
      imageIds: [], // 초기 빈 배열로 설정
    };

    updatePostWithImages(
      { data: postData, files: images },
      {
        onSuccess: (res) => {
          console.log('게시글이 성공적으로 수정되었습니다.', res);
          // 수정 성공 후 이전 페이지로 이동
          router.push(`/post/${postId}`);
        },
        onError: (error) => {
          console.error('게시글 수정에 실패했습니다.', error);
        },
      },
    );
  }, [formData, , images, updatePostWithImages, postId, router]);

  if (isLoading) {
    return <div style={{ lineHeight: 1 }}>게시글을 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div style={{ lineHeight: 1 }}>게시글을 불러오는 데 실패했습니다.</div>;
  }

  if (isPending) {
    return <div style={{ lineHeight: 1 }}>게시글을 수정 중입니다...</div>;
  }

  if (isSuccess) {
    return <div style={{ lineHeight: 1 }}>게시글이 성공적으로 수정되었습니다.</div>;
  }

  return (
    <BaseLayout isFooter={false}>
      <Header
        leftIcon={<ButtonIconNavigateClear />}
        subtitle="게시글 수정"
        rightIcon1={
          <ButtonOnClick
            type="text"
            size="small"
            color="blue"
            text={'수정 완료'}
            onClick={handleSubmit}
            disabled={isPending}
          />
        }
      />
      <WritePage
        handleFormChange={handleFormChange}
        formData={formData}
        handleImageChange={handleImageChange}
        handleImageRemove={handleImageRemove}
        previewUrls={previewUrls}
      />
    </BaseLayout>
  );
}
