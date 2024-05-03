'use client';
import styles from './index.module.scss';
import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import NicknamePage from '@/components/register/registerFunnel/nicknamePage';
import GenderPage from '@/components/register/registerFunnel/genderPage';
import BirthPage from '@/components/register/registerFunnel/birthPage';
import BeltPage from '@/components/register/registerFunnel/beltPage';
import useGoBack from '@/hooks/useGoBack';

type editType = 'nickname' | 'phoneNumber' | 'gender' | 'birth' | 'belt';

interface EditProps {
  params: { edit: editType };
}

const pages = {
  nickname: {
    title: '닉네임 수정',
    Page: <NicknamePage onNext={() => useGoBack()} submitText="수정 완료" />,
  },
  phoneNumber: {
    title: '휴대폰 번호 수정',
    Page: <div>휴대폰 번호 페이지</div>,
  },
  gender: {
    title: '성별 수정',
    Page: <GenderPage />,
  },
  birth: {
    title: '생년월일 수정',
    Page: <BirthPage />,
  },
  belt: {
    title: '벨트 수정',
    Page: <BeltPage />,
  },
};

export default function Edit({ params }: EditProps) {
  console.log(params.edit);
  return (
    <div className={styles.wrapper}>
      <Header title={pages[params.edit].title} leftIcon={<ButtonIconNavigateBefore />} />
      {pages[params.edit].Page}
    </div>
  );
}
