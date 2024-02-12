import RegisterInfo from '../registerInfo';
import RegisterForm from '../registerForm';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/recoil/userAtom';

interface Props {
  onNext: () => void;
}

const Requirement = ({ onNext }: Props) => {
  const user = useRecoilValue(userAtom);
  return (
    <>
      <RegisterInfo name={user.name} />
      <RegisterForm onNext={onNext} />
    </>
  );
};

export default Requirement;
