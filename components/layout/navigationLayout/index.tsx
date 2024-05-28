import { ReactNode } from 'react';
import NavigationBar from '@/components/common/navigationBar';
import styles from './index.module.scss';

interface navigationLayoutProps {
  children: ReactNode;
}

export default function navigationLayout({ children }: navigationLayoutProps) {
  return (
    <div className={styles.container}>
      <NavigationBar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
