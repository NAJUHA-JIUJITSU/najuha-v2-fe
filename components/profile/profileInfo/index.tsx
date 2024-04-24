import styles from './index.module.scss';
import ButtonLink from '@/components/common/button/buttonLink';

export default function profileInfo() {
  //todo: 닉네임 정보 받아오기
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <img className={styles.profileImg} src="/images/sampleProfile.jpg" alt="profile" />
        <div className={styles.nickname}>내 닉네임은 오칸</div>
      </div>
      <ButtonLink
        text={'프로필 수정'}
        size={'small'}
        type={'text'}
        color={'gray'}
        href={'/profileEdit'}
      />
    </div>
  );
}
