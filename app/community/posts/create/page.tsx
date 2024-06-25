'use client';
import React, { useState, useCallback } from 'react';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateClear, ButtonIcon } from '@/components/common/icon/iconOnClick';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import BaseLayout from '@/components/layout/baseLayout';
import { useFunnel } from '@/hooks/useFunnel';
import WritePage from '@/components/createPost/writePage';
import IconNavigateBefore from '@/public/svgs/navigateBefore.svg';
import SelectBoardPage from '@/components/createPost/selectBoardPage';
import { useCreatePostWithImages } from '@/hooks/post';
import { IImageCreateDto } from 'najuha-v2-api/lib/modules/images/domain/interface/image.interface';

type Category = 'FREE' | 'COMPETITION' | 'SEMINAR' | 'OPEN_MAT';
const steps = ['게시글 작성', '게시판 선택'];
const categorys: Category[] = ['FREE', 'COMPETITION', 'SEMINAR', 'OPEN_MAT'];

export default function CreatePost() {
  const [formData, setFormData] = useState({ title: '', body: '' });
  const path: IImageCreateDto['path'] = 'post';
  const { mutate: createPostWithImages, isPending } = useCreatePostWithImages(path);

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categorys[0]);
  const { gotoNextStep, gotoPreviousStep, currentStep } = useFunnel(steps);
  // const { gotoNextStep, gotoPreviousStep, Funnel, Step, currentStep } = useFunnel(steps);

  const handleFormChange = useCallback((newData: { title: string; body: string }) => {
    setFormData(newData);
  }, []);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const newImages = Array.from(e.target.files);

      // 기존 이미지와 중복되지 않는 이미지만 추가
      const uniqueImages = newImages.filter((newImg) => {
        // 이미지 포맷 체크
        const isValidFormat = ['image/jpeg', 'image/png', 'image/webp'].includes(newImg.type);
        if (!isValidFormat) {
          alert(`해당 이미지 파일 포맷을 지원하지 않습니다 : ${newImg.type}`);
          return false;
        }

        return images.every(
          (existingImg) => existingImg.name !== newImg.name || existingImg.size !== newImg.size,
        );
      });

      if (uniqueImages.length + images.length > 5) {
        alert('이미지는 최대 5개까지 업로드할 수 있습니다.');
        return;
      }

      if (uniqueImages.length > 0) {
        const newPreviewUrls = uniqueImages.map((img) => URL.createObjectURL(img));

        setImages((prevImages) => [...prevImages, ...uniqueImages]);
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
        },
        onError: (error) => {
          console.error('게시글 업로드에 실패했습니다.', error);
        },
      },
    );
  }, [formData, selectedCategory, images, createPostWithImages]);

  if (isPending) {
    return <div>게시글을 업로드 중입니다...</div>;
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
          categorys={categorys}
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
