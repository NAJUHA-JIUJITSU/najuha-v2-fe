'use client';
import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import NicknamePage from '@/components/register/registerFunnel/nicknamePage';
import GenderPage from '@/components/register/registerFunnel/genderPage';
import BirthPage from '@/components/register/registerFunnel/birthPage';
import BeltPage from '@/components/register/registerFunnel/beltPage';
import { useUserPatch } from '@/hooks/users';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

type editType = 'nickname' | 'phoneNumber' | 'gender' | 'birth' | 'belt';

interface EditProps {
  params: { edit: editType };
}

export default function Edit({ params }: EditProps) {
  const { mutate, isPending } = useUserPatch();

  // const profileEditGoBack = () => {
  //   mutate();
  //   alert('회원정보 수정이 완료되었습니다.');
  //   router.back();
  // };

  const profileEditGoBack = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['userInfo'],
        });
        alert('회원정보 수정이 완료되었습니다.');
        router.back();
      },
      onError: () => {
        alert('회원 정보 수정 중 오류가 발생했습니다.');
      },
    });
  };

  const pages = {
    nickname: {
      title: '닉네임 수정',
      Page: <NicknamePage onNext={profileEditGoBack} submitText="수정 완료" />,
    },
    phoneNumber: {
      title: '휴대폰 번호 수정',
      Page: <div>휴대폰 번호 페이지</div>,
    },
    gender: {
      title: '성별 수정',
      Page: <GenderPage onNext={profileEditGoBack} submitText="수정 완료" />,
    },
    birth: {
      title: '생년월일 수정',
      Page: <BirthPage onNext={profileEditGoBack} submitText="수정 완료" />,
    },
    belt: {
      title: '벨트 수정',
      Page: <BeltPage onNext={profileEditGoBack} submitText="수정 완료" isPending={isPending} />,
    },
  };

  return (
    <div className={styles.wrapper}>
      <Header title={pages[params.edit].title} leftIcon={<ButtonIconNavigateBefore />} />
      {pages[params.edit].Page}
    </div>
  );
}
