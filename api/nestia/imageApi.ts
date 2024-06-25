import { withAuth } from '@/api/nestia/common';
import api from 'najuha-v2-api/lib/api';
import { TPresignedPost } from 'najuha-v2-api/lib/infrastructure/bucket/bucket.interface';
import { CreateImageReqBody } from 'najuha-v2-api/lib/modules/images/presentation/images.controller.dto';

// u-9-1 createImage.
const postCreateImage = async (data: CreateImageReqBody, file: File) => {
  try {
    // 1. imageEntity를 생성하고, presignedPost를 반환
    const createResponse = await withAuth((connection) =>
      api.functional.user.images.createImage(connection, data),
    );
    console.log('createResponse: ', createResponse);

    const { url, fields } = createResponse.result.presignedPost;

    // 2. 응답받은 presignedPost의 url로 이미지를 업로드
    const uploadResponse = await postUploadImage(url, fields, file);
    console.log('uploadResponse: ', uploadResponse);

    // 3. 업로드된 이미지의 id를 반환
    return createResponse;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// 2. presigned URL로 이미지 업로드
const postUploadImage = async (
  url: TPresignedPost['url'],
  fields: TPresignedPost['fields'],
  file: File,
) => {
  try {
    const formData = new FormData();

    // presigned URL의 필드를 FormData에 추가
    Object.keys(fields).forEach((key) => {
      formData.append(key, fields[key]);
    });

    formData.append('file', file);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image. Status: ${response.status}`); //todo: 에러 처리
    }

    return response;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const imageApi = {
  postCreateImage,
  postUploadImage,
};
