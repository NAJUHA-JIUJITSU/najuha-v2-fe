'use client';
import React, { useState, useCallback } from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateClear, ButtonIcon } from '@/components/common/icon/iconOnClick';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import BaseLayout from '@/layout/baseLayout';
import { useFunnel } from '@/hooks/useFunnel';
import WritePage from '@/components/createPostFunnel/writePage';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import SelectBoardPage from '@/components/createPostFunnel/selectBoardPage';
import { useCreatePostWithImages } from '@/hooks/post';
import { IImageCreateDto } from 'najuha-v2-api/lib/modules/images/domain/interface/image.interface';
import { useRouter } from 'next/navigation';
import { IPostDetail } from 'najuha-v2-api/lib/modules/posts/domain/interface/post.interface';

const steps = ['게시글 작성', '게시판 선택'];
const categories: IPostDetail['category'][] = ['FREE', 'COMPETITION', 'SEMINAR', 'OPEN_MAT'];

// todo: 로그인 여부 체크 후 로그인 안되어 있으면 로그인 페이지로 이동
export default function CreatePost() {
  const [formData, setFormData] = useState({ title: '', body: '' });
  const path: IImageCreateDto['path'] = 'post';
  const { mutate: createPostWithImages, isPending, isSuccess } = useCreatePostWithImages(path);
  const router = useRouter();

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const { gotoNextStep, gotoPreviousStep, currentStep } = useFunnel(steps);
  // const { gotoNextStep, gotoPreviousStep, Funnel, Step, currentStep } = useFunnel(steps);

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
      category: selectedCategory,
      imageIds: [], // 초기 빈 배열로 설정
    };

    createPostWithImages(
      { data: postData, files: images },
      {
        onSuccess: (res) => {
          console.log('게시글이 성공적으로 업로드되었습니다.', res);
          //todo: 게시글 업로드 성공 후 이전 페이지로 이동
          router.push('/community');
        },
        onError: (error) => {
          console.error('게시글 업로드에 실패했습니다.', error);
        },
      },
    );
  }, [formData, selectedCategory, images, createPostWithImages]);

  if (isPending) {
    return <div style={{ lineHeight: 1 }}>게시글을 업로드 중입니다...</div>;
  }

  if (isSuccess) {
    return <div style={{ lineHeight: 1 }}>게시글이 성공적으로 업로드되었습니다.</div>;
  }
  return (
    <BaseLayout isFooter={false}>
      <Header
        leftIcon={
          currentStep === '게시글 작성' ? (
            <ButtonIconNavigateClear />
          ) : (
            <ButtonIcon icon={<IconNavigateBefore />} onClick={gotoPreviousStep} />
          )
        }
        subtitle={currentStep}
        rightIcon1={
          <ButtonOnClick
            type="text"
            size="small"
            color="blue"
            text={currentStep === '게시글 작성' ? '완료' : '게시'}
            onClick={currentStep === '게시글 작성' ? gotoNextStep : handleSubmit}
            disabled={isPending}
          />
        }
      />
      {currentStep === '게시글 작성' && (
        <WritePage
          handleFormChange={handleFormChange}
          formData={formData}
          handleImageChange={handleImageChange}
          handleImageRemove={handleImageRemove}
          previewUrls={previewUrls}
        />
      )}
      {currentStep === '게시판 선택' && (
        <SelectBoardPage
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      {/* <Funnel>
        <Step name="게시글 작성">
          <WritePage
            handleFormChange={handleFormChange}
            formData={formData}
            handleImageChange={handleImageChange}
            handleImageRemove={handleImageRemove}
            previewUrls={previewUrls}
          />
        </Step>
        <Step name="게시판 선택">
          <div style={{ lineHeight: '1' }}>게시판 선택 페이지</div>
        </Step>
      </Funnel> */}
    </BaseLayout>
  );
}
