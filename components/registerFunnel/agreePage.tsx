'use client';
import styles from './index.module.scss';
import RegisterInfo from '@/components/register/registerInfo';
import RegisterForm from '@/components/register/registerForm';

interface AgreePageProps {
  onNext: (data: any) => void;
}

export default function agreePage({ onNext }: AgreePageProps) {
  return (
    <div className={styles.wrapper}>
      <RegisterInfo />
      <RegisterForm onNext={onNext} />
    </div>
  );
}
