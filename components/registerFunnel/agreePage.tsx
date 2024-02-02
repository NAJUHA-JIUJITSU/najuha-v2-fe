'use client';
import styles from './index.module.scss';
import RegisterInfo from '@/components/register/registerInfo';
import RegisterForm from '@/components/register/registerForm';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

interface AgreePageProps {
  onNext: (data: any) => void;
}

export default function agreePage({ onNext }: AgreePageProps) {
  return (
    <div className={styles.wrapper}>
      <RegisterInfo />
      <RegisterForm />
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="약관전체 동의"
          color="blue"
          width="full"
          size="large"
          onClick={() => onNext({ all: true, use: true, privacy: true, refund: true, ad: true })}
        />
      </div>
    </div>
  );
}
