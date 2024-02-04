'use client';
import styles from './index.module.scss';
import RegisterInfo from '@/components/register/registerInfo';
import RegisterForm from '@/components/register/registerForm';

interface AgreePageProps {
  onNext: (data: any) => void; //todo: 두번 건네주는데 맞나?
  data: { all: boolean; use: boolean; privacy: boolean; refund: boolean; ad: boolean };
}

export default function agreePage({ onNext, data }: AgreePageProps) {
  return (
    <div className={styles.wrapper}>
      <RegisterInfo />
      <RegisterForm data={data} onNext={onNext} />
    </div>
  );
}
