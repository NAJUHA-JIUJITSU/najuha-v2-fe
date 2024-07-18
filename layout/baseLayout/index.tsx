import { ReactNode } from 'react';
import styles from '../index.module.scss';
import Footer from '@/components/common/footer';

interface baseLayoutProps {
  children: ReactNode;
  isFooter?: boolean;
}

export default function baseLayout({ children, isFooter = true }: baseLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.children}>{children}</div>
        {isFooter && <Footer />}
      </div>
    </div>
  );
}
