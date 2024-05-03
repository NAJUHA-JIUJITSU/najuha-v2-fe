'use client';
import styles from './index.module.scss';
import { useState } from 'react';
import Camera from '@/public/svgs/camera.svg';

export default function profileImgEdit() {
  //todo: 프로필 이미지 받아오기
  const [profileImg, setProfileImg] = useState('/images/sampleProfile.jpg');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('profile-img', file);
        // await postProfileImg(id, formData) //todo: 이미지 업로드 api 호출
        alert('이미지 업로드 성공' + file.name);
        //setProfileImg(); //todo: 이미지 업로드 성공 시 이미지 변경
      } catch (error) {
        alert('이미지 업로드 실패');
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="imgUpload" className={styles.profile}>
        <img className={styles.profileImg} src={profileImg} alt="profile" />
        <div className={styles.editButton}>
          <Camera />
        </div>
      </label>
      <input
        type="file"
        id="imgUpload"
        onChange={handleImageChange}
        className={styles.imgUploadHidden}
      ></input>
    </div>
  );
}
