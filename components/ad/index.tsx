import styles from './index.module.scss';

type adSize = 'small' | 'medium' | 'large';

//todo: adSize에 따라 크기 조절 적절히 수정

interface adProps {
  src: string;
  alt: string;
  size: adSize;
}

export default function ad({ src, alt, size }: adProps) {
  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      <img className={styles.img} src={src} alt={alt} />
    </div>
  );
}
