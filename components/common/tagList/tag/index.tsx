import styles from './index.module.scss';

export type TagType =
  | 'easyPay'
  | 'earlyBird'
  | 'apply'
  | 'deadline'
  | 'soloApply'
  | 'hot'
  | 'free'
  | 'competition'
  | 'seminar';

interface TagProps {
  type: TagType;
  content: string;
}

export default function ProgramTag({ type, content }: TagProps) {
  return <div className={`${styles.tag} ${styles[type]}`}>{content}</div>;
}
