import styles from '../index.module.scss';
import Tag from '@/components/tag';
import ButtonLink from '@/components/common/button/buttonLink';
import { ButtonIcon } from '../../common/icon/iconOnClick';
import IconClose from '@/public/svgs/close.svg';

export default function ApplicantProgramCard() {
  // imageURL이 없으면 기본 이미지로 대체
  //   if (!competition.posterImgUrlKey) {
  //     competition.posterImgUrlKey = '/images/samplePoster1.png';
  //   }

  const buttonLinks = [
    { text: '신청내역', href: '/' },
    { text: '게시판 보기', href: '/' },
    { text: '문의하기', href: '/' },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h1>
          <span>결제일</span>2023.04.04 (토)
        </h1>
        <ButtonIcon
          icon={<IconClose />}
          onClick={() => {
            alert('삭제하기');
          }}
        />
      </div>
      <div
        className={styles.middle}
        onClick={() => {
          alert('신청내역 가기');
        }}
      >
        <img src="/images/samplePoster1.png"></img>
        <div className={styles.info}>
          <h1>제 2회 서브미션 리그</h1>
          <h2>09.28(토)</h2>
          <h3>참가자 : 유연아</h3>
          <div className={styles.price}>
            <Tag type="apply" content="미결제" />
            <p>50,000원</p>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        {buttonLinks.map((button, index) => (
          <ButtonLink
            key={index}
            text={button.text}
            size="medium"
            type="outlined"
            color="gray"
            href={button.href}
            width="full"
          />
        ))}
      </div>
    </div>
  );
}
