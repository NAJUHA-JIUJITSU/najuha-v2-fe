import { ReactNode } from 'react';
import styles from './index.module.scss';
import Footer from '@/components/common/footer';

interface baseLayoutProps {
  children: ReactNode;
}

export default function baseLayout({ children }: baseLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.children}>{children}</div>
        <Footer />
      </div>
    </div>
  );
}
