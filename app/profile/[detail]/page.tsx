import Header from '@/components/common/header/Header';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import MyCommunityPage from '@/components/profileDetail/myCommunityPage';
import OrganizerProgramListPage from '@/components/profileDetail/organizerProgramListPage';
import NavigationLayout from '@/components/layout/navigationLayout';

type detailType = 'myCommunity' | 'organizerProgramList';

interface DetailProps {
  params: { detail: detailType };
}

export default function detail({ params }: DetailProps) {
  const pages = {
    myCommunity: {
      title: '게시판 활동',
      Page: <MyCommunityPage />,
    },
    organizerProgramList: {
      title: '주최 목록',
      Page: <OrganizerProgramListPage />,
    },
  };

  if (!pages[params.detail]) {
    //todo: 에러 페이지를 반환합니다.
    return (
      <div
        style={{
          lineHeight: 1,
          fontSize: 30,
        }}
      >
        요청하신 페이지는 존재하지 않습니다.
      </div>
    );
  }

  return (
    <NavigationLayout>
      <Header title={pages[params.detail].title} leftIcon={<ButtonIconNavigateBefore />} />
      {pages[params.detail].Page}
    </NavigationLayout>
  );
}
