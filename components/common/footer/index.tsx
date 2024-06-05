import styles from './index.module.scss';
import ButtonLink from '@/components/common/button/buttonLink';

const footerButtonList = [
  { name: '개인정보처리방침', link: '/privacy', isPrimary: true },
  { name: '서비스 이용약관', link: '/' },
  { name: '위치정보 이용약관', link: '/' },
  { name: '사업자 정보조회', link: '/' },
  { name: '전자금융거래 이용약관', link: '/' },
  { name: '법적고지 및 주의사항', link: '/' },
  { name: '고객센터', link: '/customer' },
  { name: '제휴문의', link: '/contact' },
];

const footerBusinessInfo = [
  { title: '대표이사', data: '나주하' },
  { title: '사업자등록번호', data: '123-45-67890' },
  { title: '통신판매업신고번호', data: '제2021-서울강남-1234호' },
  { title: '주소', data: '서울특별시 강남구 강남대로 1234' },
  { title: '전화번호', data: '02-1234-5678' },
  { title: '이메일', data: 'najuah@gmail.com' },
  { title: '호스팅 제공자', data: '㈜나주하' },
];

export default function Footer() {
  return (
    <div className={styles.fullWidthBackground}>
      <div className={styles.wrapper}>
        <div className={styles.buttonLinkSection}>
          {footerButtonList.map((button, index) => (
            <ButtonLink
              key={index}
              text={button.name}
              href={button.link}
              size="small"
              type="caption"
              color={button.isPrimary ? 'black' : 'gray'}
            />
          ))}
        </div>
        <div className={styles.buisinessInfoSection}>
          <div className={styles.listTitle}>㈜나주하 사업자 정보</div>
          <div className={styles.lists}>
            {footerBusinessInfo.map((info, index) => (
              <dl key={index}>
                <dt className={styles.title}>{info.title}</dt>
                <dd className={styles.data}>{info.data}</dd>
              </dl>
            ))}
          </div>
        </div>
        <div className={styles.noticeContent}>
          ㈜나주하는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 통신판매업자 신고, 신원 및
          거래조건에 대한 정보 제공, 상품의 정보, 거래에 관한 의무와 책임은 각 판매자에게 있고,
          ㈜나주하는 책임을 지지 않습니다.
        </div>
        <div>
          <div className={styles.copyRight}>Copryright ©najuha Corp. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
