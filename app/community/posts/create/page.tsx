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

const steps = ['게시글 작성', '게시판 선택'];
const boards = ['자유', '대회', '세미나&오픈매트'];

export default function CreatePost() {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedBoard, setSelectedBoard] = useState(boards[0]);
  const { gotoNextStep, gotoPreviousStep, currentStep } = useFunnel(steps);
  // const { gotoNextStep, gotoPreviousStep, Funnel, Step, currentStep } = useFunnel(steps);

  const handleFormChange = useCallback((newData: { title: string; content: string }) => {
    setFormData(newData);
  }, []);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const newImages = Array.from(e.target.files);

      // 기존 이미지와 중복되지 않는 이미지만 추가
      const uniqueImages = newImages.filter((newImg) => {
        return images.every(
          (existingImg) => existingImg.name !== newImg.name || existingImg.size !== newImg.size,
        );
      });

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
    console.log('Post submitted:', formData, images, selectedBoard);
    // 서버로 formData와 image를 전송하는 로직을 추가합니다.
  }, [formData, images, selectedBoard]);

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
          boards={boards}
          selectedBoard={selectedBoard}
          setSelectedBoard={setSelectedBoard}
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
