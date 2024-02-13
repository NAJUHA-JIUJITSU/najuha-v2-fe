import Header from '@/components/common/header/Header';
import IconNavigateBeforeSmall from '@/public/svgs/navigateBeforeSmall.svg';
import IconMapSmall from '@/public/svgs/mapSmall.svg';
import { IconLinkSearch, IconLinkAlarm } from '@/components/common/icon/iconLink';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import ButtonLink from '@/components/common/button/buttonLink';
import { useAccessToken } from '@/hook/useAccesstoken';

export default function Home() {
  return (
    <>
      <h1 style={{ lineHeight: 1, fontSize: '30px' }}>서버컴포넌트입니니다.</h1>
    </>
  );
}
