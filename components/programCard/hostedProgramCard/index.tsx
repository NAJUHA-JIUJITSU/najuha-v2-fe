import styles from '../index.module.scss';
import Tag from '@/components/common/tagList/tag';
import ButtonLink from '@/components/common/button/buttonLink';

export default function HostedProgramCard() {
  // imageURL이 없으면 기본 이미지로 대체
  //   if (!competition.posterImgUrlKey) {
  //     competition.posterImgUrlKey = '/images/samplePoster1.png';
  //   }

  const buttonLinks = [
    { text: '참가자 명단', href: '/' },
    { text: '대진표', href: '/' },
    { text: '문의하기', href: '/' },
  ];

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.middle}
        onClick={() => {
          alert('주최내역 가기');
        }}
      >
        <img src="/images/samplePoster1.png"></img>
        <div className={styles.info}>
          <h1>제 2회 서브미션 리그</h1>
          <h2>09.28(토)</h2>
          <h3>경기 김포시 사우체육관</h3>
          <div className={styles.price}>
            <Tag type="apply" content="신청마감 D-13" />
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
