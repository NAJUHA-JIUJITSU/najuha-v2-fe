'use client';
import styles from './index.module.scss';
import { useClipboard } from '@/hooks/useClipboard';

interface CopyTextProps {
  copyText: string;
  alertText: string;
}

export default function CopyText({ copyText, alertText }: CopyTextProps) {
  const copyToClipboard = useClipboard();
  const handleCopy = () => {
    copyToClipboard(copyText, alertText);
  };

  return (
    <span className={styles.copy} onClick={handleCopy}>
      복사
    </span>
  );
}
