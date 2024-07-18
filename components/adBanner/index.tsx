import styles from './index.module.scss';

type adBannerSize = 'small' | 'medium' | 'large';

//todo: adSize에 따라 크기 조절 적절히 수정

interface adBannerProps {
  src: string;
  alt: string;
  size: adBannerSize;
}

export default function AdBanner({ src, alt, size }: adBannerProps) {
  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      <img className={styles.img} src={src} alt={alt} />
    </div>
  );
}
