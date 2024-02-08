import RegisterInfo from '../registerInfo';
import RegisterForm from '../registerForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import { registerUserAtom } from '@/recoil/registerUserAtom';
import { useEffect } from 'react';
import { getUsersMe } from '@/api/users';
import { accessTokenAtom } from '@/recoil/accessTokenAtom';

interface Props {
  onNext: () => void;
}

const Requirement = ({ onNext }: Props) => {
  const [user, setUser] = useRecoilState(registerUserAtom);
  const accessToken = useRecoilValue(accessTokenAtom);
  useEffect(() => {
    const getUsersMeHandler = async () => {
      try {
        const data = await getUsersMe(accessToken);
        setUser((user) => ({
          ...user,
          id: data.id,
          role: data.role,
          name: data.name,
          birth: data.birth,
          gender: data.gender,
          nickname: data.nickname,
          phoneNumber: data.phoneNumber,
          belt: data.belt,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    getUsersMeHandler();
  }, [setUser, accessToken]);

  return (
    <>
      <RegisterInfo name={user.name} />
      <RegisterForm onNext={onNext} />
    </>
  );
};

export default Requirement;
