import styles from './index.module.scss';

export type TagType = 'easyPay' | 'earlyBird' | 'apply' | 'deadline' | 'soloApply';

interface TagProps {
  type: TagType;
  content: string;
}

export default function Tag({ type, content }: TagProps) {
  return <div className={`${styles.tag} ${styles[type]}`}>{content}</div>;
}
