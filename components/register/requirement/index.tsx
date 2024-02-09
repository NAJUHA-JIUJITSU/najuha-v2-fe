import RegisterInfo from '../registerInfo';
import RegisterForm from '../registerForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '@/recoil/userAtom';
import { useEffect } from 'react';
import { getUsersMe } from '@/api/users';
import { accessTokenAtom } from '@/recoil/accessTokenAtom';

interface Props {
  onNext: () => void;
}

const Requirement = ({ onNext }: Props) => {
  const [user, setUser] = useRecoilState(userAtom);
  const accessToken = useRecoilValue(accessTokenAtom);
  useEffect(() => {
    const getUsersMeHandler = async () => {
      try {
        const data = await getUsersMe(accessToken);
        console.log(data);
        setUser((user) => ({
          ...user,
          ...data,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    getUsersMeHandler();
  }, [setUser, accessToken]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <RegisterInfo name={user.name} />
      <RegisterForm onNext={onNext} />
    </>
  );
};

export default Requirement;
