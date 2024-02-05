import RegisterInfo from '../registerInfo';
import RegisterForm from '../registerForm';
import styles from './index.module.scss';
import ButtonOnClick from '@/components/common/button/buttonOnClick';

interface Props {
  onNext: () => void;
}

export default function requirement({ onNext }: Props) {
  return (
    <>
      <RegisterInfo />
      <RegisterForm />
      <div className={styles.submit}>
        <ButtonOnClick
          type="filled"
          text="약관전체 동의"
          color="blue"
          width="full"
          size="large"
          onClick={onNext}
        />
      </div>
    </>
  );
}
