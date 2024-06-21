import { ReactNode } from 'react';
import NavigationBar from '@/components/common/navigationBar';
import styles from '../index.module.scss';
import Footer from '@/components/common/footer';

interface navigationLayoutProps {
  children: ReactNode;
}

export default function navigationLayout({ children }: navigationLayoutProps) {
  return (
    <div className={styles.container}>
      <NavigationBar />
      <div className={`${styles.content} ${styles.navigationContent}`}>
        <div className={styles.children}>{children}</div>
        <Footer />
      </div>
    </div>
  );
}
