'use client';
import styles from './index.module.scss';
import Input from '../common/input';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import useBirthValidation from '@/hook/useBirthValidation';

interface BirthPageProps {
  onNext: (data: string) => void;
  data: string;
}

export default function birthPage({ onNext, data }: BirthPageProps) {
  const { birth, setBirth, isValid, errorMessage } = useBirthValidation(data);

  return (
    <div className={styles.wrapper}>
      <Input
        label="생년월일을 입력해주세요"
        placeholder="YYYY/MM/DD"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
        errMsg={errorMessage}
      />
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="다음"
          color={isValid ? 'blue' : 'disabled'}
          width="full"
          size="large"
          onClick={() => onNext(birth)}
        />
      </div>
    </div>
  );
}
